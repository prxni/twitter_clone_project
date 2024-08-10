const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Following = require('../models/following')

const { authenticate } = require('../utils')

router.get('/', authenticate, (req,res) => {
    const username = res.user.username
    User.findByUsername(username)
    .then(result => {
        res.status(200).json({ username: result.username, name: result.name })
    })
    .catch(err => res.status(400).json(err))
})

router.post('/follow', authenticate, async (req,res) => {
    if(req.body.username==res.user.username) return res.status(400).json({ message: "Invalid request" });

    const user = await User.findByUsername(req.body.username)
    .catch(err => res.status(400).json(err))
    if(!user) return res.status(404).json({ message: "User not found" });

    Following.create({ self: res.user.username, username: req.body.username, name: user.name })
    .then(() => {
        res.status(201).json({ message: "Followed succesfully" })
    })
    .catch((err) => {
        if(err.code===11000) return res.status(400).json({ message: "Duplicate follow" })
        res.status(400).json(err)
    })
})

router.get('/following/:username', (req,res) => {
    Following.find().where('self').equals(req.params.username).select(['username','name'])
    .then(result => {
        return res.status(200).json(result);
    })
    .catch(err => res.status(500).json(err))
})

router.get('/followers/:username', async (req,res) => {
    const result = await Following.find().where('username').equals(req.params.username).select(['self'])
    if(!result) return res.status(400).json({ message: "Couldn't make request" });

    const users = []
    for(each of result) {
        await User.findByUsername(each.self)
        .then(user => {
            users.push({ username: user.username, name: user.name })
        })
    }
    res.status(200).json(users)
})

router.post('/unfollow', authenticate, (req,res) => {
    Following.deleteOne().where('username').equals(req.body.username)
    .then((result) => {
        if(result.deletedCount===1) res.status(201).json({ message: "Unfollowed succesfully" });
        else res.status(201).json({ message: "User not included in following list" })
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router