const mongoose = require('mongoose')

const Following = mongoose.Schema({
    self: String,
    username: String,
    name: String
})
Following.index({ self: 1, username: 1}, { unique: true })

module.exports = mongoose.model("Following", Following)