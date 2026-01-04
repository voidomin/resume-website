import { describe, it, expect, beforeEach, vi } from "vitest";
import { Router } from "../../assets/js/router.js";

describe("Router", () => {
  let router;

  beforeEach(() => {
    // Mock window.location
    delete window.location;
    window.location = {
      pathname: "/resume-website/portfolio/",
      replace: vi.fn(),
      href: "",
    };

    // Create router instance
    router = new Router({ base: "/resume-website/" });
  });

  it("correctly determines current path", () => {
    expect(router._getCurrentPath()).toBe("portfolio/");
  });

  it("correctly identifies active route", () => {
    expect(router.currentRoute).toBe("portfolio");
  });

  it("isActive returns true for active route links", () => {
    expect(router.isActive("/resume-website/portfolio/")).toBe(true);
    expect(router.isActive("portfolio/")).toBe(true);
    expect(router.isActive("/portfolio")).toBe(true);
  });

  it("isActive returns false for inactive route links", () => {
    expect(router.isActive("/resume-website/")).toBe(false);
    expect(router.isActive("/digital")).toBe(false);
  });

  it("isActive handles anchors and external links", () => {
    expect(router.isActive("#contact")).toBe(false);
    expect(router.isActive("https://google.com")).toBe(false);
  });

  it("generates correct absolute URLs", () => {
    expect(router.url("digital/")).toBe("/resume-website/digital/");
    expect(router.url("/ats/")).toBe("/resume-website/ats/");
  });
});
