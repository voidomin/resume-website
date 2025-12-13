# Resume Website

A modern, modular, and production-ready resume + portfolio website built with
**vanilla HTML, CSS, and JavaScript**, enhanced using **Vite**, **ESLint**,
**Prettier**, **Husky**, and **GitHub Actions CI/CD**.

Live site:  
👉 https://voidomin.github.io/resume-website/

---

## ✨ Features

- 📄 Multiple resume formats
  - **Print** (A4-optimized PDF)
  - **ATS-friendly** (machine-readable)
  - **Digital / Visual resume**
- 🎨 Theme system (dark mode + color themes)
- 🧩 Modular JavaScript architecture (OOP-based managers)
- ⚡ Fast builds with Vite
- 🔍 ESLint + Prettier enforced
- 🧪 CI checks on every PR
- 🤖 Automated PR lint comments (Reviewdog)
- 🚀 Auto-deployment to GitHub Pages

---

## 📁 Project Structure

```text
.
├── assets/                 # Source CSS & JS
│   ├── css/
│   └── js/
│       └── src/             # Modular JS (ThemeManager, VariantManager, App)
├── public/                  # Static routes (GitHub Pages)
│   ├── ats/
│   ├── digital/
│   ├── portfolio/
│   └── print/
├── dist/                    # Production build output
├── docs/
│   └── style-guide.md
├── .github/workflows/       # CI & deploy workflows
├── vite.config.mjs
└── index.html

## 🧠 JavaScript Architecture
The core logic is split into clean, testable modules:

ThemeManager
Handles dark mode, theme switching, persistence

VariantManager
Controls resume variant selection and CTA updates

App
Bootstraps and wires everything together

Legacy fallback support is retained for non-module browsers.

## 🛠️ Local Development
Install dependencies
bash
Copy code
npm install
Run dev server
bash
Copy code
npm run dev
Build for production
bash
Copy code
npm run build

##🧹 Code Quality
Format code
bash
Copy code
npm run format
Lint code
bash
Copy code
npm run lint
Auto-fix lint issues
bash
Copy code
npm run lint:fix
Pre-commit hooks ensure formatting and linting before every commit.

##🔁 CI / CD
On every PR
ESLint (no-fix)

Prettier check

Vite build

Inline PR comments via Reviewdog

On merge to main
Production build

Deploy to GitHub Pages

📦 Deployment

This site is deployed using GitHub Pages from the Vite build output.

Base path is configured for repo hosting:

base: "/resume-website/"

📄 License

```
