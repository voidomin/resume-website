# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Enhancements

- Performance improvements and Lighthouse CI
- Google Analytics 4 integration
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
