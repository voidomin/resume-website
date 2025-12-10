/* assets/js/index.js
   Single, authoritative script:
   - Theme toggle (dark/light)
   - Theme swatches (ocean/sunset/forest) support if theme-picker exists
   - Resume variant pill switch (accessible)
   Drop this file in place of previous index.js
*/

document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- Theme handling (dark/light + swatches) ---------------- */

  const THEME_KEY = "akash_theme_pref_v2"; // single storage key
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");

  // simple SVGs for icons (keeps small)
  const ICONS = {
    light:
      '<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    dark: '<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
  };

  function setMetaThemeColor(color) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }

  function applyDarkState(isDark) {
    if (isDark) {
      root.classList.add("dark-theme");
      if (themeIcon) themeIcon.innerHTML = ICONS.dark;
      if (themeText) themeText.textContent = "Switch to light theme";
      if (themeToggle) themeToggle.setAttribute("aria-pressed", "true");
      setMetaThemeColor("#07171C");
    } else {
      root.classList.remove("dark-theme");
      if (themeIcon) themeIcon.innerHTML = ICONS.light;
      if (themeText) themeText.textContent = "Switch to dark theme";
      if (themeToggle) themeToggle.setAttribute("aria-pressed", "false");
      setMetaThemeColor("#ffffff");
    }
  }

  function saveThemePref(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (e) {
      /* ignore localStorage errors */
    }
  }
  function readThemePref() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  // Initialize theme on load:
  (function initTheme() {
    // preference order: saved -> OS preference -> light
    const saved = readThemePref();
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    applyDarkState(initial === "dark");
  })();

  // Toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = root.classList.contains("dark-theme");
      const next = isDark ? "light" : "dark";
      applyDarkState(next === "dark");
      saveThemePref(next);
    });
  }

  /* If you also have theme swatches (ocean/sunset/forest), support minimal integration:
     - these are different "look" themes but do not conflict with dark/light.
     - adding a class like "theme-ocean" on the <body> or .shell is expected by CSS.
  */
  const THEMES = [
    { id: "ocean", class: "theme-ocean" },
    { id: "sunset", class: "theme-sunset" },
    { id: "forest", class: "theme-forest" },
  ];
  const THEME_SWATCH_KEY = "akash_theme_swatch_v1";

  function applySwatch(swatchId) {
    // clear existing swatch classes from body
    THEMES.forEach((t) => document.body.classList.remove(t.class));
    const found = THEMES.find((t) => t.id === swatchId);
    if (found) document.body.classList.add(found.class);
    try {
      localStorage.setItem(THEME_SWATCH_KEY, swatchId);
    } catch (e) {}
  }

  // If there is a .theme-picker with .theme-btn items (as built by older code), wire them
  const themePicker = document.querySelector(".theme-picker");
  if (themePicker) {
    const savedSwatch = (function () {
      try {
        return localStorage.getItem(THEME_SWATCH_KEY);
      } catch (e) {
        return null;
      }
    })();
    if (savedSwatch) applySwatch(savedSwatch);

    themePicker.addEventListener("click", (ev) => {
      const btn = ev.target.closest && ev.target.closest(".theme-btn");
      if (!btn) return;
      const id = btn.dataset.theme;
      applySwatch(id);
      // update pressed state for accessibility
      themePicker
        .querySelectorAll(".theme-btn")
        .forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
    });
  }

  /* ----------------- Resume variant pill switch (accessible) ----------------- */

  const pills = Array.from(document.querySelectorAll(".pill"));
  const variantCards = Array.from(document.querySelectorAll(".variant-card"));
  const primaryAction = document.getElementById("portfolioAction"); // primary CTA we set earlier

  function setActiveVariant(variantName) {
    pills.forEach((p) => {
      const isActive = p.dataset && p.dataset.variant === variantName;
      p.classList.toggle("is-active", isActive);
      p.setAttribute("aria-selected", isActive ? "true" : "false");
      p.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    variantCards.forEach((card) => {
      const v = card.dataset && card.dataset.variant;
      card.classList.toggle("is-selected", v === variantName);
    });

    // Optionally update the primaryAction to the variant's preferred link:
    const selectedCard = variantCards.find(
      (c) => c.dataset && c.dataset.variant === variantName
    );
    if (selectedCard && primaryAction) {
      // find a link in the card (prefer pdf or html)
      const preferSelector =
        'a[href$=".pdf"], a[href$=".html"], a[href*="portfolio"], a';
      const link = selectedCard.querySelector(preferSelector);
      if (link) {
        primaryAction.setAttribute("href", link.href);
        primaryAction.setAttribute("target", "_blank");
        primaryAction.setAttribute("rel", "noopener noreferrer");
      }
    }
  }

  // initial set (pick the pill already marked is-active, else first)
  const initialPill =
    pills.find((p) => p.classList.contains("is-active")) || pills[0];
  if (initialPill) setActiveVariant(initialPill.dataset.variant);

  // add events and keyboard navigation
  pills.forEach((pill, idx) => {
    pill.addEventListener("click", () => {
      setActiveVariant(pill.dataset.variant);
    });
    pill.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowRight" || ev.key === "ArrowDown") {
        ev.preventDefault();
        const next = pills[(idx + 1) % pills.length];
        next.focus();
      } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") {
        ev.preventDefault();
        const prev = pills[(idx - 1 + pills.length) % pills.length];
        prev.focus();
      } else if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        pill.click();
      }
    });
  });

  // allow clicking a variant card to select it (unless a link inside clicked)
  variantCards.forEach((card) => {
    card.addEventListener("click", (ev) => {
      if (ev.target.closest && ev.target.closest("a")) return;
      const v = card.dataset && card.dataset.variant;
      if (v) {
        const pill = pills.find((p) => p.dataset.variant === v);
        if (pill) pill.click();
      }
    });
  });

  /* ---------- small polish: keyboard focus visible class for interactive elements ---------- */
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("focus", () => el.classList.add("focus-visible"));
    el.addEventListener("blur", () => el.classList.remove("focus-visible"));
  });
});
