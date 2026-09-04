const CACHE_NAME = 'mkt205-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './questions.js',
  './manifest.json',
  './icon.svg'
];

// Install Event - Precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Cache First, then Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Trả về response từ cache nếu tìm thấy
      if (response) {
        return response;
      }
      
      // Nếu không có trong cache, fetch từ network
      return fetch(event.request).then((networkResponse) => {
        // Có thể cache thêm các file tải thêm nếu cần (vd: font, icon ngoài)
        // Nhưng ở đây ta giữ đơn giản, chỉ trả về networkResponse
        return networkResponse;
      }).catch(() => {
        // Fallback khi offline mà không có cache
        console.log('Fetch failed; returning offline page instead.', event.request.url);
      });
    })
  );
});
