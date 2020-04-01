const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { sender } = socket.handshake.query;
    connectedUsers[sender] = socket.id;

    socket.on('sendMessage', (message) => {
        io.to(connectedUsers[sender]).emit('message', message);
    });
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);