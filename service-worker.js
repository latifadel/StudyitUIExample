// Give a unique name to your cache so you can easily version your caches
const CACHE_NAME = 'studyit-cache-v1';

// List files you want to cache for offline use
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // Add images or icons if needed:
  // '/images/icons/icon-192.png',
  // '/images/icons/icon-512.png'
];

// ========== INSTALL EVENT ==========
// Occurs when the browser installs the service worker.
// Usually used to populate your cache.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force the waiting service worker to become active immediately
  self.skipWaiting();
});

// ========== ACTIVATE EVENT ==========
// Happens after install. Clean up old caches if you have versioned caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  // Ensure service worker takes control of all pages under its scope immediately
  self.clients.claim();
});

// ========== FETCH EVENT ==========
// Intercepts network requests. Tries cache first, then network fallback.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found, otherwise fetch from the network
      return cachedResponse || fetch(event.request);
    })
  );
});
