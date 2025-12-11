// main.js — entrypoint loaded by index.html
import { App } from "./src/app.js";
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.run();
});
