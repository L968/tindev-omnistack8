const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
requireDir('./models');
const routes = require('./routes');
require('dotenv').config()

const app = express();

mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connectedUsers = {}; // mongoId: socketId
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    const { userId } = socket.handshake.query;

    connectedUsers[userId] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use((err, req, res, next) => {
    console.log(err);

    return res.status(500).json({ message: 'An unexpected error has occured, please try again later' });
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);