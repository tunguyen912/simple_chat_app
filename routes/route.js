const express = require('express')
const router = express.Router()
const { Message, Event, Room } = require('../models/model')


router.get('/', (req, res) =>{
    Room.find({}).exec((err, rooms) =>{
        if(err) res.send('Something went wrong!!!!!')
        res.render('../views/apiHomePage', {data: rooms})
    })
})

router.get('/eventlog', (req, res) => {
    Event.find({}).exec((err, events) =>{
        if(err) res.send('Something went wrong!!!')
        res.render('eventLogs', { data: events })
    })
})
router.get('/history', (req, res) => {
    Message.find({}).exec((err, messages) => {
        if(err) res.send('Something went wrong!!!')
        res.render('messageHistory', { data: messages })
    })
})


router.post('/roomhistory/:roomname', (req, res) =>{
    Message.find({roomName: req.params.roomname}).exec((err, messages) => {
        if(err) res.send('Something went wrong!!!')
        res.render('messageHistory', { data: messages })
    })
})

module.exports = router
