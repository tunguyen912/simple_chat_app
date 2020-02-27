const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: String,
    user_socket_id: String,
    currentRoomId: { type: Object, default: null },
    timeCreated: {type: Date, default: Date.now}
})
const roomSchema = new mongoose.Schema({
    roomName: String,
    users: [userSchema]
})

const messageSchema = new mongoose.Schema({
    userName: userSchema,
    message: String,
    room: roomSchema,
    time: {type: Date, default: Date.now}
})
const Message = mongoose.model('Message', messageSchema)
const User = mongoose.model('User', userSchema)
const Room = mongoose.model('Room', roomSchema)

module.exports = { Message, User, Room }