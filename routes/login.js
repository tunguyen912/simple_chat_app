const router = require('express').Router()
const {User} = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const http = require('http');


router.post('/login', async (req, res) =>{
    //Check the email
    user = await User.findOne({username: req.body.username})
    if(!user) res.send(`Email or Password is wrong`)

    //Check the password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) res.send(`Password is wrong`)

    //Create and assign a token
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET, { expiresIn: "1h" })
    res.header('auth-token', token).send({token: token})
    
    res.redirect('/api')
})

module.exports = router;