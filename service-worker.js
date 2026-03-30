const CACHE_NAME = "mandalorian-cache-v4";
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
const REMOTE_ASSETS = [
    "https://lumiere-a.akamaihd.net/v1/images/the-mandalorian-compilation-poster-fb-tw_6ae443d1.jpeg",
    "https://static.tvmaze.com/uploads/images/original_untouched/501/1253498.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/501/1253498.jpg",
    "https://static.tvmaze.com/uploads/images/original_untouched/238/595394.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/273/683557.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/442/1106224.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/222/556622.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/224/560488.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/227/567694.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/228/571800.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/230/575424.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/231/579134.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/232/580313.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/233/583218.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/280/701346.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/281/704685.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/283/708359.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/284/711787.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/285/713639.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/287/718553.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/289/723954.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135764.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/449/1124532.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135761.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135762.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135763.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/455/1138682.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/455/1138684.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/456/1141378.jpg",
    "https://static.tvmaze.com/uploads/images/medium_landscape/457/1144719.jpg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            await cache.addAll(APP_SHELL);
            await Promise.allSettled(
                REMOTE_ASSETS.map(asset => cache.add(asset))
            );
        })
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
