const C="rodseo-v1",F=["./","index.html","style.css","app.js","terms.html","manifest.json","icons/logo.png","icons/icon-192.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener("fetch",e=>{if(e.request.url.includes("googleapis"))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
