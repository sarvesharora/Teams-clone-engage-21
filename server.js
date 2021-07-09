//requiring all modules
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const path = require('path');
const port = process.env.PORT
const HTML_DIR = path.join(__dirname, '/public/')

//telling tok use view and public folder
app.use(express.static(HTML_DIR));
app.set('view engine', 'ejs');
app.use(express.static('public'));


//managing different URL request
//exit page
app.get('/exit', (req, res) => {
    res.render('exit');
})
//home page
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}/chat`);
})
//chat page
app.get('/:room/chat', (req, res) => {
    // console.log(req.params.room);
    res.render('chat', { chatroomid: req.params.room });
})
//video chat page
app.get('/:room', (req, res) => {
    ROOM_ID = req.params.room;
    res.render('room', { ROOM_ID: ROOM_ID });
})

//socket io listening to the connection request
io.on('connection', socket => {
    console.log(socket.id);
    //for the chat room
    socket.on('join-chat-room', (chatroomid) => {
        socket.join(chatroomid);
        socket.on('chat-message', (msg, name) => {
            socket.to(chatroomid).emit('accept', msg, name);
        })
    })
    //for video chat join room event
    socket.on('join-room', (roomid, peerid, name) => {
        socket.join(roomid);
        socket.to(roomid).emit('user-connected', peerid, name);
        socket.on('message', (data, name) => {
            socket.to(roomid).emit('createMessage', data, name);
        })
        socket.on('givename', (hispeerid, nameof) => {
            socket.to(roomid).emit('recievename', hispeerid, nameof);
            // console.log(peerid,name);
        })
        socket.on('raise_hand', (peerid) => {
            socket.to(roomid).emit('recivehand', peerid);
        })
        socket.on('down_hand', (peerid) => {
            socket.to(roomid).emit('recievedownhand', peerid);
        })
        socket.on('disconnect', () => {
            socket.to(roomid).emit('user-diconnected', peerid);
        })
    })
})

//listening at port
server.listen(port || 3000, function () {
    console.log('server is listening 3000');
});