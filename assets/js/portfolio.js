document.addEventListener("DOMContentLoaded", () => {
  // ===== THEME TOGGLE =====
  const initTheme = () => {
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeToggle(savedTheme);
  };

  const updateThemeToggle = (theme) => {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${theme === "dark" ? "light" : "dark"} mode`
      );
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio_theme", newTheme);
    updateThemeToggle(newTheme);
  };

  // Initialize theme
  initTheme();

  // Theme toggle button
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // ===== RESUME TOGGLE =====
  const toggles = document.querySelectorAll(".resume-toggle");
  const printBtn = document.getElementById("resume-print");
  const atsBtn = document.getElementById("resume-ats");

  // Initial state: Print = primary, ATS = ghost
  function setPrimary(type) {
    if (!printBtn || !atsBtn) {
      return;
    }

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
      console.warn("download-click:", label);

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

  // --- Contact Form Submission (Web3Forms) ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".btn-submit");
      const originalBtnText = submitBtn.textContent;
      const formData = new FormData(contactForm);

      // Add custom subject if provided in the visible field
      const visibleSubject = document.getElementById("subject");
      const hiddenSubject = document.getElementById("web3forms-subject");
      if (visibleSubject && hiddenSubject && visibleSubject.value.trim() !== "") {
        hiddenSubject.value = `Portfolio: ${visibleSubject.value}`;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      submitBtn.style.opacity = "0.7";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.status === 200) {
          // Success code here
          showFormFeedback("success", "Message sent successfully! 📨 I will get back to you soon.");
          contactForm.reset();

          // Track in GA4
          if (typeof gtag === "function") {
            gtag("event", "generate_lead", {
              event_category: "Contact",
              event_label: "Portfolio Form",
            });
          }
        } else {
          // Error code here
          showFormFeedback("error", result.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        showFormFeedback("error", "Network error. Please check your connection and try again.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.opacity = "1";
      }
    });
  }

  function showFormFeedback(type, message) {
    // Remove existing feedback
    const existing = document.querySelector(".form-feedback");
    if (existing) existing.remove();

    const feedback = document.createElement("div");
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;

    // Insert before the submit button
    const submitBtn = document.querySelector(".btn-submit");
    if (submitBtn) {
      submitBtn.parentNode.insertBefore(feedback, submitBtn);
    }

    // Auto-remove after 8 seconds
    setTimeout(() => {
      feedback.style.opacity = "0";
      setTimeout(() => feedback.remove(), 500);
    }, 8000);
  }
});
