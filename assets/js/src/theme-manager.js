// theme-manager.js
import { $, $$ } from "./utils.js";

export class ThemeManager {
  constructor(options = {}) {
    this.THEME_KEY = options.storageKey || "resume_theme_v1";
    this.THEMES = options.themes || [
      { id: "ocean", label: "Ocean", className: "theme-ocean" },
      { id: "sunset", label: "Sunset", className: "theme-sunset" },
      { id: "forest", label: "Forest", className: "theme-forest" },
    ];

    this.shell = $(".shell") || document.body;
    this.themeToggleBtn = $("#themeToggle");
    this.paletteBtn = $("#paletteToggle"); // optional button if you add it
    this.themeIcon = $("#themeIcon");
    this.themeText = $("#themeText");
    this.hero = $(".hero-actions") || null;

    this.SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`; // you can paste full svgs from your file
    this.SVG_MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    this.init();
  }

  init() {
    const saved = this._readStoredTheme() || this._getSystemPref();
    this.applyTheme(saved, false);

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggle());
    }
    if (this.paletteBtn) {
      this.paletteBtn.addEventListener("click", () => this.cycleTheme());
    }

    if (!this._readStoredTheme() && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) {
        mq.addEventListener("change", () => {
          this.applyTheme(this._getSystemPref(), true);
        });
      } else if (mq.addListener) {
        mq.addListener(() => this.applyTheme(this._getSystemPref(), true));
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
    } catch (e) {}
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
    } catch (e) {}
  }

  applyTheme(themeIdOrMode, animate = true) {
    const isSystemMode = themeIdOrMode === "dark" || themeIdOrMode === "light";
    if (isSystemMode) {
      if (themeIdOrMode === "dark") {
        document.documentElement.classList.add("dark-theme");
        this._updateToggleUI(true);
      } else {
        document.documentElement.classList.remove("dark-theme");
        this._updateToggleUI(false);
      }
      return;
    }

    this.THEMES.forEach((t) => {
      document.body.classList.remove(t.className);
      this.shell.classList.remove(t.className);
    });

    const theme =
      this.THEMES.find((t) => t.id === themeIdOrMode) || this.THEMES[0];
    document.body.classList.add(theme.className);
    this.shell.classList.add(theme.className);

    this._saveTheme(theme.id);
    this._updateToggleUI(false);
  }

  toggle() {
    const isDark = document.documentElement.classList.contains("dark-theme");
    const next = isDark ? "light" : "dark";
    this.applyTheme(next, true);
    try {
      localStorage.setItem(this.THEME_KEY, next);
    } catch (e) {}
  }

  cycleTheme() {
    const currentThemeClass = this.THEMES.find((t) =>
      document.body.classList.contains(t.className),
    );
    const currentId = currentThemeClass
      ? currentThemeClass.id
      : this.THEMES[0].id;
    const currentIndex = this.THEMES.findIndex((t) => t.id === currentId);
    const nextIndex = (currentIndex + 1) % this.THEMES.length;
    this.applyTheme(this.THEMES[nextIndex].id, true);
  }

  _updateToggleUI(isDark) {
    if (!this.themeIcon || !this.themeText) return;
    if (isDark) {
      this.themeIcon.innerHTML = this.SVG_SUN;
      this.themeText.textContent = "Switch to light theme";
      this.themeToggleBtn &&
        this.themeToggleBtn.setAttribute("aria-pressed", "true");
    } else {
      this.themeIcon.innerHTML = this.SVG_MOON;
      this.themeText.textContent = "Switch to dark theme";
      this.themeToggleBtn &&
        this.themeToggleBtn.setAttribute("aria-pressed", "false");
    }
  }
}
