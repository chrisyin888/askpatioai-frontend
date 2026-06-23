/** Absolute site origin for canonicals, sitemap, and JSON-LD. */
export const SITE_ORIGIN = 'https://loomihomepatios.ca';

let canonicalLinkEl = null;

export function absoluteUrl(pathname) {
  if (!pathname) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${SITE_ORIGIN}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function setCanonicalPath(pathname) {
  if (typeof document === 'undefined') return;
  const href = absoluteUrl(pathname === '/' ? '/' : pathname);

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

let hreflangEnCaEl = null;
let hreflangDefaultEl = null;

function upsertHreflangAlternates(href) {
  if (typeof document === 'undefined') return;
  if (!hreflangEnCaEl) {
    hreflangEnCaEl = document.querySelector('link[rel="alternate"][hreflang="en-CA"]');
    if (!hreflangEnCaEl) {
      hreflangEnCaEl = document.createElement('link');
      hreflangEnCaEl.setAttribute('rel', 'alternate');
      hreflangEnCaEl.setAttribute('hreflang', 'en-CA');
      document.head.appendChild(hreflangEnCaEl);
    }
  }
  if (!hreflangDefaultEl) {
    hreflangDefaultEl = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!hreflangDefaultEl) {
      hreflangDefaultEl = document.createElement('link');
      hreflangDefaultEl.setAttribute('rel', 'alternate');
      hreflangDefaultEl.setAttribute('hreflang', 'x-default');
      document.head.appendChild(hreflangDefaultEl);
    }
  }
  hreflangEnCaEl.setAttribute('href', href);
  hreflangDefaultEl.setAttribute('href', href);
}

function upsertMetaByName(name, content) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

function upsertMetaProperty(property, content) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

/** Keep meta descriptions within common SERP snippet limits. */
export function truncateMetaDescription(text, maxLen = 160) {
  const value = (text || '').trim();
  if (value.length <= maxLen) return value;
  const cut = value.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trim()}…`;
}

/** Per-route title, description, canonical, robots, and social tags for SPA SEO. */
export function setPageMeta({ title, description, path = '/', robots = 'index,follow', image } = {}) {
  if (typeof document === 'undefined') return;

  const pageTitle = title || 'LoomiHome Patios';
  const pageDescription = truncateMetaDescription(description);
  const pagePath = path || '/';
  const pageUrl = absoluteUrl(pagePath);
  const shareImage = image ? absoluteUrl(image) : `${SITE_ORIGIN}/house/Aluminum/aluminum-hero.png`;

  document.title = pageTitle;
  upsertMetaByName('description', pageDescription);
  upsertMetaByName('robots', robots);
  setCanonicalPath(pagePath);
  upsertHreflangAlternates(pageUrl);

  upsertMetaProperty('og:type', 'website');
  upsertMetaProperty('og:site_name', 'LoomiHome Patios');
  upsertMetaProperty('og:title', pageTitle);
  upsertMetaProperty('og:description', pageDescription);
  upsertMetaProperty('og:url', pageUrl);
  upsertMetaProperty('og:image', shareImage);
  upsertMetaProperty('og:locale', 'en_CA');
  upsertMetaProperty('og:image:width', '1200');
  upsertMetaProperty('og:image:height', '630');

  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', pageTitle);
  upsertMetaByName('twitter:description', pageDescription);
  upsertMetaByName('twitter:image', shareImage);
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

export function webSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: 'LoomiHome Patios',
    url: SITE_ORIGIN,
    publisher: { '@id': `${SITE_ORIGIN}/#business` },
    inLanguage: 'en-CA',
  };
}

/** Node for @graph (no duplicate @context on each item). */
export function localBusinessNode() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: 'LoomiHome Patios',
    description:
      'Patio covers and sunrooms in Vancouver and the Lower Mainland, backed by a team with 10+ years of combined experience and hundreds of completed projects. Fast rough estimates in about 60 seconds, then free on-site measurement.',
    slogan: '10+ years of combined experience, hundreds of patio cover and sunroom projects across the Lower Mainland.',
    foundingDate: '2025',
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}/house/Aluminum/aluminum-hero.png`,
    areaServed: [
      { '@type': 'City', name: 'Vancouver' },
      { '@type': 'City', name: 'Burnaby' },
      { '@type': 'City', name: 'Richmond' },
      { '@type': 'City', name: 'Surrey' },
      { '@type': 'City', name: 'Delta' },
      { '@type': 'City', name: 'Coquitlam' },
      { '@type': 'City', name: 'Langley' },
      { '@type': 'City', name: 'North Vancouver' },
      { '@type': 'City', name: 'West Vancouver' },
      { '@type': 'City', name: 'New Westminster' },
      { '@type': 'City', name: 'Maple Ridge' },
      { '@type': 'City', name: 'Pitt Meadows' },
      { '@type': 'AdministrativeArea', name: 'Lower Mainland' },
      { '@type': 'AdministrativeArea', name: 'Metro Vancouver' },
    ],
    priceRange: '$$',
    email: 'mailto:info@loomihomepatios.ca',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@loomihomepatios.ca',
      areaServed: 'CA-BC',
      availableLanguage: ['en'],
    },
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aluminum patio covers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Glass patio covers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skyline combo patio covers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sunrooms' } },
    ],
  };
}

export function webPageNode(page) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.metaTitle || page.h1,
    description: page.metaDescription || page.intro,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: 'LoomiHome Patios',
      url: SITE_ORIGIN,
    },
    about: { '@id': `${SITE_ORIGIN}/#business` },
  };
}

export function articleNode(page) {
  if (!page || !page.path) return null;
  const image = page.heroImage ? absoluteUrl(page.heroImage) : `${SITE_ORIGIN}/house/Aluminum/aluminum-hero.png`;
  const today = new Date().toISOString().slice(0, 10);
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(page.path)}#article`,
    headline: page.h1,
    description: page.metaDescription || page.intro,
    image,
    datePublished: page.datePublished || '2026-06-01',
    dateModified: page.dateModified || today,
    mainEntityOfPage: { '@id': `${absoluteUrl(page.path)}#webpage` },
    author: { '@id': `${SITE_ORIGIN}/#business` },
    publisher: { '@id': `${SITE_ORIGIN}/#business` },
    inLanguage: 'en-CA',
  };
}

export function serviceNode(page) {
  if (!page || !page.serviceType) return null;
  const node = {
    '@type': 'Service',
    '@id': `${absoluteUrl(page.path)}#service`,
    name: page.h1,
    description: page.metaDescription || page.intro,
    url: absoluteUrl(page.path),
    serviceType: page.serviceType,
    provider: { '@id': `${SITE_ORIGIN}/#business` },
    areaServed: {
      '@type': page.areaServed && page.areaServed.includes(',') ? 'City' : 'AdministrativeArea',
      name: page.areaServed || 'Lower Mainland, British Columbia',
    },
  };
  if (page.heroImage) node.image = absoluteUrl(page.heroImage);
  return node;
}

export function breadcrumbNode(items) {
  if (!items || items.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
