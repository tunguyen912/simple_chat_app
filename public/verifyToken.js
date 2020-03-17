const jwt = require('jsonwebtoken')
const ls = require('local-storage');

function verifyUser(req, res, next){
    const token = ls.get('auth-token')
    if(!token) {
        console.log('Access Denied redirecting to Login Page')
        return res.redirect('/')
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_USER)
        req.user = verified
        next()
    }catch(err){
        console.log('Invalid Token redirecting to Login Page')
        res.redirect('/')
    }
}

function verifyAdmin(req, res, next){
    const token = ls.get('auth-token')
    if(!token) {
        console.log('Access Denied redirecting to Login Page')
        return res.redirect('/')
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN)
        req.user = verified
        next()
    }catch(err){
        // res.status(400).send('Invalid Token')
        console.log('Invalid Token redirecting to Login Page')
        res.redirect('/')
    }
}
module.exports = {verifyUser, verifyAdmin}