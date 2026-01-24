/**
 * main.js - Premium Redesign Entry Point
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
});

/* -------------------------------------------------------------------------- */
/*                                THEME LOGIC                                 */
/* -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  const html = document.documentElement;

  // 1. Check local storage
  const savedTheme = localStorage.getItem("theme");

  // 2. Check system preference
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let currentTheme = savedTheme || (systemDark ? "dark" : "light");
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(currentTheme);
    });
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }
}

/* -------------------------------------------------------------------------- */
/*                                NAVBAR LOGIC                                */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}
