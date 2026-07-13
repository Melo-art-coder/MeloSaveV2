const cacheName = "melosave-v1";

const filesToCache = [
"index.html",
"style.css",
"script.js",
"signup.html",
"login.html",
"dashboard.html",
"profile.html"
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

});
