/**
 * router.js - Vanilla JS router utility for GitHub Pages static sites
 *
 * Features:
 * - Base-aware path handling for GitHub Pages deployment
 * - Active navigation highlighting
 * - Route detection and matching
 * - Framework-free, works with folder-based routing
 */

export class Router {
  /**
   * @param {Object} config - Router configuration
   * @param {string} config.base - Base path for GitHub Pages (e.g., '/resume-website/')
   * @param {string} [config.activeClass='active'] - CSS class to apply to active nav items
   * @param {string} [config.navSelector='[data-nav-link]'] - Selector for navigation links
   * @param {string[]} [config.knownRoutes] - List of allowed top-level routes; unknown routes will redirect to base
   */
  constructor(config = {}) {
    this.base = config.base || "/";
    this.activeClass = config.activeClass || "active";
    this.navSelector = config.navSelector || "[data-nav-link]";
    this.knownRoutes = config.knownRoutes || [
      "home",
      "portfolio",
      "print",
      "ats",
      "digital",
      "blog",
    ];
    this.currentPath = this._getCurrentPath();
    this.currentRoute = this._getRouteFromPath(this.currentPath);
  }

  /**
   * Initialize the router - call this on DOMContentLoaded
   */
  init() {
    this._enforceKnownRoutes();
    this._highlightActiveNav();
    this._attachLinkListeners();
  }

  /**
   * Get the current pathname without the base
   * @private
   * @returns {string}
   */
  _getCurrentPath() {
    const fullPath = window.location.pathname;
    // Remove base path to get relative path
    if (fullPath.startsWith(this.base)) {
      return fullPath.slice(this.base.length) || "/";
    }
    return fullPath;
  }

  /**
   * Extract route name from path
   * @private
   * @param {string} path
   * @returns {string}
   */
  _getRouteFromPath(path) {
    // Handle root
    if (path === "/" || path === "") return "home";

    // Extract first segment (e.g., /portfolio/ -> portfolio)
    const segments = path.split("/").filter(Boolean);
    return segments[0] || "home";
  }

  /**
   * Check if a link matches the current route
   * @param {string} href - The href attribute to check
   * @returns {boolean}
   */
  isActive(href) {
    if (!href) return false;

    // Handle anchor links
    if (href.startsWith("#")) return false;

    // Handle external links
    if (href.startsWith("http") || href.startsWith("mailto:")) return false;

    // Normalize href
    let normalizedHref = href;

    // If it's an absolute path with base, extract relative part
    if (normalizedHref.startsWith(this.base)) {
      normalizedHref = normalizedHref.slice(this.base.length);
    }

    // Remove leading slash
    normalizedHref = normalizedHref.replace(/^\//, "");

    // Extract route from href
    const hrefRoute = this._getRouteFromPath(normalizedHref);

    return hrefRoute === this.currentRoute;
  }

  /**
   * Redirect unknown routes to base (helps in Vite dev where 404 isn't served)
   * @private
   */
  _enforceKnownRoutes() {
    const route = this.currentRoute;
    if (!this.knownRoutes.includes(route)) {
      // Replace so history doesn't keep bad URL
      window.location.replace(this.base);
    }
  }

  /**
   * Highlight active navigation items
   * @private
   */
  _highlightActiveNav() {
    const navLinks = document.querySelectorAll(this.navSelector);

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (this.isActive(href)) {
        link.classList.add(this.activeClass);
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove(this.activeClass);
        link.removeAttribute("aria-current");
      }
    });
  }

  /**
   * Attach listeners to navigation links for accessibility
   * @private
   */
  _attachLinkListeners() {
    const navLinks = document.querySelectorAll(this.navSelector);

    navLinks.forEach((link) => {
      // Add keyboard navigation enhancement
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !link.hasAttribute("href")) {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  /**
   * Build a base-aware absolute URL
   * @param {string} path - Relative path (e.g., 'portfolio/', '/print/')
   * @returns {string} - Absolute URL with base (e.g., '/resume-website/portfolio/')
   */
  url(path) {
    // Remove leading slash if present
    const cleanPath = path.replace(/^\//, "");
    // Ensure base ends with /
    const base = this.base.endsWith("/") ? this.base : `${this.base}/`;
    return `${base}${cleanPath}`;
  }

  /**
   * Navigate to a path (for programmatic navigation)
   * @param {string} path - Path to navigate to
   */
  navigate(path) {
    const url = this.url(path);
    window.location.href = url;
  }

  /**
   * Get current route name
   * @returns {string}
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Check if we're on a specific route
   * @param {string} routeName
   * @returns {boolean}
   */
  isRoute(routeName) {
    return this.currentRoute === routeName;
  }
}

/**
 * Create and initialize a router instance
 * Usage in HTML:
 *
 * <script type="module">
 *   import { createRouter } from './assets/js/router.js';
 *   const router = createRouter({ base: '/resume-website/' });
 *   document.addEventListener('DOMContentLoaded', () => router.init());
 * </script>
 */
export function createRouter(config) {
  return new Router(config);
}

// Default export
export default { Router, createRouter };
