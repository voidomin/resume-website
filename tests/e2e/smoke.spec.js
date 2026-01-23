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

  const html = page.locator("html");
  const toggleBtn = page.getByRole("button", { name: /toggle theme/i });

  await expect(toggleBtn).toBeVisible();
  await expect(html).toHaveAttribute("data-theme", /(light|dark)/);

  const initialTheme = await html.getAttribute("data-theme");
  await toggleBtn.click();

  const expectedTheme = initialTheme === "dark" ? "light" : "dark";
  await expect(html).toHaveAttribute("data-theme", expectedTheme);
});
