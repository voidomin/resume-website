// app.js — boots the managers
import { ThemeManager } from "./theme-manager.js";
import { VariantManager } from "./variant-manager.js";

export class App {
  constructor() {
    this.themeManager = null;
    this.variantManager = null;
  }

  run() {
    this.themeManager = new ThemeManager();
    this.variantManager = new VariantManager();
    this._initFocusVisible();
  }

  _initFocusVisible() {
    let usingKeyboard = false;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        usingKeyboard = true;
      }
    });
    window.addEventListener("mousedown", () => (usingKeyboard = false));

    document.addEventListener("focusin", (ev) => {
      if (usingKeyboard && ev.target) {
        ev.target.classList.add("focus-visible");
      }
    });
    document.addEventListener("focusout", (ev) => {
      if (ev.target) {
        ev.target.classList.remove("focus-visible");
      }
    });
  }
}
// assets/js/src/utils.js
const unused = 123;
