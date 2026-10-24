const CACHE_NAME = "kozzis-cafe-v1"

const FILE_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./cafe-loop.mp4",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILE_TO_CACHE);
    })
  );
  self.skipwaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    cache.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
        .filter((name) => name !== CACHE_NAME)
        .map((name) => cahces.delete(name))
      );
    })
  );
  self.clients.claim();

});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});