const express = require('express')
const app = express()

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
    socket.username = socket.id


    socket.on('add_user', (data)=>{
        socket.username = data.username
        console.log(data.username)
    })

    //disconnect
    socket.on('disconnect', ()=>{
        console.log(`${socket.id} disconnected!!!`)
        if(socket.adapter.rooms[socket.Room] !== undefined){
            socket.broadcast.in(socket.Room).emit('update_participant', {currentActive: socket.adapter.rooms[socket.Room].length})
        }
    })

    socket.on('send_new_room', (data)=>{
        socket.leave(socket.Room)
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
