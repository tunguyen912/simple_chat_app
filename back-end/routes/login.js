const router = require('express').Router()
const {User, Admin} = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ls = require('local-storage')

router.post('/login/admin', async (req, res) =>{
    //Check the email
    admin = await Admin.findOne({admin: req.body.username})
    if(!admin) {
        res.status(400).json({
        message: "Email or password is wrong"
    })}

    //Check the password
    const validPass = await bcrypt.compare(req.body.password, admin.password)
    if(!validPass) {
        res.status(400).json({
        message: "Password is wrong"
    })}

    //Create and assign a token
    const token = jwt.sign({ _id: admin._id}, process.env.TOKEN_SECRET_ADMIN, { expiresIn: "1h" })
    // ls.set('auth-token', token)
    // res.redirect('/api')
    res.send(token)
})

router.post('/login/user', async (req, res) =>{
    //Check the email
    user = await User.findOne({username: req.body.username})
    if(!user) res.send(`Email or Password is wrong`)

    //Check the password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) res.send(`Password is wrong`)

    //Create and assign a token
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET_USER)
    ls.set('auth-token', token)
    res.redirect('/chatPage')
})

module.exports = router;