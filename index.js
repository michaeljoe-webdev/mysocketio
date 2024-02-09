const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//npm install socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

//npm install socket.io
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(3000, () => {
  console.log('listening on *:3000');
});