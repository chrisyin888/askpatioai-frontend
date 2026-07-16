import { skylinePageForExpansion } from './skylineCityPages.js';
import { PRICING_COPY } from './pricingCopy.js';

/** Contractor / installer / aluminum landing pages for newer city SEO targets. */

const CITY_META = {
  'north-vancouver': {
    name: 'North Vancouver',
    areaServed: 'North Vancouver, British Columbia',
    neighbourhoods: 'Lynn Valley, Lower Lonsdale, and Edgemont',
    localDetail: 'North Shore rain, sloped lots, and raised decks',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Aluminum patio cover on a sloped Lower Mainland backyard similar to North Vancouver lots',
      caption:
        'Aluminum patio cover — rain-ready protection for North Shore sloped yards and raised decks. Compare glass in chat on the same size.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
  },
  'west-vancouver': {
    name: 'West Vancouver',
    areaServed: 'West Vancouver, British Columbia',
    neighbourhoods: 'Ambleside, Dundarave, and the British Properties',
    localDetail: 'coastal rain, wind exposure, and premium glass options',
    heroImage: '/house/glass/glass-hero.png',
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Glass patio cover on a premium West Coast home with natural light under tempered glass roof',
      caption:
        'Glass patio cover — bright rain protection suited to West Vancouver view lines and walkout decks. Compare aluminum for budget in chat.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
  },
  'new-westminster': {
    name: 'New Westminster',
    areaServed: 'New Westminster, British Columbia',
    neighbourhoods: 'Queensborough, Sapperton, and Uptown',
    localDetail: 'townhomes and detached homes near the riverfront',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Aluminum patio cover on a compact Metro Vancouver backyard patio',
      caption:
        'Aluminum patio cover — practical fit for New Westminster townhome patios and detached backyards. Ballpark in chat first.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
  },
  'maple-ridge': {
    name: 'Maple Ridge',
    areaServed: 'Maple Ridge, British Columbia',
    neighbourhoods: 'Town Centre, Albion, and Silver Valley',
    localDetail: 'larger lots and family backyards',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Skyline combo patio cover on a large suburban backyard similar to Maple Ridge lots',
      caption:
        'Skyline combo cover — larger backyard layout common in Maple Ridge. Compare aluminum and glass on your dimensions in chat.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'pitt-meadows': {
    name: 'Pitt Meadows',
    areaServed: 'Pitt Meadows, British Columbia',
    neighbourhoods: 'Pitt Meadows and nearby Maple Ridge',
    localDetail: 'wider spans and Fraser Valley weather',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Wide-span patio cover on a Fraser Valley suburban backyard',
      caption:
        'Wide-span combo cover — reference for Pitt Meadows lots with room for larger patios. Chat ballpark before free measurement.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'port-coquitlam': {
    name: 'Port Coquitlam',
    areaServed: 'Port Coquitlam, British Columbia',
    neighbourhoods: 'Citadel Heights, Mary Hill, and Lincoln Park',
    localDetail: 'Tri-Cities rain, townhomes, and hillside yards',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover on a Tri-Cities backyard patio similar to Port Coquitlam homes',
      caption:
        'Glass patio cover — rain-ready option for Port Coquitlam yards. Compare aluminum on the same size in chat.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  'port-moody': {
    name: 'Port Moody',
    areaServed: 'Port Moody, British Columbia',
    neighbourhoods: 'Moody Centre, Suter Brook, and Newport Village',
    localDetail: 'coastal rain, compact lots, and view-oriented decks',
    heroImage: '/house/glass/glass-hero.png',
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover on a compact Metro Vancouver backyard patio',
      caption:
        'Glass patio cover — bright rain protection suited to Port Moody walkout decks. Compare aluminum for budget in chat.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  abbotsford: {
    name: 'Abbotsford',
    areaServed: 'Abbotsford, British Columbia',
    neighbourhoods: 'Downtown Abbotsford, Clearbrook, and Sumas Mountain',
    localDetail: 'Fraser Valley rain, larger lots, and family backyards',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Skyline combo patio cover on a Fraser Valley suburban backyard similar to Abbotsford lots',
      caption:
        'Skyline combo cover — larger backyard layout common in Abbotsford. Compare aluminum and glass on your dimensions in chat.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'white-rock': {
    name: 'White Rock',
    areaServed: 'White Rock, British Columbia',
    neighbourhoods: 'East Beach, West Beach, and nearby South Surrey',
    localDetail: 'coastal wind, ocean exposure, and compact seaside lots',
    heroImage: '/house/glass/glass-hero.png',
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Glass patio cover on a coastal Metro Vancouver home with natural light under tempered glass roof',
      caption:
        'Glass patio cover — bright rain protection suited to White Rock and South Surrey decks. Compare aluminum for budget in chat.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
  },
};

