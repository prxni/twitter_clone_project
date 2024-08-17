const mongoose = require('mongoose')

const Posts = new mongoose.Schema({

    userId:mongoose.SchemaTypes.ObjectId,
    text:{
        type:String,
        required:true,
    },
    timeStamp:Date,
    likedBy:[mongoose.SchemaTypes.ObjectId]
    
})
module.exports = mongoose.model("Posts", Posts)