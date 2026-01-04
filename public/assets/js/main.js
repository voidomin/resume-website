// main.js — entrypoint loaded by index.html
import { App } from "./src/app.js";
import { createRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize app
  const app = new App();
  app.run();

  // Initialize router for active nav highlighting
  const router = createRouter({
    base: "/resume-website/",
    activeClass: "active",
    navSelector: "[data-nav-link]",
    knownRoutes: ["home", "portfolio", "print", "ats", "digital"],
  });
  router.init();

  // Make router globally available for debugging (optional)
  window.__router = router;
});
