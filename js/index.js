function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("Registered service worker"))
      .catch((error) => console.log("Error register service worker ", error));
  }
}

registerServiceWorker();

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
/*async function getLocation() {
  try {
    let coords = await getCurrentPosition();
    console.log(coords);
  } catch (error) {
    console.log(error);
  }
}*/

//funktion som frågar om sidan får åtkomst till min kamera

/*function captureImage(stream) {
  const mediaTrack = stream.getVideoTracks()[0];
  let imageCapture = new imageCapture(mediaTrack);
  imageCapture.takePhoto().then(photo)=> {
    console.log(photo)
    let a = document.querySelector('#takePhoto');
    a.href = URL.createObjectURL(photo)
  }
}*/

/*async function captureImage(stream) {
  const mediaTrack = stream.getVideoTracks()[0];
  console.log(mediaTrack);
  const captureImg = new imageCapture(mediaTrack);
  const photo = await captureImg.takePhoto(mediaTrack);
  console.log(photo);
  const imgUrl = URL.createObjectURL(photo);
  console.log(imgUrl);
  document.querySelector("#photo").src = imgUrl;
}*/

async function getMedia() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { min: 1280, min: 720 },
    });
    const videoElem = document.querySelector("#me");
    videoElem.srcObject = stream; //en property man använder istället för src eftersom det är ett object vi får tillbaks och vi kan inte skriva ut ett objekt direkt i index.html
    videoElem.addEventListener("loadedmetadata", () => {
      videoElem.play();
    });
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
}

getMedia();
