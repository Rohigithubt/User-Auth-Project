const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const TaskSchema =new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    status:{
        type:Boolean,
        required:true,
        default:true,
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:true,
    },
    priorityId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Priority'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})
const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;