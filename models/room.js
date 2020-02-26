const mongoose = require('mongoose')
const userSchema = require('./user.js')

const roomScheme = new mongoose.Schema({
    roomName: String,
    users: [userSchema]
})
module.exports = mongoose.model('Room', roomScheme)