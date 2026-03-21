self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(clients.claim()); });
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok && e.request.method === "GET") {
        const clone = res.clone();
        caches.open("puffco-v3").then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match(e.request))
    )
  );
});
