const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    name: String,
    bio: String,
    dob: Date,
    email: String,
    phone: Number
})

module.exports = new mongoose.model("User", User)