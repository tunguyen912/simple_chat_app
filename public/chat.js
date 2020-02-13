$(function(){
    var socket = io.connect('http://localhost:3000')
    var message = $("#message")
    var send_message = $("#send_message")
    var username = $("#username")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    
    // var room1 = $("#room1")
    // var room2 = $("#room2")
    // var room3 = $("#room3")
    // room1.click(() => {
    //     socket.emit('change_room', {room: room1.text()})
    //     console.log(room1.text())
    // })
    // room2.click(() => {
    //     socket.emit('change_room', {room: room2.text()})
    //     console.log(room2.text())
    // })
    // room3.click(() => {
    //     socket.emit('change_room', {room: room3.text()})
    //     console.log(room3.text())
    // })


    send_username.click(() => {
        socket.emit('change_username', {username: username.val()})
        chatroom.append(`<p class = 'message' id='self'><i>You changed your username to ${username.val()}</i></p>`)
        username.val('')
    })

    socket.on('change_username', (data) => {
        chatroom.append(`<p class = 'message'><i>${data.oldUsername} changed name to ${data.username}</i></p>`)
    })

    // Send message
    send_message.click(() => {
        socket.emit('new_message', {message: message.val()})
        chatroom.append(`<p class = 'message' id='self'>${message.val()}</p>`)
        message.val('')
    })

    socket.on('new_message', (data) => {
        chatroom.append(`<p class = 'message'> ${data.username}: ${data.message}</p>`)
        feedback.html("")
    })

    // Inform others that someone is typing
    message.bind('keypress', () =>{
        socket.emit('typing');
    })

    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username +" is typing a message...." + "</i></p>")
    })
})