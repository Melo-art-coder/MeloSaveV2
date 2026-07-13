const cacheName = "melosave-v2";


const filesToCache = [

    "index.html",
    "signup.html",
    "login.html",
    "dashboard.html",
    "profile.html",
    "style.css",
    "script.js",
    "mani.json"

];



self.addEventListener(
"install",
event => {

    event.waitUntil(

        caches.open(cacheName)
        .then(cache => {

            return cache.addAll(filesToCache);

        })

    );

});





self.addEventListener(
"fetch",
event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});event => {

event.respondWith(

caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})

);

});
