/** Absolute site origin for canonicals, sitemap, and JSON-LD. */
export const SITE_ORIGIN = 'https://loomihomepatios.ca';

let canonicalLinkEl = null;

export function setCanonicalPath(pathname) {
  if (typeof document === 'undefined') return;
  const path = pathname === '/' ? '' : pathname;
  const href = `${SITE_ORIGIN}${path || '/'}`;

  if (!canonicalLinkEl) {
    canonicalLinkEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalLinkEl) {
      canonicalLinkEl = document.createElement('link');
      canonicalLinkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLinkEl);
    }
  }
  canonicalLinkEl.setAttribute('href', href);
}

const JSONLD_ID = 'loomihome-jsonld';

export function removeJsonLd() {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(JSONLD_ID);
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

/**
 * @param {object|object[]} graph - single schema object or @graph array
 */
export function injectJsonLd(graph) {
  if (typeof document === 'undefined') return;
  removeJsonLd();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = JSONLD_ID;
  const payload = Array.isArray(graph)
    ? { '@context': 'https://schema.org', '@graph': graph }
    : graph;
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
}

export function faqPageNode(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** Node for @graph (no duplicate @context on each item). */
export function localBusinessNode() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: 'LoomiHome Patios',
    description:
      'Patio covers and sunrooms in Vancouver and the Lower Mainland. Fast rough estimates in about 60 seconds, then free on-site measurement.',
    url: SITE_ORIGIN,
    areaServed: [
      { '@type': 'City', name: 'Vancouver' },
      { '@type': 'City', name: 'Burnaby' },
      { '@type': 'City', name: 'Richmond' },
      { '@type': 'City', name: 'Surrey' },
      { '@type': 'City', name: 'Delta' },
      { '@type': 'City', name: 'Coquitlam' },
      { '@type': 'AdministrativeArea', name: 'Lower Mainland' },
    ],
    priceRange: '$$',
    email: 'mailto:info@loomihomepatios.ca',
  };
}
