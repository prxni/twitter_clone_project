const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Following = require('../models/following')
const Post = require('../models/posts')

const { authenticate, filterAsync } = require('../utils')

router.get('/', authenticate, (req,res) => {
    const id = res.user.id
    User.findById(id)
    .then(result => {
        res.status(200).json({ id, username: result.username, name: result.name })
    })
    .catch(err => res.status(400).json(err))
})

router.get('/feed', authenticate, (req,res) => {
    let time;
    if(req.query.time!=null) {
        time = new Date(req.query.time)
        if (time=="Invalid Date") return res.status(400).json({ message: "Cannot cast query attribute time to date"})
    }

    const promise = time ? Post.find().sort({ timeStamp: -1 }).where('timeStamp').lt(time).limit(3)
        : Post.find().sort({ timeStamp: -1 }).limit(4);
    
    promise
    .then(async result => {
        const posts = await filterAsync(result, async (item) => {
            if(res.user.id==item.userId) return true;
            const follows = await Following.findOne({ selfId: res.user.id, userId: item.userId })
            return follows
        })
        res.status(201).json({
            posts: posts.map(post => { 
                return { 
                    id: post._id, 
                    userId: post.userId, 
                    text: post.text, 
                    likes: post.likedBy.length, 
                    liked: post.likedBy.includes(res.user.id), 
                    timeStamp: post.timeStamp
                }
            }),
            last: {
                id: result.slice(-1)[0]?._id,
                timeStamp: result.slice(-1)[0]?.timeStamp
            }
        })
    })
})

router.get('/:username', (req,res) => {
    User.findByUsername(req.params.username)
    .then((result) => res.status(201).json({ username: result.username, name: result.name, bio: result.bio}))
    .catch(err => res.status(500).json(err))
})

router.get('/id/:id', (req,res) => {
    User.findById(req.params.id)
    .then(result => res.status(201).json({ username: result.username, name: result.name }))
})

router.get('/:user/follows/:username', async (req,res) => {
    const self = await User.findOne().where('username').equals(req.params.user)
    const user = await User.findOne().where('username').equals(req.params.username)

    if(!self || !user) return res.status(400).json({ message: "Cannot find user" });

    Following.findOne().where('selfId').equals(self._id).where('userId').equals(user._id)
    .then(result => res.status(201).json(result!==null))
})

router.post('/follow', authenticate, async (req,res) => {
    if(req.body.username==res.user.username) return res.status(400).json({ message: "Invalid request" });

    const user = await User.findByUsername(req.body.username)
    .catch(err => res.status(400).json(err))
    if(!user) return res.status(404).json({ message: "User not found" });

    Following.create({ selfId: res.user.id, userId: user._id })
    .then(() => {
        res.status(201).json({ message: "Followed succesfully" })
    })
    .catch((err) => {
        if(err.code===11000) return res.status(400).json({ message: "Duplicate follow", err })
        res.status(400).json(err)
    })
})

router.get('/following/:username', async (req,res) => {
    const user = await User.findByUsername(req.params.username)
    if(!user) return res.status(404).json({ message: "User not found" })

    await Following.find().where('selfId').equals(user._id).select('userId')
    .populate('userId')
    .then(result => res.status(200).json(result.map(data => {
        return { id: data.userId._id, username: data.userId.username, name: data.userId.name }
    })))
    .catch(err => res.status(500).json(err))
})

router.get('/followers/:username', async (req,res) => {
    const user = await User.findByUsername(req.params.username)
    if(!user) return res.status(404).json({ message: "User not found" })

    await Following.find().where('userId').equals(user._id).select('selfId')
    .populate('selfId')
    .then(result => res.status(200).json(result.map(data => {
        return { id: data.selfId._id, username: data.selfId.username, name: data.selfId.name }
    })))
    .catch(err => res.status(400).json(err))
})

router.post('/unfollow', authenticate, async (req,res) => {
    const user = await User.findByUsername(req.body.username)
    if(!user) return res.status(404).json({ message: "User not found" })
        
    Following.deleteOne({ selfId: res.user.id, userId: user._id})
    .then((result) => {
        if(result.deletedCount===1) res.status(201).json({ message: "Unfollowed succesfully" });
        else res.status(201).json({ message: "User not included in following list" })
    })
    .catch(err => res.status(500).json(err))
})

router.get('/search/:query', (req,res) => {
    const query = req.params.query
    const max = 15;
    
    User.find().or([ { "username": { $regex: `${query}`, $options: 'i' } }, { "name": { $regex: `${query}`, $options: 'i' } }])
    .limit(max)
    .then(result => {
        const users = result.map(user => {
            return { username: user.username, name: user.name }
        })
        res.status(201).json(users)
    })

})

router.patch('/edit/bio', authenticate,async (req,res)=>{
    const body = await User.findByUsername(res.user.username)
    .catch(()=>res.status(400).json({message:"User not found!"}));

    body.bio = req.body.bio;
    body.save()
    .then(() => res.status(200).json({
        message:"Bio updated"
    }))
    .catch((err) => res.status(500).json(err));
})

router.patch('/edit/name', authenticate,async (req,res)=>{
    const body=await User.findByUsername(res.user.username)
    .catch(()=>res.status(400).json({
        message:"User not found!"
    }));

    body.name=req.body.name;
    body.save()
    .then(()=>res.status(200).json({message:"Name updated"}))
    .catch((err)=>res.status(500).json(err));
})

module.exports = router