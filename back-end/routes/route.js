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
router.delete('/eventlog/:id', (req, res) => {
    Event.findByIdAndDelete(req.params.id).exec((err, events) => {
        if(err) res.send('Something went wrong!!!')
        res.send(events)
    })
})
// router.get('/history', verifyAdmin, (req, res) => {
router.get('/chats', (req, res) => {
    Message.find({}).exec((err, messages) => {
        if(err) res.send('Something went wrong!!!')
        // res.render('messageHistory', { data: messages })
        res.send(messages)
    })
})
router.delete('/chats/:id', (req, res) => {
    Message.findByIdAndDelete(req.params.id).exec((err, messages) => {
        if(err) res.send('Something went wrong!!!')
        res.send(messages)
    })
})

router.get('/rooms', (req, res) => {
    Room.find({}).exec((err, rooms) => {
        if (err) res.send('Something went wrong!!!')
        res.send(rooms)
    })
})
router.delete('/rooms/:id', (req, res) => {
    Room.findByIdAndDelete(req.params.id).exec((err, rooms) => {
        if(err) res.send('Something went wrong!!!')
        res.send(rooms)
    })
})
router.put('/rooms/:id', (req, res) => {
    console.log(req.body)
    Room.findByIdAndUpdate(req.params._id, {$set: {roomName : req.body.name}}).exec((err, rooms) => {
        if(err) res.send('Something went wrong!!!')
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
