#!/usr/bin/env node

/**
 * Email-Friendly Resume Generator
 * Creates inline CSS HTML version optimized for email clients
 */

const fs = require("fs");
const path = require("path");

const roles = ["bioinformatics", "data-business-analyst", "developer-testing"];

function generateEmailHTML(roleData) {
  const m = roleData.meta || {};

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${m.name} - Resume</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #333;
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .resume {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      line-height: 1.6;
    }
    h1 {
      text-align: center;
      margin: 0 0 5px 0;
      font-size: 24px;
    }
    .title {
      text-align: center;
      color: #666;
      margin-bottom: 10px;
      font-style: italic;
    }
    .contact {
      text-align: center;
      font-size: 12px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 2px solid #0969da;
    }
    .contact-item {
      margin: 3px 0;
    }
    h2 {
      font-size: 14px;
      margin: 15px 0 10px 0;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
      color: #0969da;
    }
    h3 {
      font-size: 13px;
      margin: 10px 0 3px 0;
    }
    .job-meta {
      font-size: 12px;
      color: #666;
      font-style: italic;
      margin-bottom: 5px;
    }
    .project-title {
      font-weight: bold;
      color: #0969da;
    }
    .tech {
      font-size: 11px;
      color: #666;
      margin-top: 3px;
    }
    ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    li {
      margin: 3px 0;
      font-size: 12px;
    }
    p {
      margin: 5px 0;
      font-size: 12px;
    }
    a {
      color: #0969da;
      text-decoration: none;
    }
    .section-content {
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="resume">
    <h1>${m.name || "Professional"}</h1>
    <div class="title">${m.title || "Professional"}</div>
    
    <div class="contact">
      ${m.email ? `<div class="contact-item"><a href="mailto:${m.email}">${m.email}</a></div>` : ""}
      ${m.phone ? `<div class="contact-item">${m.phone}</div>` : ""}
      ${m.location ? `<div class="contact-item">${m.location}</div>` : ""}
      ${m.github ? `<div class="contact-item"><a href="${m.github}">GitHub</a></div>` : ""}
      ${m.linkedin ? `<div class="contact-item"><a href="${m.linkedin}">LinkedIn</a></div>` : ""}
    </div>

    ${
      roleData.summary
        ? `
    <h2>Professional Summary</h2>
    <div class="section-content">
      <p>${roleData.summary}</p>
    </div>
    `
        : ""
    }

    ${
      roleData.work_experience && roleData.work_experience.length > 0
        ? `
    <h2>Work Experience</h2>
    <div class="section-content">
      ${roleData.work_experience
        .map(
          (job) => `
        <h3>${job.role}</h3>
        <div class="job-meta">${job.company} | ${job.period}</div>
        ${job.bullets ? `<ul>${job.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
      `
        )
        .join("")}
    </div>
    `
        : ""
    }

    ${
      roleData.projects && roleData.projects.length > 0
        ? `
    <h2>Projects</h2>
    <div class="section-content">
      ${roleData.projects
        .map(
          (p) => `
        <div style="margin-bottom: 10px;">
          <div class="project-title">
            ${p.name}
            ${p.url ? `<a href="${p.url}">[View]</a>` : ""}
          </div>
          <p>${p.desc}</p>
          ${p.keywords ? `<div class="tech">Tech: ${p.keywords.join(", ")}</div>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }

    ${
      roleData.skills && roleData.skills.length > 0
        ? `
    <h2>Skills</h2>
    <div class="section-content">
      <p>${roleData.skills.join(" • ")}</p>
    </div>
    `
        : ""
    }

    ${
      roleData.education && roleData.education.length > 0
        ? `
    <h2>Education</h2>
    <div class="section-content">
      ${roleData.education
        .map(
          (e) => `
        <h3>${e.degree}</h3>
        <div class="job-meta">${e.institution} | ${e.year}</div>
        ${e.details ? `<p>${e.details}</p>` : ""}
      `
        )
        .join("")}
    </div>
    `
        : ""
    }

    ${
      roleData.certifications && roleData.certifications.length > 0
        ? `
    <h2>Certifications</h2>
    <div class="section-content">
      <ul>${roleData.certifications.map((c) => `<li>${c}</li>`).join("")}</ul>
    </div>
    `
        : ""
    }

    ${
      roleData.languages && roleData.languages.length > 0
        ? `
    <h2>Languages</h2>
    <div class="section-content">
      <p>${roleData.languages.join(", ")}</p>
    </div>
    `
        : ""
    }
  </div>
</body>
</html>`;
}

async function generateEmailResumes() {
  console.log("📧 Generating email-friendly HTML resumes...\n");

  try {
    const emailDir = path.join(__dirname, "..", "public", "email");
    if (!fs.existsSync(emailDir)) {
      fs.mkdirSync(emailDir, { recursive: true });
    }

    for (const role of roles) {
      const dataPath = path.join(__dirname, "..", "public", "data", "roles", `${role}.json`);
      const outputPath = path.join(emailDir, `${role}.html`);

      const roleData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      const html = generateEmailHTML(roleData);
      fs.writeFileSync(outputPath, html, "utf-8");

      console.log(`✅ Generated: ${outputPath}`);
    }

    // Main resume
    const mainDataPath = path.join(
      __dirname,
      "..",
      "public",
      "data",
      "roles",
      "developer-testing.json"
    );
    const mainOutputPath = path.join(emailDir, "resume.html");
    const mainData = JSON.parse(fs.readFileSync(mainDataPath, "utf-8"));
    mainData.meta.title = "Development Engineer";
    const html = generateEmailHTML(mainData);
    fs.writeFileSync(mainOutputPath, html, "utf-8");
    console.log(`✅ Generated: ${mainOutputPath}`);
  } catch (error) {
    console.error(`❌ Error generating email resumes: ${error.message}`);
  }

  console.log("\n✨ Email resumes generated successfully!");
}

generateEmailResumes().catch(console.error);
