const router = require('express').Router()
const {User} = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) =>{ 
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.sendStatus(400).send(err)
    }
})

module.exports = router