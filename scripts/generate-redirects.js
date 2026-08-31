/**
 * Write public/_redirects before vue build so Render always deploys slashless → slash 301 rules.
 */
const fs = require('fs');
const path = require('path');
const { collectAllSeoPaths, buildRedirectsFile } = require('./seoRedirects');

async function main() {
  const paths = await collectAllSeoPaths();
  const outPath = path.join(__dirname, '..', 'public', '_redirects');
  fs.writeFileSync(outPath, buildRedirectsFile(paths), 'utf8');
  const ruleCount = paths.filter((p) => p !== '/').length + 5;
  console.log(`Wrote ${outPath} (${ruleCount} SEO 301 rules + SPA fallback)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
