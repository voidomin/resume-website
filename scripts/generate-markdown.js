#!/usr/bin/env node

/**
 * Markdown Resume Generator
 * Converts role JSON data to professional Markdown format
 */

const fs = require("fs");
const path = require("path");

const roles = ["bioinformatics", "data-business-analyst", "developer-testing"];

async function generateMarkdownFromData(roleData, outputPath) {
  const m = roleData.meta || {};
  let markdown = "";

  // Header
  markdown += `# ${m.name || "Professional Resume"}\n\n`;
  markdown += `**${m.title || "Professional"}**\n\n`;

  // Contact Info
  const contact = [];
  if (m.email) contact.push(`[${m.email}](mailto:${m.email})`);
  if (m.phone) contact.push(`[${m.phone}](tel:${m.phone?.replace(/\s/g, "")})`);
  if (m.location) contact.push(m.location);
  if (m.github) contact.push(`[GitHub](${m.github})`);
  if (m.linkedin) contact.push(`[LinkedIn](${m.linkedin})`);
  if (m.portfolio) contact.push(`[Portfolio](${m.portfolio})`);

  if (contact.length > 0) {
    markdown += `${contact.join(" | ")}\n\n`;
  }

  // Professional Summary
  if (roleData.summary) {
    markdown += `## Professional Summary\n\n${roleData.summary}\n\n`;
  }

  // Work Experience
  if (roleData.work_experience && roleData.work_experience.length > 0) {
    markdown += `## Work Experience\n\n`;
    roleData.work_experience.forEach((job) => {
      markdown += `### ${job.role}\n`;
      markdown += `**${job.company}** | ${job.period}\n\n`;
      if (job.bullets) {
        job.bullets.forEach((bullet) => {
          markdown += `- ${bullet}\n`;
        });
      }
      markdown += "\n";
    });
  }

  // Projects
  if (roleData.projects && roleData.projects.length > 0) {
    markdown += `## Projects\n\n`;
    roleData.projects.forEach((project) => {
      markdown += `### ${project.name}\n`;
      if (project.url || project.link) {
        markdown += `[View Project](${project.url || project.link})\n`;
      }
      markdown += `${project.desc}\n`;
      if (project.keywords && project.keywords.length > 0) {
        markdown += `**Tech:** ${project.keywords.join(", ")}\n`;
      }
      markdown += "\n";
    });
  }

  // Skills
  if (roleData.skills && roleData.skills.length > 0) {
    markdown += `## Skills\n\n`;
    markdown += `${roleData.skills.join(" • ")}\n\n`;
  }

  // Education
  if (roleData.education && roleData.education.length > 0) {
    markdown += `## Education\n\n`;
    roleData.education.forEach((edu) => {
      markdown += `### ${edu.degree}\n`;
      markdown += `**${edu.institution}** | ${edu.year}\n`;
      if (edu.details) {
        markdown += `${edu.details}\n`;
      }
      markdown += "\n";
    });
  }

  // Publications
  if (roleData.publications && roleData.publications.length > 0) {
    markdown += `## Publications\n\n`;
    roleData.publications.forEach((pub) => {
      markdown += `- **${pub.title}**, *${pub.journal}* (${pub.year})`;
      if (pub.link) {
        markdown += ` [Link](${pub.link})`;
      }
      markdown += "\n";
    });
    markdown += "\n";
  }

  // Awards
  if (roleData.awards && roleData.awards.length > 0) {
    markdown += `## Awards & Recognition\n\n`;
    roleData.awards.forEach((award) => {
      markdown += `- ${award}\n`;
    });
    markdown += "\n";
  }

  // Languages
  if (roleData.languages && roleData.languages.length > 0) {
    markdown += `## Languages\n\n`;
    markdown += `${roleData.languages.join(", ")}\n\n`;
  }

  // Certifications
  if (roleData.certifications && roleData.certifications.length > 0) {
    markdown += `## Certifications\n\n`;
    roleData.certifications.forEach((cert) => {
      markdown += `- ${cert}\n`;
    });
    markdown += "\n";
  }

  // Write to file
  fs.writeFileSync(outputPath, markdown, "utf-8");
  return outputPath;
}

async function generateAllMarkdown() {
  console.log("🚀 Generating Markdown resumes for all roles...\n");

  try {
    for (const role of roles) {
      const dataPath = path.join(__dirname, "..", "public", "data", "roles", `${role}.json`);
      const outputPath = path.join(__dirname, "..", "public", "markdown", `${role}.md`);

      // Create markdown directory if it doesn't exist
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const roleData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      await generateMarkdownFromData(roleData, outputPath);

      console.log(`✅ Generated: ${outputPath}`);
    }

    // Generate main resume
    const mainDataPath = path.join(
      __dirname,
      "..",
      "public",
      "data",
      "roles",
      "developer-testing.json"
    );
    const mainOutputPath = path.join(__dirname, "..", "public", "markdown", "resume.md");
    const mainData = JSON.parse(fs.readFileSync(mainDataPath, "utf-8"));
    mainData.meta.title = "Development Engineer";
    await generateMarkdownFromData(mainData, mainOutputPath);
    console.log(`✅ Generated: ${mainOutputPath}`);
  } catch (error) {
    console.error(`❌ Error generating markdown: ${error.message}`);
  }

  console.log("\n✨ All Markdown files generated successfully!");
}

generateAllMarkdown().catch(console.error);
