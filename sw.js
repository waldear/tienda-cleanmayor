const CACHE_NAME = 'cleanstore-v2';
const SHELL_ASSETS = [
    '/',
    '/index.html',
    '/logo.png',
    '/bg.jpg',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);

    // Network-first for API calls and main document
    if (url.hostname.includes('script.google.com') || 
        url.hostname.includes('mercadopago') || 
        url.pathname === '/' || 
        url.pathname.endsWith('index.html')) {
        e.respondWith(
            fetch(e.request)
                .then(response => {
                    if (response.ok && (url.pathname === '/' || url.pathname.endsWith('index.html'))) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(e.request))
        );
        return;
    }

    // Cache-first for static assets
    e.respondWith(
        caches.match(e.request).then(cached => {
            return cached || fetch(e.request).then(response => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                }
                return response;
            });
        })
    );
});
