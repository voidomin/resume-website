/**
 * PWA Initialization & App Shell Management
 * Handles service worker registration, install prompts, and PWA features
 */

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isOffline = !navigator.onLine;

    this.init();
  }

  init() {
    // Register service worker
    if ("serviceWorker" in navigator) {
      this.registerServiceWorker();
    }

    // Listen for online/offline events
    window.addEventListener("online", () => this.handleOnline());
    window.addEventListener("offline", () => this.handleOffline());

    // Listen for install prompt
    window.addEventListener("beforeinstallprompt", (e) => this.handleInstallPrompt(e));

    // Listen for app installed
    window.addEventListener("appinstalled", () => this.handleAppInstalled());

    // Check if already installed
    if ("navigator" in window && "standalone" in navigator) {
      this.isInstalled = window.navigator.standalone === true;
    }

    // Check display mode
    if ("matchMedia" in window) {
      const mql = window.matchMedia("(display-mode: standalone)");
      this.isInstalled = mql.matches;
      mql.addEventListener("change", (e) => {
        this.isInstalled = e.matches;
      });
    }

    this.setupUI();
  }

  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/public/service-worker.js", {
        scope: "/",
        updateViaCache: "none",
      });

      console.log("[PWA] Service Worker registered:", registration);

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000);

      // Handle controller change
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[PWA] Service Worker updated");
        this.showUpdateNotification();
      });

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        this.handleServiceWorkerMessage(event.data);
      });
    } catch (error) {
      console.error("[PWA] Service Worker registration failed:", error);
    }
  }

  handleInstallPrompt(event) {
    event.preventDefault();
    this.deferredPrompt = event;
    console.log("[PWA] Install prompt ready");
    this.showInstallPrompt();
  }

  handleAppInstalled() {
    this.isInstalled = true;
    console.log("[PWA] App installed");
    this.deferredPrompt = null;
    this.hideInstallPrompt();
    this.showInstalledNotification();
  }

  handleOnline() {
    this.isOffline = false;
    console.log("[PWA] Online");
    document.body.classList.remove("offline");
    this.showOnlineNotification();
  }

  handleOffline() {
    this.isOffline = true;
    console.log("[PWA] Offline");
    document.body.classList.add("offline");
    this.showOfflineNotification();
  }

  handleServiceWorkerMessage(data) {
    if (data.type === "RESUME_UPDATED") {
      console.log("[PWA] Resume update available", data);
      this.showUpdateNotification();
    }
  }

  setupUI() {
    this.createStatusIndicator();
    this.createInstallButton();
  }

  createStatusIndicator() {
    const indicator = document.createElement("div");
    indicator.id = "pwa-status";
    indicator.className = "pwa-status";
    indicator.innerHTML = `
      <div class="status-content">
        <span class="status-icon">📱</span>
        <span class="status-text" id="status-text"></span>
      </div>
    `;

    document.body.appendChild(indicator);
    this.updateStatusIndicator();
  }

  updateStatusIndicator() {
    const statusText = document.getElementById("status-text");
    if (this.isOffline) {
      statusText.textContent = "Offline Mode";
    } else if (this.isInstalled) {
      statusText.textContent = "App Installed";
    } else {
      statusText.textContent = "Online";
    }
  }

  createInstallButton() {
    const button = document.createElement("button");
    button.id = "pwa-install-btn";
    button.className = "pwa-install-btn";
    button.innerHTML = `📱 Install App`;
    button.addEventListener("click", () => this.promptInstall());

    // Only show if deferredPrompt is available
    if (!this.deferredPrompt) {
      button.style.display = "none";
    }

    document.body.appendChild(button);
  }

  showInstallPrompt() {
    const button = document.getElementById("pwa-install-btn");
    if (button) {
      button.style.display = "inline-flex";
    }
  }

  hideInstallPrompt() {
    const button = document.getElementById("pwa-install-btn");
    if (button) {
      button.style.display = "none";
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const choiceResult = await this.deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("[PWA] User accepted install prompt");
    } else {
      console.log("[PWA] User dismissed install prompt");
    }

    this.deferredPrompt = null;
  }

  showInstallModal() {
    const prompt = document.createElement("div");
    prompt.className = "pwa-prompt install-prompt";
    prompt.innerHTML = `
      <div class="prompt-content">
        <div class="prompt-icon">📱</div>
        <div class="prompt-text">
          <h4>Install Resume App</h4>
          <p>Install to your home screen for quick access</p>
        </div>
        <div class="prompt-actions">
          <button class="btn-primary" onclick="window.pwaManager?.promptInstall()">Install</button>
          <button class="btn-secondary" onclick="this.closest('.pwa-prompt').remove()">Later</button>
        </div>
      </div>
    `;

    document.body.appendChild(prompt);

    // Auto-dismiss after 30 seconds
    setTimeout(() => {
      if (prompt.parentNode) {
        prompt.remove();
      }
    }, 30000);
  }

  showUpdateNotification() {
    const notification = document.createElement("div");
    notification.className = "pwa-notification update-notification";
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">🔄</span>
        <span class="notification-text">Resume updated! Reload to see changes.</span>
      </div>
      <button class="notification-action" onclick="location.reload()">Reload</button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 8000);
  }

  showOnlineNotification() {
    const notification = document.createElement("div");
    notification.className = "pwa-notification online-notification";
    notification.innerHTML = `
      <span class="notification-icon">✅</span>
      <span class="notification-text">Back online! All features available.</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  showOfflineNotification() {
    const notification = document.createElement("div");
    notification.className = "pwa-notification offline-notification";
    notification.innerHTML = `
      <span class="notification-icon">📡</span>
      <span class="notification-text">You're offline. Cached content available.</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  showInstalledNotification() {
    const notification = document.createElement("div");
    notification.className = "pwa-notification success-notification";
    notification.innerHTML = `
      <span class="notification-icon">🎉</span>
      <span class="notification-text">App installed successfully!</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Public API for other features to use
  isOnline() {
    return !this.isOffline;
  }

  isInstalledMode() {
    return this.isInstalled;
  }

  async requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }

  async registerBackgroundSync() {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register("sync-downloads");
        console.log("[PWA] Background sync registered");
      } catch (error) {
        console.error("[PWA] Background sync registration failed:", error);
      }
    }
  }

  async registerPeriodicSync() {
    if ("serviceWorker" in navigator && "PeriodicSyncManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.periodicSync.register("update-resumes", {
          minInterval: 24 * 60 * 60 * 1000, // 24 hours
        });
        console.log("[PWA] Periodic sync registered");
      } catch (error) {
        console.error("[PWA] Periodic sync registration failed:", error);
      }
    }
  }
}

// Initialize PWA Manager
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.pwaManager = new PWAManager();
  });
} else {
  window.pwaManager = new PWAManager();
}
