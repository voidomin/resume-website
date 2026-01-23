/**
 * Interactive Portfolio Enhancement
 * Add GitHub stats and project metadata
 */

class PortfolioEnhancer {
  constructor() {
    this.GITHUB_API = "https://api.github.com";
    this.GITHUB_USERNAME = "voidomin";
    this.init();
  }

  init() {
    this.enhanceProjectsWithStats();
  }

  async enhanceProjectsWithStats() {
    const projectsDiv = document.getElementById("cv-projects");
    if (!projectsDiv) return;

    try {
      // Add GitHub stats badge
      const badge = await this.getGitHubUserBadge();
      if (badge) {
        projectsDiv.insertAdjacentHTML("beforebegin", badge);
      }

      // Enhance each project with live metadata
      this.enhanceProjectLinks();
    } catch (error) {
      console.log("Could not enhance projects with stats:", error);
    }
  }

  async getGitHubUserBadge() {
    try {
      const response = await fetch(`${this.GITHUB_API}/users/${this.GITHUB_USERNAME}`);
      const data = await response.json();

      return `
        <div class="github-badge">
          <img src="${data.avatar_url}" alt="GitHub Profile" class="github-avatar" />
          <div class="github-stats">
            <strong>${data.name || data.login}</strong>
            <p>📊 ${data.public_repos} public repos | ⭐ ${data.followers} followers</p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return null;
    }
  }

  enhanceProjectLinks() {
    document.querySelectorAll("#cv-projects a").forEach((link) => {
      // Add external link indicator
      if (link.getAttribute("href")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        link.style.position = "relative";

        // Add hover effect
        link.addEventListener("mouseenter", () => {
          link.style.opacity = "0.8";
        });
        link.addEventListener("mouseleave", () => {
          link.style.opacity = "1";
        });
      }
    });
  }

  getProjectMetadata(projectName) {
    const metadata = {
      "Param Adventures": {
        icon: "🌍",
        status: "Live",
        users: "1000+",
      },
      "Todo Application": {
        icon: "✓",
        status: "Live",
        downloads: "Available",
      },
      "Resume Website": {
        icon: "📄",
        status: "Live",
        features: "Multi-format",
      },
    };

    return metadata[projectName];
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.portfolioEnhancer = new PortfolioEnhancer();
  });
} else {
  window.portfolioEnhancer = new PortfolioEnhancer();
}
