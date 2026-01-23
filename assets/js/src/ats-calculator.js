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
    const scorer = document.createElement("div");
    scorer.id = "ats-scorer";
    scorer.className = "ats-scorer-panel";
    scorer.innerHTML = `
      <button class="scorer-toggle" onclick="window.atsCalculator?.toggleScorer()">
        📊 ATS Score
      </button>
      <div class="scorer-content" style="display: none;">
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

    document.body.insertBefore(scorer, document.body.firstChild);
  }

  calculateScore() {
    const resumeText = this.getResumeText();

    const scores = {
      format: this.scoreFormat(resumeText),
      keywords: this.scoreKeywords(resumeText),
      content: this.scoreContentCompleteness(resumeText),
      parsing: this.scoreParsingReadability(resumeText),
    };

    const overallScore = Math.round(
      (scores.format + scores.keywords + scores.content + scores.parsing) / 4
    );

    this.displayScore(overallScore, scores);
    this.displaySuggestions(scores, resumeText);
  }

  getResumeText() {
    const resume = document.querySelector(".resume");
    return resume ? resume.innerText.toLowerCase() : "";
  }

  scoreFormat(text) {
    let score = 50;

    // Check for clear sections
    const sections = [
      "education",
      "experience",
      "skills",
      "projects",
      "awards",
      "languages",
      "certifications",
    ];
    const foundSections = sections.filter((s) => text.includes(s)).length;
    score += (foundSections / sections.length) * 30;

    // Check for bullet points (good for ATS)
    const bulletCount = text.split("•").length - 1;
    if (bulletCount > 5) score += 20;

    return Math.min(score, 100);
  }

  scoreKeywords(text) {
    let score = 0;
    const foundKeywords = [];

    Object.values(this.COMMON_ATS_KEYWORDS).forEach((keywords) => {
      keywords.forEach((keyword) => {
        if (text.includes(keyword.toLowerCase())) {
          score += 1;
          foundKeywords.push(keyword);
        }
      });
    });

    // Normalize to 100
    score = Math.round(
      (score / (this.flattenArray(Object.values(this.COMMON_ATS_KEYWORDS)).length / 2)) * 100
    );
    return Math.min(score, 100);
  }

  scoreContentCompleteness(text) {
    let score = 0;

    // Check for required sections
    if (text.includes("professional summary") || text.includes("summary")) score += 15;
    if (text.includes("work experience") || text.includes("experience")) score += 15;
    if (text.includes("skills")) score += 15;
    if (text.includes("education")) score += 15;
    if (text.includes("projects")) score += 10;
    if (text.includes("email") || text.includes("@")) score += 10;
    if (text.includes("linkedin") || text.includes("github")) score += 5;

    // Check for contact info
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text);
    const hasPhone = /[\d-]{10,}/i.test(text);
    if (hasEmail && hasPhone) score += 5;

    return Math.min(score, 100);
  }

  scoreParsingReadability(text) {
    let score = 50;

    // Check for ATS-friendly formatting
    const lines = text.split("\n").length;
    if (lines > 20 && lines < 200) score += 20; // Good content length

    // Check for simple formatting (no complex symbols that break ATS)
    const complexSymbols = (text.match(/[^a-z0-9\s.,;:()[\]-]/gi) || []).length;
    if (complexSymbols < text.length * 0.1) score += 20;

    // Check for consistent structure
    if (text.match(/\n\n/g) && text.match(/\n\n/g).length > 5) score += 10;

    return Math.min(score, 100);
  }

  displayScore(score, scores) {
    const scoreNum = document.getElementById("ats-score-number");
    const scoreRating = document.getElementById("ats-score-rating");

    scoreNum.textContent = score;

    let rating = "";
    let color = "";
    if (score >= 80) {
      rating = "✅ Excellent";
      color = "#28a745";
    } else if (score >= 60) {
      rating = "⚠️ Good";
      color = "#ffc107";
    } else if (score >= 40) {
      rating = "⚠️ Fair";
      color = "#fd7e14";
    } else {
      rating = "❌ Needs Work";
      color = "#dc3545";
    }

    scoreRating.textContent = rating;
    scoreRating.style.color = color;

    // Update breakdown bars
    const formatPercent = scores.format;
    const keywordsPercent = scores.keywords;
    const contentPercent = scores.content;
    const parsingPercent = scores.parsing;

    document.getElementById("score-format").style.width = formatPercent + "%";
    document.getElementById("score-keywords").style.width = keywordsPercent + "%";
    document.getElementById("score-content").style.width = contentPercent + "%";
    document.getElementById("score-parsing").style.width = parsingPercent + "%";

    document.getElementById("score-format-value").textContent = Math.round(formatPercent) + "%";
    document.getElementById("score-keywords-value").textContent = Math.round(keywordsPercent) + "%";
    document.getElementById("score-content-value").textContent = Math.round(contentPercent) + "%";
    document.getElementById("score-parsing-value").textContent = Math.round(parsingPercent) + "%";
  }

  displaySuggestions(scores, text) {
    const suggestions = [];

    if (scores.format < 70) {
      suggestions.push("✓ Add more clearly labeled sections (Education, Experience, Skills, etc.)");
    }

    if (scores.keywords < 70) {
      suggestions.push("✓ Include more technical and industry keywords");
    }

    if (scores.content < 80) {
      suggestions.push("✓ Ensure all key sections are filled in (Contact info, Email, Phone)");
    }

    if (scores.parsing < 70) {
      suggestions.push("✓ Simplify formatting and avoid special characters");
    }

    if (!text.includes("@")) {
      suggestions.push("✓ Add your email address to the resume");
    }

    const suggestionsDiv = document.getElementById("improvement-suggestions");
    suggestionsDiv.innerHTML = `
      <div class="suggestions-header">Improvement Tips:</div>
      ${suggestions.map((s) => `<div class="suggestion-item">${s}</div>`).join("")}
    `;
  }

  analyzeJobMatch() {
    const jobDescInput = document.getElementById("job-description");
    const jobDesc = jobDescInput.value;

    if (!jobDesc.trim()) {
      alert("Please paste a job description to analyze");
      return;
    }

    const resumeText = this.getResumeText();
    const jobText = jobDesc.toLowerCase();

    // Extract keywords from job description
    const jobKeywords = this.extractKeywords(jobText);
    const resumeKeywords = this.extractKeywords(resumeText);

    // Calculate match
    const matches = jobKeywords.filter((k) => resumeKeywords.includes(k));
    const matchPercentage = Math.round((matches.length / jobKeywords.length) * 100);

    // Find missing keywords
    const missing = jobKeywords.filter((k) => !resumeKeywords.includes(k));

    // Display results
    const resultsDiv = document.createElement("div");
    resultsDiv.className = "job-match-results";
    resultsDiv.innerHTML = `
      <div class="match-header">
        <h4>Job Match Analysis</h4>
        <div class="match-percentage">${matchPercentage}% Match</div>
      </div>
      
      <div class="match-found">
        <strong>Keywords Found:</strong>
        <div class="keywords-list">
          ${matches
            .slice(0, 10)
            .map((k) => `<span class="keyword-tag">${k}</span>`)
            .join("")}
        </div>
      </div>

      <div class="match-missing">
        <strong>Missing Keywords (${missing.length}):</strong>
        <div class="keywords-list">
          ${missing
            .slice(0, 10)
            .map((k) => `<span class="keyword-tag missing">${k}</span>`)
            .join("")}
        </div>
        ${missing.length > 10 ? `<p class="text-muted">+${missing.length - 10} more missing keywords</p>` : ""}
      </div>
    `;

    document.getElementById("improvement-suggestions").innerHTML = "";
    document
      .getElementById("improvement-suggestions")
      .insertAdjacentElement("afterend", resultsDiv);
  }

  extractKeywords(text) {
    const words = text.match(/\b[a-z]{3,}\b/g) || [];
    const stopwords = new Set([
      "the",
      "and",
      "for",
      "are",
      "but",
      "not",
      "you",
      "all",
      "can",
      "her",
      "was",
      "one",
      "our",
      "out",
      "day",
      "get",
      "has",
      "him",
      "his",
      "how",
      "its",
      "may",
      "new",
      "now",
      "old",
      "see",
      "two",
      "way",
      "who",
      "boy",
      "did",
      "its",
      "let",
      "put",
      "say",
      "she",
      "too",
      "use",
    ]);

    const unique = new Set(words.filter((w) => !stopwords.has(w)));
    return Array.from(unique).slice(0, 50);
  }

  toggleScorer() {
    const content = document.querySelector(".scorer-content");
    if (content) {
      content.style.display = content.style.display === "none" ? "block" : "none";
      if (content.style.display === "block") {
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
