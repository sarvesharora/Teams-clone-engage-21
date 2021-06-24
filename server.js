const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/exit', (req, res) => {
    res.render('exit');
})


app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
})

app.get('/:room', (req, res) => {
    ROOM_ID = req.params.room;
    res.render('room', { ROOM_ID: ROOM_ID });
})


io.on('connection', socket => {
    console.log(socket.id);
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
        socket.on('down_hand',(peerid)=>{
            socket.to(roomid).emit('recievedownhand',peerid);
        })
        socket.on('disconnect', () => {
            socket.to(roomid).emit('user-diconnected', peerid);
        })
    })
})

server.listen(3000, function () {
    console.log('server is listening 3000');
});