const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        required: true, 
        default: false,
    },
    priorityName: {
        type: String,
        required: true,
    },

    userNames: {
         type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    })
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;