# Router Integration Guide

## Summary of Changes

### 1. Files Created

#### `public/404.html`

- GitHub Pages-compatible 404 fallback page
- Auto-redirects to homepage after 3 seconds
- Styled with gradient background and countdown timer
- Handles SPA-like routing errors

#### `assets/js/router.js`

- Vanilla JS router utility (ES6 module)
- Base-aware path handling for GitHub Pages
- Active navigation highlighting
- Route detection and matching
- Framework-free, works with folder-based routing

### 2. Files Modified

#### `assets/js/main.js`

- Integrated router initialization
- Router instance available globally as `window.__router`

#### `portfolio/portfolio.html`

- Fixed relative CSS link: `../assets/css/portfolio.css` → `/resume-website/assets/css/portfolio.css`
- Fixed resume links to use absolute paths with base

---

## How to Use the Router

### Basic Setup

The router is already integrated into `main.js`. It automatically:

- Detects the current route
- Highlights active navigation items with the `active` class

### Adding Navigation Links

To make a link participate in active highlighting, add the `data-nav-link` attribute:

```html
<!-- Example navigation in index.html -->
<nav>
  <a href="/resume-website/" data-nav-link>Home</a>
  <a href="/resume-website/portfolio/" data-nav-link>Portfolio</a>
  <a href="/resume-website/print/" data-nav-link>Print Resume</a>
  <a href="/resume-website/ats/" data-nav-link>ATS Resume</a>
  <a href="/resume-website/digital/" data-nav-link>Digital Resume</a>
</nav>
```

### Styling Active Links

Add CSS for the `.active` class:

```css
/* In your CSS file */
[data-nav-link].active {
  font-weight: 700;
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}
```

---

## Router API

### Configuration

```javascript
const router = createRouter({
  base: "/resume-website/", // GitHub Pages base path
  activeClass: "active", // CSS class for active links
  navSelector: "[data-nav-link]", // Selector for nav links
});
```

### Methods

```javascript
// Initialize router (call after DOM loaded)
router.init();

// Check if a URL is active
router.isActive("/resume-website/portfolio/"); // true/false

// Get current route name
router.getCurrentRoute(); // 'portfolio', 'print', 'home', etc.

// Check if on specific route
router.isRoute("portfolio"); // true/false

// Build base-aware URL
router.url("portfolio/"); // '/resume-website/portfolio/'

// Navigate programmatically
router.navigate("portfolio/");
```

---

## Example HTML Updates

### Main Index Page (index.html)

Add `data-nav-link` to internal navigation links:

```html
<!-- Before -->
<a href="/resume-website/portfolio/">Portfolio</a>

<!-- After -->
<a href="/resume-website/portfolio/" data-nav-link>Portfolio</a>
```

### Portfolio Page

If you add navigation to the portfolio page:

```html
<!-- Add to public/portfolio/index.html -->
<nav class="portfolio-nav">
  <a href="/resume-website/" data-nav-link>← Back to Home</a>
  <a href="/resume-website/portfolio/" data-nav-link>Portfolio</a>
</nav>

<!-- Before closing </body>, add: -->
<script type="module">
  import { createRouter } from "/resume-website/assets/js/router.js";

  document.addEventListener("DOMContentLoaded", () => {
    const router = createRouter({ base: "/resume-website/" });
    router.init();
  });
</script>
```

---

## 404 Fallback Behavior

When a user navigates to a non-existent page:

1. GitHub Pages serves `public/404.html`
2. Page shows "404 Not Found" with countdown
3. Automatically redirects to homepage in 3 seconds
4. User can click "Go Home Now" for immediate redirect

---

## Link Best Practices

### ✅ DO:

```html
<!-- Use absolute paths with base -->
<a href="/resume-website/portfolio/" data-nav-link>Portfolio</a>
<a href="/resume-website/print/resume_print.pdf">Download PDF</a>

<!-- Internal anchors are fine -->
<a href="#contact">Contact</a>

<!-- External links don't need data-nav-link -->
<a href="https://github.com/voidomin">GitHub</a>
```

### ❌ DON'T:

```html
<!-- Avoid relative paths for internal navigation -->
<a href="../portfolio/">Portfolio</a>
<a href="./print/">Print</a>

<!-- These can cause issues with Vite's base path -->
```

---

## Testing Locally

### Test 404 Page

Visit a non-existent URL:

```
http://localhost:5173/resume-website/non-existent-page
```

Should show 404 page and redirect.

### Test Active Nav

1. Navigate to different pages
2. Check that navigation links get the `active` class
3. Open dev console and run:
   ```javascript
   window.__router.getCurrentRoute();
   ```

### Test All Links

```bash
# Start dev server
npm run dev

# Test URLs:
http://localhost:5173/resume-website/
http://localhost:5173/resume-website/portfolio/
http://localhost:5173/resume-website/print/
http://localhost:5173/resume-website/ats/
http://localhost:5173/resume-website/digital/
```

---

## Production Deployment

The setup works automatically on GitHub Pages. After pushing:

1. GitHub Actions builds with Vite
2. `public/404.html` is copied to `dist/404.html`
3. Router uses absolute paths with `/resume-website/` base
4. All navigation and 404 handling work correctly

---

## Advanced Usage

### Conditional Behavior by Route

```javascript
// In your app code
import { createRouter } from "./router.js";

const router = createRouter({ base: "/resume-website/" });

if (router.isRoute("portfolio")) {
  // Do something specific to portfolio page
  console.log("Welcome to portfolio!");
}
```

### Custom Active States

```javascript
// Add custom logic after router initialization
document.querySelectorAll("[data-nav-link]").forEach((link) => {
  if (router.isActive(link.getAttribute("href"))) {
    link.parentElement.classList.add("nav-item-active");
  }
});
```

---

## Troubleshooting

### Links not highlighting?

- Ensure links have `data-nav-link` attribute
- Check that `href` uses absolute paths with base
- Verify router is initialized after DOM loaded

### 404 page not showing?

- Ensure `public/404.html` exists
- GitHub Pages may cache; clear browser cache
- Test locally with a 404 simulation

### Base path issues?

- Verify `vite.config.mjs` has `base: '/resume-website/'`
- All absolute paths must include the base
- Use `router.url()` helper to build URLs programmatically

---

## Next Steps

1. ✅ Add `data-nav-link` to any internal navigation links
2. ✅ Add CSS styling for `.active` class
3. ✅ Test locally with `npm run dev`
4. ✅ Build and deploy: `npm run build && git push`
5. ✅ Test on GitHub Pages

Your site now has:

- ✨ Smart routing with active nav highlighting
- ✨ 404 fallback that redirects to home
- ✨ Base-aware absolute paths
- ✨ Framework-free, vanilla JS solution