function contractorPage(slug, meta) {
  return {
    id: `contractor-${slug}`,
    path: `/patio-cover-contractor-${slug}`,
    heroImage: meta.heroImage,
    metaTitle: `Patio Cover Contractor ${meta.name} | LoomiHome Patios`,
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
      {
        q: `Is the online ${meta.name} contractor quote final?`,
        a: 'No — chat gives a planning range only. Your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: `Which ${meta.name} areas do you quote?`,
        a: `${meta.neighbourhoods} and surrounding neighbourhoods — share your area in chat for a faster ballpark.`,
      },
    ],
    relatedPageLinks: [
      { path: `/patio-covers-${slug}`, label: `Patio covers in ${meta.name}` },
      { path: `/aluminum-patio-covers-${slug}`, label: `Aluminum patio covers in ${meta.name}` },
      { path: `/glass-patio-covers-${slug}`, label: `Glass patio covers in ${meta.name}` },
    ],
    ...(meta.caseStudy ? { caseStudy: meta.caseStudy } : {}),
  };
}

const SUNROOM_CASE_STUDY = {
  image: '/house/realprojects/sunroom-white.png',
  alt: 'White-framed sunroom enclosure with glass walls on a Lower Mainland home',
  caption:
    'Sunroom-style enclosed patio — compare sunroom pricing against an open patio cover in chat before free measurement.',
};

function installerPage(slug, meta) {
  return {
    id: `installer-${slug}`,
    path: `/patio-cover-installer-${slug}`,
    heroImage: meta.heroImage,
    metaTitle: `Patio Cover Installer ${meta.name} | LoomiHome Patios`,
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
        h2: `Installation process in ${meta.name}`,
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
        q: `How long does patio cover installation take in ${meta.name}?`,
        a: 'Most installs finish within a few days once materials are ready. We confirm a realistic schedule after measurement.',
      },
      {
        q: `Is the online ${meta.name} installation estimate final?`,
        a: 'No — chat gives a planning range only. Final installation pricing is confirmed after free on-site measurement.',
      },
      {
        q: `Which ${meta.name} areas do you install in?`,
        a: `${meta.neighbourhoods} and surrounding neighbourhoods — share your area in chat for a faster ballpark.`,
      },
    ],
    relatedPageLinks: [
      { path: `/patio-covers-${slug}`, label: `Patio covers in ${meta.name}` },
      { path: `/patio-cover-contractor-${slug}`, label: `Patio cover contractor in ${meta.name}` },
      { path: `/aluminum-patio-covers-${slug}`, label: `Aluminum patio covers in ${meta.name}` },
    ],
    ...(meta.caseStudy ? { caseStudy: meta.caseStudy } : {}),
  };
}

function aluminumPage(slug, meta) {
  return {
    id: `aluminum-${slug}`,
    path: `/aluminum-patio-covers-${slug}`,
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: `Aluminum Patio Covers ${meta.name} | LoomiHome Patios`,
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
    relatedPageLinks: [
      { path: `/patio-covers-${slug}`, label: `Patio covers in ${meta.name}` },
      { path: `/patio-cover-contractor-${slug}`, label: `Patio cover contractor in ${meta.name}` },
      { path: `/glass-patio-covers-${slug}`, label: `Glass patio covers in ${meta.name}` },
    ],
  };
}

function glassPage(slug, meta) {
  return {
    id: `glass-${slug}`,
    path: `/glass-patio-covers-${slug}`,
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: `Glass Patio Covers ${meta.name} | LoomiHome Patios`,
    metaDescription:
      `Glass patio covers in ${meta.name} — bright, modern rain protection that keeps decks full of natural light. Fast estimate and free measurement.`,
    h1: `Glass Patio Covers in ${meta.name}`,
    serviceType: 'Glass patio cover installation',
    areaServed: meta.areaServed,
    intro:
      `Glass patio covers are worth comparing in ${meta.name} when you want rain protection but still want the deck and back of the home to stay bright.`,
    highlights: [
      `Bright overhead rain protection for ${meta.name} decks`,
      'Modern glass and black-frame design direction',
      `Helpful for ${meta.neighbourhoods}`,
      'Free measurement after your first ballpark estimate',
    ],
    localAngle:
      `${meta.name} homes with walkout decks and large rear windows often compare glass to keep natural light. ${meta.localDetail.charAt(0).toUpperCase() + meta.localDetail.slice(1)} — slope and drainage are confirmed on site.`,
    sections: [
      {
        h2: 'When glass is worth the upgrade',
        body:
          'Glass usually costs more than a basic aluminum cover, but it keeps the deck and adjoining rooms brighter and can look more premium from inside the home.',
      },
      {
        h2: 'What affects glass pricing',
        body:
          'Panel layout, span, support posts, attachment height, glass type, and drainage direction all affect the final quote. A quick estimate helps you decide before measuring.',
      },
    ],
    pricingNote:
      'Send rough dimensions and whether you want maximum light or a balanced mix of shade. We can compare glass and aluminum from the same measurements.',
    faqs: [
      {
        q: `Are glass patio covers good for ${meta.name} homes?`,
        a: 'Yes, especially where keeping natural light matters. Slope and drainage are confirmed on site.',
      },
      {
        q: 'Can I compare glass and aluminum pricing?',
        a: 'Yes. We can ballpark both from the same approximate dimensions.',
      },
    ],
    relatedPageLinks: [
      { path: `/patio-covers-${slug}`, label: `Patio covers in ${meta.name}` },
      { path: `/patio-cover-contractor-${slug}`, label: `Patio cover contractor in ${meta.name}` },
      { path: `/aluminum-patio-covers-${slug}`, label: `Aluminum patio covers in ${meta.name}` },
    ],
  };
}

