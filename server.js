const express = require('express')
const app = express()
const mongoose = require('mongoose')
const apiRoute = require('./routes/route')

//Models
const { Message, Event, Room } = require('./models/model')


mongoose.connect('mongodb+srv://tunguyen:Anhtu129@cluster0-nttfq.mongodb.net/test?retryWrites=true&w=majority',
 { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.set('views', './views');

app.use(express.static('public'))

app.use('/api', apiRoute)
app.get('/', (req, res) => {
    Room.find({}).select('roomName').exec((err, rooms) => {
        if(err) {
            res.send('Something went wrong!!!')
        }
        res.render('index', { rooms })
    })
})

server = app.listen(process.env.PORT || 3000);

const io = require('socket.io')(server)
io.on('connection', (socket) => {

    socket.on('change_username', (data) => {
        socket.username = data.username
        //Connecting event
        let newEvent = new Event({ username: socket.username, event: "Connected" })
        newEvent.save()
        .then(() => console.log("New connecting event added"))
        .catch((err) => console.log(err.message))
    })

    //Disconnect
    socket.on('disconnect', () => {
        if (socket.adapter.rooms[socket.Room] !== undefined) {
            socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
        }
        //Disconnecting event
        let newEvent = new Event({ username: socket.username, event: "Disconnected" })
        newEvent.save()
        .then(() => console.log("New disconnecting event added"))
        .catch((err) => console.log(err.message))
    })

    //Create new room
    socket.on('send_new_room', (data) => {
        //Leave current room if you're in a room
        if(typeof socket.Room != 'undefined' && socket.Room){
            socket.leave(socket.Room)
            if (socket.adapter.rooms[socket.Room] !== undefined) {
                socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
            }
            let newEvent = new Event({ username: socket.username, event: "Leave room", source: socket.Room })
            newEvent.save()
            .then(() => console.log("New leaving event added"))
            .catch((err) => console.log(err.message))
        }

        socket.Room = data.new_room
        socket.join(socket.Room)

        // Add new room to the database
        let newRoom = new Room({ roomName: data.new_room })
        newRoom.save()
        .then(() => {
            //If create new room successfully move user to that room
            console.log(`${data.new_room} created`)
            socket.broadcast.in(socket.Room).emit('update_active_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
            socket.broadcast.emit('update_room_list', { newRoom: data.new_room });
            socket.emit('add_and_update_current_room', {new_room: data.new_room})
            let newEvent = new Event({ username: socket.username, event: "Join room", source: socket.Room })
            newEvent.save()
            .then(() => console.log("New joining event added"))
            .catch((err) => console.log(err.message))
        })
        .catch((err) => {
            //Check if the room exists, if yes move user to that room
            if(err.code === 11000) {
                console.log('Duplicate name, moving to existing room!!!')
                socket.emit('update_current_room', {new_room: data.new_room})
                socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
                
                let newEvent = new Event({ username: socket.username, event: "Join room", source: socket.Room })
                newEvent.save()
                .then(() => console.log("New joining event added"))
                .catch((err) => console.log(err.message))
            }else{
                console.log(err.message)
            }
        })
        
        Message.find({ roomName: socket.Room })
        .then((messages) => {
            if(messages.length > 0){
                messages.map((mes) => {
                    socket.emit('load_old_message', {sender: mes.senderUsername, message: mes.message})
                })
            }
        })
        .catch((err) => console.log(err.message))

        
        if (socket.adapter.rooms[socket.Room] !== undefined) {
            socket.emit('update_room', { currentRoom: socket.Room, currentActive: socket.adapter.rooms[socket.Room].length })
        }
    })

    socket.on('change_room', (data) => {
        //Leave current room if you're in a room
        if(typeof socket.Room != 'undefined' && socket.Room){
            socket.leave(socket.Room)
            if (socket.adapter.rooms[socket.Room] !== undefined) {
                socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
            }
            let newEvent = new Event({ username: socket.username, event: "Leave room", source: socket.Room })
            newEvent.save()
            .then(() => console.log("New leaving event added"))
            .catch((err) => console.log(err.message))
        }
        // Change room
        socket.Room = data.destinationRoom
        let newEvent = new Event({ username: socket.username, event: "Join room", source: socket.Room })
        newEvent.save()
        .then(() => console.log("New joining event added"))
        .catch((err) => console.log(err.message)) 
        socket.join(socket.Room)

        Message.find({ roomName: socket.Room })
        .then((messages) => {
            if(messages.length > 0){
                messages.map((mes) => {
                    socket.emit('load_old_message', {sender: mes.senderUsername, message: mes.message})
                })
            }
        })
        .catch((err) => console.log(err.message))
      
        if (socket.adapter.rooms[socket.Room] !== undefined) {
            socket.emit('update_room', { currentRoom: socket.Room, currentActive: socket.adapter.rooms[socket.Room].length })
            socket.broadcast.in(socket.Room).emit('update_participant', { currentActive: socket.adapter.rooms[socket.Room].length })
        }
    })

    //New message
    socket.on('new_message', (data) => {
        if(typeof socket.Room != 'undefined' && socket.Room){
            socket.broadcast.in(socket.Room).emit('new_message', { message: data.message, username: socket.username })
            let newMessage = new Message({ senderUsername: socket.username, message: data.message, roomName: socket.Room })
            newMessage.save()
            .then(() => console.log(`New message sent in ${socket.Room} room`))
            .catch((err) => console.log(err.message))
        }
    })

    //Inform others that someone is typing
    socket.on('typing', () => {
        socket.broadcast.in(socket.Room).emit('typing', { username: socket.username })
    })
})


