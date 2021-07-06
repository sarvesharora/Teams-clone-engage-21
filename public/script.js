//socket peer peers objects and names initialized 
const socket = io('/');
const myPeer = new Peer();
let mystream;
let mypeerid;
const peers = {};
let currentPeer = [];
const myname = prompt('enter your name');

//peer object open for connection
myPeer.on('open', id => {
    console.log(id);
    mypeerid = id;
    socket.emit('join-room', ROOM_ID, id, myname);
})

//when some one ask to connect
socket.on('user-connected', (peerid, name) => {
    peers[peerid] = name;
    console.log(`user connected with id ${peerid}`);
    console.log("calling other man");
    //callin the peer
    let call = myPeer.call(peerid, mystream);
    const vi = document.createElement('video');
    vi.setAttribute('id', `${peerid}`);
    currentPeer.push(call.peerConnection);
    //accept the stream
    let i = 0;
    call.on('stream', comingstream => {
        if (i == 1) {
            addvideo(vi, comingstream);
        }
        i++;
    })
    //give name to the person that called
    socket.emit('givename', mypeerid, myname);
})

//user disconnected
socket.on('user-diconnected', (peerid) => {
    console.log(`user ${peerid} disconnected`);
    const vid = document.getElementById(`${peerid}`);
    vid.parentElement.remove();
    delete peers[`${peerid}`];
})

//getting your video
navigator.mediaDevices.getUserMedia(
    {
        video: true,
        audio: true
    }
).then(stream => {
    mystream = stream;
    addvideo(document.createElement('video'), mystream);
})


//when some one calls through peerjs
myPeer.on('call', (call) => {
    //answer by giving stream
    call.answer(mystream);
    const vi = document.createElement('video');
    vi.setAttribute('id', `${call.peer}`);
    currentPeer.push(call.peerConnection);
    // peers[call.peer] = "some name";
    let i = 0;
    //add video
    call.on('stream', comingvideo => {
        if (i == 1) {
            addvideo(vi, comingvideo);
        }
        i++;
    })
})

//add the video to html
function addvideo(video, stream) {
    const updiv = document.createElement('div');
    updiv.setAttribute('class', 'video-container');
    video.srcObject = stream;
    video.autoplay = true;
    updiv.appendChild(video);
    document.querySelector('#video-grid').append(updiv);
    const nameofuser = peers[video.id];
    if (nameofuser) {
        const indiv = document.createElement('div');
        indiv.setAttribute('class', 'name-container');
        indiv.textContent = nameofuser;
        updiv.appendChild(indiv);
    }
}

//events
//recieve name
socket.on('recievename', (id, name) => {
    peers[id] = name;
})

//hand recieve
socket.on('recivehand', (peerid) => {
    const vid = document.getElementById(`${peerid}`);
    vid.style.border = '3px solid #F6BE00';
    const div = document.createElement('div');
    div.setAttribute('class', 'handnotification');
    div.textContent = `${peers[peerid]} raised his hand`;
    document.body.appendChild(div);
    div.style.display = "block";
    setTimeout(() => {
        div.style.display = "none";
    }, 2000);
})

//down-hand recieved
socket.on('recievedownhand', (peerid) => {
    const vid = document.getElementById(`${peerid}`);
    vid.style.border = "";
})

//accepting socket messages
socket.on('createMessage', (data, name) => {
    const divcre = document.createElement('div');
    const msg = document.createElement('div');
    const nam = document.createElement('div');
    nam.setAttribute('class', 'sendername');
    nam.textContent = name;
    divcre.appendChild(nam);
    divcre.appendChild(msg);
    const parent = document.body.querySelector('.show_message');
    divcre.setAttribute('class', 'message-line');
    divcre.setAttribute('class', 'comingmessage');
    msg.setAttribute('class', 'blue-blac');
    msg.textContent = data;
    parent.append(divcre);
    console.log(name);
})
//send the messages to server
const send = () => {
    const inbox = document.querySelector('#message-box');
    const message = inbox.value;
    const divcre = document.createElement('div');
    const msg = document.createElement('div');
    msg.setAttribute('class', 'green');
    divcre.appendChild(msg);
    divcre.setAttribute('class', 'message-line');
    divcre.setAttribute('class', 'isent');
    msg.textContent = message;
    const parent = document.body.querySelector('.show_message');
    parent.append(divcre);
    inbox.value = "";
    socket.emit('message', message, myname);
}

