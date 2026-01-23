/**
 * Download Analytics Tracker
 * Tracks resume downloads and version popularity
 */

class DownloadAnalytics {
  constructor() {
    this.STORAGE_KEY = "resume_downloads";
    this.init();
  }

  init() {
    this.setupDownloadTracking();
  }

  setupDownloadTracking() {
    // Track all download buttons
    document.querySelectorAll("a[download]").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.trackDownload(e.target);
      });
    });
  }

  trackDownload(element) {
    const href = element.getAttribute("href");
    const text = element.textContent;
    const format = this.getFormat(href);
    const role = document.body.getAttribute("data-role") || "main";
    const timestamp = new Date().toISOString();

    const download = {
      format,
      role,
      timestamp,
      userAgent: navigator.userAgent,
    };

    // Store locally
    this.storeDownload(download);

    // Send to analytics if available
    if (window.gtag) {
      gtag("event", "download", {
        file_name: href,
        file_type: format,
        role: role,
      });
    }

    console.log("Download tracked:", download);
  }

  getFormat(href) {
    if (href.endsWith(".docx")) return "docx";
    if (href.endsWith(".pdf")) return "pdf";
    return "unknown";
  }

  storeDownload(download) {
    const existing = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    existing.push(download);
    // Keep only last 100 downloads
    const recent = existing.slice(-100);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recent));
  }

  getDownloadStats() {
    const downloads = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    const stats = {
      total: downloads.length,
      byFormat: {},
      byRole: {},
      recentDownloads: downloads.slice(-5),
    };

    downloads.forEach((d) => {
      stats.byFormat[d.format] = (stats.byFormat[d.format] || 0) + 1;
      stats.byRole[d.role] = (stats.byRole[d.role] || 0) + 1;
    });

    return stats;
  }

  clearStats() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log("Download stats cleared");
  }
}

// Auto-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.downloadAnalytics = new DownloadAnalytics();
  });
} else {
  window.downloadAnalytics = new DownloadAnalytics();
}
