const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { sender } = socket.handshake.query;
    connectedUsers[sender] = socket.id;

    console.log("new user: "+ socket.id);

    socket.on('sendMessage', (message) => {
        io.to(connectedUsers[message.sender]).emit('message', message);
        io.to(connectedUsers[message.receiver]).emit('message', message);
    });
});

mongoose.connect('mongodb://rogerbambinetti:rogerbambinetti@cluster-shard-00-00-jmacf.mongodb.net:27017,cluster-shard-00-01-jmacf.mongodb.net:27017,cluster-shard-00-02-jmacf.mongodb.net:27017/livechat?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(3333);