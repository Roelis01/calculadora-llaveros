const CACHE_NAME = 'llaveros-cache-v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'manifest.json',
  'icons/icon.svg'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // Try network first, fallback to cache
  evt.respondWith(
    fetch(evt.request).then(res => {
      return res;
    }).catch(() => caches.match(evt.request).then(resp => resp || caches.match('index.html')))
  );
});
