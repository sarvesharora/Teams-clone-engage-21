const socket = io();
// socket.connect();
socket.emit('join-chat-room', (chatroomid));
const btn = document.querySelector("#send-button");
const ms = document.querySelector("#message-input");
<<<<<<< HEAD

let name = sessionStorage.getItem('name');
if(!name){
name = prompt('pls enter your name (pls remember for future purpose also)');
sessionStorage.setItem('name',name);
}
=======
const name = prompt('Naam daal be');
>>>>>>> parent of 0afc049... corrected voice

btn.addEventListener('click', function (e) {
    e.preventDefault();
    messag = ms.value;
    appendmine(messag);
    addtodb(messag);
    socket.emit('chat-message', messag,name);
    ms.value = "";
})
socket.on('accept', (msg,name) => {
    append(msg,name);
}
)
function appendmine(message) {
    const divcre = document.createElement('div');
    const msg = document.createElement('div');
    msg.setAttribute('class', 'green');
    divcre.appendChild(msg);
    divcre.setAttribute('class', 'message-line');
    divcre.setAttribute('class', 'isent');
    msg.textContent = message;
    const parent = document.body.querySelector('.show_message');
    parent.append(divcre);
}
function append(message, name) {
    // const name = "amitabh bachpan";
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
    msg.textContent = message;
    parent.append(divcre);
    // console.log(name);
}
const test = () => {
    window.location = window.location.href.slice(0, -5);
}
const phatu = () => {
    window.location = '/exit';
}



//firebase

db.collection('chats').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data(), doc.id);
    });
})

function addtodb(message) {
    // const name="myself";

    db.collection('chats').add({
        name: name,
        message: message,
        roomid: chatroomid,
        time: firebase.firestore.Timestamp.fromDate(new Date())
    })
}

db.collection('chats').orderBy('time').get().then((ele) => {
    ele.docs.forEach(doc => {
        console.log(doc.data());
        if (doc.data().roomid == chatroomid) {
            if (doc.data().name === name) {
                appendmine(doc.data().message);
            } else {
                append(doc.data().message, doc.data().name);
            }
        }
    })
})