# 🚀 GitHub Actions Setup Complete

Your resume website now has **3 automated workflows** configured!

## What Changed?

### Files Created/Updated:

```
.github/workflows/
├── generate-pdfs.yml    ← NEW: Auto-generate PDFs on JSON changes
├── quality.yml          ← NEW: Lint, test, and link checking
└── deploy.yml          ← UPDATED: Enhanced deployment settings
```

---

## ✨ How It Works

### 1️⃣ Edit Your Resume Data

```bash
# Edit a role JSON file
git add data/roles/developer-testing.json
git commit -m "Update experience metrics"
git push
```

### 2️⃣ GitHub Actions Automatically:

- ✅ Detects the change
- ✅ Regenerates all PDF variants (ATS + Print)
- ✅ Runs ESLint & Prettier checks
- ✅ Runs unit tests
- ✅ Commits PDFs back to repo
- ✅ Deploys to GitHub Pages

### 3️⃣ Your Changes Are Live

- PDFs updated on GitHub
- Website deployed to GitHub Pages
- No manual work needed!

---

## 📋 Workflow Details

| Workflow              | Trigger                     | Action                                       |
| --------------------- | --------------------------- | -------------------------------------------- |
| **generate-pdfs.yml** | Push to `data/roles/*.json` | Auto-generate PDFs, commit, upload artifacts |
| **quality.yml**       | Every push & PR             | Lint, format, test, check links              |
| **deploy.yml**        | Successful quality checks   | Deploy to GitHub Pages                       |

---

## 🔧 First-Time Setup (GitHub Only)

These steps need to be done once on GitHub:

### Step 1: Enable GitHub Pages

1. Go to your repo → **Settings**
2. Left sidebar → **Pages**
3. Under "Build and deployment":
   - Source: `Deploy from a branch`
   - Branch: `main` / `/` (root)
4. Click **Save**

### Step 2: Enable Actions Permissions

1. Go to repo → **Settings**
2. Left sidebar → **Actions** → **General**
3. Check: ✅ "Allow all actions and reusable workflows"
4. Under "Workflow permissions":
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"
5. Click **Save**

### Step 3: Trigger First Run

```bash
# Make a small change and push
git add .
git commit -m "Enable GitHub Actions workflows"
git push
```

Then go to **Actions** tab and watch the magic happen! 🎉

---

## 📊 Monitor Workflows

### View Workflow Runs

1. GitHub repo → **Actions** tab
2. See all workflow runs with status (✅/❌)
3. Click any run to see detailed logs

### View Generated Artifacts

1. **Actions** → Latest successful run
2. Scroll to **Artifacts** section
3. Download generated PDFs (30-day retention)

---

## 🎯 What to Do Now

### Immediate:

- [ ] Set up GitHub Pages (Settings → Pages)
- [ ] Enable Actions permissions (Settings → Actions)
- [ ] Push a change to test workflows

### Optional:

- [ ] Add badges to README (Actions status, deployment status)
- [ ] Set up branch protection rules
- [ ] Add status checks to PRs

---

## 💡 Usage Examples

### Update Your Resume

```bash
# Edit metrics and experience
nano data/roles/data-business-analyst.json
git add data/roles/data-business-analyst.json
git commit -m "Update skills and project metrics"
git push
# → Workflows run → PDFs regenerated → Auto-deployed ✅
```

### Update HTML Templates

```bash
# Edit CV template
nano public/ats/data-business-analyst/index.html
git add public/ats/data-business-analyst/index.html
git commit -m "Improve CV template design"
git push
# → Quality checks run → PDFs regenerated ✅
```

### Create New Role

```bash
# Add new role variant
cp data/roles/developer-testing.json data/roles/new-role.json
# Edit new-role.json with your data
git add data/roles/new-role.json
git commit -m "Add new role variant"
git push
# → Workflows create PDF variants automatically ✅
```

---

## 🔐 Security Notes

- ✅ No credentials stored in repo
- ✅ Uses OIDC for GitHub Pages deployment (no tokens)
- ✅ Limited permissions (principle of least privilege)
- ✅ PRs are safe: PDFs only auto-committed on `main` branch
- ✅ `[skip ci]` commits won't re-trigger workflows

---

## ⚙️ Customization

### Disable a Workflow

1. **Actions** → Click workflow name
2. Click **...** menu → **Disable workflow**

### Modify Generation Settings

Edit `scripts/generate-pdf.js` to change:

- PDF page size (A4/Letter)
- Margins and spacing
- Print settings
- Timeout values

### Change Deployment Branch

Edit `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - main # Change this to 'develop' or another branch
```

---

## 📚 Workflow Documentation

See `.github/WORKFLOWS.md` for detailed documentation on:

- Each workflow's purpose and trigger
- Manual workflow execution
- Troubleshooting common issues
- Artifact retention policies
- Customization guide

---

## 🆘 Troubleshooting

### Workflows not running?

1. Check **Settings → Actions** permissions are enabled
2. Verify workflow files exist in `.github/workflows/`
3. Check that files match the path filters (e.g., `data/roles/*.json`)

### PDFs not generating?

1. Go to **Actions** → Latest run of "Auto-Generate PDFs"
2. Click to see detailed logs
3. Common issues:
   - Missing Node.js dependencies: `npm ci`
   - Playwright not installed: Check GitHub Actions logs
   - Invalid HTML templates: Check template syntax

### Deployment failing?

1. Verify GitHub Pages is enabled in **Settings → Pages**
2. Check **Actions** tab for deployment logs
3. Manually trigger: **Actions** → "Deploy" → "Run workflow"

---

## 📈 Next Steps

After confirming workflows are working:

1. **Add workflow badges to README**

   ```markdown
   [![PDF Generation](https://github.com/voidomin/resume-website/workflows/Auto-Generate%20PDFs/badge.svg)](https://github.com/voidomin/resume-website/actions)
   [![Code Quality](https://github.com/voidomin/resume-website/workflows/Code%20Quality/badge.svg)](https://github.com/voidomin/resume-website/actions)
   [![Deploy Status](https://github.com/voidomin/resume-website/workflows/Deploy/badge.svg)](https://github.com/voidomin/resume-website/actions)
   ```

2. **Set up branch protection**
   - Require status checks pass before merge
   - Require code reviews

3. **Monitor workflow performance**
   - Track execution times
   - Optimize for speed if needed

---

## 📞 Support

For issues with:

- **PDF Generation**: Check `scripts/generate-pdf.js` and HTML templates
- **GitHub Actions**: See `.github/WORKFLOWS.md` for detailed guide
- **GitHub Pages**: See GitHub's official [Pages documentation](https://docs.github.com/en/pages)

---

Last Updated: January 17, 2026

✅ **Status**: GitHub Actions workflows configured and ready to use!
