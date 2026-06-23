/**
 * Post-build: write crawlable HTML shells for each SEO route under dist/{path}/index.html.
 * Render serves these before the SPA fallback when the file exists.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN } = require('../src/utils/seoHead');
const { SERVICE_PAGES, SERVICE_PAGE_ORDER } = require('../src/data/servicePages');
const { CITY_PAGES, CITY_PAGE_ORDER } = require('../src/data/cityPages');
const { GUIDE_PAGES, GUIDE_PAGE_ORDER } = require('../src/data/guidePages');
const { PROJECT_PAGES, PROJECT_PAGE_ORDER } = require('../src/data/projectPages');

async function loadCityServiceData() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/cityServicePages.js')).href
  );
  return {
    CITY_SERVICE_PAGES: mod.CITY_SERVICE_PAGES,
    CITY_SERVICE_PAGE_ORDER: mod.CITY_SERVICE_PAGE_ORDER,
  };
}

function collectPaths(cityService) {
  const { CITY_SERVICE_PAGES, CITY_SERVICE_PAGE_ORDER } = cityService;
  const paths = ['/'];
  SERVICE_PAGE_ORDER.forEach((key) => paths.push(SERVICE_PAGES[key].path));
  CITY_PAGE_ORDER.forEach((id) => paths.push(CITY_PAGES[id].path));
  CITY_SERVICE_PAGE_ORDER.forEach((id) => paths.push(CITY_SERVICE_PAGES[id].path));
  GUIDE_PAGE_ORDER.forEach((id) => paths.push(GUIDE_PAGES[id].path));
  PROJECT_PAGE_ORDER.forEach((id) => paths.push(PROJECT_PAGES[id].path));
  return [...new Set(paths)];
}

function lookupPage(pathname, cityService) {
  const { CITY_SERVICE_PAGES, CITY_SERVICE_PAGE_ORDER } = cityService;
  for (const key of SERVICE_PAGE_ORDER) {
    if (SERVICE_PAGES[key].path === pathname) return SERVICE_PAGES[key];
  }
  for (const id of CITY_PAGE_ORDER) {
    if (CITY_PAGES[id].path === pathname) return CITY_PAGES[id];
  }
  for (const id of CITY_SERVICE_PAGE_ORDER) {
    if (CITY_SERVICE_PAGES[id].path === pathname) return CITY_SERVICE_PAGES[id];
  }
  for (const id of GUIDE_PAGE_ORDER) {
    if (GUIDE_PAGES[id].path === pathname) return GUIDE_PAGES[id];
  }
  for (const id of PROJECT_PAGE_ORDER) {
    if (PROJECT_PAGES[id].path === pathname) return PROJECT_PAGES[id];
  }
  return null;
}

function esc(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function truncate(text, maxLen = 160) {
  const value = String(text || '').trim();
  if (value.length <= maxLen) return value;
  const cut = value.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function buildStaticMain(page) {
  const intro = page.intro || page.metaDescription || '';
  return `<h1>${esc(page.h1)}</h1>
      <p>${esc(intro)}</p>
      <p>
        <a href="/">Homepage</a> ·
        <a href="/llms.txt">LLM / GEO summary (llms.txt)</a> ·
        <a href="/sitemap.xml">Sitemap</a>
      </p>
      <p>Pricing and service-area facts for AI systems: ${SITE_ORIGIN}/llms.txt</p>`;
}

function personalizeHtml(template, pathname, page) {
  const pageUrl = `${SITE_ORIGIN}${pathname}`;
  const title = page.metaTitle || page.h1 || 'LoomiHome Patios';
  const description = truncate(page.metaDescription || page.intro || '');

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${esc(description)}">`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${esc(pageUrl)}">`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en-CA" href="[^"]*">/,
    `<link rel="alternate" hreflang="en-CA" href="${esc(pageUrl)}">`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    `<link rel="alternate" hreflang="x-default" href="${esc(pageUrl)}">`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${esc(title)}">`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${esc(description)}">`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${esc(pageUrl)}">`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${esc(title)}">`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${esc(description)}">`,
  );

  html = html.replace(
    /<main id="static-home-seo">[\s\S]*?<\/main>/,
    `<main id="static-home-seo">\n      ${buildStaticMain(page)}\n    </main>`,
  );

  return html;
}

async function main() {
  const distIndex = path.join(__dirname, '..', 'dist', 'index.html');
  if (!fs.existsSync(distIndex)) {
    console.error('dist/index.html not found — run vue-cli-service build first');
    process.exit(1);
  }

  const template = fs.readFileSync(distIndex, 'utf8');
  const cityService = await loadCityServiceData();
  const paths = collectPaths(cityService).filter((p) => p !== '/');

  let written = 0;
  for (const pathname of paths) {
    const page = lookupPage(pathname, cityService);
    if (!page) continue;

    const html = personalizeHtml(template, pathname, page);
    const outDir = path.join(__dirname, '..', 'dist', pathname.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    written += 1;
  }

  console.log(`Wrote ${written} SEO HTML shells under dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
