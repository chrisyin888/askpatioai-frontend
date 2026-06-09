/**
 * Regenerate public/sitemap.xml from SEO route data (run before production build).
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN } = require('../src/utils/seoHead');
const { SERVICE_PAGES, SERVICE_PAGE_ORDER } = require('../src/data/servicePages');
const { CITY_PAGES, CITY_PAGE_ORDER } = require('../src/data/cityPages');
const { GUIDE_PAGES, GUIDE_PAGE_ORDER } = require('../src/data/guidePages');
const { PROJECT_PAGES, PROJECT_PAGE_ORDER } = require('../src/data/projectPages');

const LASTMOD = new Date().toISOString().slice(0, 10);

async function loadCityServiceData() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/cityServicePages.js')).href
  );
  return {
    CITY_SERVICE_PAGES: mod.CITY_SERVICE_PAGES,
    CITY_SERVICE_PAGE_ORDER: mod.CITY_SERVICE_PAGE_ORDER,
  };
}

function priorityFor(pathname, cityService) {
  const { CITY_SERVICE_PAGES, CITY_SERVICE_PAGE_ORDER } = cityService;
  if (pathname === '/') return '1';
  if (SERVICE_PAGE_ORDER.some((key) => SERVICE_PAGES[key].path === pathname)) return '0.9';
  if (CITY_PAGE_ORDER.some((id) => CITY_PAGES[id].path === pathname)) return '0.85';
  if (pathname.includes('contractor') || pathname.includes('installer')) return '0.84';
  if (CITY_SERVICE_PAGE_ORDER.some((id) => CITY_SERVICE_PAGES[id].path === pathname)) return '0.82';
  if (GUIDE_PAGE_ORDER.some((id) => GUIDE_PAGES[id].path === pathname)) return '0.8';
  if (PROJECT_PAGE_ORDER.some((id) => PROJECT_PAGES[id].path === pathname)) return '0.75';
  return '0.7';
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

function buildSitemapXml(paths, cityService) {
  const urls = paths
    .sort((a, b) => {
      if (a === '/') return -1;
      if (b === '/') return 1;
      return a.localeCompare(b);
    })
    .map((pathname) => {
      const loc = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`;
      const priority = priorityFor(pathname, cityService);
      return `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const cityService = await loadCityServiceData();
  const paths = collectPaths(cityService);
  const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  const xml = buildSitemapXml(paths, cityService);
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Wrote ${paths.length} URLs to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
