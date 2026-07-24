/** Per-city skyline combo landing pages for high-intent local searches. */
import { PRICING_COPY } from './pricingCopy.js';

const SKYLINE_CITY_META = {
  burnaby: {
    name: 'Burnaby',
    areaServed: 'Burnaby, British Columbia',
    neighbourhoods: 'Metrotown, Deer Lake, and North Burnaby',
    localDetail: 'mixed lot sizes and rain exposure',
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Skyline combo patio cover on a Burnaby backyard similar to combo layouts in Metrotown and Deer Lake',
      caption:
        'Burnaby aluminum patio cover — rain-ready reference for combo comparisons on mixed lot sizes. Ballpark combo and aluminum in chat.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
  },
  richmond: {
    name: 'Richmond',
    areaServed: 'Richmond, British Columbia',
    neighbourhoods: 'Steveston, Broadmoor, and East Cambie',
    localDetail: 'side yards and back patios near parking areas',
    caseStudy: {
      image: '/house/before-after/richmond-carport-after.png',
      alt: 'Aluminum carport-style cover on a Richmond home — useful combo comparison for side yards',
      caption:
        'Richmond cover example — compare skyline combo against aluminum on the same footprint in chat.',
      projectPath: '/projects/richmond-aluminum-carport-cover',
    },
  },
  surrey: {
    name: 'Surrey',
    areaServed: 'Surrey, British Columbia',
    neighbourhoods: 'Guildford, Cloverdale, and South Surrey',
    localDetail: 'larger backyards and wider patio spans',
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Finished skyline combo patio cover in Surrey with black frame, V-panels, and glass sections',
      caption:
        'Surrey skyline combo cover — approx. 12×26 ft mix of shade and natural light. Get a similar rough range in chat before a free measurement.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-surrey', label: 'Patio covers in Surrey' },
      { path: '/patio-cover-contractor-surrey', label: 'Patio cover contractor in Surrey' },
    ],
  },
  delta: {
    name: 'Delta',
    areaServed: 'Delta, British Columbia',
    neighbourhoods: 'Ladner, Tsawwassen, and North Delta',
    localDetail: 'family patios and coastal rain exposure',
    caseStudy: {
      image: '/house/before-after/delta-aluminum-after.png',
      alt: 'Aluminum patio cover on a Delta backyard — reference for combo vs aluminum comparisons',
      caption:
        'Delta aluminum cover — compare skyline combo on the same size in chat before free measurement.',
      projectPath: '/projects/delta-aluminum-patio-cover',
    },
  },
  coquitlam: {
    name: 'Coquitlam',
    areaServed: 'Coquitlam, British Columbia',
    neighbourhoods: 'Burke Mountain, Westwood Plateau, and Maillardville',
    localDetail: 'hillside decks and established neighbourhoods',
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover on a Coquitlam backyard — useful when comparing combo vs glass options',
      caption:
        'Coquitlam glass cover — compare skyline combo and glass on your dimensions in chat.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  langley: {
    name: 'Langley',
    areaServed: 'Langley, British Columbia',
    neighbourhoods: 'Willoughby, Walnut Grove, and Brookswood',
    localDetail: 'larger lots and family outdoor spaces',
    caseStudy: {
      image: '/house/Aluminum/p27.jpg',
      alt: 'Aluminum patio cover on a Langley family backyard similar to combo layout planning',
      caption:
        'Langley aluminum cover — compare skyline combo for larger lots in Willoughby and Walnut Grove.',
      projectPath: '/projects/langley-aluminum-patio-cover',
    },
  },
};

function skylinePage(slug, meta) {
  return {
    id: `skyline-${slug}`,
    path: `/skyline-combo-patio-covers-${slug}`,
    heroImage: '/house/skyline/skyline-hero.png',
    metaTitle: `Skyline Combo Covers ${meta.name} | LoomiHome Patios`,
    metaDescription:
      `Skyline combo patio covers in ${meta.name} — glass and V-panel mix for balanced light and shade. Fast rough estimate and free on-site measurement.`,
    h1: `Skyline Combo Patio Covers in ${meta.name}`,
    serviceType: 'Skyline combo patio cover installation',
    areaServed: meta.areaServed,
    intro:
      `Skyline combo covers blend glass and V-panels for homeowners in ${meta.name} who want more than a solid aluminum roof but do not want a full glass patio cover. Start with a fast rough estimate, then book a free measurement when the range fits.`,
    highlights: [
      `Balanced light and shade for ${meta.name} patios`,
      'Architectural mix of glass and V-panel sections',
      `Helpful for ${meta.neighbourhoods}`,
      'Free on-site measurement after your first ballpark',
    ],
    localAngle:
      `${meta.name} backyards often involve ${meta.localDetail}. A skyline combo can keep the patio brighter than solid aluminum while adding more visual interest than a basic cover.`,
    sections: [
      {
        h2: `When skyline combo fits ${meta.name} homes`,
        body:
          'Choose this style when you want a middle option between value aluminum and premium full glass. Mixing panels lets you tune shade, light, and budget.',
      },
      {
        h2: 'Compare combo, glass, and aluminum',
        body:
          'Use chat to ballpark multiple directions from the same rough dimensions. That makes it easier to decide before anyone visits your property.',
      },
    ],
    pricingNote: PRICING_COPY.skylineComboNote,
    faqs: [
      {
        q: `Do you install skyline combo covers in ${meta.name}?`,
        a: `Yes — ${meta.name} is part of our regular Lower Mainland service area.`,
      },
      {
        q: 'What is a skyline combo patio cover?',
        a: 'A mix of glass and V-panel sections for both light and shade — useful when you do not want an all-glass or all-solid roof.',
      },
      {
        q: 'Can I compare skyline with aluminum or glass?',
        a: 'Yes. We can ballpark combo, glass, and aluminum from the same approximate patio size.',
      },
      {
        q: 'Is the chat skyline estimate final?',
        a: 'No — chat gives a planning range only. Your formal quote is confirmed after free on-site measurement.',
      },
    ],
    ...(meta.caseStudy ? { caseStudy: meta.caseStudy } : {}),
    ...(meta.relatedPageLinks ? { relatedPageLinks: meta.relatedPageLinks } : {}),
  };
}

export const SKYLINE_CITY_PAGE_ORDER = Object.keys(SKYLINE_CITY_META).map((slug) => `skyline-${slug}`);

export const SKYLINE_CITY_PAGES = Object.fromEntries(
  Object.entries(SKYLINE_CITY_META).map(([slug, meta]) => [
    `skyline-${slug}`,
    skylinePage(slug, meta),
  ]),
);

export function skylinePageForExpansion(slug, meta) {
  return skylinePage(slug, {
    ...meta,
    neighbourhoods: meta.neighbourhoods,
    localDetail: meta.localDetail,
  });
}
