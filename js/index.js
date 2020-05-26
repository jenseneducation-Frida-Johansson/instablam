let stream = {};

/*async function getLocation() {
  try {
    let coords = await getCurrentPosition();
    console.log(coords);
  } catch (error) {
    console.log(error);
  }
}*/

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
  } catch (error) {
    console.log(error);
  }
}

getMedia();

/*document.querySelector("#addImage").addEventListener("click", (event) => {
  captureImage(stream);
});*/

/*Caman("#photo", function () {
  this.brightness(10);
  this.contrast(30);
  this.sepia(60);
  this.saturation(-30);
  this.render();
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
