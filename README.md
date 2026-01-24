# Resume Website

[![Build Status](https://github.com/voidomin/resume-website/workflows/CI/badge.svg)](https://github.com/voidomin/resume-website/actions)
[![Live Site](https://img.shields.io/badge/live-site-blue)](https://voidomin.github.io/resume-website/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D22.12.0-brightgreen)](package.json)

> A modular, themeable resume and portfolio website built with vanilla JavaScript and Vite. Features multiple resume variants, dark/light themes, and automated CI/CD.

**Live Site**: [https://voidomin.github.io/resume-website/](https://voidomin.github.io/resume-website/)

---

## ✨ Key Features

- 🎨 **Multi-Variant Resume System** - Print, ATS, Digital, and Portfolio versions
- 🌓 **Theme Switching** - Dark/light mode with color palette cycling
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast & Modern** - Built with Vite, vanilla JavaScript (no frameworks)
- ♿ **Accessible** - WCAG 2.1 AA compliant with skip links, ARIA, keyboard navigation
- 🚀 **Auto-Deploy** - CI/CD with GitHub Actions and Pages
- 📦 **Clean Code** - ESLint, Prettier, and pre-commit hooks
- 📊 **Experience Metrics** - Interactive visualization dashboard
- 🤖 **Auto-PDF Generation** - Regenerate PDFs on resume data changes
- ✅ **Automated Testing** - Unit tests, link checking, code quality

---

## 🚀 GitHub Actions (CI/CD)

This project includes **3 automated workflows** for seamless updates:

1. **Auto-Generate PDFs** - Regenerates PDFs whenever you update role data
2. **Code Quality** - Runs linting, formatting, and unit tests
3. **Deploy** - Automatically deploys to GitHub Pages

### Setup GitHub Actions:

See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for detailed setup instructions.

**Workflow Documentation**: [.github/WORKFLOWS.md](.github/WORKFLOWS.md)

---

## 📊 Interactive Features

### Experience Metrics Dashboard

View your skills, tech stack, and domain breakdown:

- **URL**: `/metrics.html`
- Switch between role variants
- Visual skill proficiency bars
- Domain focus charts
- Experience statistics

---

## 📸 Screenshots

_Coming soon - Screenshots of different resume variants and themes_

---

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript (ES6 modules)
- **Build Tool**: Vite (development server and bundler)
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky + lint-staged (pre-commit checks)
- **CI/CD**: GitHub Actions (3 workflows)
- **Hosting**: GitHub Pages with auto-deployment
- **Analytics**: Google Analytics 4 (optional)
- **Testing**: Vitest (unit tests), Playwright (e2e)
- **PDF Generation**: Playwright + Puppeteer

---

## 📊 Analytics

The website includes **Google Analytics 4** integration for tracking:

- Page views and user engagement
- Resume downloads (Print, ATS, Digital)
- Variant switches
- Theme changes
- User behavior

### Setup

1. Create a [Google Analytics 4 property](https://analytics.google.com/)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Replace `G-XXXXXXXXXX` in these files with your actual ID:
   - `index.html`
   - `public/portfolio/index.html`
   - `public/digital/index.html`

**Note**: GA4 is free forever with no limits on events or users.

See [docs/ANALYTICS.md](docs/ANALYTICS.md) for detailed documentation.

---

## Project Structure

```
resume-website/
├── index.html              # Main landing page
├── metrics.html            # Experience metrics dashboard
├── public/                 # Static pages
│   ├── portfolio/          # Portfolio page
│   ├── print/              # Print resume
│   ├── ats/                # ATS resume
│   ├── digital/            # Digital resume
│   └── 404.html            # Error page
├── data/
│   └── roles/              # Resume role variants (JSON)
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── assets/                 # Shared resources
│   ├── css/                # Stylesheets
│   ├── js/src/             # JavaScript modules
│   │   ├── ThemeManager.js
│   │   ├── VariantManager.js
│   │   └── App.js
│   └── img/                # Images
├── docs/                   # Documentation
│   ├── style-guide.md      # Code style guidelines
│   ├── ROUTER_GUIDE.md     # Navigation documentation
│   ├── CHANGELOG.md        # Version history
│   └── FEATURES.md         # Feature documentation
├── .github/workflows/      # CI/CD pipelines
├── dist/                   # Production build (auto-generated)
└── vite.config.mjs         # Build configuration
```

---

## Local Development

### Prerequisites

- Node.js >= 22.12.0
- npm (comes with Node.js)

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/voidomin/resume-website.git
   cd resume-website
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:5173
   ```

The development server supports hot module replacement (HMR) for instant updates.

---

## Production Build

Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

The build output is in the `dist/` directory.

---

## Code Quality

### Linting

Run ESLint:

```bash
npm run lint
```

Auto-fix ESLint issues:

```bash
npm run lint:fix
```

### Formatting

Format code using Prettier:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

### Automated Checks

- **Pre-commit**: Husky runs ESLint and Prettier on staged files
- **CI**: GitHub Actions runs linting, formatting, and build checks on every push/PR

---

## 🧪 Testing

The project uses a comprehensive testing suite:

- **Unit Tests**: `npm run test:unit` (Vitest) - Tests core JS logic (Router, Analytics)
- **E2E Tests**: `npm run test:e2e` (Playwright) - Tests full site functionality in browsers
- **Linting**: `npm run lint` (ESLint) - Ensures code quality
- **Formatting**: `npm run format` (Prettier) - Enforces style consistency

Test results are verified automatically via GitHub Actions on every push.

---

## Deployment

- **Platform**: GitHub Pages
- **Trigger**: Automatic deployment on merge to `main` branch
- **Build**: Uses Vite build output from `dist/` directory
- **Base Path**: `/resume-website/` (configured in `vite.config.mjs`)
- **URL**: https://voidomin.github.io/resume-website/

### Manual Deployment

If needed, you can manually trigger deployment via GitHub Actions.

---

## Contribution Workflow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**:

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

   Follow [conventional commits](https://www.conventionalcommits.org/) format.

3. **Push and create PR**:

   ```bash
   git push origin feature/your-feature-name
   ```

4. **Wait for CI checks** to pass

5. **Merge** after approval

---

## 🗺️ Roadmap

See [docs/CHANGELOG.md](docs/CHANGELOG.md) for detailed plans.

### Phase 1: SEO & Performance (Completed)

- [x] Add meta tags and Open Graph tags
- [x] Create sitemap.xml and robots.txt
- [x] Optimize fonts and JavaScript loading
- [x] Set up Lighthouse CI
- [x] Achieve Lighthouse scores 90+

### Phase 2: Analytics (Completed)

- [x] Integrate Google Analytics 4
- [x] Track resume downloads
- [x] Monitor user behavior

### Phase 3: Accessibility (Completed)

- [x] Add skip-to-content links
- [x] Improve ARIA labels
- [x] Ensure WCAG 2.1 AA compliance

### Phase 4: Enhanced Projects (Current Focus)

- [ ] Add project screenshots
- [ ] Create expandable project details
- [ ] Integrate GitHub stats

### Phase 5: Contact Form

- [ ] Add Formspree contact form
- [ ] Email notifications

### Phase 6: Testing (Completed)

- [x] Unit tests with Vitest
- [x] E2E tests with Playwright

### Phase 7: Blog (In Progress)

- [x] Create blog section
- [x] Write 2+ technical articles

### Phase 8: Advanced Features

- [x] PWA support
- [ ] Offline capability
- [ ] Advanced animations

---

## 📚 Documentation

- [FEATURES.md](docs/FEATURES.md) - Complete feature documentation
- [style-guide.md](docs/style-guide.md) - Code style and conventions
- [ROUTER_GUIDE.md](docs/ROUTER_GUIDE.md) - Navigation system guide
- [CHANGELOG.md](docs/CHANGELOG.md) - Version history

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

- **Email**: akashkbhat216@gmail.com
- **GitHub**: [@voidomin](https://github.com/voidomin)
- **LinkedIn**: [akash-bhat](https://www.linkedin.com/in/akash-bhat-930346197)

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Icons and design inspiration from modern web design trends

---

**Status**: Actively maintained and incrementally improved with a focus on maintainability, readability, and automation.

**Last Updated**: January 2026
