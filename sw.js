self.addEventListener("install", (event) => {
  event.waitUntil(
    //skapar min cache
    caches.open("v2").then((cache) => {
      return cache.addAll(["index.html", "js/index.js", "offline.html"]);
    })
  );
  self.skipWaiting(); //för att alltid ha senaste versionen av SW, användaren behöver inte göra något för att det ska uppdateras
  console.log("SW installed at: ", new Date().toLocaleTimeString());
});

self.addEventListener("activate", (event) => {
  self.skipWaiting();
  console.log("SW activated at: ", new Date().toLocaleTimeString());
});

/*Exempel på hur man kan hämta grejer med service worker, t.ex ett api, 
service worker hämtar bara grejer från nätverket och det går snabbare*/
self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        console.log("RESPONSE: ", response);
        if (response) {
          return response;
        } else {
          return caches.match(new Request("offline.html")); //inget internet kopplad till offline html
        }
      })
    );
  } else {
    console.log("Online");
    updateCache(event.request);
  }
});

//kollar om den här resursen finns i vår cache:
async function updateCache(request) {
  /*Med async/await
    const response = await fetch(request);
    const cache = await caches.open('v1');
    const data = await cache.put(request, response.clone());
    return response;*/

  return fetch(request).then((response) => {
    return caches.open("v2").then((cache) => {
      //öppna vår cache med namnet v2
      return cache.put(request, response.clone()).then(() => {
        return response; //lägger(med put) till den oavsett om den finns eller inte, uppdateras om den finns//kan bara skicka tillbaka respone en gång så då skriver vi clone för att kunna få vårt response
      });
    });
  });
}
