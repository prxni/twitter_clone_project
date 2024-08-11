const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Following = require('../models/following')

const { authenticate } = require('../utils')

router.get('/', authenticate, (req,res) => {
    const id = res.user.id
    User.findById(id)
    .then(result => {
        res.status(200).json({ id, username: result.username, name: result.name })
    })
    .catch(err => res.status(400).json(err))
})

router.get('/:username', (req,res) => {
    User.findByUsername(req.params.username)
    .then((result) => res.status(201).json({ username: result?.username }))
    .catch(err => res.status(500).json(err))
})

router.post('/follow', authenticate, async (req,res) => {
    if(req.body.username==res.user.username) return res.status(400).json({ message: "Invalid request" });

    const user = await User.findByUsername(req.body.username)
    .catch(err => res.status(400).json(err))
    if(!user) return res.status(404).json({ message: "User not found" });

    Following.create({ selfId: res.user.id, userId: user.id })
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

    Following.deleteOne().where('userId').equals(user._id)
    .then((result) => {
        if(result.deletedCount===1) res.status(201).json({ message: "Unfollowed succesfully" });
        else res.status(201).json({ message: "User not included in following list" })
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router