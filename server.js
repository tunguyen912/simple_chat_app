const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

//Testing
app.get('/:id', function(req, res) {
    // res.send('id: ' + req.params.id);
    res.render('index2', { room: req.params.id})

});
//

server = app.listen(3000);

const io =require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('New user connected')

    socket.username = "Anonymous"

    socket.on('change_username', (data)=>{
        socket.broadcast.emit('change_username', {username: data.username, oldUsername: socket.username})
        socket.username = data.username
    })
    

    socket.on('change_room', (data)=>{
    })

    socket.on('new_message', (data) => {
        socket.broadcast.emit('new_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {username: socket.username})
    })
})
