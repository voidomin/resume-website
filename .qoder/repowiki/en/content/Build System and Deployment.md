# Build System and Deployment

<cite>
**Referenced Files in This Document**
- [vite.config.mjs](file://vite.config.mjs)
- [package.json](file://package.json)
- [playwright.config.js](file://playwright.config.js)
- [playwright.config.ts](file://playwright.config.ts)
- [vitest.config.js](file://vitest.config.js)
- [lighthouserc.json](file://lighthouserc.json)
- [eslint.config.mjs](file://eslint.config.mjs)
- [scripts/generate-pdf.js](file://scripts/generate-pdf.js)
- [verify-workflows.sh](file://verify-workflows.sh)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md)
- [DEPLOYMENT_COMPLETE.md](file://DEPLOYMENT_COMPLETE.md)
- [DEPLOYMENT_READY.md](file://DEPLOYMENT_READY.md)
</cite>

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction

This document explains the build system and deployment pipeline for the resume website. It covers Vite configuration, automated deployment via GitHub Actions, CI/CD workflows, testing integration, environment configuration, asset optimization, bundle splitting, and production readiness. It also documents deployment strategies, build artifacts, release management, and practical troubleshooting and optimization guidance.

## Project Structure

The project is a frontend-focused static site with a modern build toolchain and automated CI/CD. Key build and deployment assets include:

- Vite configuration for development and production builds
- Playwright configuration for E2E testing and PDF generation
- Vitest configuration for unit tests
- LHCI configuration for automated performance and quality gates
- ESLint flat config for code quality
- Scripts for automated PDF generation
- GitHub Actions workflows for quality checks and deployment

```mermaid
graph TB
subgraph "Build Tools"
Vite["Vite Config<br/>vite.config.mjs"]
ESL["ESLint Flat Config<br/>eslint.config.mjs"]
LHC["LHCI Config<br/>lighthouserc.json"]
end
subgraph "Testing"
PWJ["Playwright Config (Preview)<br/>playwright.config.js"]
PWT["Playwright Config (Dev)<br/>playwright.config.ts"]
VT["Vitest Config<br/>vitest.config.js"]
end
subgraph "Automation"
GHA["GitHub Actions Setup<br/>GITHUB_ACTIONS_SETUP.md"]
PDF["PDF Generator Script<br/>scripts/generate-pdf.js"]
VFY["Workflow Verifier<br/>verify-workflows.sh"]
end
subgraph "Output"
Dist["Dist Output<br/>dist/"]
Pages["GitHub Pages<br/>voidomin.github.io/resume-website/"]
end
Vite --> Dist
ESL --> Vite
LHC --> Vite
PWJ --> Vite
PWT --> Vite
VT --> Vite
PDF --> GHA
GHA --> Pages
Dist --> Pages
```

**Diagram sources**

- [vite.config.mjs](file://vite.config.mjs#L1-L21)
- [eslint.config.mjs](file://eslint.config.mjs#L1-L82)
- [lighthouserc.json](file://lighthouserc.json#L1-L39)
- [playwright.config.js](file://playwright.config.js#L1-L45)
- [playwright.config.ts](file://playwright.config.ts#L1-L27)
- [vitest.config.js](file://vitest.config.js#L1-L11)
- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L1-L81)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L1-L273)
- [verify-workflows.sh](file://verify-workflows.sh#L1-L67)

**Section sources**

- [vite.config.mjs](file://vite.config.mjs#L1-L21)
- [package.json](file://package.json#L1-L56)
- [playwright.config.js](file://playwright.config.js#L1-L45)
- [playwright.config.ts](file://playwright.config.ts#L1-L27)
- [vitest.config.js](file://vitest.config.js#L1-L11)
- [lighthouserc.json](file://lighthouserc.json#L1-L39)
- [eslint.config.mjs](file://eslint.config.mjs#L1-L82)
- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L1-L81)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L1-L273)
- [verify-workflows.sh](file://verify-workflows.sh#L1-L67)

## Core Components

- Vite build configuration defines output directory, minification, CSS code splitting, modern browser target, and manual chunking strategy for vendor bundles.
- Package scripts orchestrate development, building, testing, linting, formatting, and artifact generation.
- Playwright configurations drive E2E tests and PDF generation against built previews or local servers.
- Vitest configuration sets up unit tests with jsdom environment.
- LHCI configuration enforces quality gates for performance, accessibility, SEO, and best practices.
- ESLint flat config ensures consistent code quality and formatting across the project.
- GitHub Actions workflows automate PDF regeneration, quality checks, and deployment to GitHub Pages.

**Section sources**

- [vite.config.mjs](file://vite.config.mjs#L3-L20)
- [package.json](file://package.json#L5-L24)
- [playwright.config.js](file://playwright.config.js#L4-L44)
- [playwright.config.ts](file://playwright.config.ts#L3-L26)
- [vitest.config.js](file://vitest.config.js#L3-L10)
- [lighthouserc.json](file://lighthouserc.json#L2-L38)
- [eslint.config.mjs](file://eslint.config.mjs#L20-L81)
- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L5-L80)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L46-L54)

## Architecture Overview

The build and deployment pipeline integrates local development, automated testing, quality gates, and continuous deployment to GitHub Pages.

```mermaid
sequenceDiagram
participant Dev as "Developer"
participant Vite as "Vite Build"
participant Tests as "Playwright/Vitest"
participant LHC as "LHCI"
participant Repo as "GitHub Repo"
participant GHA as "GitHub Actions"
participant Pages as "GitHub Pages"
Dev->>Vite : "npm run build"
Vite-->>Repo : "dist/"
Dev->>Tests : "npm run test : unit / test : e2e"
Tests-->>GHA : "Test reports"
Dev->>LHC : "npm run ci" (via LHCI)
LHC-->>GHA : "Quality report"
GHA->>Pages : "Deploy dist/ on success"
Pages-->>Dev : "Live site"
```

**Diagram sources**

- [package.json](file://package.json#L5-L24)
- [playwright.config.js](file://playwright.config.js#L38-L43)
- [playwright.config.ts](file://playwright.config.ts#L20-L25)
- [vitest.config.js](file://vitest.config.js#L3-L10)
- [lighthouserc.json](file://lighthouserc.json#L2-L38)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L48-L54)

## Detailed Component Analysis

### Vite Build Configuration

Key behaviors:

- Sets base path for GitHub Pages hosting.
- Outputs to dist with empty-outdir semantics.
- Minifies with esbuild and targets modern browsers for smaller bundles.
- Enables CSS code splitting.
- Defines manualChunks to group shared vendor assets.
- Uses explicit public directory for static pages.

```mermaid
flowchart TD
Start(["Vite Build"]) --> Base["Set base '/resume-website/'"]
Base --> OutDir["Configure outDir 'dist'"]
OutDir --> Minify["Minify with esbuild"]
Minify --> Target["Target 'esnext'"]
Target --> CSSplit["Enable CSS code split"]
CSSplit --> ManualChunks["Manual chunks for vendor"]
ManualChunks --> Public["Public dir 'public'"]
Public --> End(["dist ready"])
```

**Diagram sources**

- [vite.config.mjs](file://vite.config.mjs#L3-L20)

**Section sources**

- [vite.config.mjs](file://vite.config.mjs#L3-L20)

### Testing Configuration

- Playwright (preview): Runs E2E tests against a built and served preview, with Chromium and Mobile Chrome projects, HTML reporter, and trace collection on retry.
- Playwright (dev): Runs tests against a local development server with a simpler setup.
- Vitest: Runs unit tests in jsdom environment with include/exclude patterns.

```mermaid
sequenceDiagram
participant Runner as "Test Runner"
participant PW as "Playwright"
participant Dev as "Dev Server"
participant Prev as "Vite Preview"
participant Unit as "Vitest"
Runner->>PW : "Run E2E tests"
PW->>Prev : "Start preview and navigate"
Prev-->>PW : "Serve dist/"
PW-->>Runner : "HTML report"
Runner->>Unit : "Run unit tests"
Unit->>Dev : "Start dev server"
Dev-->>Unit : "Serve on localhost"
Unit-->>Runner : "Test results"
```

**Diagram sources**

- [playwright.config.js](file://playwright.config.js#L38-L43)
- [playwright.config.ts](file://playwright.config.ts#L20-L25)
- [vitest.config.js](file://vitest.config.js#L3-L10)

**Section sources**

- [playwright.config.js](file://playwright.config.js#L4-L44)
- [playwright.config.ts](file://playwright.config.ts#L3-L26)
- [vitest.config.js](file://vitest.config.js#L3-L10)

### Quality Gates with LHCI

- Collects performance metrics from dist using two runs on key pages.
- Asserts minimum scores for performance, accessibility, SEO, and best practices.
- Uploads temporary public storage for review.

```mermaid
flowchart TD
Start(["LHCI Run"]) --> Collect["Collect from dist/"]
Collect --> Runs["Multiple runs on index pages"]
Runs --> Assert["Assert minimum category scores"]
Assert --> Upload["Upload report"]
Upload --> End(["Gate decision"])
```

**Diagram sources**

- [lighthouserc.json](file://lighthouserc.json#L2-L38)

**Section sources**

- [lighthouserc.json](file://lighthouserc.json#L1-L39)

### Code Quality with ESLint (Flat Config)

- Ignores node_modules, dist, public, preview, and scripts directories.
- Applies recommended base rules and project-specific rules for browser globals.
- Integrates Prettier via eslint-plugin-prettier with non-blocking warnings.

```mermaid
flowchart TD
Start(["ESLint Run"]) --> Ignore["Apply ignores"]
Ignore --> Base["Load recommended rules"]
Base --> ProjectRules["Apply project-specific rules"]
ProjectRules --> Prettier["Integrate Prettier plugin"]
Prettier --> Warn["Non-blocking warnings"]
Warn --> End(["Consistent formatting"])
```

**Diagram sources**

- [eslint.config.mjs](file://eslint.config.mjs#L20-L81)

**Section sources**

- [eslint.config.mjs](file://eslint.config.mjs#L1-L82)

### Automated PDF Generation

- Starts a local HTTP server on port 8081.
- Launches a headless Chromium browser.
- Generates main ATS PDF and per-role ATS/print PDFs.
- Writes outputs to public/ats and public/print directories.

```mermaid
sequenceDiagram
participant Script as "generate-pdf.js"
participant Server as "Local HTTP Server"
participant Browser as "Chromium"
participant FS as "File System"
Script->>Server : "Start http-server on 8081"
Script->>Browser : "Launch and open pages"
Browser-->>Script : "Rendered HTML"
Script->>FS : "Write PDFs to public/ats and public/print"
Script-->>Script : "Exit"
```

**Diagram sources**

- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L5-L80)

**Section sources**

- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L1-L81)

### GitHub Actions Workflows

Workflows orchestrated by GitHub Actions:

- generate-pdfs.yml: Auto-generates PDFs on role data changes, commits artifacts, and uploads.
- quality.yml: Runs lint, format, unit tests, and link checks on every push and PR.
- deploy.yml: Deploys to GitHub Pages after quality checks succeed.

```mermaid
flowchart TD
Push["Push/PR"] --> Quality["Quality Checks"]
Quality --> |Pass| PDFs["Auto-Generate PDFs"]
Quality --> |Pass| Deploy["Deploy to GitHub Pages"]
Quality --> |Fail| Block["Block Merge"]
PDFs --> Artifacts["Upload Artifacts"]
Deploy --> Live["Live Site"]
```

**Diagram sources**

- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L48-L54)

**Section sources**

- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L1-L273)

### Environment Configuration and Scripts

- Node engine requirement pinned for reproducible builds.
- Scripts cover dev, build, unit tests, E2E tests, lint/format, and artifact generation.
- Husky prepare hook enables pre-commit hooks.

**Section sources**

- [package.json](file://package.json#L2-L24)

### Deployment Readiness and Completion

- Deployment ready documentation outlines deliverables, integrations, and quality metrics.
- Deployment complete documentation confirms live URLs, features, and statistics.

**Section sources**

- [DEPLOYMENT_READY.md](file://DEPLOYMENT_READY.md#L1-L316)
- [DEPLOYMENT_COMPLETE.md](file://DEPLOYMENT_COMPLETE.md#L1-L386)

## Dependency Analysis

The build system exhibits low external dependency usage, favoring native browser APIs and modern tooling. Internal dependencies include:

- Vite for bundling and dev server
- Playwright for E2E and PDF generation
- Vitest for unit tests
- LHCI for quality gates
- ESLint/Prettier for code quality
- GitHub Actions for automation

```mermaid
graph LR
Vite["Vite"] --> Dist["dist/"]
ESL["ESLint"] --> Vite
LHC["LHCI"] --> Dist
PW["Playwright"] --> PDFs["PDFs"]
VT["Vitest"] --> UnitTests["Unit Tests"]
GHA["GitHub Actions"] --> Pages["GitHub Pages"]
Dist --> Pages
PDFs --> GHA
```

**Diagram sources**

- [vite.config.mjs](file://vite.config.mjs#L3-L20)
- [lighthouserc.json](file://lighthouserc.json#L2-L38)
- [playwright.config.js](file://playwright.config.js#L38-L43)
- [vitest.config.js](file://vitest.config.js#L3-L10)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L48-L54)

**Section sources**

- [vite.config.mjs](file://vite.config.mjs#L1-L21)
- [package.json](file://package.json#L25-L56)
- [playwright.config.js](file://playwright.config.js#L1-L45)
- [playwright.config.ts](file://playwright.config.ts#L1-L27)
- [vitest.config.js](file://vitest.config.js#L1-L11)
- [lighthouserc.json](file://lighthouserc.json#L1-L39)
- [eslint.config.mjs](file://eslint.config.mjs#L1-L82)
- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L1-L81)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L1-L273)

## Performance Considerations

- Modern browser target reduces bundle size by leveraging newer JavaScript features.
- CSS code splitting improves initial load performance by deferring non-critical styles.
- Manual chunking groups shared vendor assets to improve caching and reduce duplication.
- LHCI assertions enforce performance and accessibility thresholds to maintain quality over time.
- Using esbuild minification balances speed and compression.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide

Common issues and resolutions:

- Workflows not running: Verify Actions permissions and workflow file existence; ensure path filters match intended files.
- PDF generation failures: Check Node.js version, Playwright installation, and template validity; inspect detailed logs.
- Deployment failures: Confirm GitHub Pages is enabled and branch settings are correct; manually trigger the deploy workflow to diagnose.
- Local verification: Use the workflow verifier script to confirm workflow presence, Node version, dependencies, scripts, and role data files.

**Section sources**

- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L213-L235)
- [verify-workflows.sh](file://verify-workflows.sh#L9-L53)

## Conclusion

The build system leverages Vite for efficient bundling, Playwright for robust testing and PDF generation, Vitest for unit tests, and LHCI for quality gates. GitHub Actions automates PDF regeneration, quality checks, and deployment to GitHub Pages. The configuration emphasizes modern browser compatibility, CSS code splitting, and manual chunking for optimal performance. The provided scripts and documentation enable reliable local verification and troubleshooting.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Build Artifacts and Release Management

- Build output: dist/
- Static pages: public/
- Generated PDFs: public/ats/, public/print/
- GitHub Pages: voidomin.github.io/resume-website/

**Section sources**

- [vite.config.mjs](file://vite.config.mjs#L5-L20)
- [scripts/generate-pdf.js](file://scripts/generate-pdf.js#L19-L67)
- [DEPLOYMENT_COMPLETE.md](file://DEPLOYMENT_COMPLETE.md#L187-L201)

### Example Customizations

- Build customization: Adjust Vite target, minification, and manualChunks to balance bundle size and runtime performance.
- Environment configuration: Align Node engine and package scripts with CI runner versions.
- Deployment strategy: Switch deployment branch in GitHub Actions or adjust base path for alternate hosting.
- Monitoring: Add LHCI assertions for additional categories or increase run count for stability.

**Section sources**

- [vite.config.mjs](file://vite.config.mjs#L3-L20)
- [package.json](file://package.json#L2-L24)
- [GITHUB_ACTIONS_SETUP.md](file://GITHUB_ACTIONS_SETUP.md#L188-L198)
- [lighthouserc.json](file://lighthouserc.json#L8-L32)
