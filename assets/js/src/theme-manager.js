// theme-manager.js
import { $ } from "./utils.js";

export class ThemeManager {
  constructor(options = {}) {
    this.COLOR_THEME_KEY = options.colorKey || "resume_color_theme";
    this.DARK_THEME_KEY = options.storageKey || "resume_theme_v1";
    this.COLOR_THEMES = [
      "",
      "theme-sunset",
      "theme-vibrant",
      "theme-forest",
      "theme-midnight",
      "theme-gold",
    ];

    this.shell = $(".shell") || document.body;
    this.themeToggleBtn = document.getElementById("themeToggle");
    this.paletteBtn = $(".palette-toggle");
    this.themeMenu = $(".theme-menu");
    this.themeChoices = document.querySelectorAll(".theme-choice");
    this.themeIcon = document.getElementById("themeIcon");
    this.themeText = document.getElementById("themeText");

    this.SVG_SUN =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    this.SVG_MOON =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    this.init();
  }

  init() {
    // Load color theme
    const savedColor = this._readColorTheme();
    this._applyColorTheme(savedColor);

    // Load dark/light theme
    const saved = this._readStoredTheme() || this._getSystemPref();
    this.applyTheme(saved, false);

    // Event listeners
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggle());
    }
    if (this.paletteBtn) {
      this.paletteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.themeMenu) {
          this.themeMenu.style.display = this.themeMenu.style.display === "none" ? "block" : "none";
        }
      });
    }

    // Theme choices menu
    this.themeChoices.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        e.stopPropagation();
        const theme = choice.getAttribute("data-theme");
        this._saveColorTheme(theme);
        this._applyColorTheme(theme);
        if (this.themeMenu) {
          this.themeMenu.style.display = "none";
        }
      });
    });

    // Close menu on outside click
    document.addEventListener("click", () => {
      if (this.themeMenu) {
        this.themeMenu.style.display = "none";
      }
    });

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
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch (e) {
      void e;
    }
    return "dark";
  }

  _readStoredTheme() {
    try {
      return localStorage.getItem(this.DARK_THEME_KEY);
    } catch (e) {
      void e;
      return null;
    }
  }

  _saveTheme(themeId) {
    try {
      localStorage.setItem(this.DARK_THEME_KEY, themeId);
    } catch (e) {
      void e;
    }
  }

  _readColorTheme() {
    try {
      return localStorage.getItem(this.COLOR_THEME_KEY) || "";
    } catch (e) {
      void e;
      return "";
    }
  }

  _saveColorTheme(theme) {
    try {
      localStorage.setItem(this.COLOR_THEME_KEY, theme);
    } catch (e) {
      void e;
    }
  }

  _applyColorTheme(theme) {
    this.COLOR_THEMES.forEach((t) => {
      document.documentElement.classList.remove(t);
    });
    if (theme) {
      document.documentElement.classList.add(theme);
    }
  }

  applyTheme(themeIdOrMode, _animate = true) {
    const isSystemMode = themeIdOrMode === "dark" || themeIdOrMode === "light";
    if (isSystemMode) {
      if (themeIdOrMode === "dark") {
        document.documentElement.classList.add("dark-theme");
        this._updateToggleUI(true);
      } else {
        document.documentElement.classList.remove("dark-theme");
        this._updateToggleUI(false);
      }
      this._saveTheme(themeIdOrMode);
      return;
    }
  }

  toggle() {
    const stored = this._readStoredTheme() || this._getSystemPref();
    const isLight =
      stored === "light" || !document.documentElement.classList.contains("dark-theme");
    this.applyTheme(isLight ? "dark" : "light", true);
  }

  _updateToggleUI(isDark) {
    if (this.themeIcon && this.themeText) {
      this.themeIcon.innerHTML = isDark ? this.SVG_SUN : this.SVG_MOON;
      this.themeText.textContent = isDark ? "Light" : "Dark";
    }
  }
}
