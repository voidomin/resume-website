# Resume Website

A modular, themeable resume and portfolio website built with vanilla JavaScript and Vite.
The project focuses on clean architecture, strong code quality, and automated CI/CD.

Live site:
https://voidomin.github.io/resume-website/

---

## Tech Stack

- HTML, CSS, Vanilla JavaScript
- Vite (development server and build tool)
- ESLint (linting)
- Prettier (formatting)
- Husky + lint-staged (pre-commit checks)
- GitHub Actions (CI)
- GitHub Pages (deployment)

---

## Project Structure

assets/js/src/

- Modular JavaScript source
- ThemeManager, VariantManager, App bootstrap

public/

- Route-based pages
- /portfolio
- /ats
- /digital
- /print

dist/

- Production build output (auto-generated)
- Do not edit manually

.github/workflows/

- CI and deployment workflows

---

## Local Development

Install dependencies:

npm install

Start development server:

npm run dev

Open in browser:
http://localhost:5173

---

## Production Build

Create production build:

npm run build

Preview production build locally:

npm run preview

---

## Code Quality

Run ESLint:

npm run lint

Auto-fix ESLint issues:

npm run lint:fix

Format code using Prettier:

npm run format

Notes:

- ESLint runs on pull requests via GitHub Actions
- Prettier and ESLint fixes run automatically on commit using Husky

---

## Deployment

- Automatically deployed to GitHub Pages
- Triggered on merge to the main branch
- Uses Vite build output from the dist/ directory
- Public base path configured for GitHub Pages

---

## Contribution Workflow

- All changes go through pull requests
- CI must pass before merge
- Branch-based development (feature/, refactor/, ci/)

---

## Status

Project is actively maintained and incrementally improved with a focus on:

- Maintainability
- Readability
- Automation
