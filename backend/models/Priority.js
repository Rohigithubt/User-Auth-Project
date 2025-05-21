const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const PrioritySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:true,
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  })
const Priority = mongoose.model('Priority',PrioritySchema);
module.exports = Priority;