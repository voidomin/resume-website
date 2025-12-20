# Features

Current capabilities and features of the Resume & Portfolio website.

---

## 🎨 Multi-Variant Resume System

The website offers **four different resume formats** to suit different use cases:

### 1. **Print Resume** 📄

- **Purpose**: Optimized for A4 printing and PDF sharing
- **Format**: Two-column layout with visual hierarchy
- **Download**: PDF available
- **View**: HTML version available
- **Best for**: In-person interviews, physical submissions

### 2. **ATS Resume** 🤖

- **Purpose**: Machine-readable format for Applicant Tracking Systems
- **Format**: Single-column, plain text-friendly layout
- **Download**: PDF available
- **View**: HTML version available
- **Best for**: Online job portals, automated screening systems

### 3. **Digital Resume** 💻

- **Purpose**: Screen-first, interactive resume
- **Format**: Responsive web design
- **View**: HTML only (no PDF)
- **Best for**: LinkedIn sharing, email signatures, online profiles

### 4. **Portfolio** 🎯

- **Purpose**: Comprehensive showcase of work and experience
- **Format**: Full portfolio page with projects, skills, and contact
- **Features**:
  - Detailed project descriptions
  - Experience timeline
  - Skills breakdown
  - Contact information
  - Resume download options
- **Best for**: Demonstrating full capabilities to potential employers

---

## 🌓 Theme System

### Dark/Light Mode Toggle

- **Automatic detection**: Respects system preferences
- **Manual toggle**: Button to switch between themes
- **Persistence**: Choice saved in localStorage
- **Smooth transitions**: Animated color changes

### Color Palette Cycling

- **Multiple color schemes**: Cycle through different accent colors
- **Visual feedback**: Palette icon shows current theme
- **Accessibility**: All palettes maintain WCAG contrast ratios

---

## 📱 Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Breakpoints**:
  - Mobile: ≤ 559px
  - Tablet: 560–979px
  - Desktop: ≥ 980px
- **Touch-friendly**: Large tap targets for mobile devices
- **Print-optimized**: Print resume formats correctly on paper

---

## ⚡ Performance

- **Fast loading**: Optimized assets and minimal dependencies
- **Vite build**: Modern bundling for production
- **Code splitting**: Separate bundles for modern and legacy browsers
- **Font optimization**: Google Fonts with display=swap

---

## 🎯 User Experience

### Navigation

- **Variant switcher**: Toggle between resume types without page reload
- **Active state**: Visual indication of current variant
- **Keyboard accessible**: Full keyboard navigation support

### Downloads

- **One-click downloads**: Direct PDF downloads for Print and ATS resumes
- **Descriptive filenames**: `Akash_Bhat_Resume.pdf` format
- **Multiple formats**: Choose between different resume styles

### Visual Feedback

- **Hover effects**: Cards lift on hover
- **Smooth animations**: Transitions for theme changes
- **Loading states**: Visual feedback for interactions

---

## 🔧 Technical Features

### Modern JavaScript

- **ES6 Modules**: Modular, maintainable code
- **Class-based architecture**:
  - `ThemeManager`: Handles theme switching and persistence
  - `VariantManager`: Manages resume variant selection
  - `App`: Bootstraps and coordinates all features
- **No frameworks**: Vanilla JavaScript for simplicity and performance

### Build System

- **Vite**: Fast development server and optimized builds
- **Hot Module Replacement**: Instant updates during development
- **Production optimization**: Minification and tree-shaking

### Code Quality

- **ESLint**: JavaScript linting with recommended rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks
- **lint-staged**: Run checks only on changed files

### CI/CD

- **GitHub Actions**: Automated workflows
  - **CI**: Lint, format check, and build on every push/PR
  - **Deployment**: Auto-deploy to GitHub Pages on main branch
- **Branch protection**: Require CI to pass before merge

---

## ♿ Accessibility

- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Full keyboard accessibility
- **Focus indicators**: Visible focus states
- **Color contrast**: WCAG AA compliant (in progress for AAA)
- **Alt text**: Descriptive text for images

---

## 📂 Project Structure

```
resume-website/
├── index.html              # Main landing page
├── public/                 # Static pages
│   ├── portfolio/          # Portfolio page
│   ├── print/              # Print resume
│   ├── ats/                # ATS resume
│   ├── digital/            # Digital resume
│   └── 404.html            # Error page
├── assets/                 # Shared resources
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript modules
│   └── img/                # Images
├── docs/                   # Documentation
│   ├── style-guide.md      # Code style guidelines
│   ├── ROUTER_GUIDE.md     # Navigation documentation
│   ├── CHANGELOG.md        # Version history
│   └── FEATURES.md         # This file
├── .github/workflows/      # CI/CD pipelines
├── dist/                   # Production build (auto-generated)
└── vite.config.mjs         # Build configuration
```

---

## 🚀 Deployment

- **Platform**: GitHub Pages
- **URL**: https://voidomin.github.io/resume-website/
- **Auto-deployment**: Pushes to `main` trigger automatic builds
- **Build time**: ~30 seconds
- **CDN**: Served via GitHub's global CDN

---

## 📊 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Legacy support**: Fallback for browsers without ES6 module support
- **Mobile browsers**: iOS Safari, Chrome Mobile, Samsung Internet

---

## 🔒 Privacy & Security

- **No tracking**: No analytics or tracking scripts (yet)
- **No cookies**: No cookies used
- **Static site**: No server-side processing
- **HTTPS**: Served over secure connection via GitHub Pages

---

## 📝 Content

### Resume Variants

- **Experience**: Development Engineer at Merck, Program Coordinator at Abhyudaya
- **Projects**: Param Adventures, Abhyudaya NGO website
- **Skills**: React, Next.js, TypeScript, Python, Selenium, PostgreSQL
- **Education**: M.Sc. Molecular & Cellular Biology
- **Location**: Bengaluru, India

### Contact Information

- **Email**: akashkbhat216@gmail.com
- **GitHub**: github.com/voidomin
- **LinkedIn**: linkedin.com/in/akash-bhat-930346197

---

## 🎯 Upcoming Features

See [CHANGELOG.md](./CHANGELOG.md) for planned enhancements:

- SEO optimization with meta tags
- Performance improvements (Lighthouse 90+)
- Google Analytics 4 integration
- Enhanced project showcase
- Contact form
- Testing suite
- Blog section
- PWA support

---

## 📖 Documentation

- [README.md](../README.md) - Setup and development guide
- [style-guide.md](./style-guide.md) - Code style and conventions
- [ROUTER_GUIDE.md](./ROUTER_GUIDE.md) - Navigation system documentation
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes

---

**Last Updated**: December 20, 2025  
**Version**: 1.0.0
