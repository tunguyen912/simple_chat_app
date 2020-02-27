const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//Models
const { Message, User, Room } = require('./models/model')


mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})


server = app.listen(3000);

const io =require('socket.io')(server)
io.on('connection', (socket) => {
    console.log(socket.id + ' connected')
    socket.on('change_username', (data)=>{
        socket.username = data.username
        console.log(`${socket.id} changes name to ${socket.username}`)
        var newUser = new User({userName: socket.username, user_socket_id: socket.id})
        newUser.save((err) => {
            if(err) console.log(err.message)
            console.log(newUser.userName + " added to the database")
        })
    })

    //disconnect
    socket.on('disconnect', ()=>{
        console.log(`${socket.username} disconnected!!!`)
        if(socket.adapter.rooms[socket.Room] !== undefined){
            socket.broadcast.in(socket.Room).emit('update_participant', {currentActive: socket.adapter.rooms[socket.Room].length})
        }
        User.find({user_socket_id: socket.id}, (err, docs)=>{
            if(err) console.log(err.message)
            //users is not defined
            Room.findByIdAndUpdate(docs[0].currentRoomId, { users: users.remove({_id: userToDelete._id}) }, (err) =>{
                if(err) console.log(err.message)
                console.log('successsssssssssssss')
            })
            
            User.deleteOne({user_socket_id: socket.id}, (err) => {
                if(err) console.log(err.message)
                console.log(`${docs[0].userName} deleted from the database`)
            })        
        })
    })

    //Create new room
    socket.on('send_new_room', (data)=>{
        // if(data.new_room) Duplicate room


        // Add new room to the database
        User.find({user_socket_id: socket.id}, (err, docs)=>{
            if(err) console.log(err.message)
            let newRoom = new Room({roomName: data.new_room, users: [docs[0]]})
            newRoom.save((err) =>{
                if(err) console.log(err.message)
                console.log(`${newRoom.roomName} added to the database`)
            })
            User.findByIdAndUpdate(docs[0]._id, {currentRoomId: newRoom._id}, (err) => {
                if(err) console.log(err.message)
                // console.log('Success')
            })
        })
        socket.leave(socket.Room)
        // Room.find({ roomName: socket.Room }, (err, docs) => {
        //     if(err) console.log(err.message)
        //     if(docs[0].users.length === 0){
        //         let roomToDelete = docs[0].roomName
        //         Room.users.deleteOne({user_socket_id: socket.id}, (err)=>{
        //             if(err) console.log(err.message)
        //             console.log(`${roomToDelete} deleted from the database`)
        //         })
        //     }
        // })
        socket.Room = data.new_room
        socket.join(socket.Room)
        socket.broadcast.emit('update_room_list', {newRoom: data.new_room});
        if(socket.adapter.rooms[socket.Room] !== undefined){
            socket.emit('update_room', { currentRoom: socket.Room, currentActive: socket.adapter.rooms[socket.Room].length })
        }
    })

    socket.on('change_room', (data) =>{
        socket.leave(socket.Room)
        socket.Room = data.destinationRoom
        socket.join(data.destinationRoom)
        if(socket.adapter.rooms[socket.Room] !== undefined){
            socket.emit('update_room', { currentRoom: socket.Room, currentActive: socket.adapter.rooms[socket.Room].length })
            socket.broadcast.in(socket.Room).emit('update_participant', {currentActive: socket.adapter.rooms[socket.Room].length})
        }
    })

    //New message
    socket.on('new_message', (data) => {
        socket.broadcast.in(socket.Room).emit('new_message', {message: data.message, username: socket.username})
    })

    //Inform others that someone is typing
    socket.on('typing', () => {
        socket.broadcast.in(socket.Room).emit('typing', {username: socket.username})
    })
})
