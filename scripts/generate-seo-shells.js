/**
 * Post-build: write crawlable HTML shells for each SEO route under dist/{path}/index.html.
 * Render serves these before the SPA fallback when the file exists.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN } = require('../src/utils/seoHead');

function pageAbsoluteUrl(pathname) {
  if (!pathname || pathname === '/') return `${SITE_ORIGIN}/`;
  if (/\.[a-z0-9]{2,8}$/i.test(pathname)) return `${SITE_ORIGIN}${pathname}`;
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${SITE_ORIGIN}${p}`;
}
const { SERVICE_PAGES, SERVICE_PAGE_ORDER } = require('../src/data/servicePages');
const { CITY_PAGES, CITY_PAGE_ORDER } = require('../src/data/cityPages');
const { GUIDE_PAGES, GUIDE_PAGE_ORDER } = require('../src/data/guidePages');
const { PROJECT_PAGES, PROJECT_PAGE_ORDER } = require('../src/data/projectPages');

function loadIndexNowKey() {
  try {
    const configPath = path.join(__dirname, '..', 'src', 'data', 'indexNow.json');
    const { key } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return String(key || '').trim();
  } catch {
    return '';
  }
}

const SERVICE_LABELS = {
  aluminum: 'Aluminum patio covers',
  glass: 'Glass patio covers',
  skyline: 'Skyline combo',
  sunrooms: 'Sunrooms',
};

const GUIDE_LABELS = {
  'patio-cover-cost': 'Patio cover cost',
  'glass-vs-aluminum': 'Glass vs aluminum',
  permit: 'Permits',
  rain: 'Rain & weather',
  'install-timeline': 'Install timeline',
  'contractors-near-me': 'Contractors near me',
};

const LASTMOD = new Date().toISOString().slice(0, 10);

/** Marketplace routes — static shells with noindex so crawlers never see homepage canonical. */
const NOINDEX_SHELL_PATHS = [
  { path: '/contractor-login', title: 'Contractor Login | LoomiHome Patios' },
  { path: '/admin-login', title: 'Admin Login | LoomiHome Patios' },
  { path: '/lobby', title: 'Lead Lobby | LoomiHome Patios' },
  { path: '/account', title: 'Account | LoomiHome Patios' },
  { path: '/admin-leads', title: 'Admin | LoomiHome Patios' },
];

async function loadCityServiceData() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/cityServicePages.js')).href
  );
  return {
    CITY_SERVICE_PAGES: mod.CITY_SERVICE_PAGES,
    CITY_SERVICE_PAGE_ORDER: mod.CITY_SERVICE_PAGE_ORDER,
  };
}

async function loadPriorityPages() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/prioritySeoPages.js')).href
  );
  return mod.PRIORITY_SEO_PAGE_LINKS;
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
  const pageUrl = pageAbsoluteUrl(pathname);
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.metaTitle || page.h1,
      description: truncate(page.metaDescription || page.intro || '', 320),
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: { '@id': `${SITE_ORIGIN}/#business` },
      inLanguage: 'en-CA',
      dateModified: LASTMOD,
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
        item: pageAbsoluteUrl(item.path),
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

function buildLinkList(title, links) {
  if (!links || !links.length) return '';
  const items = links
    .map((link) => `<li><a href="${esc(link.path)}">${esc(link.label)}</a></li>`)
    .join('\n        ');
  return `<h2>${esc(title)}</h2>
      <ul>
        ${items}
      </ul>`;
}

function buildHighlightsHtml(page) {
  if (!page.highlights || !page.highlights.length) return '';
  const items = page.highlights
    .slice(0, 4)
    .map((item) => `<li>${esc(item)}</li>`)
    .join('\n        ');
  return `<h2>At a glance</h2>
      <ul>
        ${items}
      </ul>`;
}

function buildBenefitsHtml(page) {
  if (!page.benefits || !page.benefits.length) return '';
  const items = page.benefits
    .slice(0, 4)
    .map((item) => `<li>${esc(item)}</li>`)
    .join('\n        ');
  return `<h2>Why homeowners choose this option</h2>
      <ul>
        ${items}
      </ul>`;
}

function buildSectionsHtml(page, maxSections = 2) {
  if (!page.sections || !page.sections.length) return '';
  return page.sections
    .slice(0, maxSections)
    .map(
      (sec) => `<h2>${esc(sec.h2)}</h2>
      <p>${esc(sec.body)}</p>`,
    )
    .join('\n      ');
}

