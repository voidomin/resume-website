/**
 * ATS Score Calculator
 * Real-time ATS compatibility scoring and analysis
 */

class ATSScoreCalculator {
  constructor() {
    this.MIN_SCORE = 0;
    this.MAX_SCORE = 100;
    this.COMMON_ATS_KEYWORDS = {
      technical: [
        "javascript",
        "python",
        "react",
        "node.js",
        "sql",
        "api",
        "rest",
        "html",
        "css",
        "typescript",
        "docker",
        "kubernetes",
        "aws",
        "azure",
        "github",
        "git",
      ],
      soft_skills: [
        "leadership",
        "communication",
        "teamwork",
        "problem-solving",
        "project management",
        "critical thinking",
        "collaboration",
      ],
      experience: ["years", "experience", "managed", "led", "developed", "designed", "implemented"],
      formatting: ["education", "experience", "skills", "projects", "awards"],
    };

    this.init();
  }

  init() {
    this.createScorerUI();
    this.calculateScore();
  }

  createScorerUI() {
    // 1. Create the Toggle Button (Visible on screen)
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "scorer-toggle";
    toggleBtn.innerHTML = "📊 ATS Score";
    toggleBtn.onclick = () => this.toggleScorer();
    // Ensure it uses the class style, but we can verify position in CSS file
    document.body.appendChild(toggleBtn);

    // 2. Create the Sliding Panel (Hidden off-screen)
    const scorer = document.createElement("div");
    scorer.id = "ats-scorer";
    scorer.className = "ats-scorer-panel";
    scorer.innerHTML = `
      <div class="scorer-content">
        <div class="scorer-header">
          <h3>ATS Compatibility Score</h3>
          <button class="close-btn" onclick="window.atsCalculator?.toggleScorer()">✕</button>
        </div>
        <div class="scorer-body">
          <div class="score-display">
            <div class="score-circle">
              <div class="score-number" id="ats-score-number">0</div>
              <div class="score-label">/100</div>
            </div>
            <div class="score-rating" id="ats-score-rating"></div>
          </div>
          
          <div class="score-breakdown">
            <div class="breakdown-item">
              <span class="breakdown-label">Format & Structure</span>
              <div class="score-bar">
                <div class="score-fill" id="score-format" style="width: 0%"></div>
              </div>
              <span class="breakdown-value" id="score-format-value">0%</span>
            </div>
            
            <div class="breakdown-item">
              <span class="breakdown-label">Keywords</span>
              <div class="score-bar">
                <div class="score-fill" id="score-keywords" style="width: 0%"></div>
              </div>
              <span class="breakdown-value" id="score-keywords-value">0%</span>
            </div>
            
            <div class="breakdown-item">
              <span class="breakdown-label">Content Completeness</span>
              <div class="score-bar">
                <div class="score-fill" id="score-content" style="width: 0%"></div>
              </div>
              <span class="breakdown-value" id="score-content-value">0%</span>
            </div>

            <div class="breakdown-item">
              <span class="breakdown-label">Parsing & Readability</span>
              <div class="score-bar">
                <div class="score-fill" id="score-parsing" style="width: 0%"></div>
              </div>
              <span class="breakdown-value" id="score-parsing-value">0%</span>
            </div>
          </div>

          <div class="improvement-suggestions" id="improvement-suggestions"></div>

          <div class="scorer-actions">
            <input type="text" id="job-description" placeholder="Paste job description for custom analysis..." 
                   class="job-desc-input">
            <button class="btn-primary" onclick="window.atsCalculator?.analyzeJobMatch()">
              🔍 Analyze Job Match
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(scorer);
  }

  toggleScorer() {
    const panel = document.getElementById("ats-scorer");
    if (panel) {
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        this.calculateScore();
      }
    }
  }

  flattenArray(arr) {
    return arr.reduce(
      (acc, val) => (Array.isArray(val) ? acc.concat(this.flattenArray(val)) : acc.concat(val)),
      []
    );
  }
}

// Initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.atsCalculator = new ATSScoreCalculator();
  });
} else {
  window.atsCalculator = new ATSScoreCalculator();
}
