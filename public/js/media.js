navigator.getUserMedia(
    { audio: true, video: true },
    function (stream) {
        var video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
    },
    function (err) {
        console.log("The following error occured: " + err.name);
    }
);
