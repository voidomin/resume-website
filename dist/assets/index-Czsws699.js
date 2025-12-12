(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const n of i.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = t(s);
    fetch(s.href, i);
  }
})();
const o = (a, e = document) => e.querySelector(a),
  l = (a, e = document) => Array.from(e.querySelectorAll(a));
class c {
  constructor(e = {}) {
    ((this.THEME_KEY = e.storageKey || "resume_theme_v1"),
      (this.THEMES = e.themes || [
        { id: "ocean", label: "Ocean", className: "theme-ocean" },
        { id: "sunset", label: "Sunset", className: "theme-sunset" },
        { id: "forest", label: "Forest", className: "theme-forest" },
      ]),
      (this.shell = o(".shell") || document.body),
      (this.themeToggleBtn = o("#themeToggle")),
      (this.paletteBtn = o("#paletteToggle")),
      (this.themeIcon = o("#themeIcon")),
      (this.themeText = o("#themeText")),
      (this.hero = o(".hero-actions") || null),
      (this.SVG_SUN =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'),
      (this.SVG_MOON =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'),
      this.init());
  }
  init() {
    const e = this._readStoredTheme() || this._getSystemPref();
    if (
      (this.applyTheme(e, !1),
      this.themeToggleBtn &&
        this.themeToggleBtn.addEventListener("click", () => this.toggle()),
      this.paletteBtn &&
        this.paletteBtn.addEventListener("click", () => this.cycleTheme()),
      !this._readStoredTheme() && window.matchMedia)
    ) {
      const t = window.matchMedia("(prefers-color-scheme: dark)");
      t.addEventListener
        ? t.addEventListener("change", () => {
            this.applyTheme(this._getSystemPref(), !0);
          })
        : t.addListener &&
          t.addListener(() => this.applyTheme(this._getSystemPref(), !0));
    }
  }
  _getSystemPref() {
    try {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        return "dark";
    } catch {}
    return "light";
  }
  _readStoredTheme() {
    try {
      return localStorage.getItem(this.THEME_KEY);
    } catch {
      return null;
    }
  }
  _saveTheme(e) {
    try {
      localStorage.setItem(this.THEME_KEY, e);
    } catch {}
  }
  applyTheme(e, t = !0) {
    if (e === "dark" || e === "light") {
      e === "dark"
        ? (document.documentElement.classList.add("dark-theme"),
          this._updateToggleUI(!0))
        : (document.documentElement.classList.remove("dark-theme"),
          this._updateToggleUI(!1));
      return;
    }
    this.THEMES.forEach((i) => {
      (document.body.classList.remove(i.className),
        this.shell.classList.remove(i.className));
    });
    const s = this.THEMES.find((i) => i.id === e) || this.THEMES[0];
    (document.body.classList.add(s.className),
      this.shell.classList.add(s.className),
      this._saveTheme(s.id),
      this._updateToggleUI(!1));
  }
  toggle() {
    const t = document.documentElement.classList.contains("dark-theme")
      ? "light"
      : "dark";
    this.applyTheme(t, !0);
    try {
      localStorage.setItem(this.THEME_KEY, t);
    } catch {}
  }
  cycleTheme() {
    const e = this.THEMES.find((i) =>
        document.body.classList.contains(i.className),
      ),
      t = e ? e.id : this.THEMES[0].id,
      s = (this.THEMES.findIndex((i) => i.id === t) + 1) % this.THEMES.length;
    this.applyTheme(this.THEMES[s].id, !0);
  }
  _updateToggleUI(e) {
    !this.themeIcon ||
      !this.themeText ||
      (e
        ? ((this.themeIcon.innerHTML = this.SVG_SUN),
          (this.themeText.textContent = "Switch to light theme"),
          this.themeToggleBtn &&
            this.themeToggleBtn.setAttribute("aria-pressed", "true"))
        : ((this.themeIcon.innerHTML = this.SVG_MOON),
          (this.themeText.textContent = "Switch to dark theme"),
          this.themeToggleBtn &&
            this.themeToggleBtn.setAttribute("aria-pressed", "false")));
  }
}
class h {
  constructor(e = {}) {
    ((this.pills = l(".pill")),
      (this.variantCards = l(".variant-card")),
      (this.primaryAction = o("#portfolioAction")),
      (this.primaryActionText = o("#portfolioActionText")),
      (this._variantMap = {
        print: { id: "variant-print", prefer: 'a[href*="resume_print.pdf"]' },
        ats: { id: "variant-ats", prefer: 'a[href*="resume_ats.pdf"]' },
        digital: {
          id: "variant-digital",
          prefer: 'a[href*="resume_digital.html"]',
        },
        portfolio: {
          id: "variant-portfolio",
          prefer: 'a[href*="portfolio.html"]',
        },
      }),
      this.init());
  }
  init() {
    (this.pills.forEach((t) => {
      (t.addEventListener("click", () =>
        this.setActiveVariant(t.dataset.variant),
      ),
        t.addEventListener("keydown", (r) => this._pillKeyHandler(r, t)));
    }),
      this.variantCards.forEach((t) => {
        t.addEventListener("click", (r) => {
          if (r.target && r.target.closest("a")) return;
          const s = t.dataset.variant || t.id.replace("variant-", "");
          this.setActiveVariant(s);
        });
      }),
      l(".link-pill").forEach((t) => {
        (t.addEventListener("focus", () => t.classList.add("focus")),
          t.addEventListener("blur", () => t.classList.remove("focus")));
      }));
    const e =
      this.pills.find((t) => t.classList.contains("is-active")) ||
      this.pills[0];
    e && this.setActiveVariant(e.dataset.variant);
  }
  _pillKeyHandler(e, t) {
    const r = this.pills.indexOf(t);
    e.key === "ArrowRight" || e.key === "ArrowDown"
      ? (e.preventDefault(), this.pills[(r + 1) % this.pills.length].focus())
      : e.key === "ArrowLeft" || e.key === "ArrowUp"
        ? (e.preventDefault(),
          this.pills[(r - 1 + this.pills.length) % this.pills.length].focus())
        : (e.key === "Enter" || e.key === " ") &&
          (e.preventDefault(), t.click());
  }
  setActiveVariant(e) {
    (this.pills.forEach((i) => {
      const n = i.dataset.variant === e;
      (i.classList.toggle("is-active", n),
        i.setAttribute("aria-selected", n ? "true" : "false"),
        i.setAttribute("tabindex", n ? "0" : "-1"));
    }),
      this.variantCards.forEach((i) => {
        const n = i.dataset.variant || i.id.replace("variant-", "");
        i.classList.toggle("active", n === e);
      }));
    const t = this._variantMap[e];
    if (!t) {
      this._setPrimaryToPortfolio();
      return;
    }
    const r = document.getElementById(t.id);
    if (!r) {
      this._setPrimaryToPortfolio();
      return;
    }
    let s = r.querySelector(t.prefer);
    if ((s || (s = r.querySelector("a")), s)) {
      const i = s.getAttribute("href");
      this._updatePrimary(i);
    } else this._setPrimaryToPortfolio();
  }
  _setPrimaryToPortfolio() {
    this.primaryAction &&
      (this.primaryAction.setAttribute("href", "portfolio/portfolio.html"),
      this.primaryActionText &&
        (this.primaryActionText.textContent = "Open Portfolio"));
  }
  _updatePrimary(e) {
    if (!this.primaryAction || !e) return;
    (this.primaryAction.setAttribute("href", e),
      this.primaryAction.setAttribute("target", "_blank"),
      this.primaryAction.setAttribute("rel", "noopener noreferrer"));
    const t = /\.pdf($|\?)/i.test(e);
    this.primaryActionText.textContent = t
      ? "Open / Download"
      : "Open — Selected";
  }
}
class d {
  constructor() {
    ((this.themeManager = null), (this.variantManager = null));
  }
  run() {
    ((this.themeManager = new c()),
      (this.variantManager = new h()),
      this._initFocusVisible());
  }
  _initFocusVisible() {
    let e = !1;
    (window.addEventListener("keydown", (t) => {
      t.key === "Tab" && (e = !0);
    }),
      window.addEventListener("mousedown", () => (e = !1)),
      document.addEventListener("focusin", (t) => {
        e && t.target && t.target.classList.add("focus-visible");
      }),
      document.addEventListener("focusout", (t) => {
        t.target && t.target.classList.remove("focus-visible");
      }));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new d().run();
});
