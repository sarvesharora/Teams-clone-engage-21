//the listening audio button

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = ['disconnect', 'screenshare', 'mute', 'unmute', 'participants', 'video', 'brown', 'raisehand', 'coral'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const start_recognising = () => {
    const tell = document.createElement('div');
    tell.setAttribute('id', 'suggestion');
    tell.style.width = "100px";
    tell.style.backgroundColor = "white";
    document.body.appendChild(tell);
    recognition.start();
    console.log('started');
}

document.getElementById('X').addEventListener('click', start_recognising);

//the ifelse ladder to identify words
recognition.onresult = function (event) {
    console.log('result arrived');
    const tell = document.getElementById('suggestion');
    let res = event.results[0][0].transcript;
    tell.textContent = res;
    res = res.toLowerCase().trim().split(" ").join("");
    console.log(res);
    setTimeout(() => {
        document.getElementById('suggestion').remove();
    }, 3000);
    if (res == 'disconnect' || res == 'leave') {
        disconnect();
    }
    else if (res == 'mute' || res == 'unmute') {
        muteUnmute();
    }
    else if (res == 'raisehand' || res == 'hand' || res == 'handraise') {
        raisehand();
    }
    else if (res == "screenshare" || res == 'sharescreen') {
        screenshare();
    }
    else if (res == 'copy' || res == 'copylink') {
        copy();
    }
    else if (res == 'participants' || res == 'participant') {
        participants();
    }
    else if (res == 'video') {
        playStop();
    }
    else if (res == 'blur') {
        bluri();
    }
}
recognition.onspeechend = function () {
    recognition.stop();
}