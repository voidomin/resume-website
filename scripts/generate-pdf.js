const { chromium } = require("@playwright/test");
const { spawn } = require("child_process");
const path = require("path");

async function generatePDFs() {
  console.log("Starting local server...");
  const server = spawn("npx", ["http-server", ".", "-p", "8081"], {
    shell: true,
    stdio: "ignore",
  });

  // Give server time to start
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const roles = ["data-business-analyst", "bioinformatics", "developer-testing"];
    const variants = [
      { name: "ats", baseUrl: "/public/ats", outName: "resume_ats.pdf" },
      { name: "print", baseUrl: "/public/print", outName: "resume_print.pdf" },
    ];

    // Generate main ATS resume PDF
    console.log("Generating MAIN ATS PDF...");
    const mainUrl = "http://localhost:8081/public/ats/index.html";
    const mainOutPath = "public/ats/resume_ats.pdf";
    try {
      await page.goto(mainUrl, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      await page.pdf({
        path: mainOutPath,
        format: "A4",
        printBackground: true,
        margin: { top: "18mm", right: "12mm", bottom: "18mm", left: "12mm" },
      });
      console.log(`Generated ${mainOutPath}`);
    } catch (err) {
      console.error("Failed to generate main ATS PDF:", err);
    }

    for (const role of roles) {
      for (const v of variants) {
        const url = `http://localhost:8081${v.baseUrl}/${role}/index.html`;
        const outDir = path.join("public", v.name, role);
        const outPath = path.join(outDir, v.outName);
        try {
          console.log(`Generating ${v.name.toUpperCase()} PDF for ${role}...`);
          // ensure output dir exists
          require("fs").mkdirSync(outDir, { recursive: true });
          await page.goto(url, { waitUntil: "networkidle" });
          // allow client renderer time to fetch JSON and render
          await page.waitForTimeout(500);
          await page.pdf({
            path: outPath,
            format: "A4",
            printBackground: true,
            margin: { top: "18mm", right: "12mm", bottom: "18mm", left: "12mm" },
          });
          console.log(`Generated ${outPath}`);
        } catch (err) {
          console.error(`Failed to generate ${v.name} for ${role}:`, err);
        }
      }
    }
  } catch (error) {
    console.error("Error generating PDFs:", error);
  } finally {
    await browser.close();
    try {
      server.kill();
    } catch (e) {}
    console.log("Done.");
    process.exit(0);
  }
}

generatePDFs();
