/**
 * Sync BingSiteAuth.xml from src/data/seoVerification.json before production build.
 * Bing meta tag is injected via vue.config.js + public/index.html.
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'src', 'data', 'seoVerification.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const publicDir = path.join(__dirname, '..', 'public');
const outPath = path.join(publicDir, 'BingSiteAuth.xml');

if (config.bingSiteAuthXml && String(config.bingSiteAuthXml).trim()) {
  const xml = `<?xml version="1.0"?>\n<users>\n\t<user>${String(config.bingSiteAuthXml).trim()}</user>\n</users>\n`;
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Wrote BingSiteAuth.xml for Bing Webmaster verification`);
} else if (fs.existsSync(outPath)) {
  fs.unlinkSync(outPath);
  console.log('Removed stale BingSiteAuth.xml (no bingSiteAuthXml configured)');
}
