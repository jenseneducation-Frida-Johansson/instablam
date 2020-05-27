(function () {
  var width = 320; // We will scale the photo width to this
  var height = 0;

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener(
      "canplay",
      function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      function (ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener("load", startup, false);
})();

/*let stream = {};

async function getLocation() {
  try {
    let coords = await getCurrentPosition();
    console.log(coords);
  } catch (error) {
    console.log(error);
  }
}

//funktion för att kunna ta en bild
async function captureImage(stream) {
  const mediaTrack = stream.getVideoTracks()[0];
  console.log(mediaTrack);
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto();
  console.log(photo);
  const imgUrl = URL.createObjectURL(photo); //URL är ett globalt objekt
  console.log(imgUrl);
  //document.querySelector('#photo').src = imgUrl
}

//funktion som frågar om sidan får åtkomst till min kamera
async function getMedia() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { min: 1280, min: 720 },
    });
    const videoElem = document.querySelector("#me");
    videoElem.srcObject = stream; //en property man använder istället för src eftersom det är ett object vi får tillbaks och vi kan inte skriva ut ett objekt direkt i index.html
    videoElem.addEventListener("loadedmetadata", () => {
      videoElem.play();
      setTimeout(() => {
        captureImage(stream);
      }, 1000);
    });
    console.log(stream);
  } catch (err) {
    console.log("An error occured" + err);
  }
}

getMedia();

document.querySelector("#addImage").addEventListener("click", (event) => {
  captureImage(stream);
});*/

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("Registered service worker"))
      .catch((error) => console.log("Error register service worker ", error));
  }
}

registerServiceWorker();
