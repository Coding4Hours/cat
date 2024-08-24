importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => ['image', 'document', 'script', 'style'].includes(request.destination),
  new workbox.strategies.CacheFirst({
    cacheName: 'site-assets',
    plugins: [new workbox.expiration.ExpirationPlugin({maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60})],
  })
);
