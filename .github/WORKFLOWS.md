# GitHub Actions Workflows

This project uses GitHub Actions to automate key development tasks.

## Workflows

### 1. **Auto-Generate PDFs** (`generate-pdfs.yml`)

**Trigger**: When you push changes to role JSON files or templates

**What it does**:

- Detects changes to `data/roles/*.json` or `public/**/*.html`
- Automatically runs the PDF generation script
- Commits updated PDFs back to the repo
- Uploads PDFs as workflow artifacts (30-day retention)
- Comments on PRs when PDFs are updated

**Usage**: Just push your JSON changes, and PDFs are auto-generated!

```bash
# Example: Edit a role JSON
git add data/roles/developer-testing.json
git commit -m "Update skills and experience metrics"
git push
# → GitHub Actions runs → PDFs auto-generated → Commits changes back
```

### 2. **Code Quality & Testing** (`quality.yml`)

**Trigger**: On every push and PR to `main`

**What it does**:

- Runs ESLint for code quality checks
- Verifies Prettier formatting
- Runs unit tests (`npm run test:unit`)
- Checks markdown links for dead links
- Generates test reports

**Manual trigger**:

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
npm run test:unit
npm run format:check
```

### 3. **Deploy to GitHub Pages** (`deploy.yml`)

**Trigger**: After successful PDF generation and tests pass

**What it does**:

- Builds the project (if using Vite)
- Uploads artifact to GitHub Pages
- Deploys to your GitHub Pages site
- Can be manually triggered via "Run workflow" button

**Note**: Includes all PDFs and public files in the deployment.

---

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: Deploy from branch
3. Branch: `main`
4. Folder: `/` (root)
5. Save

### 2. Enable Actions

1. Go to **Settings** → **Actions** → **General**
2. Check: "Allow all actions and reusable workflows"
3. Check: "Read and write permissions"
4. Save

### 3. First Run

Push your first change to trigger the workflows:

```bash
git add .
git commit -m "Initial commit with workflows"
git push
```

Monitor workflow runs in **Actions** tab.

---

## Workflow Permissions

The workflows use these GitHub permissions:

- `contents: write` - To commit PDF changes
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For OIDC authentication
- `pull-requests: write` - To comment on PRs

---

## Local Development

### Manually generate PDFs

```bash
npm start          # Start dev server on port 8080
node scripts/generate-pdf.js  # In another terminal
```

### Run linting and tests

```bash
npm run lint       # ESLint check
npm run lint:fix   # Auto-fix lint issues
npm run format     # Format with Prettier
npm run test:unit  # Run unit tests
```

---

## Troubleshooting

### PDFs not generating?

1. Check GitHub Actions logs: **Actions** → Workflow name → Latest run
2. Verify Node.js version matches: `node --version` (should be ≥22.12.0)
3. Run locally: `node scripts/generate-pdf.js`

### Deployment fails?

1. Check **Actions** tab for error messages
2. Ensure GitHub Pages is enabled in Settings
3. Try manual deployment: **Actions** → "Deploy" → "Run workflow"

### PR comment not appearing?

1. Verify workflow has `pull-requests: write` permission
2. Check workflow logs for errors
3. Manually verify PDFs were generated

---

## Customization

### Add another role?

1. Create `data/roles/new-role.json`
2. Add metrics data (see existing roles)
3. Push changes
4. Workflow auto-generates PDF variants

### Modify PDF generation?

1. Edit `scripts/generate-pdf.js`
2. Push changes
3. Workflow re-runs with new settings

### Change deployment settings?

1. Edit `.github/workflows/deploy.yml`
2. Change branch, path, or deployment conditions
3. Push to test

---

## Monitoring Workflows

### View workflow runs

1. GitHub repo → **Actions** tab
2. Click workflow name to see runs
3. Click a run to see logs

### Set up notifications

1. GitHub → **Settings** → **Notifications**
2. Enable: "Notify me when actions fail on a branch I'm watching"

### View artifacts

1. Actions tab → Latest run
2. Scroll down to **Artifacts** section
3. Download generated PDFs (30-day retention)

---

## Security

- Workflows use `@v4` pinned versions (no drift)
- OIDC authentication for GitHub Pages (no tokens stored)
- Limited permissions (principle of least privilege)
- `[skip ci]` commits don't re-trigger workflows
- PRs are safe: PDF changes only committed on merge

---

## FAQ

**Q: How often can workflows run?**
A: Every push to `main`. Free tier allows unlimited runs.

**Q: Can I run workflows manually?**
A: Yes! Go to **Actions** → Workflow → **Run workflow** button.

**Q: Will PDFs be versioned?**
A: Yes, each PDF commit includes timestamp and triggering file.

**Q: What if the PDF generation fails?**
A: Check **Actions** logs. Workflow won't commit changes until success.

**Q: Can I disable a workflow?**
A: Yes, go to workflow file → click **...** → **Disable workflow**.

---

Last updated: January 17, 2026
