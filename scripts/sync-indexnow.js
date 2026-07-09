/**
 * Write IndexNow key file to public/ for Bing/Yandex instant indexing.
 * https://www.indexnow.org/documentation
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'src', 'data', 'indexNow.json');
const { key } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const trimmed = String(key || '').trim();

if (!trimmed) {
  console.log('No IndexNow key configured; skipping key file.');
  process.exit(0);
}

const publicDir = path.join(__dirname, '..', 'public');
const outPath = path.join(publicDir, `${trimmed}.txt`);
fs.writeFileSync(outPath, `${trimmed}\n`, 'utf8');
console.log(`Wrote IndexNow key file ${path.basename(outPath)}`);
