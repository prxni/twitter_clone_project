const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Token = require('../models/token')

const dotenv = require('dotenv')
dotenv.config()

router.post('/signup', encrypt, async (req,res) => {
    const user = new User({ 
        username: req.body.username, 
        password: req.body.password,
        name: req.body.name || "", 
        email: req.body.email || "", 
        bio: "",
        following: []
    })
    
    await user.save()
    .then(async (result) => {
        const accessToken = getAccessToken(result)
        const refreshToken = getRefreshToken(result)
        res.status(201).json({ accessToken, refreshToken })
    })
    .catch((err) => {
        if (err.code===11000) {
            return res.status(401).json({ message: "Username already exists" })
        } else {
            return res.status(500).json(err)
        }
    })
})

router.post('/login', async (req,res) => {
    const user = await User.findOne().where('username').equals(req.body.username)
    if(!user) return res.status(400).json({ message: "User not found" });

    bcrypt.compare(req.body.password,user.password, (err,result) => {
        if(err) return res.status(403).json({ message: "Wrong password" });

        const accessToken = getAccessToken(user)
        const refreshToken = getRefreshToken(user)
        res.status(201).json({ accessToken, refreshToken })
    })
})

router.post('/refresh', async (req,res) => {
    const token = req.body.token
    if(!token) return res.status(400).json({ message: "Token not found" });

    const result = await Token.deleteOne().where('token').equals(token);
    if(!result.deletedCount) return res.status(403).json({ message: "Authorization failed" });

    jwt.verify(token, process.env.REFRESHKEY, (err,user) => {
        if(err) return res.status(403).json(err);

        const accessToken = getAccessToken(user)
        const refreshToken = getRefreshToken(user)
        res.status(201).json({ accessToken, refreshToken })
    })
})

router.post('/logout', (req,res) => {
    const token = req.body.token
    Token.deleteOne().where('token').equals(token)
    .then(result => res.status(201).json({ message: "Logged out succesfully" }))
    .catch(err => res.status(400).json(err))
})

function encrypt(req,res,next) {
    if(!req.body.username) return res.status(400).json({ message: "Username is required" });
    if(!req.body.password) return res.status(400).json({ message: "Password is required" });

    bcrypt.hash(req.body.password,10, (err, hash) => {
        if(err){
            return res.status(500).json({ message: "Server error. Please try again" })
        }
        
        req.body.password = hash
        next()
    })
    
}

function getAccessToken(user) {
    const data = { id: user._id, name: user.name, username: user.username }
    return jwt.sign(data, process.env.ACCESSKEY, { expiresIn: '30m' })
}

function getRefreshToken(user) {
    const data = { id: user._id, name: user.name, username: user.username }
    const token = jwt.sign(data, process.env.REFRESHKEY, { expiresIn: '1h' })
    const newToken = new Token({ token })
    newToken.save()
    return token
}

module.exports = router