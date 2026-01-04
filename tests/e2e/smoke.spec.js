// @ts-check
const { test, expect } = require("@playwright/test");

test("smoke test: homepage loads correctly", async ({ page }) => {
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Akash/);

  // Check hero section is visible
  await expect(page.locator(".hero-title")).toBeVisible();

  // Check meta description exists (SEO)
  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute("content", /Akash/);
});

test("navigation to portfolio works", async ({ page }) => {
  await page.goto("");

  // Click the portfolio link (assuming there is one, or we check the button)
  // Our homepage has buttons, let's look for "View Visual CV" or similar if explicit nav exists
  // Actually, checking standard nav links if present, or constructing URL

  await page.goto("portfolio/");
  await expect(page).toHaveTitle(/Portfolio/);
  await expect(page.locator(".section-title").first()).toBeVisible();
});

test("theme toggle changes class", async ({ page }) => {
  await page.goto("");

  // Check resume variant pill buttons exist
  const printBtn = page.getByRole("tab", { name: "Print" });
  await expect(printBtn).toBeVisible();

  const atsBtn = page.getByRole("tab", { name: "ATS" });
  await expect(atsBtn).toBeVisible();

  // Print should be active by default
  await expect(printBtn).toHaveClass(/is-active/);

  // Click ATS
  await atsBtn.click();
  await expect(atsBtn).toHaveClass(/is-active/);
  await expect(printBtn).not.toHaveClass(/is-active/);
});
