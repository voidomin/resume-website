/**
 * Resume Comparison Tool
 * Side-by-side comparison of different role resumes
 */

class ResumeComparator {
  constructor() {
    this.roles = ["developer-testing", "bioinformatics", "data-business-analyst"];
    this.selectedRoles = [this.roles[0], this.roles[1]];
    this.init();
  }

  init() {
    this.createComparisonUI();
  }

  createComparisonUI() {
    // Create comparison container if main ATS page
    if (document.body.getAttribute("data-role") === "main") {
      const container = document.createElement("div");
      container.id = "comparison-container";
      container.innerHTML = `
        <div class="comparison-controls">
          <h3>Compare Resumes</h3>
          <div class="role-selectors">
            <select id="role-left" aria-label="Select first resume">
              ${this.roles.map((r) => `<option value="${r}">${this.formatRoleName(r)}</option>`).join("")}
            </select>
            <select id="role-right" aria-label="Select second resume">
              ${this.roles
                .map((r, i) =>
                  i === 1
                    ? `<option value="${r}" selected>${this.formatRoleName(r)}</option>`
                    : `<option value="${r}">${this.formatRoleName(r)}</option>`
                )
                .join("")}
            </select>
          </div>
          <button id="compare-btn" onclick="window.comparator?.compare()">Compare</button>
          <button id="comparison-close" onclick="this.parentElement.parentElement.style.display='none'">Close</button>
        </div>
        <div class="comparison-results" id="comparison-results"></div>
      `;
      document
        .querySelector(".download-buttons")
        .parentElement.insertBefore(
          container,
          document.querySelector(".download-buttons").nextSibling
        );
    }
  }

  formatRoleName(role) {
    return role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  async compare() {
    const roleLeft = document.getElementById("role-left")?.value || this.roles[0];
    const roleRight = document.getElementById("role-right")?.value || this.roles[1];

    try {
      // Use relative path for GitHub Pages compatibility
      // When in /public/ats/, we need to go up one level to /public/ then down to /data/
      const basePath = window.location.pathname.includes("/resume-website/")
        ? "../../public/data/roles/"
        : "../data/roles/";
      const [dataLeft, dataRight] = await Promise.all([
        fetch(`${basePath}${roleLeft}.json`).then((r) => r.json()),
        fetch(`${basePath}${roleRight}.json`).then((r) => r.json()),
      ]);

      this.displayComparison(dataLeft, dataRight, roleLeft, roleRight);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  }

  displayComparison(dataLeft, dataRight, roleLeft, roleRight) {
    const resultsDiv = document.getElementById("comparison-results");
    const comparison = this.generateComparisonHTML(dataLeft, dataRight, roleLeft, roleRight);
    resultsDiv.innerHTML = comparison;
    resultsDiv.scrollIntoView({ behavior: "smooth" });
  }

  generateComparisonHTML(dataLeft, dataRight, roleLeft, roleRight) {
    return `
      <div class="comparison-table">
        <div class="comparison-row">
          <div class="comparison-header">${this.formatRoleName(roleLeft)}</div>
          <div class="comparison-header">Comparison</div>
          <div class="comparison-header">${this.formatRoleName(roleRight)}</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-cell"><strong>Summary:</strong><br>${dataLeft.summary?.substring(0, 150)}...</div>
          <div class="comparison-cell">Summary</div>
          <div class="comparison-cell"><strong>Summary:</strong><br>${dataRight.summary?.substring(0, 150)}...</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-cell"><strong>Skills Count:</strong> ${dataLeft.skills?.length || 0}</div>
          <div class="comparison-cell">Skills</div>
          <div class="comparison-cell"><strong>Skills Count:</strong> ${dataRight.skills?.length || 0}</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-cell"><strong>Experience:</strong> ${dataLeft.work_experience?.length || 0} roles</div>
          <div class="comparison-cell">Experience</div>
          <div class="comparison-cell"><strong>Experience:</strong> ${dataRight.work_experience?.length || 0} roles</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-cell"><strong>Projects:</strong> ${dataLeft.projects?.length || 0}</div>
          <div class="comparison-cell">Projects</div>
          <div class="comparison-cell"><strong>Projects:</strong> ${dataRight.projects?.length || 0}</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-cell"><strong>Education:</strong> ${dataLeft.education?.map((e) => e.degree).join(", ")}</div>
          <div class="comparison-cell">Education</div>
          <div class="comparison-cell"><strong>Education:</strong> ${dataRight.education?.map((e) => e.degree).join(", ")}</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-cell"><strong>Certifications:</strong> ${dataLeft.certifications?.join(", ") || "None"}</div>
          <div class="comparison-cell">Certifications</div>
          <div class="comparison-cell"><strong>Certifications:</strong> ${dataRight.certifications?.join(", ") || "None"}</div>
        </div>

        <div class="comparison-actions">
          <a href="${roleLeft}/" class="comparison-link">View ${this.formatRoleName(roleLeft)}</a>
          <a href="${roleRight}/" class="comparison-link">View ${this.formatRoleName(roleRight)}</a>
        </div>
      </div>
    `;
  }
}

// Initialize on main page
if (document.body.getAttribute("data-role") === "main" && document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.comparator = new ResumeComparator();
  });
} else if (document.body.getAttribute("data-role") === "main") {
  window.comparator = new ResumeComparator();
}
