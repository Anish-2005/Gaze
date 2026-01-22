// Service Worker for caching and performance optimization
const CACHE_NAME = 'gaze-v1'
const STATIC_CACHE = 'gaze-static-v1'
const DYNAMIC_CACHE = 'gaze-dynamic-v1'

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/pitch',
  '/demo',
  '/institutions',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
]

// External resources to cache
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
]

// Install event - cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_ASSETS)
      }),
      caches.open('gaze-external-v1').then(cache => {
        return cache.addAll(EXTERNAL_ASSETS)
      })
    ]).then(() => {
      return (self as any).skipWaiting()
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== 'gaze-external-v1') {
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Take control of all clients
      (self as any).clients.claim()
    ])
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle static assets with cache-first strategy
  if (
    url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(cacheFirstStrategy(request))
    return
  }

  // Handle HTML pages with network-first strategy
  event.respondWith(networkFirstStrategy(request))
})

// Cache-first strategy for static assets
async function cacheFirstStrategy(request: Request): Promise<Response> {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.error('Cache-first strategy failed:', error)
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

// Network-first strategy for dynamic content
async function networkFirstStrategy(request: Request): Promise<Response> {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log('Network request failed, trying cache:', error)

    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline fallback for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlineResponse = await caches.match('/offline.html')
      if (offlineResponse) {
        return offlineResponse
      }
    }

    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

// Background sync for failed requests
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Background sync triggered')
}

// Push notifications (if needed)
self.addEventListener('push', (event: any) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }

    event.waitUntil(
      (self as any).registration.showNotification(data.title, options)
    )
  }
})

// Performance monitoring
self.addEventListener('message', (event: MessageEvent) => {
  if (event.data && event.data.type === 'PERFORMANCE_DATA') {
    // Send performance data to analytics
    console.log('Performance data received:', event.data.payload)
  }
})