const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const global = require('../_helper/GlobalHelper');
const randomString = require("randomstring");
const mail = require("../config/mail");



module.exports ={
  
            index,
            register,
            login,
            editprofile,
            updateprofile,
            destroy,
            forgetPassword,
            resetPassword,
            logout,


};

async function index(req, res) {
  try {
    const users = await User.find({ isDeleted: false }).sort({ created_at: -1 });

    if (!users || users.length === 0) {
      return res.status(404).json({ status: false, message: "No users found" });
    }

    res.status(200).json({ status: true, data: users });

  } catch (error) {
    console.log('User fetch failed:', error);
    res.status(500).send("Internal server error");
  }
}
async function register(req,res){
    const{ name , email , password,role } = req.body;
    console.log(req.body);
    
    try{
        const user = await User.findOne({email});
        if(user){
           return res.status(401).json({ status: true, message: "Email is already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        await User.create(req.body);
        res.status(200).json({ status: true, message: "User created successfully!" });
    }catch(error){
       console.log('Registration failed:',error);
       res.status(500).send("Internal server error");
    }
}

async function login(req,res){
    const { email, password } = req.body;
    try{
        
        const user = await User.findOne({ email});
        console.log(user,"user");
        if (!user) {
            return res.status(401).json({ status: false, error: 'Incorrect Email ID or Password !' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({status: false, error: 'Incorrect email ID or password ' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, {
            expiresIn: '2h',
        });

        user.token = token;
        await user.save();
        res.status(200).json({
            status: true,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
               profileImage: user.profileImage || "",
            },
            token
          });

          
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
}

async function editprofile(req,res){
    const {userId} = req.body;
    
    try{
        const user = await User.findById(userId);
    if(!user){
         return res.status(401).json({status : false , message : ' Data not found '})
    } 
          res.status(200).json({status : true , data :user})
              console.log(user,"this is userId");

    }catch(error){
        console.log(error);
        res.status(500).json({error:'editprofile  failed'});
    }
}
async function updateprofile(req, res) {
  const { userId, password } = req.body;
  const updateData = { ...req.body };

  try {
    if (password) {
      updateData.password = await global.securePassword(password);
    }

    if (req.file) {
      updateData.profileImage = `${req.file.filename}`;
    }

    delete updateData.userId;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ status: false, error: 'User not found' });
    }

    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Profile update failed' });
  }
}





  
async function destroy(req,res){
    try{ 
    let{userId} = req.body
    let  result = await User.findByIdAndDelete(userId);
    res.status(200).json({ status:true ,message :'user deleted successfully ' })
    }catch(error) {
        console.log(error);
        res.status(500).json({error : 'delete data failed'})   
     }
} 
async function forgetPassword(req, res) {
    try {
        console.log("object")
        const { email } = req.body;
        const user = await User.findOne({ email})
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found!' });
        }
        const randomStrings = randomString.generate();
        const url = `${process.env.FRONTEND_URL}/reset-password/${randomStrings}`;
        let updated = await User.findByIdAndUpdate(user.id, {
         token: randomStrings,
        });
        const userName = `${user.name}`; 
        let htmlString = mail.renderTemplate({ token: url,userName:userName }, "/forget.ejs");
        const mailOptions = {
            from: process.env.APP_EMAIL ,
            to: user.email ,
            subject: "Password Reset" ,
            text: `Hello ${userName}, We got request for reset password.`,
            html: htmlString ,
        };
        mail.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending password reset email' });
    }
}
async function resetPassword(req, res) {
    try {
        const { token, password, confirmPassword } = req.body;

        let result = token.trim();
        let hash = await global.securePassword(password);
        if (password != confirmPassword) {
            return res.status(404).json({ status: false, error: 'Password and Confirm Password not matched!' });
        }
        let tokenData = await User.findOne({ token: result });
        if (tokenData) {
            let updated = await User.findByIdAndUpdate(tokenData.id, {
              password: hash,
              token: "",
            });
            res.status(200).json({ status: true, message: "Password Changed Successfully!" });
        }else{
            return res.status(404).json({ status: false, error: 'Sorry! This link has expired or invalid link . Please request a new password reset link to continue.' });
        }
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Reset password failed' });
    }
}

async function logout(req, res) {
    try {
      // Clear the cookie that stores the token/session
      await User.findByIdAndUpdate(req.userId, { token: "" });

      res.clearCookie('token', {
        httpOnly: true,
        secure: true,  // set to true if using https
        sameSite: 'lax', // or 'strict' based on your frontend setup
      });
  
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout Error:', error);
      return res.status(500).json({ message: 'Something went wrong during logout' });
    }
}