function buildRelatedLinksHtml(meta, cityService, priorityPages) {
  const { CITY_SERVICE_PAGES, CITY_SERVICE_PAGE_ORDER } = cityService;
  const slug = citySlugFromMeta(meta);
  const currentPath = meta.page.path;
  const blocks = [];

  blocks.push(
    buildLinkList(
      'High-intent local pages',
      priorityPages.filter((link) => link.path !== currentPath),
    ),
  );

  if (meta.kind === 'service') {
    blocks.push(
      buildLinkList(
        'More cover types',
        SERVICE_PAGE_ORDER.filter((key) => key !== meta.serviceKey).map((key) => ({
          path: SERVICE_PAGES[key].path,
          label: SERVICE_LABELS[key] || SERVICE_PAGES[key].h1,
        })),
      ),
    );
  } else {
    blocks.push(
      buildLinkList(
        'Cover types',
        SERVICE_PAGE_ORDER.map((key) => ({
          path: SERVICE_PAGES[key].path,
          label: SERVICE_LABELS[key],
        })),
      ),
    );
  }

  blocks.push(
    buildLinkList(
      'Service areas',
      CITY_PAGE_ORDER.filter((id) => !(meta.kind === 'city' && id === meta.pageId)).map((id) => ({
        path: CITY_PAGES[id].path,
        label: CITY_PAGES[id].h1.replace(/^Patio Covers in /i, 'Patio covers — '),
      })),
    ),
  );

  blocks.push(
    buildLinkList(
      'Guides',
      GUIDE_PAGE_ORDER.filter((id) => !(meta.kind === 'guide' && id === meta.pageId)).map((id) => ({
        path: GUIDE_PAGES[id].path,
        label: GUIDE_LABELS[id] || GUIDE_PAGES[id].h1,
      })),
    ),
  );

  if (slug) {
    blocks.push(
      buildLinkList(
        'City service pages',
        CITY_SERVICE_PAGE_ORDER.filter(
          (id) => !(meta.kind === 'cityService' && id === meta.pageId) && id.endsWith(`-${slug}`),
        ).map((id) => ({
          path: CITY_SERVICE_PAGES[id].path,
          label: CITY_SERVICE_PAGES[id].h1,
        })),
      ),
    );

    blocks.push(
      buildLinkList(
        'Project examples',
        PROJECT_PAGE_ORDER.filter((id) => {
          if (meta.kind === 'project' && id === meta.pageId) return false;
          return id.startsWith(`${slug}-`);
        }).map((id) => ({
          path: PROJECT_PAGES[id].path,
          label: PROJECT_PAGES[id].h1.replace(' Project', ''),
        })),
      ),
    );
  } else if (meta.kind === 'guide' || meta.kind === 'service') {
    blocks.push(
      buildLinkList(
        'Project examples',
        PROJECT_PAGE_ORDER.map((id) => ({
          path: PROJECT_PAGES[id].path,
          label: PROJECT_PAGES[id].h1.replace(' Project', ''),
        })),
      ),
    );
  }

  return blocks.filter(Boolean).join('\n      ');
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

function buildRelatedPageLinksHtml(page) {
  if (!page.relatedPageLinks || !page.relatedPageLinks.length) return '';
  return buildLinkList('Related pages', page.relatedPageLinks);
}

function buildPricingNoteHtml(page) {
  if (!page.pricingNote) return '';
  return `<h2>Pricing direction</h2>
      <p>${esc(page.pricingNote)}</p>`;
}

function buildStaticMain(meta, page, cityService, priorityPages) {
  const intro = page.intro || page.metaDescription || '';
  const highlights = buildHighlightsHtml(page);
  const benefits = meta.kind === 'service' ? buildBenefitsHtml(page) : '';
  const sections = buildSectionsHtml(page);
  const localAngle =
    page.localAngle && meta.kind !== 'service'
      ? `<h2>${meta.kind === 'city' ? 'Local to your area' : 'What this means for you'}</h2>
      <p>${esc(page.localAngle)}</p>`
      : '';
  const relatedPages = buildRelatedPageLinksHtml(page);
  const pricingNote = buildPricingNoteHtml(page);
  const faqBlock = buildStaticFaq(page);
  const related = buildRelatedLinksHtml(meta, cityService, priorityPages);
  return `<h1>${esc(page.h1)}</h1>
      <p>${esc(intro)}</p>
      ${highlights}
      ${benefits}
      ${localAngle}
      ${sections}
      ${relatedPages}
      ${pricingNote}
      ${faqBlock}
      ${related}
      <p>
        <a href="/">Homepage</a> ·
        <a href="/llms.txt">LLM / GEO summary (llms.txt)</a> ·
        <a href="/sitemap.xml">Sitemap</a>
      </p>
      <p>Pricing and service-area facts for AI systems: ${SITE_ORIGIN}/llms.txt</p>`;
}

function personalizeHtml(template, pathname, meta, cityService, priorityPages, ogShare) {
  const page = meta.page;
  const pageUrl = pageAbsoluteUrl(pathname);
  const title = page.metaTitle || page.h1 || 'LoomiHome Patios';
  const description = truncate(page.metaDescription || page.intro || '');
  const shareImagePath = ogShare.resolveShareImagePath({ path: pathname, heroImage: page.heroImage });
  const heroImage = pageAbsoluteUrl(shareImagePath);
  const shareImageAlt = ogShare.resolveShareImageAlt({ title, path: pathname });

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
    /<meta property="og:image:alt" content="[^"]*">/,
    `<meta property="og:image:alt" content="${esc(shareImageAlt)}">`,
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
    /<meta name="twitter:image:alt" content="[^"]*">/,
    `<meta name="twitter:image:alt" content="${esc(shareImageAlt)}">`,
  );

  const geoPlacename =
    meta.kind === 'city'
      ? meta.page.h1.replace(/^Patio Covers in /i, '')
      : page.areaServed?.split(',')[0]?.trim() || 'Metro Vancouver';
  html = html.replace(
    /<meta name="geo.placename" content="[^"]*">/,
    `<meta name="geo.placename" content="${esc(geoPlacename)}">`,
  );

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${buildPageJsonLd(pathname, meta)}\n    </script>`,
  );

  html = html.replace(
    /<main id="static-home-seo">[\s\S]*?<\/main>/,
    `<main id="static-home-seo">\n      ${buildStaticMain(meta, page, cityService, priorityPages)}\n    </main>`,
  );

  return html;
}

function buildNoindexShell(template, pathname, title) {
  const pageUrl = pageAbsoluteUrl(pathname);
  let html = template;
  html = html.replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="noindex,nofollow">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="Private marketplace page — not for search indexing.">`,
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
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${esc(pageUrl)}">`,
  );
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  html = html.replace(
    /<main id="static-home-seo">[\s\S]*?<\/main>/,
    `<main id="static-home-seo"><p>Private page — not indexed.</p></main>`,
  );
  return html;
}