//buttons

//mute and unmute audio
const muteUnmute = () => {
    const enabled = mystream.getAudioTracks()[0].enabled;
    const bt = document.getElementById('muteunmute');
    if (enabled) {
        const html = `<i class="fas fa-microphone-alt-slash"></i>`;
        mystream.getAudioTracks()[0].enabled = false;
        bt.innerHTML = html;
        bt.style.color = "red";
    } else {
        bt.style.color = "white";
        const html = `<i class="fas fa-microphone"></i>`;
        mystream.getAudioTracks()[0].enabled = true;
        bt.innerHTML = html;
    }
}
//video stop send
const playStop = () => {
    let enabled = mystream.getVideoTracks()[0].enabled;
    const bt = document.getElementById('playstop');
    if (enabled) {
        const html = `<i class="fas fa-video-slash"></i>`;
        mystream.getVideoTracks()[0].enabled = false;
        bt.innerHTML = html;
        bt.style.color = "red";
    } else {
        bt.style.color = "white";
        const html = `<i class="fas fa-video"></i>`;
        mystream.getVideoTracks()[0].enabled = true;
        bt.innerHTML = html;
    }
}
//copy url
const copy = () => {
    const div = document.createElement('div');
    div.setAttribute('class', 'handnotification');
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    div.textContent = "copied link";
    document.body.appendChild(div);
    div.style.display = "block";
    setTimeout(() => {
        div.style.display = "none";
    }, 2000);

}
//diconnect
const disconnect = () => {
    window.location = window.location.href + '/chat';
    myPeer.destroy();
}
//tell participants
let openparticipants = false;
const participants = () => {
    if (!openparticipants) {
        const main = document.createElement('div');
        const button = document.createElement('button');
        const heading = document.createElement('div');
        heading.textContent = "Participants";
        button.textContent = 'X';
        button.setAttribute('id', 'close-participants');
        main.appendChild(heading);
        main.appendChild(button);
        main.setAttribute('class', 'participants');
        const names = document.createElement('div');
        names.setAttribute('class', 'participant_name');
        names.textContent = myname;
        main.appendChild(names);
        for (let i in peers) {
            const names = document.createElement('div');
            names.setAttribute('class', 'participant_name');
            names.textContent = peers[i];
            main.appendChild(names);
        }
        openparticipants = true;
        document.body.appendChild(main);
        document.querySelector('#close-participants').addEventListener('click', () => {
            document.querySelector('.participants').remove();
            openparticipants = false;
        })
    }
    else {
        document.querySelector('.participants').remove();
        openparticipants = false;
    }
}
const dis = () => {
    const vid = document.querySelectorAll('video');
    console.log(vid);
}
//zoom video
document.addEventListener('click', e => {
    const ele = e.target;
    str = ele.localName;
    if (str == 'video') {
        ele.classList.toggle('big-small');
    }
})

//stop screen share
const stopScreenShare = () => {
    let myVideoStream = mystream;
    let videoTrack = myVideoStream.getVideoTracks()[0];
    for (let x = 0; x < currentPeer.length; x++) {
        let sender = currentPeer[x].getSenders().find(function (s) {
            return s.track.kind == videoTrack.kind;
        })
        sender.replaceTrack(videoTrack);
    }
}
//screen share
const screenshare = () => {
    navigator.mediaDevices.getDisplayMedia({
        video: {
            cursor: 'always'
        },
        audio: {
            echoCancellation: true,
            noiseSupprission: true
        }

    }).then(stream => {
        let videoTrack = stream.getVideoTracks()[0];
        videoTrack.onended = function () {
            stopScreenShare();
        }
        for (let x = 0; x < currentPeer.length; x++) {
            //i added this
            // console.log(currentPeer[x].getSenders());
            let sender = currentPeer[x].getSenders().find(function (s) {
                return s.track.kind == videoTrack.kind;
            })

            sender.replaceTrack(videoTrack);
        }
    })
}
let hand_raised = false;
const raisehand = () => {
    const bt = document.getElementById('raisehand');
    if (!hand_raised) {
        socket.emit('raise_hand', mypeerid);
        hand_raised = true;
        bt.style.color = "yellow";
    }
    else {
        socket.emit('down_hand', mypeerid);
        hand_raised = false;
        bt.style.color = "";
    }
}