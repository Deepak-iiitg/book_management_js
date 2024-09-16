const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"please provide user's name"],
    },
    email: {
        type: String,
        required: true,
        unique: [true,"please provide user's email"]
    },
    password: {
        type: String,
        required: [true,"please provide user's password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model('User',userSchema);
module.exports = {userModel};