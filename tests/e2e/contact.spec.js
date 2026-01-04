// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("portfolio/");
  });

  test("form is present and visible", async ({ page }) => {
    const form = page.locator("#contact-form");
    await expect(form).toBeVisible();
  });

  test("has required fields", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute("required", "");

    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("required", "");

    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toBeVisible();
    await expect(messageInput).toHaveAttribute("required", "");
  });

  test("submit button has correct initial state", async ({ page }) => {
    const submitBtn = page.locator(".btn-submit");
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveText(/Send Message/);
    await expect(submitBtn).toBeEnabled();
  });
});