/** Render _redirects: map slashless sitemap URLs to SEO shells; consolidate trailing slashes. */
function buildRedirectsFile(seoPaths) {
  const lines = [
    '/sitemap.xml /sitemap.xml 200',
    '/robots.txt /robots.txt 200',
    '/llms.txt /llms.txt 200',
    '/BingSiteAuth.xml /BingSiteAuth.xml 200',
    '/.well-known/llms.txt /.well-known/llms.txt 200',
    '/og/og-aluminum.jpg /og/og-aluminum.jpg 200',
    '/og/og-glass.jpg /og/og-glass.jpg 200',
    '/og/og-skyline.jpg /og/og-skyline.jpg 200',
    '/og/og-sunrooms.jpg /og/og-sunrooms.jpg 200',
    '/contractor /contractor-login 301',
  ];

  const indexNowKey = loadIndexNowKey();
  if (indexNowKey) {
    lines.push(`/${indexNowKey}.txt /${indexNowKey}.txt 200`);
  }

  // Prefer trailing-slash shells: Render serves dist/{path}/index.html for /path/
  // but slashless /path often falls through to the SPA catch-all (homepage title bug).
  // 301 slashless → slash so crawlers always hit the personalized HTML shell.
  seoPaths.forEach((pathname) => {
    lines.push(`${pathname} ${pathname}/ 301`);
  });

  NOINDEX_SHELL_PATHS.forEach(({ path: pathname }) => {
    lines.push(`${pathname} ${pathname}/ 301`);
  });

  // SPA fallback — must be last so SEO shell rules above take precedence.
  lines.push('/* /index.html 200');

  return `${lines.join('\n')}\n`;
}

async function main() {
  const distIndex = path.join(__dirname, '..', 'dist', 'index.html');
  if (!fs.existsSync(distIndex)) {
    console.error('dist/index.html not found — run vue-cli-service build first');
    process.exit(1);
  }

  const template = fs.readFileSync(distIndex, 'utf8');
  const ogShare = await import(
    pathToFileURL(path.join(__dirname, '../src/utils/ogShare.js')).href
  );
  const cityService = await loadCityServiceData();
  const priorityPages = await loadPriorityPages();
  const paths = collectPaths(cityService).filter((p) => p !== '/');

  let written = 0;
  for (const pathname of paths) {
    const meta = lookupPage(pathname, cityService);
    if (!meta) continue;

    const html = personalizeHtml(template, pathname, meta, cityService, priorityPages, ogShare);
    const outDir = path.join(__dirname, '..', 'dist', pathname.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    written += 1;
  }

  let noindexWritten = 0;
  for (const { path: pathname, title } of NOINDEX_SHELL_PATHS) {
    const html = buildNoindexShell(template, pathname, title);
    const outDir = path.join(__dirname, '..', 'dist', pathname.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    noindexWritten += 1;
  }

  const redirectLines = buildRedirectsFile(paths);
  fs.writeFileSync(path.join(__dirname, '..', 'dist', '_redirects'), redirectLines, 'utf8');

  console.log(`Wrote ${written} SEO HTML shells under dist/`);
  console.log(`Wrote ${noindexWritten} noindex shells and ${redirectLines.trim().split('\n').length} redirect rules to dist/_redirects`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
