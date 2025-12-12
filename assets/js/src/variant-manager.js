// variant-manager.js
import { $, $$ } from "./utils.js";

export class VariantManager {
  constructor(options = {}) {
    this.pills = $$(".pill");
    this.variantCards = $$(".variant-card");
    this.primaryAction = $("#portfolioAction");
    this.primaryActionText = $("#portfolioActionText");
    this._variantMap = {
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
    };
    this.init();
  }

  init() {
    this.pills.forEach((p) => {
      p.addEventListener("click", () =>
        this.setActiveVariant(p.dataset.variant),
      );
      p.addEventListener("keydown", (ev) => this._pillKeyHandler(ev, p));
    });

    this.variantCards.forEach((card) => {
      card.addEventListener("click", (ev) => {
        if (ev.target && ev.target.closest("a")) return;
        const variant = card.dataset.variant || card.id.replace("variant-", "");
        this.setActiveVariant(variant);
      });
    });

    $$(".link-pill").forEach((lp) => {
      lp.addEventListener("focus", () => lp.classList.add("focus"));
      lp.addEventListener("blur", () => lp.classList.remove("focus"));
    });

    const start =
      this.pills.find((p) => p.classList.contains("is-active")) ||
      this.pills[0];
    if (start) this.setActiveVariant(start.dataset.variant);
  }

  _pillKeyHandler(ev, pill) {
    const idx = this.pills.indexOf(pill);
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") {
      ev.preventDefault();
      const next = this.pills[(idx + 1) % this.pills.length];
      next.focus();
    } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") {
      ev.preventDefault();
      const prev =
        this.pills[(idx - 1 + this.pills.length) % this.pills.length];
      prev.focus();
    } else if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      pill.click();
    }
  }

  setActiveVariant(variantName) {
    this.pills.forEach((p) => {
      const active = p.dataset.variant === variantName;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-selected", active ? "true" : "false");
      p.setAttribute("tabindex", active ? "0" : "-1");
    });

    this.variantCards.forEach((card) => {
      const v = card.dataset.variant || card.id.replace("variant-", "");
      card.classList.toggle("active", v === variantName);
    });

    const mapping = this._variantMap[variantName];
    if (!mapping) {
      this._setPrimaryToPortfolio();
      return;
    }
    const cardEl = document.getElementById(mapping.id);
    if (!cardEl) {
      this._setPrimaryToPortfolio();
      return;
    }

    let target = cardEl.querySelector(mapping.prefer);
    if (!target) target = cardEl.querySelector("a");

    if (target) {
      const href = target.getAttribute("href");
      this._updatePrimary(href);
    } else {
      this._setPrimaryToPortfolio();
    }
  }

  _setPrimaryToPortfolio() {
    if (this.primaryAction) {
      this.primaryAction.setAttribute("href", "portfolio/portfolio.html");
      if (this.primaryActionText)
        this.primaryActionText.textContent = "Open Portfolio";
    }
  }

  _updatePrimary(href) {
    if (!this.primaryAction || !href) return;
    this.primaryAction.setAttribute("href", href);
    this.primaryAction.setAttribute("target", "_blank");
    this.primaryAction.setAttribute("rel", "noopener noreferrer");
    const isPDF = /\.pdf($|\?)/i.test(href);
    this.primaryActionText.textContent = isPDF
      ? "Open / Download"
      : "Open — Selected";
  }
}
