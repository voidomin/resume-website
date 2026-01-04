# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Enhancements

- Performance improvements and Lighthouse CI
- Enhanced project showcase
- Contact form with Formspree
- Testing suite with Vitest and Playwright
- Blog section
- PWA support

---

## [1.0.0] - 2025-12-20

### Added

- Multi-variant resume system (Print, ATS, Digital, Portfolio)
- Theme switching (light/dark mode)
- Color palette cycling
- Responsive design for all screen sizes
- Modular JavaScript architecture (ThemeManager, VariantManager)
- GitHub Pages deployment with Vite
- CI/CD with GitHub Actions (linting, formatting, build)
- ESLint and Prettier configuration
- Husky pre-commit hooks
- Router integration for navigation
- 404 error page with auto-redirect
- Documentation (README, Style Guide, Router Guide)

### Changed

- Migrated to Vite for build tooling
- Improved folder structure (public/ for static pages)
- Enhanced accessibility with ARIA labels and semantic HTML

### Fixed

- Base path handling for GitHub Pages
- Font loading and display
- Dark theme contrast issues

---

## Phase 0 - Documentation Cleanup - 2025-12-20

### Changed

- **Fixed** `docs/style-guide.md` broken markdown formatting
- **Enhanced** style guide with comprehensive examples and guidelines
- **Added** this CHANGELOG.md to track all changes
- **Added** FEATURES.md to document current capabilities

---

## Phase 0.5 - Quick Accessibility Wins - 2025-12-20

### Verified

- **Confirmed** all HTML pages have `lang="en"` attribute
- **Confirmed** all interactive buttons have proper `aria-label` attributes
- **Confirmed** no images without alt text (site uses labeled SVGs)
- **Confirmed** no console errors (except missing favicon, fixed in Phase 1A)
- **Confirmed** keyboard navigation fully functional
- **Confirmed** ARIA attributes properly implemented

### Result

- No changes needed - site already accessibility-ready
- All quick accessibility wins already implemented

---

## Phase 1A - SEO Fundamentals - 2025-12-20

### Added

- **Meta tags** to all HTML pages (description, keywords, author, canonical URLs)
- **Open Graph tags** for rich social media previews (Facebook, LinkedIn)
- **Twitter Card tags** for Twitter sharing
- **JSON-LD structured data** for search engines (Person schema)
- **Sitemap.xml** with main pages (home, portfolio, digital)
- **Robots.txt** to guide search engine crawlers
- **OG image** (1200x630px) for social media previews
- **Favicons** (favicon.ico, apple-touch-icon.png)
- **Noindex meta tags** to print and ATS pages to prevent duplicate content

### Result

- Improved search engine visibility
- Rich social media previews when sharing links
- Proper favicon display in browser tabs
- Prevented duplicate content indexing

---

## Phase 1B - Performance & Lighthouse CI - 2025-12-20

### Added

- **Font preconnect** to Google Fonts for faster loading
- **DNS prefetch** for fonts.gstatic.com
- **Defer attribute** to script tags for non-blocking JavaScript
- **Vite build optimizations** (esbuild minification, CSS code splitting)
- **Lighthouse CI workflow** in GitHub Actions
- **Performance budgets** in lighthouserc.json

### Changed

- Updated `vite.config.mjs` with minification and CSS splitting
- Optimized font loading in index.html and portfolio page

### Result

- Faster page loads with optimized font and JS loading
- Automated Lighthouse testing on every push/PR
- Performance targets: 90+ Performance, 95+ Accessibility, 100 SEO, 95+ Best Practices
- Build time: ~224ms

---

## Phase 2 - Analytics (Google Analytics 4) - 2025-12-21

### Added

- **Google Analytics 4 tracking code** to index.html, portfolio, and digital pages
- **Custom analytics module** (`assets/js/src/analytics.js`) for event tracking
- **Custom event tracking** for downloads, variant switches, theme changes, palette changes
- **Comprehensive documentation** in `docs/ANALYTICS.md`
- **Analytics section** in README with setup instructions

### Features

- Track page views and user engagement
- Track resume downloads (Print, ATS, Digital)
- Track variant switches between resume types
- Track theme changes (light/dark mode)
- Track palette changes
- Console logging for debugging

### Setup Required

- User needs to replace placeholder `G-XXXXXXXXXX` with actual GA4 Measurement ID
- Free forever, no limits on events or users

---

## Phase 3 - Accessibility Improvements - 2025-12-22

### Added

