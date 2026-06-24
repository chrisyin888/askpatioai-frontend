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
    if (SERVICE_PAGES[key].path === pathname) {
      return { kind: 'service', page: SERVICE_PAGES[key], serviceKey: key };
    }
  }
  for (const id of CITY_PAGE_ORDER) {
    if (CITY_PAGES[id].path === pathname) {
      return { kind: 'city', page: CITY_PAGES[id], pageId: id };
    }
  }
  for (const id of CITY_SERVICE_PAGE_ORDER) {
    if (CITY_SERVICE_PAGES[id].path === pathname) {
      return { kind: 'cityService', page: CITY_SERVICE_PAGES[id], pageId: id };
    }
  }
  for (const id of GUIDE_PAGE_ORDER) {
    if (GUIDE_PAGES[id].path === pathname) {
      return { kind: 'guide', page: GUIDE_PAGES[id], pageId: id };
    }
  }
  for (const id of PROJECT_PAGE_ORDER) {
    if (PROJECT_PAGES[id].path === pathname) {
      return { kind: 'project', page: PROJECT_PAGES[id], pageId: id };
    }
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

function citySlugFromMeta(meta) {
  if (meta.kind === 'city') return meta.pageId;
  if (meta.kind === 'cityService') {
    const dash = meta.pageId.indexOf('-');
    return dash === -1 ? null : meta.pageId.slice(dash + 1);
  }
  if (meta.kind === 'project') {
    const match = meta.page.path.match(/\/projects\/([^/]+)-/);
    return match ? match[1] : null;
  }
  return null;
}

function buildBreadcrumbItems(meta) {
  const items = [{ name: 'Home', path: '/' }];
  const slug = citySlugFromMeta(meta);

  if (meta.kind === 'service') {
    items.push({ name: 'Cover types', path: SERVICE_PAGES.aluminum.path });
  } else if (meta.kind === 'cityService' && slug && CITY_PAGES[slug]) {
    items.push({ name: CITY_PAGES[slug].h1, path: CITY_PAGES[slug].path });
  } else if (meta.kind === 'guide') {
    items.push({ name: 'Guides', path: GUIDE_PAGES[GUIDE_PAGE_ORDER[0]].path });
  } else if (meta.kind === 'project' && slug && CITY_PAGES[slug]) {
    items.push({ name: CITY_PAGES[slug].h1, path: CITY_PAGES[slug].path });
  }

  items.push({ name: meta.page.h1, path: meta.page.path });
  return items;
}

function buildPageJsonLd(pathname, meta) {
  const page = meta.page;
  const pageUrl = `${SITE_ORIGIN}${pathname}`;
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.metaTitle || page.h1,
      description: truncate(page.metaDescription || page.intro || '', 320),
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: { '@id': `${SITE_ORIGIN}/#business` },
    },
  ];

  const breadcrumbs = buildBreadcrumbItems(meta);
  if (breadcrumbs.length >= 2) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_ORIGIN}${item.path === '/' ? '/' : item.path}`,
      })),
    });
  }

  if (page.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: page.h1,
      description: truncate(page.metaDescription || page.intro || '', 320),
      url: pageUrl,
      serviceType: page.serviceType,
      provider: { '@id': `${SITE_ORIGIN}/#business` },
      areaServed: {
        '@type': 'City',
        name: page.areaServed || 'Vancouver, British Columbia',
      },
    });
  } else if (meta.kind === 'city') {
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: page.h1,
      description: truncate(page.metaDescription || page.intro || '', 320),
      url: pageUrl,
      serviceType: 'Patio cover installation',
      provider: { '@id': `${SITE_ORIGIN}/#business` },
      areaServed: { '@type': 'City', name: page.h1.replace(/^Patio Covers in /i, '') },
    });
  }

  if (meta.kind === 'guide' || meta.kind === 'project') {
    graph.push({
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: page.h1,
      description: truncate(page.metaDescription || page.intro || '', 320),
      datePublished: page.datePublished || '2026-06-01',
      dateModified: page.dateModified || new Date().toISOString().slice(0, 10),
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      author: { '@id': `${SITE_ORIGIN}/#business` },
      publisher: { '@id': `${SITE_ORIGIN}/#business` },
      inLanguage: 'en-CA',
    });
  }

  const faqs = page.faqs || page.faqItems;
  if (faqs && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function buildStaticFaq(page) {
  const faqs = page.faqs || page.faqItems;
  if (!faqs || !faqs.length) return '';
  const items = faqs
    .slice(0, 4)
    .map((item) => `<dt>${esc(item.q)}</dt>\n        <dd>${esc(item.a)}</dd>`)
    .join('\n        ');
  return `<h2>Common questions</h2>
      <dl>
        ${items}
      </dl>`;
}

function buildStaticMain(page) {
  const intro = page.intro || page.metaDescription || '';
  const faqBlock = buildStaticFaq(page);
  return `<h1>${esc(page.h1)}</h1>
      <p>${esc(intro)}</p>
      ${faqBlock}
      <p>
        <a href="/">Homepage</a> ·
        <a href="/llms.txt">LLM / GEO summary (llms.txt)</a> ·
        <a href="/sitemap.xml">Sitemap</a>
      </p>
      <p>Pricing and service-area facts for AI systems: ${SITE_ORIGIN}/llms.txt</p>`;
}

function personalizeHtml(template, pathname, meta) {
  const page = meta.page;
  const pageUrl = `${SITE_ORIGIN}${pathname}`;
  const title = page.metaTitle || page.h1 || 'LoomiHome Patios';
  const description = truncate(page.metaDescription || page.intro || '');
  const heroImage = page.heroImage ? `${SITE_ORIGIN}${page.heroImage}` : `${SITE_ORIGIN}/house/Aluminum/aluminum-hero.png`;

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
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${esc(heroImage)}">`,
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
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${esc(heroImage)}">`,
  );

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${buildPageJsonLd(pathname, meta)}\n    </script>`,
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
    const meta = lookupPage(pathname, cityService);
    if (!meta) continue;

    const html = personalizeHtml(template, pathname, meta);
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
