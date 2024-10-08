const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


function authenticate(req,res,next) {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(400).json({ message: "Token not found" });
    
    jwt.verify(token, process.env.ACCESSKEY, (err, user) => {
        if(err) return res.status(403).json({ message: err.message });

        res.user = user
        next()
    })
}

async function filterAsync(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => {
        return (await callback(item)) ? item : fail
    }))).filter(i => i!==fail)
}

module.exports = { authenticate, filterAsync }