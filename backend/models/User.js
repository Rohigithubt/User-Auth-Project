const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const UserSchema =new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        default :"",
    },
    
    token:{
        type:String,
        default :"",
    },

    profileImage: {
      type: String, 
      default: ''   
    },
     
    role: {
        type: String,
        required: true,
        default:'user',
    },
 
})
const User =mongoose.model('User',UserSchema);
module.exports = User;