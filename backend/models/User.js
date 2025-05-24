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
    isDeleted: {
        type: Boolean,
        required: true, 
        default: false,
    },

    profileImage: {
      type: String, 
      default: ''   
    },
     

 
})
const User =mongoose.model('User',UserSchema);
module.exports = User;