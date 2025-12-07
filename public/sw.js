const CACHE_NAME = 'fuegos-cache-v1';
const STATIC_CACHE_NAME = 'fuegos-static-v1';
const DYNAMIC_CACHE_NAME = 'fuegos-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/service-traiteur',
  '/notre-histoire',
  '/catering',
  '/faq',
  '/favicon.ico',
  '/logo/logo-fuegos.svg',
  '/logo/logo-fuegos-white.svg',
  '/placeholder.svg',
  '/meat-pattern.svg'
];

// Images to cache on demand
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isImage(request.url)) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME));
  } else if (isPage(request.url)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache first strategy (for static assets and images)
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy (for pages and API calls)
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Helper functions
function isStaticAsset(url) {
  return url.includes('/_next/static/') || 
         url.includes('/favicon') ||
         url.includes('/logo/') ||
         url.endsWith('.css') ||
         url.endsWith('.js');
}

function isImage(url) {
  return IMAGE_EXTENSIONS.some(ext => url.includes(ext));
}

function isPage(url) {
  return !url.includes('.') || url.endsWith('/');
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'catering-form') {
    event.waitUntil(syncCateringForm());
  }
});

async function syncCateringForm() {
  try {
    // Get pending form data from IndexedDB or localStorage
    const pendingForms = await getPendingForms();
    
    for (const formData of pendingForms) {
      try {
        const response = await fetch('/api/catering', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          await removePendingForm(formData.id);
        }
      } catch (error) {
        console.error('Failed to sync form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Placeholder functions for form sync (implement based on your storage solution)
async function getPendingForms() {
  // Implement based on your offline storage solution
  return [];
}

async function removePendingForm(id) {
  // Implement based on your offline storage solution
  console.log('Removing pending form:', id);
}