# Style Guide — Resume & Portfolio

This guide defines conventions for HTML, CSS, JS, and project structure.  
Use this as the baseline for all future updates.

---

## 1. Folder & File Conventions

**Root Structure**:

- `index.html` → landing page
- `public/portfolio/` → standalone portfolio page
- `public/print/`, `public/ats/`, `public/digital/` → resume versions
- `assets/` → shared files (css/js/img)
- `docs/` → documentation

**Naming Rules**:

- Files: `kebab-case`
- CSS classes: `kebab-case`
- JS classes: `PascalCase`
- JS variables: `camelCase`

---

## 2. HTML Standards

**Semantic Structure**:

- Use semantic HTML5 elements: `<header>`, `<section>`, `<article>`, `<footer>`
- Use `<button>` for interactive UI elements (not `<div>` or `<a>`)
- Include proper ARIA attributes: `aria-label`, `role`, `aria-selected`

**Variant Cards**:
Each variant card must include:

- `data-variant="xyz"` attribute
- `id="variant-xyz"` attribute

Example:

```html
<article class="variant-card" data-variant="print" id="variant-print">
  <div class="variant-chip">
    <span class="bullet"></span>
    <span>A4 Print</span>
  </div>
  <div class="variant-title">Print Resume</div>
  <!-- ... -->
</article>
```

---

## 3. CSS Guidelines

### Theme Variables

All colors and spacing use CSS custom properties:

```css
:root {
  --bg-page: #f8fafc;
  --panel: #ffffff;
  --text: #1e293b;
  --muted: #64748b;
  --accent: #0066cc;
  --accent-2: #0052a3;
  --border: #e2e8f0;
  --shadow: rgba(0, 0, 0, 0.1);
}

.dark-theme {
  --bg-page: #0f172a;
  --panel: #1e293b;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: #3b82f6;
  --border: #334155;
  --shadow: rgba(0, 0, 0, 0.3);
}
```

### Layout Rules

- **Max width**: 1120px
- **Breakpoints**:
  - Desktop: ≥ 980px
  - Tablet: 560–979px
  - Mobile: ≤ 559px

### Interaction Patterns

- **Hover lift for cards**: `transform: translateY(-4px)`
- **Smooth transitions**: `transition: background 0.2s, color 0.2s`
- **Focus states**: Always visible for keyboard navigation

---

## 4. JavaScript Guidelines

### Architecture

Use small, self-contained ES6 classes:

**ThemeManager**:

- Handles: theme toggle, theme swatches, persistence
- Updates: `dark-theme` class on `<html>`

**VariantManager**:

- Handles: resume tab switching
- Updates: active card + primary CTA button (Open PDF, View HTML)

**App**:

- Bootstraps everything
- Adds focus-visible accessibility

### Coding Conventions

- Use `$()` and `$$()` query helpers for DOM selection
- No global variables (use modules)
- Avoid long functions (split where needed)
- Always check for null DOM refs before using

Example:

```javascript
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

class ThemeManager {
  constructor() {
    this.html = $("html");
    this.toggleBtn = $("#themeToggle");
    this.init();
  }

  init() {
    if (!this.toggleBtn) return; // Null check
    this.toggleBtn.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this.html.classList.toggle("dark-theme");
  }
}
```

---

## 5. Accessibility

### ARIA Roles

Use correct tab roles for variant switcher:

```html
<div role="tablist" aria-label="Resume variants">
  <button class="pill" role="tab" aria-selected="true">Print</button>
  <button class="pill" role="tab" aria-selected="false">ATS</button>
</div>
```

### Requirements

- All clickable items must be reachable using keyboard (Tab, Enter)
- Provide visually-hidden label text for icon-only buttons
- Maintain good contrast ratio (especially in dark theme)
- Use `lang` attribute on `<html>` tag
- Include `alt` text for all images

---

## 6. Visual Design Rules

### Typography

- Heading colors differ from body text for hierarchy
- Use `font-weight: 600` or `700` for emphasis
- Line height: 1.5 for body text, 1.2 for headings

### Components

- **Chips & Pills**: Use soft backgrounds + rounded edges
- **Variant cards**: Use lifting shadow on hover
- **Summary box**: Must remain readable in all themes
- **Links**: Colors must adapt to light/dark mode

### Color Palette

**Light Theme**:

- Primary: `#0066cc`
- Text: `#1e293b`
- Background: `#f8fafc`

**Dark Theme**:

- Primary: `#3b82f6`
- Text: `#e2e8f0`
- Background: `#0f172a`

---

## 7. Commit Message Style

Use conventional commit prefixes:

```
feat: add new theme picker
fix: dark theme summary contrast
refactor: split JS managers
style: improve spacing
docs: add style guide
chore: move CSS files
test: add unit tests for ThemeManager
```

**Format**: `<type>(<scope>): <description>`

Examples:

- `feat(seo): add meta tags and OG image`
- `fix(a11y): improve keyboard navigation`
- `docs(readme): add setup instructions`

---

## 8. Deployment Guidelines

**Recommended**: GitHub Pages

1. Go to **Settings → Pages**
2. Deploy from `main` branch, `/root` folder
3. Vite builds to `dist/` which is deployed automatically via GitHub Actions

**Build Command**: `npm run build`  
**Output Directory**: `dist/`  
**Base Path**: `/resume-website/`

---

## 9. Performance Best Practices

- Preload critical fonts
- Defer non-critical JavaScript
- Use `loading="lazy"` for below-fold images
- Minify CSS and JS in production
- Keep total page size under 500KB

---

## 10. Future Improvements

- [ ] Modular CSS (split `index.css` into components)
- [ ] Move JS classes to separate files under `assets/js/src/`
- [ ] Add automated tests for VariantManager and ThemeManager
- [ ] Add screenshot previews to the README
- [ ] Implement service worker for offline support
- [ ] Add blog section for technical writing

---

## Questions?

For questions or suggestions, open an issue on GitHub or contact via email.

**Last Updated**: December 2025
