const express = require('express')
const router = express.Router()

const User = require('../models/user')

const { authenticate } = require('../utils')

router.get('/', authenticate, (req,res) => {
    const id = res.user.id
    User.findById(id)
    .then(result => {
        const {password, __v, _id, ...user} = result.toObject()
        res.status(200).json({id: result._id, ...user})
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router