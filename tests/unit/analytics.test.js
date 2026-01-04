import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import * as analytics from "../../assets/js/src/analytics.js";

describe("Analytics", () => {
  beforeEach(() => {
    // Mock global gtag
    global.gtag = vi.fn();
    // Mock console.log to keep test output clean
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("trackDownload sends correct event", () => {
    analytics.trackDownload("print");

    expect(global.gtag).toHaveBeenCalledWith("event", "download", {
      event_category: "Resume",
      event_label: "print",
      value: 1,
    });
  });

  it("trackVariantSwitch sends correct event", () => {
    analytics.trackVariantSwitch("digital");

    expect(global.gtag).toHaveBeenCalledWith("event", "variant_switch", {
      event_category: "Resume",
      event_label: "digital",
    });
  });

  it("trackThemeChange sends correct event", () => {
    analytics.trackThemeChange("dark");

    expect(global.gtag).toHaveBeenCalledWith("event", "theme_change", {
      event_category: "UI",
      event_label: "dark",
    });
  });

  it("does nothing if gtag is undefined", () => {
    delete global.gtag;
    analytics.trackDownload("print");
    // Should not throw error
  });
});
