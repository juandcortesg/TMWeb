const CACHE_NAME = "mandalorian-v2";

const STATIC_ASSETS = [
    "./",
    "./index.html",
    "./css/base.css",
    "./css/hero.css",
    "./css/info.css",
    "./css/seasons.css",
    "./css/episodes.css",
    "./css/responsive.css",
    "./js/main.js",
    "./js/services/show.js",
    "./js/services/seasons.js",
    "./js/services/episodes.js",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
        )
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url.includes("tvmaze")) {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return res;
                })
                .catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(res => res || fetch(event.request))
        );
    }
});