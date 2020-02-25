const mongoose = require('mongoose')

const roomScheme = new mongoose.Schema({
    roomName: String,
    users: [user]
})
module.exports = mongoose.model('Message', messageSchema)