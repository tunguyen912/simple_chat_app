const router = require('express').Router()
const {User, Admin} = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register/user', async (req, res) =>{ 
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

router.post('/register/admin', async (req, res) =>{ 
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const admin = new Admin({
        admin: req.body.admin,
        password: hashedPassword,
    })
    try{
        const savedAdmin = await admin.save()
        res.send(savedAdmin)
    }catch(err){
        res.sendStatus(400).send(err)
    }
})


module.exports = router