function sunroomPage(slug, meta) {
  return {
    id: `sunrooms-${slug}`,
    path: `/sunrooms-${slug}`,
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: `Sunrooms ${meta.name} | LoomiHome Patios`,
    metaDescription:
      `Sunrooms in ${meta.name} — enclosed patio and glass room options for brighter, year-round usable space. Fast rough estimate and free site measurement.`,
    h1: `Sunrooms in ${meta.name}`,
    serviceType: 'Sunroom installation',
    areaServed: meta.areaServed,
    intro:
      `${meta.name} homeowners comparing sunrooms usually want a practical budget range before detailed design. Start with a rough estimate, then book a free measurement when the numbers make sense.`,
    highlights: [
      `Enclosed patio and sunroom options in ${meta.name}`,
      'Compare sunroom budget against open patio covers',
      `Helpful for ${meta.neighbourhoods}`,
      'Free measurement after the initial rough estimate',
    ],
    localAngle:
      `${meta.name} lots vary in size and layout — ${meta.localDetail}. Existing deck condition, attachment, and drainage are reviewed before final sunroom pricing.`,
    sections: [
      {
        h2: 'When to consider a sunroom',
        body:
          'Choose a sunroom when you want more enclosure and comfort than a roof alone provides. It works well for sitting areas, hobby rooms, or a protected transition to the backyard.',
      },
      {
        h2: 'Budget before design',
        body:
          'Because sunrooms vary widely, the first step is understanding whether the project range makes sense. Final details come after measurement.',
      },
    ],
    pricingNote:
      'Share the approximate footprint and a few photos. We can compare a sunroom with simpler patio cover options if budget is uncertain.',
    faqs: [
      {
        q: `Do you build sunrooms in ${meta.name}?`,
        a: `Yes — ${meta.name} is part of our Lower Mainland service area.`,
      },
      {
        q: 'Should I choose a sunroom or a patio cover?',
        a: 'If you mainly need rain protection, start with a patio cover. If you want more enclosure and year-round comfort, compare a sunroom.',
      },
      {
        q: 'What is the rough sunroom pricing range?',
        a: PRICING_COPY.sunroomWallOnly,
      },
    ],
    relatedPageLinks: [
      { path: `/patio-covers-${slug}`, label: `Patio covers in ${meta.name}` },
      { path: `/patio-cover-contractor-${slug}`, label: `Patio cover contractor in ${meta.name}` },
      { path: `/patio-cover-cost-vancouver`, label: 'Patio cover cost guide' },
    ],
    caseStudy: SUNROOM_CASE_STUDY,
  };
}

export const CITY_SERVICE_EXPANSION_ORDER = Object.keys(CITY_META).flatMap((slug) => [
  `contractor-${slug}`,
  `installer-${slug}`,
  `aluminum-${slug}`,
  `glass-${slug}`,
  `skyline-${slug}`,
  `sunrooms-${slug}`,
]);

export const CITY_SERVICE_EXPANSION_PAGES = Object.fromEntries(
  Object.entries(CITY_META).flatMap(([slug, meta]) => [
    [`contractor-${slug}`, contractorPage(slug, meta)],
    [`installer-${slug}`, installerPage(slug, meta)],
    [`aluminum-${slug}`, aluminumPage(slug, meta)],
    [`glass-${slug}`, glassPage(slug, meta)],
    [`skyline-${slug}`, skylinePageForExpansion(slug, meta)],
    [`sunrooms-${slug}`, sunroomPage(slug, meta)],
  ]),
);
