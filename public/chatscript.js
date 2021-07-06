const socket = io();
// socket.connect();
socket.emit('join-chat-room', (chatroomid));
const btn = document.querySelector("#send-button");
const ms = document.querySelector("#message-input");
// const name = prompt('Naam daal be');

btn.addEventListener('click', function (e) {
    e.preventDefault();
    messag = ms.value;
    appendmine(messag);
    socket.emit('chat-message', messag);
    ms.value = "";
})
socket.on('accept', (msg) => {
    append(msg);
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
function append(message) {
    const name = "amitabh bachpan";
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