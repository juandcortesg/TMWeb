const CACHE_NAME = "mandalorian-cache-v1";

const urlsToCache = [
    "/",
    "/index.html",

    "/css/base.css",
    "/css/hero.css",
    "/css/info.css",
    "/css/seasons.css",
    "/css/episodes.css",
    "/css/responsive.css",

    "/js/main.js",

    "/js/services/show.js",
    "/js/services/seasons.js",
    "/js/services/episodes.js",

    "/js/services/episodios/index.js",
    "/js/services/episodios/temporada1.js",
    "/js/services/episodios/temporada2.js",
    "/js/services/episodios/temporada3.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).then(res => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, res.clone());
                        return res;
                    });
                });
            })
            .catch(() => caches.match("/index.html"))
    );
});