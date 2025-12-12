# Style Guide — Resume & Portfolio

This guide defines conventions for HTML, CSS, JS, and project structure.  
Use this as the baseline for all future updates.

---

## 1. Folder & File Conventions

**Root**

- `index.html` → landing page
- `Portfolio/` → standalone portfolio page
- `Print/`, `Ats/`, `Digital/` → resume versions
- `assets/` → shared files (css/js/img)
- `docs/` → documentation

**Naming Rules**

- Files: `kebab-case`
- Classes: `kebab-case`
- JS classes: `PascalCase`
- JS variables: `camelCase`

---

## 2. HTML Standards

- Keep structure semantic: `header`, `section`, `article`, `footer`
- Use `aria-label`, `role`, `aria-selected` where needed
- Prefer `<button>` for interactive UI elements
- Each variant card must include:
  - `data-variant="xyz"`
  - `id="variant-xyz"`

Example:

```html
<article class="variant-card" data-variant="print" id="variant-print">
  ## 3. CSS Guidelines Theme Variables All colors and spacing use CSS variables: css Copy code
  --bg-page --panel --text --muted --accent --accent-2 --border --shadow Dark theme overrides
  inside: css Copy code .dark-theme { --text: #e6f0f8; --panel: #07171c; } Layout Rules Max width:
  1120px Breakpoints: Desktop: ≥ 980px Tablet: 560–979px Mobile: ≤ 559px Interaction Hover lift for
  cards: transform: translateY(-4px) Smooth color transitions: transition: background .2s, color .2s
  ##4. JavaScript Guidelines Architecture Use small self-contained classes: ThemeManager Handles:
  theme toggle, theme swatches, persistence Updates: dark-theme class on
  <html>
    VariantManager Handles: resume tab switching Updates: active card + primary CTA button (Open
    PDF, View HTML) App Bootstraps everything Adds focus-visible accessibility Coding Conventions
    Use $() and $$() query helpers No global variables Avoid long functions (split where needed)
    Always check for null DOM refs ##5. Accessibility Use correct tab roles: html Copy code
    <div role="tablist">
      <button role="tab" aria-selected="true">Print</button>
    </div>
    All clickable items must be reachable using keyboard Provide visually-hidden label text for
    icons Maintain good contrast ratio (especially in dark theme) ##6. Visual Design Rules Heading
    colors differ from body text for hierarchy Chips & Pills use soft backgrounds + rounded edges
    Variant cards use lifting shadow on hover Summary box must remain readable in all themes Link
    colors must adapt to light/dark mode ##7. Commit Message Style Use prefixes: vbnet Copy code
    feat: add new theme picker fix: dark theme summary contrast refactor: split JS managers style:
    improve spacing docs: add style guide chore: move CSS files ##8. Deployment Guidelines
    Recommended: GitHub Pages bash Copy code Settings → Pages → Deploy from /root or use gh-pages
    branch. ##9. Future Improvements Modular CSS (split index.css into components) Move JS classes
    to separate files under assets/js/modules/ Add automated tests for VariantManager Add screenshot
    previews to the README yaml Copy code --- # Ready for Next Step Once you paste these two files
    into your repo, tell me: 👉 **“Okay done, what’s next?”** Then we’ll continue with:
    **refactoring plan → modularizing → maybe building a tiny component system → improving portfolio
    → cleaner animations**.
  </html>
</article>
```
