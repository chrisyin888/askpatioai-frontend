/**
 * Write public/_redirects (Netlify mirror) and sync Render Blueprint routes.
 * Render static sites only honor Dashboard / render.yaml `routes` — not `_redirects`.
 */
const fs = require('fs');
const path = require('path');
const {
  collectAllSeoPaths,
  buildRedirectsFile,
  buildRenderRoutes,
  formatRenderRoutesYaml,
  syncRenderYamlRoutes,
} = require('./seoRedirects');

async function main() {
  const paths = await collectAllSeoPaths();
  const outPath = path.join(__dirname, '..', 'public', '_redirects');
  fs.writeFileSync(outPath, buildRedirectsFile(paths), 'utf8');

  const routes = buildRenderRoutes(paths);
  const routesYaml = formatRenderRoutesYaml(routes);
  const renderPath = path.join(__dirname, '..', 'render.yaml');
  const previous = fs.readFileSync(renderPath, 'utf8');
  const next = syncRenderYamlRoutes(previous, routesYaml);
  fs.writeFileSync(renderPath, next, 'utf8');

  console.log(`Wrote ${outPath}`);
  console.log(
    `Synced ${routes.length} Render Blueprint routes into render.yaml (slashless → slash + SPA fallback)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
