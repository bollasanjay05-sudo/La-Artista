// ============================================
// L'ARTISTA SERVICE WORKER - OPTIMIZED
// ============================================

const CACHE_NAME = 'lartista-v3-' + new Date().getTime(); // Cache busting
const OFFLINE_URL = '/offline.html';

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    'lartista-logo.png',
    '/manifest.json'
];

// Assets to cache on-demand
const CACHEABLE_ASSETS = [
    // Local assets
    '/style.css',
    '/script.js',
    
    // External assets
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap'
];

// Strategy: Stale-While-Revalidate
const STRATEGIES = {
    // Cache-first for static assets
    STATIC: ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'woff', 'woff2', 'ttf', 'ico'],
    
    // Network-first for HTML
    DYNAMIC: ['html'],
    
    // Cache-only for versioned assets
    VERSIONED: ['manifest.json']
};

// Install event - cache critical assets only
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing v3...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching critical assets');
                return cache.addAll(CRITICAL_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Skip waiting');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[Service Worker] Install failed:', error);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating v3...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete old caches that don't match current version
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('lartista-')) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Claim clients immediately
            console.log('[Service Worker] Claiming clients');
            return self.clients.claim();
        })
        .catch(error => {
            console.error('[Service Worker] Activation failed:', error);
        })
    );
});

// Fetch event with intelligent caching strategy
self.addEventListener('fetch', event => {
    // Skip non-GET requests and chrome extensions
    if (event.request.method !== 'GET' || 
        event.request.url.startsWith('chrome-extension://')) {
        return;
    }
    
    // For same-origin requests, use our strategy
    const url = new URL(event.request.url);
    const isSameOrigin = url.origin === self.location.origin;
    
    event.respondWith(
        handleFetch(event.request, isSameOrigin)
            .catch(error => {
                console.error('[Service Worker] Fetch failed:', error, event.request.url);
                return handleOffline(event.request);
            })
    );
});

// Handle fetch with different strategies
async function handleFetch(request, isSameOrigin) {
    const url = new URL(request.url);
    const extension = getFileExtension(url.pathname);
    const strategy = getStrategy(extension, url);
    
    switch(strategy) {
        case 'NETWORK_FIRST':
            return networkFirst(request);
        case 'CACHE_FIRST':
            return cacheFirst(request);
        case 'STALE_WHILE_REVALIDATE':
            return staleWhileRevalidate(request);
        case 'NETWORK_ONLY':
            return networkOnly(request);
        default:
            return cacheFirst(request);
    }
}

// Strategy functions
async function networkFirst(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        
        // Cache the fresh response
        await cache.put(request, networkResponse.clone());
        
        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If we're offline and requesting HTML, show offline page
        if (request.headers.get('Accept').includes('text/html')) {
            const cache = await caches.open(CACHE_NAME);
            const offlineResponse = await cache.match(OFFLINE_URL);
            if (offlineResponse) {
                return offlineResponse;
            }
        }
        
        throw error;
    }
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        // Update cache in background
        updateCache(request);
        return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    
    // Don't cache non-successful responses
    if (networkResponse.ok) {
        await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Fetch and update cache in background
    const fetchPromise = fetch(request)
        .then(networkResponse => {
            // Only cache successful responses
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(() => {
            // Network request failed, keep using cache
            console.log('[Service Worker] Network update failed, using cache');
        });
    
    // Return cached response immediately, or wait for network
    return cachedResponse || fetchPromise;
}

async function networkOnly(request) {
    return fetch(request);
}

// Handle offline scenario
async function handleOffline(request) {
    const url = new URL(request.url);
    
    // For HTML requests, show offline page
    if (request.headers.get('Accept').includes('text/html')) {
        const cache = await caches.open(CACHE_NAME);
        const offlinePage = await cache.match(OFFLINE_URL);
        if (offlinePage) {
            return offlinePage;
        }
        
        // Create a simple offline response
        return new Response(
            `<h1>Offline</h1>
             <p>L'ARTISTA Restaurant website is currently unavailable offline.</p>
             <p>Please check your connection and try again.</p>`,
            { 
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }
        );
    }
    
    // For images, return a placeholder
    if (request.headers.get('Accept').includes('image')) {
        return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#f5f5f5"/>
                <text x="200" y="150" text-anchor="middle" fill="#666" font-family="Arial" font-size="16">
                    L'ARTISTA Restaurant
                </text>
                <text x="200" y="180" text-anchor="middle" fill="#999" font-family="Arial" font-size="12">
                    Image unavailable offline
                </text>
            </svg>`,
            {
                headers: { 'Content-Type': 'image/svg+xml' }
            }
        );
    }
    
    // Default offline response
    return new Response(
        'Network connection required',
        { 
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
        }
    );
}

// Update cache in background
async function updateCache(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch(request);
        
        if (response.ok) {
            await cache.put(request, response);
        }
    } catch (error) {
        // Silently fail - we're just updating cache
        console.log('[Service Worker] Background update failed:', request.url);
    }
}

// Helper functions
function getFileExtension(pathname) {
    const match = pathname.match(/\.([a-z0-9]+)(?:[?#]|$)/i);
    return match ? match[1].toLowerCase() : '';
}

function getStrategy(extension, url) {
    // External resources - cache first
    if (!url.origin.includes(self.location.origin)) {
        return 'CACHE_FIRST';
    }
    
    // HTML - network first
    if (extension === 'html' || extension === '') {
        return 'NETWORK_FIRST';
    }
    
    // Static assets - cache first
    if (STRATEGIES.STATIC.includes(extension)) {
        return 'CACHE_FIRST';
    }
    
    // API calls - network only
    if (url.pathname.includes('/api/')) {
        return 'NETWORK_ONLY';
    }
    
    // Default - stale while revalidate
    return 'STALE_WHILE_REVALIDATE';
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'submit-reservation') {
        console.log('[Service Worker] Background sync for reservations');
        event.waitUntil(syncReservations());
    }
});

async function syncReservations() {
    try {
        // Get pending reservations from IndexedDB
        const db = await openReservationsDB();
        const reservations = await getAllPendingReservations(db);
        
        for (const reservation of reservations) {
            try {
                const response = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservation)
                });
                
                if (response.ok) {
                    await markReservationAsSynced(db, reservation.id);
                    console.log('[Service Worker] Reservation synced:', reservation.id);
                }
            } catch (error) {
                console.error('[Service Worker] Failed to sync reservation:', error);
            }
        }
    } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
    }
}

// IndexedDB helpers (simplified)
function openReservationsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('lartista-reservations', 1);
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('reservations')) {
                const store = db.createObjectStore('reservations', { keyPath: 'id' });
                store.createIndex('status', 'status');
            }
        };
        
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

function getAllPendingReservations(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['reservations'], 'readonly');
        const store = transaction.objectStore('reservations');
        const index = store.index('status');
        const request = index.getAll('pending');
        
        request.onsuccess = function(event) {
            resolve(event.target.result || []);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// Message event for communication with pages
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_INFO') {
        caches.keys().then(cacheNames => {
            event.ports[0].postMessage({
                type: 'CACHE_INFO',
                cacheNames: cacheNames,
                currentCache: CACHE_NAME
            });
        });
    }
});

// Push notification support
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update from L\'ARTISTA',
        icon: 'lartista-logo.png',
        badge: 'lartista-logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'book',
                title: 'Book a Table'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('L\'ARTISTA Restaurant', options)
    );
});

self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification click received.');
    
    event.notification.close();
    
    if (event.action === 'book') {
        event.waitUntil(
            clients.openWindow('/#reservation')
        );
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
