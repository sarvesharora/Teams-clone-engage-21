const canvas = document.createElement('canvas');
canvas.setAttribute('hidden', 'true');
let give = false;
const sendblur = () => {
    var stream = canvas.captureStream(25);
    console.log(stream);
    const vi = document.createElement('video');
    vi.setAttribute('id', 'bluredvideo');
    vi.srcObject = stream;
    vi.autoplay = true;
    document.body.appendChild(vi);
    document.querySelector('video').setAttribute('hidden', 'true');

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
}
const bluri = () => {
    give = !give;
    if (give) {
        document.querySelector('#blur').textContent = 'unblur';
        options = {
            multiplier: 0.75,
            stride: 32,
            quantBytes: 4
        }
        bodyPix.load(options)
            .then(net => perform(net))
            .catch(err => console.log(err));
        sendblur();
    }
    else {
        document.querySelector('#blur').textContent = 'blur';
        document.querySelector('#bluredvideo').remove();
        document.querySelector('canvas').remove();
        document.querySelector('video').removeAttribute('hidden');
        stopScreenShare();
    }
}
async function perform(net) {
    // console.log(net); //kuch nhi print hota
    while (give) {
        const video = document.querySelector('video');

        video.setAttribute('height', '300px');
        video.setAttribute('width', '400px');
        const segmentation = await net.segmentPerson(video);
        const backgroundBlurAmount = 6;
        const edgeBlurAmount = 2;
        const flipHorizontal = false;
        // console.log(segmentation);
        const videoElement = video;

        document.body.appendChild(canvas);
        bodyPix.drawBokehEffect(
            canvas, videoElement, segmentation, backgroundBlurAmount,
            edgeBlurAmount, flipHorizontal);
    }
}
