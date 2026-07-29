/**
 * Keep public/index.html crawler blocks in sync with SEO data modules.
 * Runs before vue-cli-service build via `npm run sync:home-seo`.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const INDEX_PATH = path.join(__dirname, '..', 'public', 'index.html');

const EXTRA_POPULAR_LINKS = [
  { path: '/how-long-does-patio-cover-installation-take', label: 'Patio cover installation timeline' },
];

const GUIDE_LINK_LABELS = {
  'contractors-near-me': 'Patio cover contractors near me',
  'patio-cover-cost': 'Patio cover cost Vancouver',
  'glass-vs-aluminum': 'Glass vs aluminum patio covers',
  permit: 'Patio cover permits',
  rain: 'Best patio cover for rain',
  'install-timeline': 'Installation timeline',
};

const SERVICE_LINK_LABELS = {
  aluminum: 'Aluminum patio covers Vancouver',
  glass: 'Glass patio covers Vancouver',
  skyline: 'Skyline combo patio covers Vancouver',
  sunrooms: 'Sunrooms Vancouver',
};

function linkListHtml(links) {
  return links.map((l) => `        <li><a href="${l.path}">${l.label}</a></li>`).join('\n');
}

function replaceListSection(html, heading, listBody) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `(<h2>${escaped}</h2>\\s*<ul>\\r?\\n)[\\s\\S]*?(\\r?\\n      </ul>)`,
    'i',
  );
  if (!re.test(html)) {
    throw new Error(`Could not find section "${heading}" in public/index.html`);
  }
  re.lastIndex = 0;
  return html.replace(re, `$1${listBody}$2`);
}

function cityLinkLabel(page) {
  return page.h1.replace(/^Patio Covers in /i, 'Patio covers ').replace(/^([^ ]+) ([^ ]+) Patio Covers$/i, '$1 $2 patio covers');
}

function projectLinkLabel(page) {
  return page.h1.replace(/ Project$/i, '').replace(/^(.+) Patio Cover$/i, '$1 patio cover').replace(/^(.+) Cover$/i, '$1 cover');
}

async function loadData() {
  const priorityMod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/prioritySeoPages.js')).href
  );
  const cityMod = await import(pathToFileURL(path.join(__dirname, '../src/data/cityPages.js')).href);
  const projectMod = await import(pathToFileURL(path.join(__dirname, '../src/data/projectPages.js')).href);
  const serviceMod = await import(pathToFileURL(path.join(__dirname, '../src/data/servicePages.js')).href);
  const guideMod = await import(pathToFileURL(path.join(__dirname, '../src/data/guidePages.js')).href);

  return {
    priorityLinks: priorityMod.PRIORITY_SEO_PAGE_LINKS,
    cityOrder: cityMod.CITY_PAGE_ORDER,
    cityPages: cityMod.CITY_PAGES,
    projectOrder: projectMod.PROJECT_PAGE_ORDER,
    projectPages: projectMod.PROJECT_PAGES,
    serviceOrder: serviceMod.SERVICE_PAGE_ORDER,
    servicePages: serviceMod.SERVICE_PAGES,
    guideOrder: guideMod.GUIDE_PAGE_ORDER,
    guidePages: guideMod.GUIDE_PAGES,
  };
}

async function main() {
  const data = await loadData();
  let html = fs.readFileSync(INDEX_PATH, 'utf8');

  const popularLinks = [...data.priorityLinks, ...EXTRA_POPULAR_LINKS];
  html = replaceListSection(html, 'Popular local pages', `\n${linkListHtml(popularLinks)}`);

  const cityLinks = data.cityOrder.map((id) => {
    const page = data.cityPages[id];
    return { path: page.path, label: cityLinkLabel(page) };
  });
  html = replaceListSection(html, 'City patio cover pages', `\n${linkListHtml(cityLinks)}`);

  const projectLinks = data.projectOrder.map((id) => {
    const page = data.projectPages[id];
    return { path: page.path, label: projectLinkLabel(page) };
  });
  html = replaceListSection(html, 'Project examples', `\n${linkListHtml(projectLinks)}`);

  const coverLinks = data.serviceOrder.map((key) => ({
    path: data.servicePages[key].path,
    label: SERVICE_LINK_LABELS[key] || data.servicePages[key].h1,
  }));
  html = replaceListSection(html, 'Cover types (Vancouver)', `\n${linkListHtml(coverLinks)}`);

  const guideLinks = data.guideOrder.map((id) => ({
    path: data.guidePages[id].path,
    label: GUIDE_LINK_LABELS[id] || data.guidePages[id].h1,
  }));
  html = replaceListSection(html, 'Guides', `\n${linkListHtml(guideLinks)}`);

  fs.writeFileSync(INDEX_PATH, html, 'utf8');
  console.log(
    `Synced public/index.html SEO lists (${popularLinks.length} popular, ${cityLinks.length} cities, ${projectLinks.length} projects, ${guideLinks.length} guides)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
