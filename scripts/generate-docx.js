const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  TabStopType,
  TabStopAlignment,
  BorderStyle,
} = require("docx");
const fs = require("fs");
const path = require("path");

const roles = ["bioinformatics", "data-business-analyst", "developer-testing"];

async function generateDocxFromData(roleData, outputPath) {
  const m = roleData.meta || {};
  const sections = [];

  // Header: Name and Title - Compact
  sections.push(
    new Paragraph({
      text: m.name || "Professional",
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      bold: true,
      size: 26,
    })
  );

  sections.push(
    new Paragraph({
      text: m.title || "Professional",
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      size: 20,
      italics: true,
    })
  );

  // Contact Info - Inline and compact
  const contactLines = [];
  if (m.email) contactLines.push(m.email);
  if (m.phone) contactLines.push(m.phone);
  if (m.location) contactLines.push(m.location);

  if (contactLines.length > 0) {
    sections.push(
      new Paragraph({
        text: contactLines.join(" | "),
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        size: 20,
      })
    );
  }

  // Professional Summary - Compact
  if (roleData.summary) {
    sections.push(
      new Paragraph({
        text: "SUMMARY",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    sections.push(
      new Paragraph({
        text: roleData.summary,
        spacing: { after: 80 },
        size: 20,
      })
    );
  }

  // Work Experience - Compressed format
  if (roleData.work_experience && roleData.work_experience.length > 0) {
    sections.push(
      new Paragraph({
        text: "EXPERIENCE",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    roleData.work_experience.slice(0, 3).forEach((job) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${job.role}`,
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: ` | ${job.company}`,
              size: 20,
            }),
            new TextRun({
              text: ` (${job.period})`,
              italics: true,
              size: 18,
            }),
          ],
          spacing: { after: 40 },
        })
      );

      if (job.bullets && job.bullets.length > 0) {
        job.bullets.slice(0, 2).forEach((bullet) => {
          sections.push(
            new Paragraph({
              text: bullet,
              spacing: { after: 20 },
              bullet: { level: 0 },
              size: 20,
            })
          );
        });
      }

      sections.push(
        new Paragraph({
          text: "",
          spacing: { after: 20 },
        })
      );
    });
  }

  // Skills - Inline format for one-page
  if (roleData.skills && roleData.skills.length > 0) {
    sections.push(
      new Paragraph({
        text: "SKILLS",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    sections.push(
      new Paragraph({
        text: roleData.skills.join(" • "),
        spacing: { after: 80 },
        size: 20,
      })
    );
  }

  // All Projects - show all 3 with details
  if (roleData.projects && roleData.projects.length > 0) {
    sections.push(
      new Paragraph({
        text: "PROJECTS",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    roleData.projects.forEach((project) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${project.name}`,
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: project.url ? ` | ${project.url}` : "",
              size: 19,
            }),
          ],
          spacing: { after: 30 },
        })
      );

      sections.push(
        new Paragraph({
          text: project.desc,
          spacing: { after: 30 },
          size: 20,
        })
      );

      if (project.keywords && project.keywords.length > 0) {
        sections.push(
          new Paragraph({
            text: `Tech: ${project.keywords.join(", ")}`,
            spacing: { after: 40 },
            italics: true,
            size: 19,
          })
        );
      }
    });
  }

  // Education - Compact with details
  if (roleData.education && roleData.education.length > 0) {
    sections.push(
      new Paragraph({
        text: "EDUCATION",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    roleData.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree}`,
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: ` | ${edu.institution} (${edu.year})`,
              size: 20,
            }),
          ],
          spacing: { after: 20 },
        })
      );

      if (edu.details) {
        sections.push(
          new Paragraph({
            text: edu.details,
            spacing: { after: 40 },
            italics: true,
            size: 19,
          })
        );
      }
    });
  }

  // Languages
  if (roleData.languages && roleData.languages.length > 0) {
    sections.push(
      new Paragraph({
        text: "LANGUAGES",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    sections.push(
      new Paragraph({
        text: roleData.languages.join(" • "),
        spacing: { after: 80 },
        size: 20,
      })
    );
  }

  // Certifications
  if (roleData.certifications && roleData.certifications.length > 0) {
    sections.push(
      new Paragraph({
        text: "CERTIFICATIONS",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    roleData.certifications.forEach((cert) => {
      sections.push(
        new Paragraph({
          text: cert,
          spacing: { after: 30 },
          bullet: { level: 0 },
          size: 20,
        })
      );
    });
  }

  // Publications - Only if present and limit to 1
  if (roleData.publications && roleData.publications.length > 0) {
    sections.push(
      new Paragraph({
        text: "PUBLICATIONS",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    roleData.publications.slice(0, 1).forEach((pub) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${pub.title}`,
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: ` | ${pub.journal} (${pub.year})`,
              size: 20,
            }),
          ],
          spacing: { after: 80 },
        })
      );
    });
  }

  // Awards - Only if present
  if (roleData.awards && roleData.awards.length > 0) {
    sections.push(
      new Paragraph({
        text: "AWARDS",
        spacing: { before: 40, after: 40 },
        bold: true,
        size: 22,
        border: {
          bottom: {
            color: "0f4fbf",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    roleData.awards.slice(0, 2).forEach((award) => {
      sections.push(
        new Paragraph({
          text: award,
          spacing: { after: 30 },
          bullet: { level: 0 },
          size: 20,
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margins: {
              top: 400, // 0.5 inch
              bottom: 400,
              left: 500, // 0.625 inch
              right: 500,
            },
          },
        },
        children: sections,
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
