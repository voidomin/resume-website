/* assets/js/index.js
   OOP-style UI controller for index.html
   - Theme handling (light/dark + named swatches)
   - Variant pill switch + active card management
   - Primary action update
   - Small a11y improvements
*/

class ResumeUI {
  constructor(opts = {}) {
    // DOM references
    this.shell = document.querySelector(".shell");
    this.pills = Array.from(document.querySelectorAll(".pill"));
    this.cards = Array.from(document.querySelectorAll(".variant-card"));
    this.primaryAction = document.getElementById("portfolioAction"); // initial primary action (portfolio)
    this.portfolioActionText = document.getElementById("portfolioActionText");
    this.themeToggleBtn = document.getElementById("themeToggle");
    this.themeIcon = document.getElementById("themeIcon");
    this.themeText = document.getElementById("themeText");

    // constants
    this.THEME_KEY = "resume_theme_pref_v2";
    this.THEMES = [
      { id: "light", label: "Light", className: "" },
      { id: "dark", label: "Dark", className: "dark-theme" },
      { id: "ocean", label: "Ocean", className: "theme-ocean" },
      { id: "sunset", label: "Sunset", className: "theme-sunset" },
      { id: "forest", label: "Forest", className: "theme-forest" },
    ];

    // mapping for preferred primaryAction per variant
    this.VARIANT_MAP = {
      print: "Print/resume_print.pdf",
      ats: "Ats/resume_ats.pdf",
      digital: "Digital/resume_digital.html",
      portfolio: "Portfolio/portfolio.html",
    };

    // initialize
    this.init();
  }

  init() {
    this._initPills();
    this._initCardsClickable();
    this._initTheme();
    this._initThemeToggle();
    this._focusPolish();
    this._setInitialVariant();
  }

  // -------------------- PILL / VARIANT LOGIC --------------------
  _initPills() {
    this.pills.forEach((pill, idx) => {
      pill.addEventListener("click", () =>
        this.setActiveVariant(pill.dataset.variant)
      );
      pill.addEventListener("keydown", (ev) => this._pillKeyHandler(ev, idx));
    });
  }

  _pillKeyHandler(ev, idx) {
    const RIGHT = ["ArrowRight", "ArrowDown"];
    const LEFT = ["ArrowLeft", "ArrowUp"];
    if (RIGHT.includes(ev.key)) {
      ev.preventDefault();
      const next = this.pills[(idx + 1) % this.pills.length];
      next.focus();
    } else if (LEFT.includes(ev.key)) {
      ev.preventDefault();
      const prev =
        this.pills[(idx - 1 + this.pills.length) % this.pills.length];
      prev.focus();
    } else if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this.pills[idx].click();
    }
  }

  // clicking on a variant card selects it (unless user clicked a link)
  _initCardsClickable() {
    this.cards.forEach((card) => {
      card.addEventListener("click", (ev) => {
        if (ev.target && ev.target.closest("a")) return;
        const variant = card.dataset.variant;
        if (variant) this.setActiveVariant(variant);
      });
    });
  }

  setActiveVariant(variantName) {
    // update pills visual + aria
    this.pills.forEach((p) => {
      const active = p.dataset.variant === variantName;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-selected", active ? "true" : "false");
      p.setAttribute("tabindex", active ? "0" : "-1");
    });

    // update cards visual
    this.cards.forEach((c) => {
      const v = c.dataset.variant;
      c.classList.toggle("is-selected", v === variantName);
    });

    // update primary action href & label (choose preferred link or fallback)
    const pref = this.VARIANT_MAP[variantName] || this.VARIANT_MAP.portfolio;
    // If pref points to a pdf -> "Open / Download", else "Open"
    this._updatePrimaryAction(pref);
  }

  _updatePrimaryAction(href) {
    // update link; we use the portfolioAction node as the "primary" CTA
    if (!this.primaryAction) return;
    this.primaryAction.setAttribute("href", href);
    this.primaryAction.setAttribute("target", "_blank");
    this.primaryAction.setAttribute("rel", "noopener noreferrer");

    const isPDF = /\.pdf($|\?)/i.test(href);
    this.portfolioActionText.textContent = isPDF
      ? "Open / Download"
      : "Open — Selected";
  }

  _setInitialVariant() {
    const activePill =
      this.pills.find((p) => p.classList.contains("is-active")) ||
      this.pills[0];
    if (activePill) this.setActiveVariant(activePill.dataset.variant);
  }

  // -------------------- THEME LOGIC --------------------
  _initTheme() {
    // apply saved theme, or default to system preference
    const saved = this._readTheme();
    if (saved) this.applyTheme(saved, false);
    else {
      const osPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.applyTheme(osPrefersDark ? "dark" : "light", false);
    }
  }

  _initThemeToggle() {
    if (!this.themeToggleBtn) return;
    this.themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark-theme");
      const next = isDark ? "light" : "dark";
      this.applyTheme(next, true);
      this._saveTheme(next);
    });
  }

  applyTheme(themeId, animate = true) {
    // remove all theme classes
    this.THEMES.forEach((t) => {
      if (t.className) document.documentElement.classList.remove(t.className);
      if (t.className) this.shell.classList.remove(t.className);
    });

    const theme = this.THEMES.find((t) => t.id === themeId) || this.THEMES[0];

    if (theme.className) {
      document.documentElement.classList.add(theme.className);
      this.shell.classList.add(theme.className);
    }

    // update small UI bits (icon + hidden text)
    if (themeId === "dark") {
      this._setThemeIcon("dark");
      this.themeToggleBtn &&
        this.themeToggleBtn.setAttribute("aria-pressed", "true");
      if (this.themeText) this.themeText.textContent = "Switch to light theme";
    } else {
      this._setThemeIcon("light");
      this.themeToggleBtn &&
        this.themeToggleBtn.setAttribute("aria-pressed", "false");
      if (this.themeText) this.themeText.textContent = "Switch to dark theme";
    }

    // animate subtle shell transition
    if (animate) {
      this.shell.style.transition =
        "background 420ms ease, box-shadow 420ms ease, border-color 320ms ease";
      document.body.style.transition =
        "background 420ms ease, color 320ms ease";
    }
  }

  _setThemeIcon(kind) {
    // simple SVG icons
    const ICONS = {
      light:
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      dark: '<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    };
    if (this.themeIcon) this.themeIcon.innerHTML = ICONS[kind] || ICONS.light;
  }

  _saveTheme(themeId) {
    try {
      localStorage.setItem(this.THEME_KEY, themeId);
    } catch (e) {
      /* ignore */
    }
  }
  _readTheme() {
    try {
      return localStorage.getItem(this.THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  // -------------------- A11Y & small UX polish --------------------
  _focusPolish() {
    // add focus-visible like helpers (improves keyboard UX)
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("focus", () => el.classList.add("focus-visible"));
      el.addEventListener("blur", () => el.classList.remove("focus-visible"));
    });
  }
}

/* Initialize on DOM ready */
document.addEventListener("DOMContentLoaded", () => {
  const ui = new ResumeUI();
});
