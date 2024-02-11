const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//npm install socket.io
const { Server } = require("socket.io");
const io = new Server(server);
var connectCounter = 0;


app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

//npm install socket.io
// sample git clone (git clone https://github.com/socketio/chat-example.git)
io.on('connection', (socket) => {
    //connected
    connectCounter++; 
    io.emit('active users', connectCounter);
     console.log('a user connected',connectCounter);
     socket.broadcast.emit('broadcast',{ description: connectCounter + ' clients connected!'})

    //disconnected
     socket.on('disconnect', function() {
        connectCounter--;
        io.emit('active users', connectCounter);
        console.log('user disconnected', connectCounter);
    //  socket.broadcast.emit('broadcast',{ description: connectCounter + ' clients disconnected!'})

    });
    //notification
    socket.broadcast.emit('hi');
    //msg on chat
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});


io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(3000, () => {
  console.log('listening on *:3000');
});