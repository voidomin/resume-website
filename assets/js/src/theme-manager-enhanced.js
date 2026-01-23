/**
 * Dark Mode Theme Manager
 * Handles theme toggle and persistence
 */

class ThemeManager {
  constructor() {
    this.THEME_KEY = "resume-theme";
    this.THEMES = {
      LIGHT: "light",
      DARK: "dark",
      AUTO: "auto",
    };
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || this.THEMES.AUTO;
    this.setTheme(savedTheme);
    this.setupToggle();
  }

  setTheme(theme) {
    if (theme === this.THEMES.AUTO) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT
      );
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem(this.THEME_KEY, theme);
    this.updateToggleButton(theme);
  }

  toggleTheme() {
    const current = localStorage.getItem(this.THEME_KEY) || this.THEMES.AUTO;
    const next =
      current === this.THEMES.LIGHT
        ? this.THEMES.DARK
        : current === this.THEMES.DARK
          ? this.THEMES.AUTO
          : this.THEMES.LIGHT;
    this.setTheme(next);
  }

  setupToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  updateToggleButton(theme) {
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      const icons = {
        light: "☀️",
        dark: "🌙",
        auto: "🔄",
      };
      toggle.textContent = icons[theme] || icons.auto;
      toggle.setAttribute("aria-label", `Current theme: ${theme}`);
    }
  }

  getCurrentTheme() {
    return localStorage.getItem(this.THEME_KEY) || this.THEMES.AUTO;
  }
}

// Auto-initialize on document ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.themeManager = new ThemeManager();
  });
} else {
  window.themeManager = new ThemeManager();
}
