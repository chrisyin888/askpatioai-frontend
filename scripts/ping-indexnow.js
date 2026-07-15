/**
 * Notify IndexNow (Bing/Yandex) about URL updates.
 * Usage: node scripts/ping-indexnow.js [url1 url2 ...]
 * Default: homepage + priority SEO pages + sitemap + llms.txt
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN } = require('../src/utils/seoHead');

async function loadPriorityPaths() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/prioritySeoPages.js')).href
  );
  return mod.PRIORITY_SEO_PAGE_LINKS.map((p) => p.path);
}

function loadKey() {
  const configPath = path.join(__dirname, '..', 'src', 'data', 'indexNow.json');
  const { key } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return String(key || '').trim();
}

function toAbsolute(pathname) {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  if (!pathname || pathname === '/') return `${SITE_ORIGIN}/`;
  if (/\.[a-z0-9]{2,8}$/i.test(pathname)) return `${SITE_ORIGIN}${pathname}`;
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_ORIGIN}${p.endsWith('/') ? p : `${p}/`}`;
}

async function main() {
  const key = loadKey();
  if (!key) {
    console.error('No IndexNow key in src/data/indexNow.json');
    process.exit(1);
  }

  const fromArgs = process.argv.slice(2).filter(Boolean);
  let urlList;
  if (fromArgs.length) {
    urlList = fromArgs.map(toAbsolute);
  } else {
    const priority = await loadPriorityPaths();
    urlList = [
      `${SITE_ORIGIN}/`,
      `${SITE_ORIGIN}/sitemap.xml`,
      `${SITE_ORIGIN}/llms.txt`,
      ...priority.map(toAbsolute),
    ];
  }

  urlList = [...new Set(urlList)];
  const host = new URL(SITE_ORIGIN).host;
  const keyLocation = `${SITE_ORIGIN}/${key}.txt`;
  const body = JSON.stringify({ host, key, keyLocation, urlList });

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  const text = await res.text();
  console.log(`IndexNow status ${res.status} for ${urlList.length} URLs`);
  if (text) console.log(text);
  if (!res.ok && res.status !== 202) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
