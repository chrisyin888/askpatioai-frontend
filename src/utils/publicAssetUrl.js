/**
 * Normalize public/ (and static JSON) asset paths for img src and CSS url().
 * - Root-absolute paths work on deep routes (e.g. /patio-covers-vancouver).
 * - Honors Vue CLI BASE_URL for subdirectory deploys.
 */
export function publicAssetUrl(input) {
  if (input == null) return '';
  const s = String(input).trim();
  if (!s) return '';
  if (
    /^https?:\/\//i.test(s) ||
    s.startsWith('data:') ||
    s.startsWith('blob:')
  ) {
    return s;
  }
  const base =
    (typeof process !== 'undefined' && process.env && process.env.BASE_URL) || '/';
  const baseNorm = base.endsWith('/') ? base.slice(0, -1) : base;
  let path = s.replace(/^\.\//, '');
  if (!path.startsWith('/')) path = `/${path}`;
  if (baseNorm === '' || baseNorm === '/') return path;
  return `${baseNorm}${path}`;
}

/** Escape for use inside CSS url("..."). */
export function cssUrlValue(input) {
  const u = publicAssetUrl(input);
  if (!u) return '';
  return u.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
