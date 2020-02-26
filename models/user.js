const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: String,
    timeCreated: {type: Date, default: Date.now}
})
module.exports = mongoose.model('User', userSchema)