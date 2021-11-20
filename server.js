const io = require('socket.io')(process.env.PORT || 3000)

const users = {}

io.on('connection', socket => {
    //new user joined the chat handling serverside
    socket.on("new-user" , name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    //new user leaved the chat handling serverside
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })

    //handling chat messages
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    
})
