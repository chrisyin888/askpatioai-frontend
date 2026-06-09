/** Contractor / installer / aluminum landing pages for newer city SEO targets. */

const CITY_META = {
  'north-vancouver': {
    name: 'North Vancouver',
    areaServed: 'North Vancouver, British Columbia',
    neighbourhoods: 'Lynn Valley, Lower Lonsdale, and Edgemont',
    localDetail: 'North Shore rain, sloped lots, and raised decks',
    heroImage: '/house/Aluminum/aluminum-hero.png',
  },
  'west-vancouver': {
    name: 'West Vancouver',
    areaServed: 'West Vancouver, British Columbia',
    neighbourhoods: 'Ambleside, Dundarave, and the British Properties',
    localDetail: 'coastal rain, wind exposure, and premium glass options',
    heroImage: '/house/glass/glass-hero.png',
  },
  'new-westminster': {
    name: 'New Westminster',
    areaServed: 'New Westminster, British Columbia',
    neighbourhoods: 'Queensborough, Sapperton, and Uptown',
    localDetail: 'townhomes and detached homes near the riverfront',
    heroImage: '/house/Aluminum/aluminum-hero.png',
  },
  'maple-ridge': {
    name: 'Maple Ridge',
    areaServed: 'Maple Ridge, British Columbia',
    neighbourhoods: 'Town Centre, Albion, and Silver Valley',
    localDetail: 'larger lots and family backyards',
    heroImage: '/house/Aluminum/aluminum-hero.png',
  },
  'pitt-meadows': {
    name: 'Pitt Meadows',
    areaServed: 'Pitt Meadows, British Columbia',
    neighbourhoods: 'Pitt Meadows and nearby Maple Ridge',
    localDetail: 'wider spans and Fraser Valley weather',
    heroImage: '/house/Aluminum/aluminum-hero.png',
  },
};

function contractorPage(slug, meta) {
  return {
    id: `contractor-${slug}`,
    path: `/patio-cover-contractor-${slug}`,
    heroImage: meta.heroImage,
    metaTitle: `Patio Cover Contractor ${meta.name} | Fast Quote | LoomiHome Patios`,
    metaDescription:
      `Looking for a patio cover contractor in ${meta.name}? Compare aluminum, glass, combo, and sunroom options with a fast rough quote and free on-site measurement.`,
    h1: `Patio Cover Contractor in ${meta.name}`,
    serviceType: 'Patio cover contractor',
    areaServed: meta.areaServed,
    intro:
      `If you are comparing patio cover contractors in ${meta.name}, start with a clear budget range. LoomiHome helps you compare cover types before booking a free on-site measurement.`,
    highlights: [
      `Fast rough patio cover quote for ${meta.name} homes`,
      'Compare aluminum, glass, skyline combo, and sunroom options',
      `Helpful for ${meta.neighbourhoods}`,
      'Free on-site measurement for final contractor pricing',
    ],
    localAngle:
      `${meta.name} projects often involve ${meta.localDetail}. A rough online estimate saves time before a contractor visit.`,
    sections: [
      {
        h2: `What a ${meta.name} contractor quote should clarify`,
        body:
          'A useful quote should explain product direction, approximate size, attachment, drainage, and what still needs to be confirmed on site.',
      },
      {
        h2: 'Why start online',
        body:
          'A ballpark helps you avoid booking multiple appointments before you know whether the project fits your budget.',
      },
    ],
    pricingNote:
      `Share your ${meta.name} neighbourhood, rough dimensions, and preferred cover type for a starting range.`,
    faqs: [
      {
        q: `Do you provide patio cover contractor quotes in ${meta.name}?`,
        a: 'Yes. Start with a fast rough quote online, then book a free on-site measurement if the range works.',
      },
      {
        q: 'What patio cover types can I compare?',
        a: 'You can compare aluminum, glass, skyline combo, and sunroom directions before choosing what to measure.',
      },
    ],
  };
}

