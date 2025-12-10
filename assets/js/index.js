(() => {
  "use strict";

  /* ---------------------- Utility helpers ---------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ---------------------- ThemeManager ---------------------- */
  class ThemeManager {
    constructor(options = {}) {
      this.THEME_KEY = options.storageKey || "resume_theme_v1";
      // theme definitions — id & css class
      this.THEMES = options.themes || [
        { id: "ocean", label: "Ocean", className: "theme-ocean" },
        { id: "sunset", label: "Sunset", className: "theme-sunset" },
        { id: "forest", label: "Forest", className: "theme-forest" },
      ];

      // DOM refs
      this.shell = $(".shell") || document.body;
      this.themeToggleBtn = $("#themeToggle");
      this.paletteBtn = $("#paletteToggle");
      this.themeIcon = $("#themeIcon");
      this.themeText = $("#themeText");
      this.hero = $(".hero-actions") || null;

      // SVGs
      this.SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      this.SVG_MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

      // init
      this.init();
    }

    init() {
      // Apply saved theme (or system preference)
      const saved = this._readStoredTheme() || this._getSystemPref();
      this.applyTheme(saved, false);

      // wire toggle button (Dark Mode)
      if (this.themeToggleBtn) {
        this.themeToggleBtn.addEventListener("click", () => this.toggle());
      }

      // wire palette button (Theme Color Cycle)
      if (this.paletteBtn) {
        this.paletteBtn.addEventListener("click", () => this.cycleTheme());
      }

      // respond to system changes only if user hasn't saved a pref
      if (!this._readStoredTheme() && window.matchMedia) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        if (mq.addEventListener) {
          mq.addEventListener("change", (e) => {
            this.applyTheme(this._getSystemPref(), true);
          });
        } else if (mq.addListener) {
          mq.addListener((e) => this.applyTheme(this._getSystemPref(), true));
        }
      }
    }

    _getSystemPref() {
      try {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          return "dark";
        }
      } catch (e) {
        // ignore
      }
      return "light";
    }

    _readStoredTheme() {
      try {
        return localStorage.getItem(this.THEME_KEY);
      } catch (e) {
        return null;
      }
    }

    _saveTheme(themeId) {
      try {
        localStorage.setItem(this.THEME_KEY, themeId);
      } catch (e) {
        // ignore (private mode)
      }
    }

    applyTheme(themeIdOrMode, animate = true) {
      // Accept 'dark' / 'light' or one of THEME ids
      const isSystemMode =
        themeIdOrMode === "dark" || themeIdOrMode === "light";
      if (isSystemMode) {
        // toggle 'dark-theme' class
        if (themeIdOrMode === "dark") {
          document.documentElement.classList.add("dark-theme");
          this._updateToggleUI(true);
        } else {
          document.documentElement.classList.remove("dark-theme");
          this._updateToggleUI(false);
        }
        // don't persist here (this is a mode choice, not swatch)
        return;
      }

      // Remove all existing theme classes first
      this.THEMES.forEach((t) => {
        document.body.classList.remove(t.className);
        this.shell.classList.remove(t.className);
      });

      // find theme entry
      const theme =
        this.THEMES.find((t) => t.id === themeIdOrMode) || this.THEMES[0];
      // apply classes
      document.body.classList.add(theme.className);
      this.shell.classList.add(theme.className);

      // persist
      this._saveTheme(theme.id);
      // update toggle icon/text to reflect non-dark (for accessibility)
      this._updateToggleUI(false);
    }

    toggle() {
      // toggles dark <-> light OS-mode, also persists preference
      const isDark = document.documentElement.classList.contains("dark-theme");
      const next = isDark ? "light" : "dark";
      this.applyTheme(next, true);
      try {
        localStorage.setItem(this.THEME_KEY, next);
      } catch (e) {}
    }

    cycleTheme() {
      // Find current active theme, defaulting to first if none match
      const currentThemeClass = this.THEMES.find((t) =>
        document.body.classList.contains(t.className)
      );
      const currentId = currentThemeClass
        ? currentThemeClass.id
        : this.THEMES[0].id;

      // Calculate next index
      const currentIndex = this.THEMES.findIndex((t) => t.id === currentId);
      const nextIndex = (currentIndex + 1) % this.THEMES.length;

      // Apply next theme
      this.applyTheme(this.THEMES[nextIndex].id, true);
    }

    _updateToggleUI(isDark) {
      if (!this.themeIcon || !this.themeText) return;
      if (isDark) {
        // moon -> sun icon
        this.themeIcon.innerHTML = this.SVG_SUN;
        this.themeText.textContent = "Switch to light theme";
        this.themeToggleBtn &&
          this.themeToggleBtn.setAttribute("aria-pressed", "true");
      } else {
        // sun -> moon icon
        this.themeIcon.innerHTML = this.SVG_MOON;
        this.themeText.textContent = "Switch to dark theme";
        this.themeToggleBtn &&
          this.themeToggleBtn.setAttribute("aria-pressed", "false");
      }
    }
  }

  /* ---------------------- VariantManager ---------------------- */
  class VariantManager {
    constructor(options = {}) {
      this.pills = $$(".pill");
      this.variantCards = $$(".variant-card");
      this.primaryAction = $("#portfolioAction");
      this.primaryActionText = $("#portfolioActionText");
      this._variantMap = {
        print: {
          id: "variant-print",
          prefer: 'a[href*="resume_print.pdf"]', // Prefer PDF download for Print
        },
        ats: {
          id: "variant-ats",
          prefer: 'a[href*="resume_ats.pdf"]', // Prefer PDF download for ATS
        },
        digital: {
          id: "variant-digital",
          prefer: 'a[href*="resume_digital.html"]', // Prefer HTML view for Digital
        },
        portfolio: {
          id: "variant-portfolio",
          prefer: 'a[href*="portfolio.html"]',
        },
      };

      this.init();
    }

    init() {
      // wire pill click + keyboard
      this.pills.forEach((p) => {
        p.addEventListener("click", () =>
          this.setActiveVariant(p.dataset.variant)
        );
        p.addEventListener("keydown", (ev) => this._pillKeyHandler(ev, p));
      });

      // also let clicking a card (not its inner link) activate it
      this.variantCards.forEach((card) => {
        card.addEventListener("click", (ev) => {
          if (ev.target && ev.target.closest("a")) return;
          const variant =
            card.dataset.variant || card.id.replace("variant-", "");
          this.setActiveVariant(variant);
        });
      });

      // focus polish for link-pills
      $$(".link-pill").forEach((lp) => {
        lp.addEventListener("focus", () => lp.classList.add("focus"));
        lp.addEventListener("blur", () => lp.classList.remove("focus"));
      });

      // initial selection: use pill with is-active or first
      const start =
        this.pills.find((p) => p.classList.contains("is-active")) ||
        this.pills[0];
      if (start) this.setActiveVariant(start.dataset.variant);
    }

    _pillKeyHandler(ev, pill) {
      const idx = this.pills.indexOf(pill);
      if (ev.key === "ArrowRight" || ev.key === "ArrowDown") {
        ev.preventDefault();
        const next = this.pills[(idx + 1) % this.pills.length];
        next.focus();
      } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") {
        ev.preventDefault();
        const prev =
          this.pills[(idx - 1 + this.pills.length) % this.pills.length];
        prev.focus();
      } else if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        pill.click();
      }
    }

    setActiveVariant(variantName) {
      // update pills UI
      this.pills.forEach((p) => {
        const active = p.dataset.variant === variantName;
        p.classList.toggle("is-active", active);
        p.setAttribute("aria-selected", active ? "true" : "false");
        p.setAttribute("tabindex", active ? "0" : "-1");
      });

      // update cards selection visuals (data-variant attribute used)
      this.variantCards.forEach((card) => {
        const v = card.dataset.variant || card.id.replace("variant-", "");
        card.classList.toggle("active", v === variantName);
      });

      // update primary action (prefers a 'download' or open link)
      const mapping = this._variantMap[variantName];
      if (!mapping) {
        this._setPrimaryToPortfolio();
        return;
      }
      const cardEl = document.getElementById(mapping.id);
      if (!cardEl) {
        this._setPrimaryToPortfolio();
        return;
      }

      // Try to find the preferred link inside the card
      let target = cardEl.querySelector(mapping.prefer);
      if (!target) target = cardEl.querySelector("a");

      if (target) {
        const href = target.getAttribute("href");
        this._updatePrimary(href);
      } else {
        this._setPrimaryToPortfolio();
      }
    }

    _setPrimaryToPortfolio() {
      if (this.primaryAction) {
        this.primaryAction.setAttribute("href", "Portfolio/portfolio.html");
        this.primaryActionText &&
          (this.primaryActionText.textContent = "Open Portfolio");
      }
    }

    _updatePrimary(href) {
      if (!this.primaryAction || !href) return;
      this.primaryAction.setAttribute("href", href);
      this.primaryAction.setAttribute("target", "_blank");
      this.primaryAction.setAttribute("rel", "noopener noreferrer");
      const isPDF = /\.pdf($|\?)/i.test(href);
      this.primaryActionText.textContent = isPDF
        ? "Open / Download"
        : "Open — Selected";
    }
  }

  /* ---------------------- App Bootstrap ---------------------- */
  class App {
    constructor() {
      this.themeManager = null;
      this.variantManager = null;
    }

    run() {
      // instantiate managers
      this.themeManager = new ThemeManager();
      this.variantManager = new VariantManager();

      // small accessibility polish: add focus-visible classes on keyboard nav
      this._initFocusVisible();
    }

    _initFocusVisible() {
      // Detect keyboard vs mouse to add focus-visible polyfill
      let usingKeyboard = false;
      window.addEventListener("keydown", (e) => {
        if (e.key === "Tab") usingKeyboard = true;
      });
      window.addEventListener("mousedown", () => (usingKeyboard = false));
      document.addEventListener("focusin", (ev) => {
        if (usingKeyboard && ev.target)
          ev.target.classList.add("focus-visible");
      });
      document.addEventListener("focusout", (ev) => {
        if (ev.target) ev.target.classList.remove("focus-visible");
      });
    }
  }

  /* ---------------------- Start the App ---------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.run();
  });
})();
