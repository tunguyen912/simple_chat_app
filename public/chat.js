$(function(){
    var socket = io.connect('https://mernsocketio.herokuapp.com || http://localhost:3000')
    var message = $("#message")
    var send_message = $("#send_message")
    var new_room = $("#new_room")
    var send_new_room = $("#send_new_room")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    var rooms = $("#rooms")
    var currentRoom = $("#currentRoom")
    var currentActive = $("#currentActive")
   
    var username = prompt("What is your username?");
    if(username === undefined || username === null || username === '') username = 'Anonymous'
    socket.emit('change_username', {username})


   
    //Create new room (done)
    send_new_room.click(() => {
        socket.emit('send_new_room', {new_room: new_room.val()})
        new_room.val('')
    })
    socket.on('update_current_room', (data) => {
        roomId = `#${data.new_room}Room`
        let index = $( "option" ).index($(roomId))
        console.log(index)
        rooms.prop("selectedIndex", index);
    })
    socket.on('add_and_update_current_room', (data) => {
        rooms.append(`<option value="${data.new_room}" selected="selected">${data.new_room}</option>`)
    })


    //Change room
    socket.on('update_room', (data) => {
        currentRoom.html('')
        currentActive.html('')
        currentRoom.append(`<h1>Current Room: ${data.currentRoom}</h1>`)
        currentActive.append(`<h1>There are ${data.currentActive} participants</h1>`)
        chatroom.html('')
    })
    socket.on('update_room_list', (data) =>{
        rooms.append(`<option value="${data.newRoom}">${data.newRoom}</option>`) 
    })

    $("select#rooms").change(function(){
        let selectedRoom = $(this).children("option:selected").val();
        socket.emit('change_room', {destinationRoom: selectedRoom})
    });

    socket.on('update_participant', (data) =>{
        currentActive.html('')
        currentActive.append(`<h1>There are ${data.currentActive} participants</h1>`)
    })
    socket.on('update_active_participant', (data) =>{
        currentActive.html('')
        currentActive.append(`<h1>There are ${data.currentActive} participants</h1>`)
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

    //Load old messages
    socket.on('load_old_message', (data) =>{
        chatroom.append(`<p class = 'message'> ${data.sender}: ${data.message}</p>`)
    })
})