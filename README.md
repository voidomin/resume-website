# Akash — Resume & Portfolio

A lightweight static website that contains multiple versions of my resume (Print / ATS / Digital) and a portfolio page.  
Everything is built using plain **HTML + CSS + JavaScript** with clean folder structure and themeable UI.

---

## 📂 Project Structure

│ .gitignore
│ index.html
│ package.json
│ README.md
│
├───assets
│ ├───css
│ │ index.css
│ │ portfolio.css
│ │
│ ├───img
│ │ akash_CV.jpeg
│ │
│ └───js
│ index.js
│ portfolio.js
│
├───Ats
│ resume_ats.html
│ resume_ats.pdf
│
├───Digital
│ resume_digital.html
│
├───docs
│ style-guide.md
│
├───Portfolio
│ portfolio.html
│
├───preview
│ preview-theme.html
│
└───Print
resume_print.html
resume_print.pdf

---

## 🚀 Features

- **Multiple resume formats**
  - Print-ready (A4 + PDF)
  - ATS-friendly
  - Digital screen-ready
- **Portfolio page** (separate clean layout)
- **Theme system**
  - Light / Dark mode toggle
  - Extra color themes (Ocean / Sunset / Forest)
  - Stored in localStorage
- **Clean OOP JavaScript architecture**
  - `ThemeManager`
  - `VariantManager`
  - `App`

---

## 🧪 How to Preview

Open `index.html` directly, or run a small static server:

npx http-server .

or use VS Code’s Live Server.

---

## 🏷 Tags & Workflow

- Work on `dev` branch
- Merge into `main` only when stable
- Tag releases like:

git tag index-v3
git push origin index-v3

---

## 📌 License

Personal project — no public license yet.

---

## ✨ Future Improvements

- Split CSS into components (Button / Card / VariantGrid)
- Add build tooling (PostCSS / Vite) — optional
- Add GitHub Pages deployment
- Add ESLint + Stylelint + Prettier
