# Getting Started

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [package.json](file://package.json)
- [vite.config.mjs](file://vite.config.mjs)
- [index.html](file://index.html)
- [public/manifest.json](file://public/manifest.json)
- [public/service-worker.js](file://public/service-worker.js)
- [public/data/roles/developer-testing.json](file://public/data/roles/developer-testing.json)
- [assets/js/src/resume-customizer.js](file://assets/js/src/resume-customizer.js)
- [assets/js/src/ats-calculator.js](file://assets/js/src/ats-calculator.js)
- [assets/js/src/theme-manager.js](file://assets/js/src/theme-manager.js)
- [playwright.config.js](file://playwright.config.js)
- [vitest.config.js](file://vitest.config.js)
- [docs/ACCESSIBILITY.md](file://docs/ACCESSIBILITY.md)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md)
</cite>

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Local Development](#local-development)
5. [Project Structure Overview](#project-structure-overview)
6. [Customizing Your Resume](#customizing-your-resume)
7. [Running the Development Server](#running-the-development-server)
8. [Accessing the Application Locally](#accessing-the-application-locally)
9. [Browser Compatibility](#browser-compatibility)
10. [Troubleshooting](#troubleshooting)
11. [Performance Considerations](#performance-considerations)
12. [Conclusion](#conclusion)

## Introduction

This guide helps you set up and run the Resume Website project locally. You will learn how to prepare your environment, install dependencies, start the development server, explore the project structure, customize your resume content, and resolve common setup issues. The project is built with modern web technologies and includes advanced features such as a resume customizer, ATS compatibility scoring, and a PWA with offline support.

## Prerequisites

Before installing the project, ensure your environment meets the following requirements:

- Node.js: Version 22.12.0 or higher
- npm: Comes bundled with Node.js
- Git: For cloning the repository and managing changes
- GitHub account: Required if you plan to use GitHub Actions for automated workflows

Key indicators in the repository:

- Node.js engine requirement is defined in the project configuration.
- The README documents the required Node.js version and local development commands.

**Section sources**

- [README.md](file://README.md#L141-L145)
- [package.json](file://package.json#L2-L4)

## Installation

Follow these steps to install the project locally:

1. Clone the repository
   - Use Git to clone the repository to your local machine.
   - Navigate into the project directory after cloning.

2. Install dependencies
   - Run the dependency installation script defined in the project configuration.

3. Start the development server
   - Launch the Vite development server to preview the site locally.

4. Open the application in your browser
   - Access the development server URL to view the site.

Notes:

- The README provides step-by-step instructions for cloning, installing dependencies, and starting the development server.
- The Vite configuration sets the base path for GitHub Pages deployment and build output directory.

**Section sources**

- [README.md](file://README.md#L146-L172)
- [vite.config.mjs](file://vite.config.mjs#L4-L7)

## Local Development

Once installed, you can run the development server and preview the site locally. The development server supports hot module replacement (HMR) for instant updates when you modify files.

- Start the development server using the script defined in the project configuration.
- Open the provided local URL in your browser to view the site.

Tips:

- Use the development server for rapid iteration during customization and feature testing.
- The README documents the development server command and the local URL.

**Section sources**

- [README.md](file://README.md#L161-L172)

## Project Structure Overview

The project follows a modular structure with shared assets, multiple resume variants, and supporting documentation. Key areas include:

- Root HTML and configuration files
- Public pages for portfolio, print, ATS, and digital variants
- Data files for role-specific content
- Shared assets for styles and JavaScript modules
- Documentation and configuration for accessibility, testing, and CI/CD

The README provides a detailed project structure diagram and highlights the purpose of each major folder and file.

**Section sources**

- [README.md](file://README.md#L104-L135)

## Customizing Your Resume

You can customize your resume content and layout using the built-in features and data files:

- Customize resume sections
  - Use the resume customizer panel to toggle sections on or off and reorder them.
  - The customizer persists preferences locally and can be exported or shared.

- Adjust role-specific content
  - Modify the JSON data files under the data directory to update professional summary, work experience, projects, skills, education, and other sections.
  - The ATS variant uses keyword metadata to optimize compatibility with applicant tracking systems.

- Theme and presentation
  - Switch between light and dark themes and cycle through color palettes.
  - The theme manager handles persistence and system preference detection.

- PWA and offline support
  - The PWA manifest and service worker enable offline access and home screen installation.

Where to start:

- Resume customization UI and logic are implemented in the customizer module.
- Role data is defined in the JSON files under the data directory.
- Theme switching is handled by the theme manager module.
- PWA configuration is defined in the manifest and service worker files.

**Section sources**

- [assets/js/src/resume-customizer.js](file://assets/js/src/resume-customizer.js#L6-L27)
- [public/data/roles/developer-testing.json](file://public/data/roles/developer-testing.json#L1-L136)
- [assets/js/src/theme-manager.js](file://assets/js/src/theme-manager.js#L4-L31)
- [public/manifest.json](file://public/manifest.json#L1-L81)
- [public/service-worker.js](file://public/service-worker.js#L1-L370)

## Running the Development Server

To start the development server:

- Execute the development script defined in the project configuration.
- The development server will launch and provide a local URL for browsing.

During development:

- Changes to HTML, CSS, and JavaScript are reflected instantly thanks to HMR.
- Use the browser’s developer tools to inspect and debug components.

**Section sources**

- [README.md](file://README.md#L161-L172)
- [package.json](file://package.json#L8-L8)

## Accessing the Application Locally

After starting the development server, open the provided local URL in your browser to access the application. The README specifies the default development server URL.

- Default URL: http://localhost:5173
- The Vite configuration sets the base path for GitHub Pages; locally, the app runs from the root.

**Section sources**

- [README.md](file://README.md#L167-L170)
- [vite.config.mjs](file://vite.config.mjs#L4-L4)

## Browser Compatibility

The project targets modern browsers and includes PWA features for offline access. The deployment documentation lists supported browsers and related capabilities.

- Supported browsers include recent versions of Chrome, Firefox, Safari, and Edge.
- Mobile browser support is included for Chrome and Safari on iOS 14+.
- PWA features such as offline caching and home screen installation rely on service worker support.

For accessibility, the project aims for WCAG 2.1 AA compliance and includes skip links, ARIA labels, semantic HTML, and keyboard navigation.

**Section sources**

- [DEPLOYMENT_READY.md](file://DEPLOYMENT_READY.md#L134-L141)
- [docs/ACCESSIBILITY.md](file://docs/ACCESSIBILITY.md#L1-L200)

## Troubleshooting

Common setup and runtime issues, along with their resolutions:

- Node.js version mismatch
  - Ensure your Node.js version meets or exceeds the required version.
  - The project configuration defines the minimum Node.js version.

- Port conflicts
  - The development server runs on port 5173 by default.
  - If the port is in use, stop the conflicting process or configure a different port.

- Missing dependencies
  - Reinstall dependencies using the project’s dependency installation script.
  - Ensure your environment has access to npm and can install dev dependencies.

- GitHub Actions not triggering
  - Verify Actions permissions are enabled in repository settings.
  - Confirm workflow files exist and match the expected paths.
  - Trigger a test run by pushing a small change.

- PDF generation failures
  - Review the Actions logs for missing dependencies or invalid templates.
  - Ensure the HTML templates are valid and the generation script is properly configured.

- PWA offline behavior
  - Confirm the service worker is registered and caching essential assets.
  - Test offline scenarios by disabling network connectivity in the browser.

- Accessibility checks
  - Use the accessibility documentation to verify skip links, ARIA attributes, and keyboard navigation.

**Section sources**

- [README.md](file://README.md#L141-L145)
- [README.md](file://README.md#L161-L172)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L213-L236)
- [public/service-worker.js](file://public/service-worker.js#L42-L75)
- [docs/ACCESSIBILITY.md](file://docs/ACCESSIBILITY.md#L23-L46)

## Performance Considerations

- Use the development server for iterative development and HMR.
- For production builds, use the build script to generate optimized assets.
- Preview the production build locally to validate performance and asset delivery.

Additional guidance:

- The Vite configuration targets modern browsers and enables code splitting and minification for efficient delivery.
- The PWA service worker improves perceived performance by caching static assets and enabling offline access.

**Section sources**

- [README.md](file://README.md#L176-L190)
- [vite.config.mjs](file://vite.config.mjs#L5-L18)

## Conclusion

You are now ready to run the Resume Website project locally, customize your resume content, and iterate quickly using the development server. Explore the resume customizer, ATS scoring, and PWA features to tailor the site to your needs. For automated workflows and deployment, review the GitHub Actions setup and deployment documentation.