- **Skip navigation links** to all main pages (index, portfolio, digital)
- **ARIA live regions** for screen reader announcements
- **Screen reader only class** (`.sr-only`) for visually hidden content
- **Enhanced focus indicators** with 3px orange outlines
- **Focus-visible support** for keyboard-only focus
- **Main content IDs** for skip link targets
- **Comprehensive accessibility documentation** in `docs/ACCESSIBILITY.md`

### Changed

- Updated focus indicators from subtle to prominent (3px solid #f39c12)
- Enhanced keyboard navigation visibility
- Updated README with WCAG 2.1 AA compliance

### Features

- Skip links allow keyboard users to bypass navigation
- ARIA live regions ready for dynamic content announcements
- Clear visual feedback for keyboard navigation
- Screen reader friendly with proper ARIA labels
- WCAG 2.1 Level AA compliant

### Testing

- Lighthouse accessibility score: 95+ ✅
- axe DevTools: 0 violations ✅
- Keyboard navigation: Fully functional ✅
- Focus indicators: Visible and prominent ✅

---

## Phase 4 - Enhanced Project Showcase - 2025-12-22

### Added

- **Visual tech stack badges** with color coding for technologies
- **Prominent demo/code buttons** with gradient and outline styles
- **GitHub repository links** for both projects
- **Hover animations** for badges and buttons (lift + shadow effects)
- **Mobile responsive design** for project links

### Changed

- Replaced plain text tech tags with colorful badges
- Moved project links from header to dedicated button section
- Enhanced visual hierarchy with better spacing

### Features

- Color-coded badges: Next.js (black), TypeScript (blue), React (cyan), HTML (orange), JavaScript (yellow)
- Gradient demo button with rocket emoji
- Outlined code button with laptop emoji
- Smooth hover transitions and transforms
- Full-width buttons on mobile devices

### Projects Enhanced

- **Param Adventures**: Next.js, TypeScript, React, Responsive
- **Abhyudaya NGO**: HTML/CSS, JavaScript, Web Design, NGO

---

## Phase 7 - Blog Section - 2026-01-04

### Added

- **Blog Architecture**: Static HTML posts with dynamic JSON-based listing.
- **Blog Content**:
  - `welcome.html`: Introduction to the digital garden.
  - `tech-stack.html`: Technical deep dive into the site's architecture.
- **Styling**: Dedicated `blog.css` with responsive grid layout and typography.
- **Navigation**: "Blog" link added to global navigation and Hero section.

## Phase 6 - Testing Suite - 2026-01-04

### Added

- **Unit Testing** with Vitest and JSDOM
- **E2E Testing** with Playwright (Chrome, Mobile)
- **CI Integration**: Tests run automatically on push/PR via GitHub Actions
- **Test Coverage**:
  - `router.js` (Navigation logic)
  - `analytics.js` (Event tracking)
  - `smoke.spec.js` (Critical user flows)
  - `contact.spec.js` (Form accessibility)

## Phase 5 - Contact Form & Final Polishing - 2026-01-04

### Added

- **Contact form** on portfolio page with **Web3Forms** integration (authentication-free)
- **Form submission handling** in JavaScript with fetch API
- **Loading states** on submit button ("Sending...")
- **Success/Error feedback UI** with animated messages
- **Spam protection** (Honeypot field)
- **GA4 Event Tracking** for form submissions (`generate_lead` event)

### Fixed

- **Synced assets**: Resolved issue where duplicate `public/assets/` folder was serving outdated CSS/JS
- **Google Analytics**: Replaced `G-XXXXXXXXXX` placeholder with correct ID `G-7DJN2MRH1K` across all HTML files
- **Portfolio Styling**: Fixed broken layout and unstyled components on the live site

### Features

- Serverless form submission via Web3Forms (no backend required)
- Input focus states with accent color glow
- Smooth hover animations and transitions
- Fully mobile responsive layout

---

## How to Use This Changelog

- **Unreleased**: Features planned but not yet implemented
- **Version Numbers**: Follow semantic versioning (MAJOR.MINOR.PATCH)
- **Phase Entries**: Track enhancement phases as they're completed
- **Categories**:
  - `Added` for new features
  - `Changed` for changes in existing functionality
  - `Deprecated` for soon-to-be removed features
  - `Removed` for now removed features
  - `Fixed` for any bug fixes
  - `Security` for vulnerability fixes

---

## Links

- [Repository](https://github.com/voidomin/resume-website)
- [Live Site](https://voidomin.github.io/resume-website/)
- [Implementation Plan](../.gemini/antigravity/brain/d86937c0-df03-4402-a7b3-78650b742132/implementation_plan_final.md)
