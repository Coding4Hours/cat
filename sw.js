const CACHE_NAME = 'site-cache-v1';
const CACHE_URLS = ['/', '/index.html', '/style.css', '/scriptstuf.js', '/icon.png', '/multiselect.js'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_URLS)));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
