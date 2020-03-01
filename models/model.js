const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    userName: String,
    user_socket_id: String,
    currentRoomId: { type: Schema.ObjectId, default: null, ref: 'Room' },
    timeCreated: { type: Date, default: Date.now }
})

const roomSchema = new Schema({
    roomName: { type: String, unique: true},
    users: [{ type: Schema.ObjectId, ref: 'User' }]
})

const messageSchema = new Schema({
    userId: { type: Schema.ObjectId, ref: 'User' },
    message: String,
    roomId: { type: Schema.ObjectId, ref: 'Room' },
    time: { type: Date, default: Date.now } 
})
const Message = mongoose.model('Message', messageSchema)
const User = mongoose.model('User', userSchema)
const Room = mongoose.model('Room', roomSchema)

module.exports = { Message, User, Room }