function installerPage(slug, meta) {
  return {
    id: `installer-${slug}`,
    path: `/patio-cover-installer-${slug}`,
    heroImage: meta.heroImage,
    metaTitle: `Patio Cover Installer ${meta.name} | Fast Estimate | LoomiHome Patios`,
    metaDescription:
      `Patio cover installer in ${meta.name} — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.`,
    h1: `Patio Cover Installer in ${meta.name}`,
    serviceType: 'Patio cover installation',
    areaServed: meta.areaServed,
    intro:
      `${meta.name} homeowners searching for a patio cover installer often want practical answers first: what type fits, what it might cost, and how it will handle local weather. We start with a rough estimate, then confirm details during a free measurement.`,
    highlights: [
      `Patio cover installation options across ${meta.name}`,
      'Compare aluminum, glass, combo, and sunroom paths',
      `Helpful for ${meta.neighbourhoods}`,
      'Fast ballpark followed by free measurement',
    ],
    localAngle:
      `${meta.name} sites vary in ${meta.localDetail}. Attachment, slope, and drainage are confirmed during the free site visit.`,
    sections: [
      {
        h2: `Installation details that matter in ${meta.name}`,
        body:
          'Post placement, wall or deck attachment, roof slope, gutter direction, access, and exposure all shape a proper patio cover installation and the final quote.',
      },
      {
        h2: 'Estimate first, install planning second',
        body:
          'The first estimate helps you decide whether the project is worth measuring. The site visit handles practical installation details and confirms pricing.',
      },
    ],
    pricingNote:
      `Share rough dimensions and one or two photos. We can ballpark the likely product direction before a ${meta.name} site visit.`,
    faqs: [
      {
        q: `Do you install patio covers in ${meta.name}?`,
        a: `Yes, we serve ${meta.name} as part of our Metro Vancouver and Lower Mainland coverage.`,
      },
      {
        q: 'Can you install glass and aluminum covers?',
        a: 'Yes. We help homeowners compare aluminum, glass, skyline combo, and sunroom options before final measurement.',
      },
    ],
  };
}

function aluminumPage(slug, meta) {
  return {
    id: `aluminum-${slug}`,
    path: `/aluminum-patio-covers-${slug}`,
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: `Aluminum Patio Covers ${meta.name} | Fast Quote | LoomiHome Patios`,
    metaDescription:
      `Aluminum patio covers in ${meta.name} — rain-ready, low-maintenance backyard covers. Get a fast rough estimate, compare options, then book a free measurement.`,
    h1: `Aluminum Patio Covers in ${meta.name}`,
    serviceType: 'Aluminum patio cover installation',
    areaServed: meta.areaServed,
    intro:
      `Aluminum patio covers are a practical choice for ${meta.name} homes that need dependable rain protection without heavy upkeep. Start with a fast rough estimate, then book a free measurement when the range fits your budget.`,
    highlights: [
      `Low-maintenance aluminum covers for ${meta.name}`,
      'Strong rain protection for Metro Vancouver seasons',
      `Helpful for ${meta.neighbourhoods}`,
      'Free on-site measurement after the initial ballpark',
    ],
    localAngle:
      `${meta.name} patios often need to handle ${meta.localDetail}. Aluminum gives a clean, durable roof before you decide on glass or combo upgrades.`,
    sections: [
      {
        h2: `Why aluminum works well in ${meta.name}`,
        body:
          'Aluminum covers are usually the first option when homeowners want reliable rain coverage, straightforward maintenance, and a clear budget range.',
      },
      {
        h2: 'What we confirm on site',
        body:
          'Width, projection, post placement, attachment, and drainage are measured during the free visit so the final quote matches your home.',
      },
    ],
    pricingNote:
      'Send approximate patio dimensions in chat for a rough aluminum range before anyone visits your home.',
    faqs: [
      {
        q: `Do you install aluminum patio covers in ${meta.name}?`,
        a: `Yes — ${meta.name} is part of our regular Lower Mainland service area.`,
      },
      {
        q: 'Can I compare aluminum with glass or a sunroom?',
        a: 'Yes. We can ballpark multiple product directions from the same rough dimensions.',
      },
    ],
  };
}

export const CITY_SERVICE_EXPANSION_ORDER = Object.keys(CITY_META).flatMap((slug) => [
  `contractor-${slug}`,
  `installer-${slug}`,
  `aluminum-${slug}`,
]);

export const CITY_SERVICE_EXPANSION_PAGES = Object.fromEntries(
  Object.entries(CITY_META).flatMap(([slug, meta]) => [
    [`contractor-${slug}`, contractorPage(slug, meta)],
    [`installer-${slug}`, installerPage(slug, meta)],
    [`aluminum-${slug}`, aluminumPage(slug, meta)],
  ]),
);
