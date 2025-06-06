const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userstatus: {
        type: Boolean,
        required: true,
        default: true,
    },
    password: {
        type: String,
        default: "",
    },

    token: {
        type: String,
        default: "",
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

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },


})
const User = mongoose.model('User', UserSchema);
module.exports = User;