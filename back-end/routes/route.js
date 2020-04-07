const express = require('express')
const router = express.Router()
const { Message, Event, Room } = require('../models/model')
const { verifyAdmin } = require('../public/verifyToken')


router.get('/', verifyAdmin, (req, res) =>{
    Room.find({}).exec((err, rooms) =>{
        if(err) res.send('Something went wrong!!!!!')
        res.render('../views/apiHomePage', {data: rooms})
    })
})
// router.get('/eventlog', verifyAdmin, (req, res) => {
router.get('/eventlog', (req, res) => {
    Event.find({}).exec((err, events) =>{
        if(err) res.send('Something went wrong!!!')
        // res.render('eventLogs', { data: events })
        res.send(events)
    })
})
// router.get('/history', verifyAdmin, (req, res) => {
router.get('/history', (req, res) => {
    Message.find({}).exec((err, messages) => {
        if(err) res.send('Something went wrong!!!')
        // res.render('messageHistory', { data: messages })
        res.send(messages)
    })
})

router.get('/rooms', (req, res) => {
    Room.find({}).exec((err, rooms) => {
        if (err) res.send('Something went wrong!!!')
        res.send(rooms)
    })
})


router.post('/roomhistory/:roomname', (req, res) =>{
    Message.find({roomName: req.params.roomname}).exec((err, messages) => {
        if(err) res.send('Something went wrong!!!')
        res.render('messageHistory', { data: messages })
    })
})

module.exports = router
