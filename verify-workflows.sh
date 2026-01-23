#!/bin/bash
# GitHub Actions Setup Verification
# Run this script to verify all workflows are properly configured

echo "🔍 GitHub Actions Setup Verification"
echo "===================================="
echo ""

# Check workflow files exist
echo "✓ Checking workflow files..."
for workflow in generate-pdfs.yml quality.yml deploy.yml; do
  if [ -f ".github/workflows/$workflow" ]; then
    echo "  ✅ $workflow found"
  else
    echo "  ❌ $workflow MISSING"
  fi
done

echo ""
echo "✓ Checking Node.js version..."
node_version=$(node --version)
echo "  Node version: $node_version"
if [[ $node_version == v22* ]]; then
  echo "  ✅ Compatible (v22+)"
else
  echo "  ⚠️  Consider upgrading to Node v22+ for GitHub Actions compatibility"
fi

echo ""
echo "✓ Checking npm dependencies..."
if npm list playwright @playwright/test >/dev/null 2>&1; then
  echo "  ✅ Playwright installed (required for PDF generation)"
else
  echo "  ❌ Playwright not found. Run: npm install"
fi

echo ""
echo "✓ Checking script files..."
if [ -f "scripts/generate-pdf.js" ]; then
  echo "  ✅ generate-pdf.js found"
else
  echo "  ❌ generate-pdf.js MISSING"
fi

echo ""
echo "✓ Checking role data files..."
for role in data-business-analyst bioinformatics developer-testing; do
  if [ -f "data/roles/$role.json" ]; then
    echo "  ✅ $role.json found"
  else
    echo "  ❌ $role.json MISSING"
  fi
done

echo ""
echo "===================================="
echo "Setup Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Go to GitHub repo Settings → Pages"
echo "2. Select 'Deploy from a branch' with 'main' and '/'"
echo "3. Go to Settings → Actions → General"
echo "4. Enable 'Allow all actions' and 'Read and write permissions'"
echo "5. Push changes to trigger workflows"
echo ""
echo "Monitor workflows in: Actions tab"
