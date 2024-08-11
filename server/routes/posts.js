const express = require("express")
const router = express.Router()

const { authenticate } = require("../utils")

const User = require('../models/user')
const Posts = require('../models/posts')


router.post("/new",authenticate,(req,res)=>{
    const userId= res.user.id
    const text = req.body.text
    const timeStamp = new Date()

    if(!text) return res.status(401).json({message:"Should contain text"});

    
    Posts.create({ userId, text, timeStamp})
    .then((result) =>{
        res.status(201).json({message:"Post created successfully",postId:result._id})
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})

router.post("/like",authenticate,async(req,res)=>{
    const post=await Posts.findById(req.body.postid)
    .catch(err=>
        res.status(400).json({message:"Couldn't make request"}))

    if(post.likedby.includes(res.user.id)) return res.status(401).json({message:"Already liked"});
    post.likedby.push(res.user.id)
    post.save()
    .then(()=>res.status(200).json({message:"Liked the post"}))
    .catch(err=>{
        res.status(500).json(err)
    })
}
)

router.patch("/edit",authenticate,async(req,res)=>{
    const post=await Posts.findById(req.body.postid)
    .catch(err=>
        res.status(400).json({message:"Couldn't make request"})
    )
    if(post.userId != res.user.id) return res.status(401).json({message: "Permission denied!"});
    if(!req.body.text) return res.status(401).json({message:"Should contain text"});
    post.text=req.body.text
    post.save()
    .then(()=>res.status(201).json({message:"Edited post"}))
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.post("/delete",authenticate,async(req,res)=>{
    
    const post=await Posts.findById(req.body.postid)
    .catch(err=>
        res.status(400).json({message:"Couldn't make request"})
    )
    if(post.userId != res.user.id) return res.status(401).json({message: "Permission denied!"});
    await Posts.deleteOne().where('id').equals(req.body.postid)
    .then((result)=>{
        if(result.deletedCount==1) res.status(201).json({message:"Deleted post"});
        else res.status(404).json({message:"User not found"})
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})
router.get('/:username',async(req,res)=>{
    const userId=await User.findOne().where('username').equals(req.params.username)
    .catch(err=>{
        res.status(400).json({message:"Could'nt make request"})
    })
    const result= await Posts.find().where('userId').equals(userId)
    if(!result) return res.status.json({message: "Couldn't make request"});

    const postss=[]
    for(each of result)
    {
        await Posts.findById(each.id)
        .then(pest=>{
            postss.push({postid:pest.id,text:pest.text})
        })
    }
    res.status(200).json(postss)
})
module.exports=router

