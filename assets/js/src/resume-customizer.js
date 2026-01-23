/**
 * Resume Customizer
 * Dynamic UI to customize resume sections and content
 */

class ResumeCustomizer {
  constructor() {
    this.STORAGE_KEY = "resume_customization";
    this.sections = [
      { id: "cv-summary", label: "Professional Summary", enabled: true },
      { id: "cv-work-section", label: "Work Experience", enabled: true },
      { id: "cv-projects-section", label: "Projects", enabled: true },
      { id: "cv-skills-section", label: "Skills", enabled: true },
      { id: "cv-education-section", label: "Education", enabled: true },
      { id: "cv-publications-section", label: "Publications", enabled: true },
      { id: "cv-awards-section", label: "Awards & Recognition", enabled: true },
      { id: "cv-languages-section", label: "Languages", enabled: true },
      { id: "cv-certifications-section", label: "Certifications", enabled: true },
    ];
    this.init();
  }

  init() {
    this.loadCustomization();
    this.createCustomizerUI();
    this.setupDragAndDrop();
  }

  createCustomizerUI() {
    const customizer = document.createElement("div");
    customizer.id = "resume-customizer";
    customizer.className = "customizer-panel";
    customizer.innerHTML = `
      <button class="customizer-toggle" onclick="window.resumeCustomizer?.togglePanel()">
        ⚙️ Customize
      </button>
      <div class="customizer-content" style="display: none;">
        <div class="customizer-header">
          <h3>Customize Your Resume</h3>
          <button class="close-btn" onclick="window.resumeCustomizer?.togglePanel()">✕</button>
        </div>
        <div class="customizer-body">
          <div class="customizer-section">
            <h4>Visible Sections</h4>
            <div class="section-toggles" id="section-toggles"></div>
          </div>
          <div class="customizer-section">
            <h4>Section Order (Drag to reorder)</h4>
            <div class="section-order" id="section-order"></div>
          </div>
          <div class="customizer-actions">
            <button class="btn-primary" onclick="window.resumeCustomizer?.exportCustomized()">
              📥 Export Customized Resume
            </button>
            <button class="btn-secondary" onclick="window.resumeCustomizer?.resetCustomization()">
              🔄 Reset
            </button>
            <button class="btn-secondary" onclick="window.resumeCustomizer?.shareCustomization()">
              🔗 Share Configuration
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertBefore(customizer, document.body.firstChild);
    this.renderToggles();
    this.renderOrder();
  }

  renderToggles() {
    const togglesDiv = document.getElementById("section-toggles");
    togglesDiv.innerHTML = this.sections
      .map(
        (section) => `
      <label class="toggle-label">
        <input type="checkbox" 
               class="section-toggle" 
               data-section="${section.id}" 
               ${section.enabled ? "checked" : ""} 
               onchange="window.resumeCustomizer?.toggleSection('${section.id}', this.checked)">
        <span>${section.label}</span>
      </label>
    `
      )
      .join("");
  }

  renderOrder() {
    const orderDiv = document.getElementById("section-order");
    orderDiv.innerHTML = `
      <ul class="sortable-list" id="sortable-sections">
        ${this.sections
          .filter((s) => s.enabled)
          .map(
            (section) => `<li draggable="true" data-section="${section.id}">${section.label}</li>`
          )
          .join("")}
      </ul>
    `;
    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    const list = document.getElementById("sortable-sections");
    if (!list) return;

    const items = list.querySelectorAll("li");
    items.forEach((item) => {
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.target.classList.add("dragging");
      });

      item.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
      });

      item.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const dragging = list.querySelector(".dragging");
        const afterElement = this.getDragAfterElement(list, e.clientY);
        if (afterElement === null) {
          list.appendChild(dragging);
        } else {
          list.insertBefore(dragging, afterElement);
        }
        this.updateSectionOrder();
      });
    });
  }

  getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  toggleSection(sectionId, enabled) {
    const section = this.sections.find((s) => s.id === sectionId);
    if (section) {
      section.enabled = enabled;
      this.applyCustomization();
      this.renderOrder();
      this.saveCustomization();
    }
  }

  updateSectionOrder() {
    const list = document.getElementById("sortable-sections");
    const newOrder = Array.from(list.querySelectorAll("li")).map((li) =>
      li.getAttribute("data-section")
    );

    // Update sections order
    const newSections = [];
    newOrder.forEach((id) => {
      const section = this.sections.find((s) => s.id === id);
      if (section) newSections.push(section);
    });

    // Keep disabled sections at the end
    this.sections.filter((s) => !s.enabled).forEach((s) => newSections.push(s));
    this.sections = newSections;

    this.applyCustomization();
    this.saveCustomization();
  }

  applyCustomization() {
    this.sections.forEach((section) => {
      const el =
        document.getElementById(section.id) || document.querySelector(`[id="${section.id}"]`);
      if (el) {
        el.style.display = section.enabled ? "block" : "none";
      }
    });

    // Reorder sections
    const resume = document.querySelector(".resume");
    if (resume) {
      const enabledSections = this.sections.filter((s) => s.enabled);
      enabledSections.forEach((section) => {
        const el =
          document.getElementById(section.id) || document.querySelector(`[id="${section.id}"]`);
        if (el && el.parentElement === resume) {
          resume.appendChild(el);
        }
      });
    }
  }

  exportCustomized() {
    const activeRole = document.body.getAttribute("data-role") || "developer-testing";
    const filename = `resume-customized-${activeRole}-${new Date().toISOString().split("T")[0]}.html`;

    // Get current HTML
    const resume = document.querySelector(".resume").outerHTML;
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Customized Resume</title>
  <style>
    ${document.querySelector("style")?.innerText || ""}
  </style>
</head>
<body>
  ${resume}
</body>
</html>
    `;

    // Download
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  shareCustomization() {
    const config = {
      enabledSections: this.sections.filter((s) => s.enabled).map((s) => s.id),
      order: this.sections.map((s) => s.id),
    };

    const encoded = btoa(JSON.stringify(config));
    const url = `${window.location.href}?customize=${encoded}`;

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert("Configuration link copied to clipboard!");
    });

    console.log("Share this URL:", url);
  }

  saveCustomization() {
    const config = {
      sections: this.sections,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  loadCustomization() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("customize")) {
      try {
        const config = JSON.parse(atob(params.get("customize")));
        const enabledIds = new Set(config.enabledSections);
        this.sections = this.sections.filter((s) => enabledIds.has(s.id));
      } catch (e) {
        console.error("Failed to load customization:", e);
      }
    } else {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          const config = JSON.parse(saved);
          this.sections = config.sections;
        } catch (e) {
          console.error("Failed to load saved customization:", e);
        }
      }
    }
  }

  togglePanel() {
    const content = document.querySelector(".customizer-content");
    if (content) {
      content.style.display = content.style.display === "none" ? "block" : "none";
    }
  }

  resetCustomization() {
    if (confirm("Reset to default configuration?")) {
      localStorage.removeItem(this.STORAGE_KEY);
      window.location.reload();
    }
  }
}

// Initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.resumeCustomizer = new ResumeCustomizer();
  });
} else {
  window.resumeCustomizer = new ResumeCustomizer();
}
