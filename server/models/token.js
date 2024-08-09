const mongoose = require('mongoose')

const Token = mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = new mongoose.model("Token", Token)