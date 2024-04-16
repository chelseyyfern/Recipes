const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    pfp: {
        type: String,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' 
    }],
    achievements: [{
        type: String,
        required: true
    }],
    reported: {
        type: Boolean,
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
    }]
});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;