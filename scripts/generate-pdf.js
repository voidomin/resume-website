const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

async function generatePDFs() {
  console.log('Starting local server...');
  const server = spawn('npx', ['http-server', '.', '-p', '8081'], {
    shell: true,
    stdio: 'ignore'
  });

  // Give server time to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Generate ATS Resume PDF
    console.log('Generating ATS Resume PDF...');
    await page.goto('http://localhost:8081/public/ats/index.html', { waitUntil: 'networkidle' });
    
    // We do NOT inject any styles to preserve exact look
    await page.pdf({
      path: 'public/ats/resume_ats.pdf',
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' } // Let CSS control the padding
    });
    console.log('ATS Resume PDF generated at public/ats/resume_ats.pdf');

  } catch (error) {
    console.error('Error generating PDFs:', error);
  } finally {
    await browser.close();
    server.kill();
    console.log('Done.');
    process.exit(0);
  }
}

generatePDFs();
