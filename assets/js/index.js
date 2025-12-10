/**
 * assets/js/index.js
 * Refactored OOP-style manager-based script for index.html
 *
 * - ThemeManager: handles swatches, persisted choice and OS pref
 * - VariantManager: handles pill/tab switching, card selection, primary action update
 * - App: boots everything and wires managers together
 *
 * Keep DOM ids/classes consistent with index.html:
 * - #themeToggle, #themeIcon, #themeText  (theme toggle button)
 * - .theme-picker (swatches injected)
 * - .theme-select (select fallback - created by ThemeManager)
 * - .pill-switch .pill (variant tabs)
 * - .variant-card (cards with data-variant attr)
 * - #primaryAction and #primaryActionText (main CTA button)
 */

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
      this.themeIcon = $("#themeIcon");
      this.themeText = $("#themeText");
      this.hero = $(".hero-actions") || null;

      // init
      this.init();
    }

    init() {
      // Add theme picker swatches and select fallback to hero
      this._buildThemePicker();
      // Apply saved theme (or system preference)
      const saved = this._readStoredTheme() || this._getSystemPref();
      this.applyTheme(saved, false);

      // wire toggle button
      if (this.themeToggleBtn) {
        this.themeToggleBtn.addEventListener("click", () => this.toggle());
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
      // sync swatches/select UI
      this._syncPickerUI(theme.id);
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

    _updateToggleUI(isDark) {
      if (!this.themeIcon || !this.themeText) return;
      if (isDark) {
        // moon -> sun icon
        this.themeIcon.textContent = "☀️";
        this.themeText.textContent = "Switch to light theme";
        this.themeToggleBtn &&
          this.themeToggleBtn.setAttribute("aria-pressed", "true");
      } else {
        this.themeIcon.textContent = "🌙";
        this.themeText.textContent = "Switch to dark theme";
        this.themeToggleBtn &&
          this.themeToggleBtn.setAttribute("aria-pressed", "false");
      }
    }

    _buildThemePicker() {
      if (!this.hero) return;

      // avoid re-inserting multiple times
      if ($(".theme-picker", this.hero)) return;

      const wrapper = document.createElement("div");
      wrapper.className = "theme-picker";
      wrapper.setAttribute("role", "radiogroup");
      wrapper.setAttribute("aria-label", "Choose visual theme");

      this.THEMES.forEach((t) => {
        const btn = document.createElement("button");
        btn.className = "theme-btn";
        btn.type = "button";
        btn.dataset.theme = t.id;
        btn.title = t.label;
        btn.setAttribute("aria-pressed", "false");
        // quick inline color hints (optional)
        if (t.id === "sunset") {
          btn.style.background = "linear-gradient(135deg,#fb923c,#f97316)";
        } else if (t.id === "ocean") {
          btn.style.background = "linear-gradient(135deg,#06b6d4,#0891b2)";
        } else if (t.id === "forest") {
          btn.style.background = "linear-gradient(135deg,#16a34a,#4ade80)";
        }
        btn.addEventListener("click", () => {
          this.applyTheme(t.id, true);
          // mark aria state
          wrapper
            .querySelectorAll(".theme-btn")
            .forEach((b) => b.setAttribute("aria-pressed", "false"));
          btn.setAttribute("aria-pressed", "true");
        });
        wrapper.appendChild(btn);
      });

      // label text for the control
      const label = document.createElement("span");
      label.style.fontSize = "12px";
      label.style.color = "var(--muted)";
      label.style.marginLeft = "6px";
      label.textContent = "Theme";
      wrapper.appendChild(label);

      // accessible select fallback (hidden on large screens via CSS)
      const sel = document.createElement("select");
      sel.className = "theme-select";
      sel.setAttribute("aria-label", "Choose theme");
      this.THEMES.forEach((t) => {
        const op = document.createElement("option");
        op.value = t.id;
        op.textContent = t.label;
        sel.appendChild(op);
      });
      sel.addEventListener("change", () => this.applyTheme(sel.value, true));
      wrapper.appendChild(sel);

      this.hero.appendChild(wrapper);

      // set initial pressed state from stored theme
      const saved = this._readStoredTheme();
      if (saved) {
        const pressed = wrapper.querySelector(
          `.theme-btn[data-theme="${saved}"]`
        );
        if (pressed) pressed.setAttribute("aria-pressed", "true");
        const selEl = wrapper.querySelector(".theme-select");
        if (selEl) selEl.value = saved;
      }
    }

    _syncPickerUI(themeId) {
      const swatches = $$(".theme-btn");
      swatches.forEach((b) =>
        b.setAttribute(
          "aria-pressed",
          b.dataset.theme === themeId ? "true" : "false"
        )
      );
      const select = $(".theme-select");
      if (select) select.value = themeId;
    }
  }

  /* ---------------------- VariantManager ---------------------- */
  class VariantManager {
    constructor(options = {}) {
      this.pills = $$(".pill");
      this.variantCards = $$(".variant-card");
      this.primaryAction = $("#primaryAction");
      this.primaryActionText = $("#primaryActionText");
      this._variantMap = {
        print: {
          id: "variant-print",
          prefer: 'a[href*="resume_print.html"], a[href*="resume_print.pdf"]',
        },
        ats: {
          id: "variant-ats",
          prefer: 'a[href*="resume_ats.html"], a[href*="resume_ats.pdf"]',
        },
        digital: {
          id: "variant-digital",
          prefer:
            'a[href*="resume_digital.html"], a[href*="resume_digital.html"]',
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
