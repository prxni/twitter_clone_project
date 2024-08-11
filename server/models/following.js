const mongoose = require('mongoose')

const Following = mongoose.Schema({
    selfId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    }
})
Following.index({ selfId: 1, userId: 1}, { unique: true })

module.exports = mongoose.model("Following", Following)