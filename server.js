const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//Models
const { Message, User, Room } = require('./models/model')


mongoose.connect('mongodb+srv://tunguyen:Anhtu129@cluster0-nttfq.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
    Room.find({}).select('roomName').exec((err, rooms) => {
        if(err) {
            res.send('Something went wrong!!!')
        }
        res.render('index', { rooms })
    })
})


server = app.listen(3000);

const io = require('socket.io')(server)
io.on('connection', (socket) => {

    console.log(socket.id + ' connected')
    socket.on('change_username', (data) => {
        socket.username = data.username
        console.log(`${socket.id} changes name to ${socket.username}`)
        var newUser = new User({ userName: socket.username, user_socket_id: socket.id })
        newUser.save((err) => {
            if (err) console.log(err.message)
            console.log(newUser.userName + " added to the database")
        })
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log(`${socket.username} disconnected!!!`)
        if (socket.adapter.rooms[socket.Room] !== undefined) {
            socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
        }
        User.findOne({ user_socket_id: socket.id }, (err, user) =>{
            if(err) console.log(err.message)
            Room.findByIdAndUpdate(user.currentRoomId, { "$pull": { "users": user._id } }, (err) => {
                if(err) console.log(err.message)
                console.log('removed deleted user from room list')
            })
            User.findByIdAndDelete(user.currentRoomId, (err) => {
                if(err) console.log(err.message)
                console.log('Successfully deleted')
            })
        })
    })

    //Create new room
    socket.on('send_new_room', (data) => {
        socket.leave(socket.Room)
        //Leave room

        socket.Room = data.new_room
        // Add new room to the database
        User.findOne({ user_socket_id: socket.id }, (err, user) => {
            if (err) {
                console.log(err.message)
            } else {
                let newRoom = new Room({ roomName: data.new_room, users: [user] })
                newRoom.save((err) => {
                    if (err) {
                        if(err.code === 11000){
                            console.log('Duplicate name, moving to existing room!!!')
                            socket.emit('update_current_room', {new_room: data.new_room})
                            //Update user's roomId
                            // Room.findOneAndUpdate({roomName: data.new_room}, { "$push": { "users": user._id } }).exec((err, room) => {
                            //     if(err) console.log(err.message) 
                            //     User.findByIdAndUpdate(user._id, { currentRoomId: room._id }, (err) => {
                            //         if (err) {
                            //             console.log(err.message)
                            //         } else {
                            //             console.log('change room id Success')
                            //         }
                            //     })
                            // })
                        }
                    } else {
                        console.log(`${newRoom.roomName} added to the database`)
                        socket.broadcast.in(socket.Room).emit('update_active_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
                        socket.broadcast.emit('update_room_list', { newRoom: data.new_room });
                        socket.emit('add_and_update_current_room', {new_room: data.new_room})
                        User.findByIdAndUpdate(user._id, { currentRoomId: newRoom._id }, (err) => {
                            if (err) {
                                console.log(err.message)
                            } else {
                                console.log('change room id Success')
                            }
                        })
                    }
                })
            }
        })
        socket.join(socket.Room)
        

        if (socket.adapter.rooms[socket.Room] !== undefined) {
            socket.emit('update_room', { currentRoom: socket.Room, currentActive: socket.adapter.rooms[socket.Room].length })
        }
    })

    socket.on('change_room', (data) => {
        socket.leave(socket.Room)
        //Leave room
        socket.Room = data.destinationRoom
        socket.join(data.destinationRoom)

        //Change room's user list and update user's room (done)
        User.findOne({ user_socket_id: socket.id }).exec((err, user) => {
            if (err) {
                console.log(err.message)
            } else {
                Room.findOneAndUpdate({ roomName: socket.Room }, { "$push": { "users": user._id } }).exec((err, room) => {
                    if (err) {
                        console.log(err.message)
                    } else {
                        user.currentRoomId = room._id
                        user.save()
                        console.log('Updated user list')
                    }
                })
            }
        })

        if (socket.adapter.rooms[socket.Room] !== undefined) {
            socket.emit('update_room', { currentRoom: socket.Room, currentActive: socket.adapter.rooms[socket.Room].length })
            socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
        }
    })

    //New message
    socket.on('new_message', (data) => {
        socket.broadcast.in(socket.Room).emit('new_message', { message: data.message, username: socket.username })
    })

    //Inform others that someone is typing
    socket.on('typing', () => {
        socket.broadcast.in(socket.Room).emit('typing', { username: socket.username })
    })
})
