# Analytics Documentation

This document explains how Google Analytics 4 (GA4) is integrated into the resume website.

---

## Overview

The website uses **Google Analytics 4** to track:

- Page views
- Resume downloads
- Variant switches (Print, ATS, Digital, Portfolio)
- Theme changes (light/dark mode)
- Palette changes
- User behavior and engagement

---

## Setup

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Replace Placeholder ID

Replace `G-XXXXXXXXXX` in the following files with your actual Measurement ID:

- `index.html` (line ~8)
- `public/portfolio/index.html` (line ~8)
- `public/digital/index.html` (line ~8)

**Example**:

```html
<!-- Before -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  gtag("config", "G-XXXXXXXXXX");
</script>

<!-- After (with your actual ID) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
  gtag("config", "G-ABC123DEF4");
</script>
```

---

## Tracked Events

### 1. Page Views (Automatic)

GA4 automatically tracks page views when users visit:

- Main page (`/`)
- Portfolio page (`/portfolio/`)
- Digital resume (`/digital/`)

### 2. Resume Downloads

**Event**: `download`  
**Category**: `Resume`  
**Labels**: `print`, `ats`, `digital`

Triggered when users click download buttons for PDF resumes.

**Example in GA4**:

```
Event: download
Category: Resume
Label: print
Value: 1
```

### 3. Variant Switches

**Event**: `variant_switch`  
**Category**: `Resume`  
**Labels**: `print`, `ats`, `digital`, `portfolio`

Triggered when users switch between resume variants using the tab buttons.

**Example in GA4**:

```
Event: variant_switch
Category: Resume
Label: ats
```

### 4. Theme Changes

**Event**: `theme_change`  
**Category**: `UI`  
**Labels**: `light`, `dark`

Triggered when users toggle between light and dark themes.

**Example in GA4**:

```
Event: theme_change
Category: UI
Label: dark
```

### 5. Palette Changes

**Event**: `palette_change`  
**Category**: `UI`  
**Labels**: Various palette names

Triggered when users cycle through color palettes.

---

## Custom Event Tracking

### Using the Analytics Module

The `assets/js/src/analytics.js` module provides helper functions for tracking custom events.

**Import and use**:

```javascript
import { trackDownload, trackVariantSwitch, trackThemeChange } from "./analytics.js";

// Track a download
trackDownload("print");

// Track a variant switch
trackVariantSwitch("ats");

// Track a theme change
trackThemeChange("dark");
```

### Available Functions

| Function                      | Parameters                                     | Description               |
| ----------------------------- | ---------------------------------------------- | ------------------------- |
| `trackDownload(resumeType)`   | `'print'`, `'ats'`, `'digital'`                | Track resume downloads    |
| `trackVariantSwitch(variant)` | `'print'`, `'ats'`, `'digital'`, `'portfolio'` | Track variant switches    |
| `trackThemeChange(theme)`     | `'light'`, `'dark'`                            | Track theme changes       |
| `trackPaletteChange(palette)` | Palette name string                            | Track palette changes     |
| `trackPageView(pagePath)`     | URL path string                                | Track SPA-like page views |

---

## Integration with Existing Code

### ThemeManager Integration

To track theme changes, add to `ThemeManager.js`:

```javascript
import { trackThemeChange } from "./analytics.js";

class ThemeManager {
  toggle() {
    this.html.classList.toggle("dark-theme");
    const isDark = this.html.classList.contains("dark-theme");
    trackThemeChange(isDark ? "dark" : "light");
  }
}
```

### VariantManager Integration

To track variant switches, add to `VariantManager.js`:

```javascript
import { trackVariantSwitch } from "./analytics.js";

class VariantManager {
  switchTo(variant) {
    // ... existing code ...
    trackVariantSwitch(variant);
  }
}
```

### Download Button Integration

To track downloads, add to download button click handlers:

```javascript
import { trackDownload } from "./analytics.js";

downloadButton.addEventListener("click", () => {
  trackDownload("print"); // or 'ats', 'digital'
});
```

---

## Viewing Analytics Data

### In Google Analytics 4:

1. **Real-time Reports**:
   - Go to Reports → Realtime
   - See live visitors and events

2. **Event Reports**:
   - Go to Reports → Engagement → Events
   - See all custom events (download, variant_switch, theme_change)

3. **Custom Reports**:
   - Create custom reports for specific metrics
   - Filter by event category, label, etc.

---

## Privacy & GDPR Compliance

### Current Setup

- GA4 tracking is enabled by default
- No cookie consent banner (basic setup)

### For GDPR Compliance (Optional)

If you need GDPR compliance, add a cookie consent banner:

1. **Use a consent management tool** (e.g., CookieYes, OneTrust)
2. **Conditionally load GA4** only after user consent
3. **Add privacy policy** link to footer

**Example conditional loading**:

```javascript
// Only load GA4 if user consented
if (userConsented) {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  document.head.appendChild(script);
}
```

---

## Debugging

### Check if GA4 is loaded:

Open browser console and type:

```javascript
typeof gtag;
```

Should return `"function"` if GA4 is loaded.

### Check if events are firing:

Events are logged to console in development:

```
[Analytics] Download tracked: print
[Analytics] Variant switch tracked: ats
[Analytics] Theme change tracked: dark
```

### Use GA4 DebugView:

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) extension
2. Enable debug mode
3. See real-time event tracking in GA4 DebugView

---

## Cost

**Google Analytics 4 is FREE** with generous limits:

- Unlimited events
- Unlimited users
- 14 months of data retention (default)
- No credit card required

---

## Alternatives

If you prefer privacy-focused analytics:

| Service              | Cost               | Privacy | Features                   |
| -------------------- | ------------------ | ------- | -------------------------- |
| **Plausible**        | $9/mo              | High    | Simple, GDPR-compliant     |
| **Umami**            | Free (self-hosted) | High    | Open-source, privacy-first |
| **Simple Analytics** | $19/mo             | High    | GDPR-compliant, no cookies |
| **Fathom**           | $14/mo             | High    | Privacy-first, fast        |

---

## Troubleshooting

### Events not showing in GA4

1. **Check Measurement ID**: Ensure you replaced `G-XXXXXXXXXX` with your actual ID
2. **Wait 24-48 hours**: GA4 data can take time to appear
3. **Use DebugView**: Check real-time events in GA4 DebugView
4. **Check browser console**: Look for errors or blocked requests

### Ad blockers blocking GA4

Some users have ad blockers that block Google Analytics. This is normal and expected. You'll only see data from users without ad blockers.

---

## Best Practices

1. **Don't track sensitive data**: Never send PII (personally identifiable information)
2. **Use descriptive event names**: Make events easy to understand
3. **Set up conversions**: Mark important events as conversions in GA4
4. **Create custom reports**: Build reports for your specific needs
5. **Monitor regularly**: Check analytics weekly to understand user behavior

---

## Links

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Tracking Guide](https://support.google.com/analytics/answer/9267735)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)

---

**Last Updated**: December 2025
