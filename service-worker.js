const CACHE_NAME = "mandalorian-cache-v3";
const APP_SHELL = [
    "./",
    "./index.html",
    "./offline.html",
    "./manifest.json",
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
        caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                    return Promise.resolve();
                })
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(event.request.url);

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
                    return response;
                })
                .catch(() => caches.match("./index.html"))
                .then(response => response || caches.match("./offline.html"))
        );
        return;
    }

    if (requestUrl.origin !== self.location.origin) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(networkResponse => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                return networkResponse;
            });
        }).catch(() => {
            if (event.request.destination === "document") {
                return caches.match("./offline.html");
            }

            return new Response("", { status: 503, statusText: "Offline" });
        })
    );
});
