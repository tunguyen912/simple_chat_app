const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    userName: String,
    message: String,
    room: String,
    time: Date
})
module.exports = mongoose.model('Message', messageSchema)