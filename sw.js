const CACHE_NAME = 'site-cache-v1';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/style.css',
    '/scriptstuf.js',
    '/icon.png',
    '/multiselect.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_URLS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response to add it to the cache
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
            .catch(() => {
                // If the fetch fails, look for the request in the cache
                return caches.match(event.request);
            })
    );
});
