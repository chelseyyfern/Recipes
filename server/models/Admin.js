//Admin.js

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'], 
        default: 'admin'
    }
});

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
