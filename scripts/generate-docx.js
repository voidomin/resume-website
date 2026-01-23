const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  TabStopType,
  TabStopAlignment,
} = require("docx");
const fs = require("fs");
const path = require("path");

const roles = ["bioinformatics", "data-business-analyst", "developer-testing"];

async function generateDocxFromData(roleData, outputPath) {
  const m = roleData.meta || {};
  const sections = [];

  // Header: Name and Title
  sections.push(
    new Paragraph({
      text: m.name,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
      bold: true,
      size: 28,
    })
  );

  sections.push(
    new Paragraph({
      text: m.title || "Professional",
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      size: 22,
    })
  );

  // Contact Info
  const contactLines = [];
  if (m.email) contactLines.push(m.email);
  if (m.phone) contactLines.push(m.phone);
  if (m.location) contactLines.push(m.location);
  if (m.github) contactLines.push(m.github);
  if (m.linkedin) contactLines.push(m.linkedin);

  sections.push(
    new Paragraph({
      text: contactLines.join(" • "),
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      size: 20,
    })
  );

  // Professional Summary
  if (roleData.summary) {
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL SUMMARY",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    sections.push(
      new Paragraph({
        text: roleData.summary,
        spacing: { after: 200 },
      })
    );
  }

  // Work Experience
  if (roleData.work_experience && roleData.work_experience.length > 0) {
    sections.push(
      new Paragraph({
        text: "WORK EXPERIENCE",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    roleData.work_experience.forEach((job) => {
      sections.push(
        new Paragraph({
          text: `${job.role}, ${job.company}`,
          spacing: { before: 50, after: 0 },
          bold: true,
        })
      );

      sections.push(
        new Paragraph({
          text: job.period,
          spacing: { after: 100 },
          italics: true,
        })
      );

      if (job.bullets && job.bullets.length > 0) {
        job.bullets.forEach((bullet) => {
          sections.push(
            new Paragraph({
              text: bullet,
              spacing: { after: 50 },
              bullet: { level: 0 },
            })
          );
        });
      }

      sections.push(
        new Paragraph({
          text: "",
          spacing: { after: 50 },
        })
      );
    });
  }

  // Projects
  if (roleData.projects && roleData.projects.length > 0) {
    sections.push(
      new Paragraph({
        text: "PROJECTS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    roleData.projects.forEach((project) => {
      sections.push(
        new Paragraph({
          text: project.name,
          spacing: { before: 50, after: 0 },
          bold: true,
        })
      );

      sections.push(
        new Paragraph({
          text: project.desc,
          spacing: { after: 50 },
        })
      );

      if (project.keywords && project.keywords.length > 0) {
        sections.push(
          new Paragraph({
            text: `Tech: ${project.keywords.join(", ")}`,
            spacing: { after: 100 },
            italics: true,
          })
        );
      }
    });
  }

  // Skills
  if (roleData.skills && roleData.skills.length > 0) {
    sections.push(
      new Paragraph({
        text: "SKILLS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    sections.push(
      new Paragraph({
        text: roleData.skills.join(" • "),
        spacing: { after: 200 },
      })
    );
  }

  // Education
  if (roleData.education && roleData.education.length > 0) {
    sections.push(
      new Paragraph({
        text: "EDUCATION",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    roleData.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          text: edu.degree,
          spacing: { before: 50, after: 0 },
          bold: true,
        })
      );

      sections.push(
        new Paragraph({
          text: `${edu.institution} | ${edu.year}`,
          spacing: { after: 100 },
        })
      );
    });
  }

  // Publications
  if (roleData.publications && roleData.publications.length > 0) {
    sections.push(
      new Paragraph({
        text: "PUBLICATIONS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    roleData.publications.forEach((pub) => {
      sections.push(
        new Paragraph({
          text: pub.title,
          spacing: { before: 50, after: 0 },
          bold: true,
        })
      );

      sections.push(
        new Paragraph({
          text: `${pub.journal} (${pub.year})`,
          spacing: { after: 100 },
          italics: true,
        })
      );
    });
  }

  // Awards
  if (roleData.awards && roleData.awards.length > 0) {
    sections.push(
      new Paragraph({
        text: "AWARDS & RECOGNITION",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 },
        bold: true,
      })
    );

    roleData.awards.forEach((award) => {
      sections.push(
        new Paragraph({
          text: award,
          spacing: { after: 50 },
          bullet: { level: 0 },
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        children: sections,
        properties: {},
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Generated: ${outputPath}`);
}

async function generateAllDocx() {
  console.log("🚀 Generating DOCX files for all roles...\n");

  for (const role of roles) {
    const dataPath = path.join(__dirname, "..", "data", "roles", `${role}.json`);
    const outputPath = path.join(
      __dirname,
      "..",
      "public",
      "ats",
      role === "developer-testing" ? role : role,
      `resume_ats.docx`
    );

    try {
      const roleData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await generateDocxFromData(roleData, outputPath);
    } catch (error) {
      console.error(`❌ Error generating ${role}: ${error.message}`);
    }
  }

  // Main resume DOCX
  try {
    const mainDataPath = path.join(__dirname, "..", "data", "roles", "developer-testing.json");
    const mainOutputPath = path.join(__dirname, "..", "public", "ats", "resume_ats.docx");
    const mainData = JSON.parse(fs.readFileSync(mainDataPath, "utf-8"));

    // Update meta to generic title
    mainData.meta.title = "Development Engineer";
    await generateDocxFromData(mainData, mainOutputPath);
  } catch (error) {
    console.error(`❌ Error generating main resume: ${error.message}`);
  }

  console.log("\n✨ All DOCX files generated successfully!");
}

generateAllDocx().catch(console.error);
