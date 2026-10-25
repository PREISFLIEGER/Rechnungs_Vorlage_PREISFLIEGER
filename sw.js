// Offline-Fähigkeit: immer zuerst aus dem Netz laden (damit Änderungen sofort ankommen),
// nur ohne Verbindung die zuletzt gespeicherte Version verwenden.
const CACHE = 'rechnung-v4';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './vendor/jspdf.umd.min.js', './vendor/qrcode.js', './vendor/papaparse.min.js', './img/mark.png', './img/logo-preisflieger-600.png', './img/logo-recycled-600.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  const cacheable = u.origin === location.origin || /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net|alcdn\.msauth\.net|cdn\.sheetjs\.com|cdnjs\.cloudflare\.com)$/.test(u.hostname);
  if (!cacheable) return;
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true })));
});
