/**
 * Service Worker for Resume Portfolio PWA
 * Provides offline support, caching strategies, and background sync
 */

const CACHE_VERSION = "resume-portfolio-v1";
const CACHE_URLS = [
  "/",
  "/index.html",
  "/public/ats/index.html",
  "/public/ats/developer-testing/index.html",
  "/public/ats/bioinformatics/index.html",
  "/public/ats/data-business-analyst/index.html",
  "/assets/css/index.css",
  "/assets/css/accessibility.css",
  "/assets/css/resume-customizer-styles.css",
  "/assets/css/ats-calculator-styles.css",
  "/assets/css/print-styles.css",
  "/assets/js/main.js",
  "/assets/js/src/resume-customizer.js",
  "/assets/js/src/ats-calculator.js",
  "/assets/js/src/theme-manager.js",
  "/assets/js/src/analytics.js",
  "/assets/js/src/app.js",
  "/public/robots.txt",
  "/public/sitemap.xml",
];

// Cache strategy names
const STRATEGIES = {
  CACHE_FIRST: "cache-first",
  NETWORK_FIRST: "network-first",
  STALE_WHILE_REVALIDATE: "stale-while-revalidate",
};

/**
 * Install event - pre-cache essential assets
 */
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log("[Service Worker] Caching core assets");
      return cache.addAll(CACHE_URLS);
    })
  );

  self.skipWaiting();
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

/**
 * Fetch event - implement intelligent caching strategies
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Don't cache cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // HTML pages - network first, fallback to cache
  if (request.destination === "document" || request.mode === "navigate") {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // CSS and JS - cache first
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font"
  ) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Images - stale while revalidate
  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }

  // API calls - network first
  if (url.pathname.includes("/api/")) {
    event.respondWith(networkFirstStrategy(request, 5000));
    return;
  }

  // Default - network first
  event.respondWith(networkFirstStrategy(request));
});

/**
 * Cache-first strategy: return from cache, update from network
 */
async function cacheFirstStrategy(request) {
  try {
    // Check cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`[Cache Hit] ${request.url}`);
      return cachedResponse;
    }

    // Network fallback
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("[Service Worker] Cache-first error:", error);
    return createOfflineResponse();
  }
}

/**
 * Network-first strategy: try network, fallback to cache
 */
async function networkFirstStrategy(request, timeout = 3000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const networkResponse = await fetch(request, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log(`[Network Error] ${request.url}, falling back to cache`);

    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Offline fallback
    if (request.destination === "document" || request.mode === "navigate") {
      return createOfflineResponse();
    }

    return new Response("Offline - Resource not available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

/**
 * Stale-while-revalidate strategy: return cache immediately, update in background
 */
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.ok) {
      const cache = caches.open(CACHE_VERSION);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

/**
 * Create offline fallback page
 */
function createOfflineResponse() {
  return new Response(
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Offline - Resume Portfolio</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #f6f8fa 0%, #eaeef2 100%);
    }
    .offline-container {
      text-align: center;
      padding: 40px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 500px;
    }
    h1 {
      color: #0969da;
      margin: 0 0 16px 0;
      font-size: 32px;
    }
    p {
      color: #6a737d;
      line-height: 1.6;
      margin: 8px 0;
    }
    .offline-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .tip {
      background: #f6f8fa;
      border-left: 4px solid #0969da;
      padding: 12px 16px;
      text-align: left;
      margin-top: 24px;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="offline-container">
    <div class="offline-icon">📡</div>
    <h1>You're Offline</h1>
    <p>The resume portfolio is currently offline. Check your internet connection and try again.</p>
    <p>Cached pages and resources may still be available if you visited them before.</p>
    <div class="tip">
      <strong>Tip:</strong> This app works great offline! Visit the resume pages while online to cache them for later.
    </div>
  </div>
</body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      status: 503,
      statusText: "Service Unavailable",
    }
  );
}

/**
 * Handle push notifications
 */
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Resume Portfolio";
  const options = {
    body: data.body || "New content available",
    icon: "/assets/img/icon-192.png",
    badge: "/assets/img/icon-96.png",
    tag: "resume-notification",
    requireInteraction: false,
    ...data,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * Handle notification clicks
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Check if already open
      for (let client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window if not found
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});

/**
 * Periodic background sync for resume updates
 */
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-resumes") {
    event.waitUntil(updateResumesInBackground());
  }
});

async function updateResumesInBackground() {
  try {
    console.log("[Service Worker] Checking for resume updates...");
    const response = await fetch("/api/resume-updates");
    if (response.ok) {
      const updates = await response.json();
      console.log("[Service Worker] Resume updates available:", updates);
      // Notify clients of update
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "RESUME_UPDATED",
            updates: updates,
          });
        });
      });
    }
  } catch (error) {
    console.error("[Service Worker] Background sync error:", error);
  }
}

/**
 * Background sync for offline actions
 */
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-downloads") {
    event.waitUntil(syncDownloads());
  }
});

async function syncDownloads() {
  try {
    console.log("[Service Worker] Syncing downloads...");
    // This would sync any offline actions when connection is restored
  } catch (error) {
    console.error("[Service Worker] Sync error:", error);
  }
}

console.log("[Service Worker] Loaded and ready");
