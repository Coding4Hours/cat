const CACHE_NAME = 'site-cache-v1';
const CACHE_URLS = ['/', '/index.html', '/style.css', '/scriptstuf.js', '/icon.png', '/multiselect.js', '/404.html'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CACHE_URLS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // If the request was successful, clone it and store it in the cache.
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => {
                // If the request fails, look for the request in the cache.
                return caches.match(event.request).then(response => {
                    // If the request is found in the cache, return it.
                    if (response) {
                        return response;
                    }
                    // If the request is not found in the cache, return the 404 page.
                    return caches.match('/offline.html');
                });
            })
    );
});
