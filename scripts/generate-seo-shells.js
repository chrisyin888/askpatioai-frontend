/**
 * Post-build: write crawlable HTML shells for each SEO route under dist/{path}/index.html.
 * Render serves these before the SPA fallback when the file exists.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN, canonicalizePath } = require('../src/utils/seoHead');

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
const { PRICING_COPY } = require('../src/data/pricingCopy.js');
const {
  NOINDEX_SHELL_PATHS,
  loadCityServiceData,
  collectSeoPaths,
  buildRedirectsFile,
} = require('./seoRedirects');

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

async function loadPriorityPages() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/prioritySeoPages.js')).href
  );
  return mod.PRIORITY_SEO_PAGE_LINKS;
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
  const pageImagePath = page.caseStudy?.image || page.heroImage;
  const pageImageUrl = pageImagePath ? pageAbsoluteUrl(pageImagePath) : null;
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
      ...(pageImageUrl
        ? {
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: pageImageUrl,
            },
          }
        : {}),
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
      ...(pageImageUrl ? { image: pageImageUrl } : {}),
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
      ...(pageImageUrl ? { image: pageImageUrl } : {}),
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
    .map((link) => `<li><a href="${esc(canonicalizePath(link.path))}">${esc(link.label)}</a></li>`)
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

function buildHeroImageHtml(page) {
  if (page.caseStudy?.image || !page.heroImage) return '';
  const imgUrl = pageAbsoluteUrl(page.heroImage);
  return `<figure>
        <img src="${esc(imgUrl)}" alt="${esc(page.h1)}" width="1200" height="900" loading="lazy">
      </figure>`;
}

function buildCityServiceBallparkHtml(meta) {
  if (meta.kind !== 'cityService' || !meta.pageId) return '';
  const id = meta.pageId;
  let line = '';
  if (id.startsWith('aluminum-')) line = PRICING_COPY.aluminumOnly;
  else if (id.startsWith('glass-')) line = PRICING_COPY.glassOnly;
  else if (id.startsWith('skyline-')) line = PRICING_COPY.skylineComboNote;
  else if (id.startsWith('sunrooms-')) line = PRICING_COPY.sunroomWallOnly;
  else return '';
  return `<h2>Ballpark pricing</h2>
      <p>${esc(line)}</p>`;
}

function buildServiceExtrasHtml(page, meta) {
  if (meta.kind === 'cityService') {
    return buildCityServiceBallparkHtml(meta);
  }
  if (meta.kind !== 'service') return '';
  const parts = [];
  if (page.pricingLine) {
    parts.push(`<h2>Ballpark pricing</h2>
      <p>${esc(page.pricingLine)}</p>`);
  }
  if (page.ctaTitle && page.ctaBody) {
    parts.push(`<h2>${esc(page.ctaTitle)}</h2>
      <p>${esc(page.ctaBody)}</p>`);
  }
  return parts.join('\n      ');
}

function buildCaseStudyHtml(page) {
  const cs = page.caseStudy;
  if (!cs || !cs.image) return '';
  const imgUrl = pageAbsoluteUrl(cs.image);
  const caption = cs.caption ? `<figcaption>${esc(cs.caption)}</figcaption>` : '';
  const projectLink = cs.projectPath
    ? `<p><a href="${esc(canonicalizePath(cs.projectPath))}">View project page</a></p>`
    : '';
  return `<h2>Project example</h2>
      <figure>
        <img src="${esc(imgUrl)}" alt="${esc(cs.alt || page.h1)}" width="1200" height="900" loading="lazy">
        ${caption}
      </figure>
      ${projectLink}`;
}

function buildStaticFaq(page) {
  const faqs = page.faqs || page.faqItems;
  if (!faqs || !faqs.length) return '';
  const items = faqs
    .slice(0, 6)
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
  const heroImage = buildHeroImageHtml(page);
  const highlights = buildHighlightsHtml(page);
  const benefits = meta.kind === 'service' ? buildBenefitsHtml(page) : '';
  const sections = buildSectionsHtml(page);
  const caseStudy = buildCaseStudyHtml(page);
  const serviceExtras = buildServiceExtrasHtml(page, meta);
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
      ${heroImage}
      ${highlights}
      ${benefits}
      ${localAngle}
      ${sections}
      ${caseStudy}
      ${serviceExtras}
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
  const allPaths = collectSeoPaths(cityService);
  const paths = allPaths.filter((p) => p !== '/');

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

  const redirectLines = buildRedirectsFile(allPaths);
  fs.writeFileSync(path.join(__dirname, '..', 'dist', '_redirects'), redirectLines, 'utf8');

  console.log(`Wrote ${written} SEO HTML shells under dist/`);
  console.log(`Wrote ${noindexWritten} noindex shells and ${redirectLines.trim().split('\n').length} redirect rules to dist/_redirects`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
