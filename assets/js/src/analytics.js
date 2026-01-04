/**
 * Google Analytics 4 Event Tracking
 * Custom events for resume downloads, variant switches, and theme changes
 */

/**
 * Track resume downloads
 * @param {string} resumeType - Type of resume downloaded (e.g., 'print', 'ats', 'digital')
 */
export function trackDownload(resumeType) {
  if (typeof gtag !== "undefined") {
    gtag("event", "download", {
      event_category: "Resume",
      event_label: resumeType,
      value: 1,
    });
    console.log(`[Analytics] Download tracked: ${resumeType}`);
  }
}

/**
 * Track variant switches
 * @param {string} variant - Variant switched to (e.g., 'print', 'ats', 'digital', 'portfolio')
 */
export function trackVariantSwitch(variant) {
  if (typeof gtag !== "undefined") {
    gtag("event", "variant_switch", {
      event_category: "Resume",
      event_label: variant,
    });
    console.log(`[Analytics] Variant switch tracked: ${variant}`);
  }
}

/**
 * Track theme changes
 * @param {string} theme - Theme switched to ('light' or 'dark')
 */
export function trackThemeChange(theme) {
  if (typeof gtag !== "undefined") {
    gtag("event", "theme_change", {
      event_category: "UI",
      event_label: theme,
    });
    console.log(`[Analytics] Theme change tracked: ${theme}`);
  }
}

/**
 * Track palette changes
 * @param {string} palette - Palette switched to
 */
export function trackPaletteChange(palette) {
  if (typeof gtag !== "undefined") {
    gtag("event", "palette_change", {
      event_category: "UI",
      event_label: palette,
    });
    console.log(`[Analytics] Palette change tracked: ${palette}`);
  }
}

/**
 * Track page views (for SPA-like navigation)
 * @param {string} pagePath - Path of the page viewed
 */
export function trackPageView(pagePath) {
  if (typeof gtag !== "undefined") {
    gtag("event", "page_view", {
      page_path: pagePath,
    });
    console.log(`[Analytics] Page view tracked: ${pagePath}`);
  }
}
