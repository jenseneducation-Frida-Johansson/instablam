(function () {
  var width = 320;
  var height = 0;

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("camerabutton");

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

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    camerabutton.addEventListener(
      "click",
      function () {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    canvas.setAttribute("data-caman-hidpi-disabled", data);
  }

  function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");
      canvas.setAttribute("data-caman-hidpi-disabled", data);
    } else {
      clearphoto();
    }
  }

  window.addEventListener("load", startup, false);
})();

//Filter sliders
let brightnessSlide = document.getElementById("brightness");
let clipSlide = document.getElementById("clip");
let exposureSlide = document.getElementById("exposure");
let noiseSlide = document.getElementById("noise");
let saturationSlide = document.getElementById("saturation");
let sepiaSlide = document.getElementById("sepia");

let brightness = 1;
let clip = 1;
let exposure = 1;
let noise = 1;
let saturation = 1;
let sepia = 1;

const changeFilter = () => {
  Caman("#canvas", function () {
    this.revert();
    this.brightness(brightness);
    this.clip(clip);
    this.exposure(exposure);
    this.noise(noise);
    this.saturation(saturation);
    this.sepia(sepia);
    this.render();
  });
};

brightnessSlide.addEventListener(
  "change",
  () => {
    brightness = brightnessSlide.value;
    changeFilter();
  },
  true
);

clipSlide.addEventListener(
  "change",
  () => {
    clip = clipSlide.value;
    changeFilter();
  },
  true
);

saturationSlide.addEventListener(
  "change",
  () => {
    saturation = saturationSlide.value;
    changeFilter();
  },
  true
);

exposureSlide.addEventListener(
  "change",
  () => {
    exposure = exposureSlide.value;
    changeFilter();
  },
  true
);

noiseSlide.addEventListener(
  "change",
  () => {
    noise = noiseSlide.value;
    changeFilter();
  },
  true
);

sepiaSlide.addEventListener(
  "change",
  () => {
    sepia = sepiaSlide.value;
    changeFilter();
  },
  true
);

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("Registered service worker"))
      .catch((error) => console.log("Error register service worker ", error));
  }
}

registerServiceWorker();
