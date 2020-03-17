const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: {type: String, required: true},
    timeCreated: { type: Date, default: Date.now }
})

const adminSchema = new Schema({
    admin: { type: String, unique: true, required: true},
    password: {type: String, required: true},
    timeCreated: { type: Date, default: Date.now }
})

const eventSchema = new Schema({
    username: {type: String, required: true},
    event: {type: String, required: true},
    source: String,
    time: { type: Date, default: Date.now } 
})

const roomSchema = new Schema({
    roomName: { type: String, unique: true},
    timeCreated: { type: Date, default: Date.now }
})

const messageSchema = new Schema({
    senderUsername: { type: String, required: true},
    message: { type: String, required: true},
    roomName: { type: String, required: true},
    time: { type: Date, default: Date.now } 
})


const Message = mongoose.model('Message', messageSchema)
const Event = mongoose.model('Event', eventSchema)
const Room = mongoose.model('Room', roomSchema)
const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)



module.exports = { Message, Event, Room, User, Admin }