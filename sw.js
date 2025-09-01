self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('fitindia-v1').then(cache => 
      cache.match(event.request).then(resp => 
        resp || fetch(event.request).then(response => {
          if (event.request.method === 'GET' && response.ok && event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => resp)
      )
    )
  );
});