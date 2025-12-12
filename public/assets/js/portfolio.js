document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".resume-toggle");
  const printBtn = document.getElementById("resume-print");
  const atsBtn = document.getElementById("resume-ats");

  // Initial state: Print = primary, ATS = ghost
  function setPrimary(type) {
    if (!printBtn || !atsBtn) return;

    if (type === "print") {
      // Print is active
      printBtn.classList.add("btn-primary");
      printBtn.classList.remove("btn-ghost", "disabled-btn");

      atsBtn.classList.add("btn-ghost", "disabled-btn");
      atsBtn.classList.remove("btn-primary");
    } else {
      // ATS is active
      atsBtn.classList.add("btn-primary");
      atsBtn.classList.remove("btn-ghost", "disabled-btn");

      printBtn.classList.add("btn-ghost", "disabled-btn");
      printBtn.classList.remove("btn-primary");
    }
  }

  setPrimary("print");

  // Toggle click handling
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      toggles.forEach((t) => t.classList.remove("active"));
      toggle.classList.add("active");

      const target = toggle.dataset.target;
      setPrimary(target === "ats" ? "ats" : "print");
    });
  });

  // Simple analytics-style logging for resume clicks
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.getAttribute("data-track");
      console.log("download-click:", label);

      // Later you can wire this to:
      // gtag('event', 'resume_download', { event_category: 'Resume', event_label: label });
      // or Plausible / other analytics.
    });
  });

  // Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }
});
