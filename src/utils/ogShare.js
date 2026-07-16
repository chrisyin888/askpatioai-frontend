/** Default Open Graph / Twitter share images by product type. */
export const OG_IMAGE_BY_PRODUCT = {
  aluminum: '/og/og-aluminum.jpg',
  glass: '/og/og-glass.jpg',
  skyline: '/og/og-skyline.jpg',
  sunrooms: '/og/og-sunrooms.jpg',
  homepage: '/og/og-glass.jpg',
  default: '/og/og-aluminum.jpg',
};

export function detectProductFromPath(path = '') {
  const p = String(path).toLowerCase();
  if (p.includes('sunroom')) return 'sunrooms';
  if (p.includes('skyline')) return 'skyline';
  if (p.includes('glass')) return 'glass';
  if (p.includes('aluminum') || p.includes('carport')) return 'aluminum';
  return null;
}

export function resolveShareImagePath({ path = '/', heroImage } = {}) {
  if (heroImage) return heroImage;
  if (path === '/' || path === '') return OG_IMAGE_BY_PRODUCT.homepage;
  const product = detectProductFromPath(path);
  if (product) return OG_IMAGE_BY_PRODUCT[product];
  return OG_IMAGE_BY_PRODUCT.default;
}

export function resolveShareImageAlt({ title, path = '/' } = {}) {
  if (title) return title;
  const product = detectProductFromPath(path);
  const labels = {
    aluminum: 'Aluminum patio cover installation in Metro Vancouver',
    glass: 'Glass patio cover installation in Metro Vancouver',
    skyline: 'Skyline combo patio cover in Metro Vancouver',
    sunrooms: 'Sunroom enclosure in Metro Vancouver',
  };
  if (product && labels[product]) return labels[product];
  return 'LoomiHome Patios — patio cover installation in Metro Vancouver';
}
