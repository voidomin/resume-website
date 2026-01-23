const { test, expect } = require("@playwright/test");

test.describe("Resume Download Functionality", () => {
  test("should have download buttons on main ATS page", async ({ page }) => {
    await page.goto("/ats/");

    // Check for Word download button
    const docxButton = page.locator('a[href="resume_ats.docx"]');
    await expect(docxButton).toBeVisible();
    await expect(docxButton).toContainText("Word");

    // Check for PDF download button
    const pdfButton = page.locator('a[href="resume_ats.pdf"]');
    await expect(pdfButton).toBeVisible();
    await expect(pdfButton).toContainText("PDF");
  });

  test("should have download buttons on developer-testing page", async ({ page }) => {
    await page.goto("/ats/developer-testing/");

    const docxButton = page.locator('a[href="resume_ats.docx"]');
    await expect(docxButton).toBeVisible();

    const pdfButton = page.locator('a[href="resume_ats.pdf"]');
    await expect(pdfButton).toBeVisible();
  });

  test("should have download buttons on bioinformatics page", async ({ page }) => {
    await page.goto("/ats/bioinformatics/");

    const docxButton = page.locator('a[href="resume_ats.docx"]');
    await expect(docxButton).toBeVisible();

    const pdfButton = page.locator('a[href="resume_ats.pdf"]');
    await expect(pdfButton).toBeVisible();
  });

  test("should have download buttons on data analyst page", async ({ page }) => {
    await page.goto("/ats/data-business-analyst/");

    const docxButton = page.locator('a[href="resume_ats.docx"]');
    await expect(docxButton).toBeVisible();

    const pdfButton = page.locator('a[href="resume_ats.pdf"]');
    await expect(pdfButton).toBeVisible();
  });

  test("should render content dynamically on main ATS page", async ({ page }) => {
    await page.goto("/ats/");

    // Wait for dynamic content to load
    await page.waitForSelector("#cv-name");

    // Check that name is populated
    const name = await page.locator("#cv-name").textContent();
    expect(name).toBeTruthy();
    expect(name.length).toBeGreaterThan(0);

    // Check that summary is populated
    const summary = await page.locator("#cv-summary").textContent();
    expect(summary).toBeTruthy();
    expect(summary.length).toBeGreaterThan(10);
  });

  test("should show Languages section when data is available", async ({ page }) => {
    await page.goto("/ats/developer-testing/");

    // Wait for content to load
    await page.waitForSelector("#cv-languages-section");

    // Check if Languages section is visible
    const languagesSection = page.locator("#cv-languages-section");
    const isVisible = await languagesSection.isVisible();
    expect(isVisible).toBe(true);

    // Check that languages content exists
    const languagesText = await page.locator("#cv-languages").textContent();
    expect(languagesText).toContain("English");
  });

  test("should show Certifications section when data is available", async ({ page }) => {
    await page.goto("/ats/developer-testing/");

    // Wait for content to load
    await page.waitForSelector("#cv-certifications-section");

    // Check if Certifications section is visible
    const certificationsSection = page.locator("#cv-certifications-section");
    const isVisible = await certificationsSection.isVisible();
    expect(isVisible).toBe(true);

    // Check that certifications content exists
    const certificationsText = await page.locator("#cv-certifications").textContent();
    expect(certificationsText.length).toBeGreaterThan(0);
  });

  test("should display project tech stack", async ({ page }) => {
    await page.goto("/ats/developer-testing/");

    // Wait for projects to load
    await page.waitForSelector("#cv-projects");

    // Check if tech stack is displayed
    const projectsHtml = await page.locator("#cv-projects").innerHTML();
    expect(projectsHtml).toContain("Tech:");
  });

  test("should display education details", async ({ page }) => {
    await page.goto("/ats/developer-testing/");

    // Wait for education to load
    await page.waitForSelector("#cv-education");

    // Check if education details are displayed
    const educationHtml = await page.locator("#cv-education").innerHTML();
    // Should contain scholarship or research details
    expect(educationHtml.length).toBeGreaterThan(50);
  });

  test("should have proper meta tags for SEO", async ({ page }) => {
    await page.goto("/ats/");

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();

    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDescription).toBeTruthy();

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl).toBeTruthy();
  });
});
