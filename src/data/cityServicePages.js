import {
  CITY_SERVICE_EXPANSION_ORDER,
  CITY_SERVICE_EXPANSION_PAGES,
} from './cityServiceExpansion.js';
import { PRICING_COPY } from './pricingCopy.js';
import { SKYLINE_CITY_PAGE_ORDER, SKYLINE_CITY_PAGES } from './skylineCityPages.js';

/** Service + city landing pages for high-intent local searches. */
export const CITY_SERVICE_PAGE_ORDER = [
  'aluminum-burnaby',
  'aluminum-richmond',
  'aluminum-surrey',
  'glass-richmond',
  'glass-coquitlam',
  'sunrooms-burnaby',
  'glass-burnaby',
  'glass-surrey',
  'sunrooms-richmond',
  'sunrooms-surrey',
  'contractor-vancouver',
  'installer-vancouver',
  'installer-richmond',
  'aluminum-delta',
  'aluminum-coquitlam',
  'glass-delta',
  'sunrooms-coquitlam',
  'contractor-burnaby',
  'installer-surrey',
  'contractor-richmond',
  'contractor-surrey',
  'contractor-coquitlam',
  'installer-burnaby',
  'installer-coquitlam',
  'sunrooms-delta',
  'aluminum-langley',
  'glass-langley',
  'sunrooms-langley',
  'contractor-langley',
  'installer-langley',
  'contractor-delta',
  'installer-delta',
  ...SKYLINE_CITY_PAGE_ORDER,
  ...CITY_SERVICE_EXPANSION_ORDER,
];

export const CITY_SERVICE_PAGES = {
  'aluminum-burnaby': {
    id: 'aluminum-burnaby',
    path: '/aluminum-patio-covers-burnaby',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Aluminum Patio Covers Burnaby | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Burnaby — rain-ready, low-maintenance backyard covers. Get a fast rough estimate, compare options, then book a free measurement.',
    h1: 'Aluminum Patio Covers in Burnaby',
    serviceType: 'Aluminum patio cover installation',
    areaServed: 'Burnaby, British Columbia',
    intro:
      'If you want a practical patio cover in Burnaby, aluminum is usually the first option to compare. It handles rain well, keeps maintenance low, and works for both compact city lots and wider suburban patios.',
    highlights: [
      'Strong rain protection for Burnaby homes',
      'Fast online ballpark before a site visit',
      'Good fit for patios, back doors, and side-yard covers',
      'Free on-site measurement when the estimate range works',
    ],
    localAngle:
      'Burnaby patios vary from tight Metrotown-area yards to larger Deer Lake and North Burnaby spaces. Approximate dimensions and a photo are enough to start a useful ballpark.',
    sections: [
      {
        h2: 'Why aluminum works well in Burnaby',
        body: 'Aluminum covers are straightforward, durable, and value-focused. For many Burnaby homeowners, that means a dry, usable patio without the higher price of a full glass roof.',
      },
      {
        h2: 'What changes the final quote',
        body: 'Width, projection, attachment height, gutter direction, posts, access, and any custom finish details can all change the final number. The free measurement locks those details down.',
      },
    ],
    pricingNote:
      'Start with city and rough size in chat. We can compare aluminum against glass or combo if you are not sure which direction fits best.',
    faqs: [
      {
        q: 'Can I get a Burnaby aluminum patio cover estimate online?',
        a: 'Yes. Share rough dimensions and your area of Burnaby to get a starting range before booking a free measurement.',
      },
      {
        q: 'Is aluminum better than glass for rain?',
        a: 'For rain-first and budget-conscious projects, aluminum is often the practical starting point. Glass is better when keeping more natural light is a top priority.',
      },
    ],
  },
  'aluminum-richmond': {
    id: 'aluminum-richmond',
    path: '/aluminum-patio-covers-richmond',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Aluminum Patio Covers Richmond | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Richmond BC — practical rain and sun protection for patios and side yards. Fast rough quote and free on-site measurement.',
    h1: 'Aluminum Patio Covers in Richmond',
    serviceType: 'Aluminum patio cover installation',
    areaServed: 'Richmond, British Columbia',
    intro:
      'Richmond homeowners often want dependable cover for rain, parking-adjacent side yards, or a cleaner backyard sitting area. Aluminum is a strong first option when you want practical protection and a clear budget range.',
    highlights: [
      'Low-maintenance aluminum patio cover options',
      'Good for back patios and carport-style side covers',
      'Fast ballpark using approximate size and location',
      'Free Richmond-area measurement for final pricing',
    ],
    localAngle:
      'From Steveston to Broadmoor and East Cambie, Richmond lots and exposure can vary. We use your rough dimensions and photos to narrow the estimate before visiting.',
    sections: [
      {
        h2: 'Common Richmond use cases',
        body: 'Aluminum covers work for backyard seating, barbecue areas, side walkways, and some carport-style layouts. The right design depends on clearance, attachment, and drainage.',
      },
      {
        h2: 'How the estimate works',
        body: 'Chat gives a rough range first. If the number is in the right zone, the site visit confirms size, post locations, slope, and final quote details.',
      },
    ],
    pricingNote:
      'Long narrow covers and standard patio covers price differently. Send approximate length and width so the first estimate is useful.',
    faqs: [
      {
        q: 'Do you install aluminum covers across Richmond?',
        a: 'Yes, Richmond is one of our main Lower Mainland service areas.',
      },
      {
        q: 'Can aluminum be used for a side driveway cover?',
        a: 'Often yes, depending on clearance, span, attachment, and local requirements. We confirm those details during measurement.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-richmond', label: 'Patio covers in Richmond' },
      { path: '/projects/richmond-aluminum-patio-cover', label: 'Richmond backyard patio project' },
      { path: '/projects/richmond-aluminum-carport-cover', label: 'Richmond carport project' },
    ],
    caseStudy: {
      image: '/house/Aluminum/p27.jpg',
      alt: 'Aluminum patio cover on a Richmond backyard patio',
      caption:
        'Richmond aluminum patio cover — practical rain protection for backyard seating. Compare glass in chat on the same size.',
      projectPath: '/projects/richmond-aluminum-patio-cover',
    },
  },
  'aluminum-surrey': {
    id: 'aluminum-surrey',
    path: '/aluminum-patio-covers-surrey',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Aluminum Patio Covers Surrey | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Surrey — rain-ready backyard covers for larger patios and family spaces. Quick online estimate and free measurement.',
    h1: 'Aluminum Patio Covers in Surrey',
    serviceType: 'Aluminum patio cover installation',
    areaServed: 'Surrey, British Columbia',
    intro:
      'Surrey patios often have enough space for a useful covered outdoor area. Aluminum is a practical choice when you want shade, rain protection, and a budget-friendly first option.',
    highlights: [
      'Practical cover for larger Surrey backyards',
      'Good rain and sun protection without high upkeep',
      'Compare aluminum with glass or combo covers',
      'Free site measurement after your ballpark estimate',
    ],
    localAngle:
      'Surrey includes compact townhome patios and wide family backyards. A few details in chat help us shape the first estimate around your actual space.',
    sections: [
      {
        h2: 'Why start with aluminum',
        body: 'Aluminum is usually the simplest way to create a dry outdoor zone. It is especially useful when the priority is function, coverage area, and cost control.',
      },
      {
        h2: 'Good questions to answer first',
        body: 'How wide is the patio, how far should the cover project, and do you care more about full shade or keeping light? Those answers guide the first ballpark.',
      },
    ],
    pricingNote:
      'Share your Surrey neighbourhood and approximate dimensions. We can ballpark aluminum first, then compare glass or skyline combo if needed.',
    faqs: [
      {
        q: 'Do you serve South Surrey and Cloverdale?',
        a: 'Yes. We serve Surrey broadly, including South Surrey, Cloverdale, Newton, Fleetwood, and Guildford.',
      },
      {
        q: 'Can I get pricing before a site visit?',
        a: 'Yes. The first estimate is a rough planning range; final pricing comes after measurement.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-surrey', label: 'Patio covers in Surrey' },
      { path: '/patio-cover-cost-surrey', label: 'Patio cover cost in Surrey' },
      { path: '/projects/surrey-aluminum-patio-cover', label: 'Surrey aluminum project' },
      { path: '/projects/surrey-skyline-combo-patio-cover', label: 'Surrey skyline combo project' },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Aluminum patio cover on a wide Surrey suburban backyard',
      caption:
        'Surrey aluminum patio cover reference — practical rain protection for larger backyards. Ballpark in chat before free measurement.',
      projectPath: '/projects/surrey-aluminum-patio-cover',
    },
  },
  'glass-richmond': {
    id: 'glass-richmond',
    path: '/glass-patio-covers-richmond',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass Patio Covers Richmond | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Richmond BC — bright, modern rain protection for patios. Compare glass vs aluminum with a fast rough estimate.',
    h1: 'Glass Patio Covers in Richmond',
    serviceType: 'Glass patio cover installation',
    areaServed: 'Richmond, British Columbia',
    intro:
      'Glass patio covers are worth comparing in Richmond when you want rain protection but do not want the back of the home to feel darker. They create a cleaner modern look while keeping daylight in the space.',
    highlights: [
      'Bright overhead protection for Richmond patios',
      'Modern black-frame glass cover options',
      'Compare against aluminum for budget clarity',
      'Free measurement after the first rough estimate',
    ],
    localAngle:
      'Richmond homes near kitchens, dining rooms, and family rooms often benefit from a brighter cover. Glass keeps more natural light while still protecting the patio from rain.',
    sections: [
      {
        h2: 'When glass makes sense',
        body: 'Choose glass when light and appearance are priorities. It usually costs more than aluminum, but it can feel more open and premium.',
      },
      {
        h2: 'What we confirm on site',
        body: 'Slope, drainage, glass layout, attachment, and height all matter. The first chat estimate gives budget direction; the site visit confirms build details.',
      },
    ],
    pricingNote:
      'Send rough dimensions and whether you want full glass or a mixed cover. We can compare glass and aluminum side by side.',
    faqs: [
      {
        q: 'Are glass patio covers good for Richmond rain?',
        a: 'Yes, when designed with proper slope, guttering, and attachment. Those details are confirmed on site.',
      },
      {
        q: 'Is glass more expensive than aluminum?',
        a: PRICING_COPY.glassVsAluminumShort,
      },
      {
        q: 'Can I get a Richmond glass patio cover estimate before a site visit?',
        a: 'Yes. Chat gives a planning range in about a minute. Your formal quote is confirmed after free on-site measurement.',
      },
    ],
    caseStudy: {
      image: '/house/realprojects/glass-patio-door.png',
      alt: 'Glass patio cover connecting to rear doors on a Richmond-area style home',
      caption:
        'Glass patio cover direction for Richmond homes that want rain protection without darkening kitchens or family rooms behind the patio.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-cover-contractor-richmond', label: 'Patio cover contractor in Richmond' },
      { path: '/patio-covers-richmond', label: 'Patio covers in Richmond' },
      { path: '/projects/richmond-aluminum-patio-cover', label: 'Richmond aluminum patio project' },
    ],
  },
  'glass-coquitlam': {
    id: 'glass-coquitlam',
    path: '/glass-patio-covers-coquitlam',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass Patio Covers Coquitlam | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Coquitlam — bright patio roof options for rain protection and natural light. Get a fast estimate and free measurement.',
    h1: 'Glass Patio Covers in Coquitlam',
    serviceType: 'Glass patio cover installation',
    areaServed: 'Coquitlam, British Columbia',
    intro:
      'Coquitlam patios can have varied slopes, elevations, and attachment conditions. A glass cover can work very well when you want the covered space to stay bright and open.',
    highlights: [
      'Bright rain protection for Coquitlam patios',
      'Useful for seating areas near rear doors and windows',
      'Compare glass, aluminum, and combo options',
      'Free Lower Mainland site measurement',
    ],
    localAngle:
      'From Burke Mountain to Maillardville and Austin Heights, site conditions can change quickly. Photos and rough dimensions help us prepare a more useful ballpark.',
    sections: [
      {
        h2: 'Why Coquitlam homeowners compare glass',
        body: 'Glass keeps light moving into the home and patio, which matters when the cover sits near windows or sliding doors.',
      },
      {
        h2: 'What affects cost',
        body: 'Glass type, roof size, attachment, post layout, drainage, and height all affect final price. A quick estimate helps you decide whether to continue to measurement.',
      },
    ],
    pricingNote:
      'Start with approximate width and projection. We can also compare a glass quote against aluminum if budget is still uncertain.',
    faqs: [
      {
        q: 'Do you serve Coquitlam and the Tri-Cities?',
        a: 'Yes, Coquitlam and nearby Tri-Cities areas are part of our service area.',
      },
      {
        q: 'Can glass work on a sloped lot?',
        a: 'Sometimes, but attachment and height details matter. The free measurement confirms what is realistic.',
      },
      {
        q: 'How much does a Coquitlam glass patio cover cost?',
        a: PRICING_COPY.glassOnly,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-coquitlam', label: 'Patio cover contractor in Coquitlam' },
      { path: '/patio-covers-coquitlam', label: 'Patio covers in Coquitlam' },
      { path: '/glass-vs-aluminum-patio-covers', label: 'Glass vs aluminum guide' },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Coquitlam glass patio cover after installation on a backyard patio',
      caption:
        'Coquitlam glass patio cover — tempered glass roof with black frame. Compare aluminum on the same size in chat.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  'sunrooms-burnaby': {
    id: 'sunrooms-burnaby',
    path: '/sunrooms-burnaby',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: 'Sunrooms Burnaby | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Burnaby — compare enclosed patio options, budget range, and free measurement. Fast rough estimate before a site visit.',
    h1: 'Sunrooms in Burnaby',
    serviceType: 'Sunroom installation',
    areaServed: 'Burnaby, British Columbia',
    intro:
      'A sunroom is a bigger step than an open patio cover, but it can make the transition between home and backyard more comfortable. Burnaby homeowners often compare sunrooms when they want a brighter enclosed space rather than just a roof.',
    highlights: [
      'Enclosed patio and sunroom options for Burnaby homes',
      'Compare budget against open patio covers',
      'Good for brighter sitting or hobby spaces',
      'Fast rough estimate before a free measurement',
    ],
    localAngle:
      'Burnaby homes vary widely in layout, so sunroom planning starts with the basics: size, attachment, existing patio condition, and how you want to use the space.',
    sections: [
      {
        h2: 'Sunroom vs patio cover',
        body: 'A patio cover mainly adds overhead protection. A sunroom adds enclosure, more glass, and more comfort planning, which usually means a higher investment.',
      },
      {
        h2: 'Why start with a rough estimate',
        body: 'Sunroom budgets can vary widely. A quick first range helps you decide whether to continue before spending time on detailed design decisions.',
      },
    ],
    pricingNote:
      'Share the approximate footprint and whether the area is already covered. We can compare a sunroom with a simpler patio cover option.',
    faqs: [
      {
        q: 'Are sunrooms more expensive than patio covers?',
        a: 'Usually yes. Sunrooms include more enclosure, glass, and planning than an open cover.',
      },
      {
        q: 'Can I get a Burnaby sunroom estimate online?',
        a: 'Yes. Chat gives a planning range first; your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: 'What is the rough sunroom pricing range?',
        a: PRICING_COPY.sunroomWallOnly,
      },
    ],
    caseStudy: {
      image: '/house/realprojects/sunroom-white.png',
      alt: 'White-framed sunroom enclosure with glass walls on a Lower Mainland home',
      caption:
        'Sunroom-style enclosed patio space — useful reference when comparing a sunroom budget against an open patio cover in Burnaby.',
    },
    relatedPageLinks: [
      { path: '/patio-cover-contractor-burnaby', label: 'Patio cover contractor in Burnaby' },
      { path: '/patio-covers-burnaby', label: 'Patio covers in Burnaby' },
    ],
  },
  'glass-burnaby': {
    id: 'glass-burnaby',
    path: '/glass-patio-covers-burnaby',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass Patio Covers Burnaby | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Burnaby — bright modern patio roofs for rain protection without losing natural light. Fast rough quote and free measurement.',
    h1: 'Glass Patio Covers in Burnaby',
    serviceType: 'Glass patio cover installation',
    areaServed: 'Burnaby, British Columbia',
    intro:
      'Glass patio covers are a strong option in Burnaby when you want rain protection but still care about daylight. They suit patios near kitchens, family rooms, and back doors where a solid roof might feel too dark.',
    highlights: [
      'Bright overhead rain protection for Burnaby patios',
      'Modern glass and black-frame design direction',
      'Useful comparison against aluminum patio covers',
      'Free measurement after your first ballpark estimate',
    ],
    localAngle:
      'Burnaby homes can have compact yards and windows close to the patio. Glass helps keep the back of the home brighter while adding a covered outdoor area.',
    sections: [
      {
        h2: 'When glass is worth the upgrade',
        body: 'Glass usually costs more than a basic aluminum cover, but it keeps the space brighter and can look more premium from inside the home.',
      },
      {
        h2: 'Details we check on site',
        body: 'Slope, drainage, glass layout, wall attachment, and nearby doors or windows all shape the final design and quote.',
      },
    ],
    pricingNote:
      'Share your Burnaby location, rough width, and projection. We can compare glass and aluminum so the budget difference is clear.',
    faqs: [
      {
        q: 'Are glass patio covers good for Burnaby homes?',
        a: 'Yes, especially when natural light is important. Proper slope, drainage, and attachment still need to be confirmed during measurement.',
      },
      {
        q: 'Can I compare glass and aluminum pricing?',
        a: 'Yes. We can ballpark both from the same approximate dimensions.',
      },
    ],
  },
  'glass-surrey': {
    id: 'glass-surrey',
    path: '/glass-patio-covers-surrey',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass Patio Covers Surrey | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Surrey — modern bright patio roof options for rain protection and outdoor living. Get a fast estimate and free site measurement.',
    h1: 'Glass Patio Covers in Surrey',
    serviceType: 'Glass patio cover installation',
    areaServed: 'Surrey, British Columbia',
    intro:
      'Surrey homeowners often have enough backyard space to make a glass patio cover feel like a real outdoor living upgrade. Glass works best when you want rain protection but still want the patio to feel open.',
    highlights: [
      'Bright patio cover options for Surrey backyards',
      'Premium look compared with basic solid covers',
      'Compare glass, aluminum, and skyline combo options',
      'Fast ballpark before a free site measurement',
    ],
    localAngle:
      'From South Surrey to Fleetwood and Cloverdale, patio sizes vary widely. A quick estimate helps compare glass against lower-cost aluminum before a site visit.',
    sections: [
      {
        h2: 'Why choose glass in Surrey',
        body: 'Glass is useful when the covered area is close to main living spaces and you want to protect the patio without blocking daylight.',
      },
      {
        h2: 'What affects the quote',
        body: 'Glass size, number of panels, support layout, attachment height, and drainage direction all affect the final number.',
      },
    ],
    pricingNote:
      'Send rough dimensions and whether you prefer maximum light or a balanced mix of shade. We can compare glass with combo systems too.',
    faqs: [
      {
        q: 'Do glass patio covers work in heavy rain?',
        a: 'Yes, if the cover is designed with proper slope, guttering, and attachment details.',
      },
      {
        q: 'Do you install glass covers across Surrey?',
        a: 'Yes, we serve Surrey broadly, including South Surrey, Cloverdale, Newton, Fleetwood, and Guildford.',
      },
    ],
  },
  'sunrooms-richmond': {
    id: 'sunrooms-richmond',
    path: '/sunrooms-richmond',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: 'Sunrooms Richmond | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Richmond BC — enclosed patio and glass room options. Compare sunroom budget vs patio covers with a fast rough estimate.',
    h1: 'Sunrooms in Richmond',
    serviceType: 'Sunroom installation',
    areaServed: 'Richmond, British Columbia',
    intro:
      'A sunroom can make a Richmond patio feel more usable through more of the year. It is a bigger investment than an open cover, so we start with a rough budget range before detailed design.',
    highlights: [
      'Enclosed patio and sunroom options in Richmond',
      'Compare sunroom budget against patio covers',
      'Good for brighter sitting or transition spaces',
      'Free measurement after the initial rough estimate',
    ],
    localAngle:
      'Richmond homes often have back patios or side spaces that can become more useful with enclosure. Site conditions, attachment, and drainage need to be reviewed before final pricing.',
    sections: [
      {
        h2: 'When to consider a sunroom',
        body: 'Choose a sunroom when you want more enclosure and comfort than a roof alone can provide. It can work well for sitting areas, hobby spaces, or protected transitions to the backyard.',
      },
      {
        h2: 'Budget before design',
        body: 'Because sunrooms can vary widely, the first step is understanding whether the project range makes sense. Final details come after measurement.',
      },
    ],
    pricingNote:
      'Share the approximate footprint and a few photos. We can compare a sunroom with simpler patio cover options if budget is uncertain.',
    faqs: [
      {
        q: 'Are sunrooms more expensive than patio covers?',
        a: 'Usually yes. Sunrooms add enclosure, more glass, and more planning than an open patio cover.',
      },
      {
        q: 'Can I get a Richmond sunroom estimate online?',
        a: 'Yes. The first estimate is a rough planning range, then a free measurement confirms final pricing.',
      },
    ],
  },
  'sunrooms-surrey': {
    id: 'sunrooms-surrey',
    path: '/sunrooms-surrey',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: 'Sunrooms Surrey | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Surrey — enclosed patio options for family spaces and backyard upgrades. Fast rough estimate before free site measurement.',
    h1: 'Sunrooms in Surrey',
    serviceType: 'Sunroom installation',
    areaServed: 'Surrey, British Columbia',
    intro:
      'Surrey homes often have larger patio areas that can support a more comfortable enclosed space. A sunroom is worth comparing when you want more than shade and rain protection.',
    highlights: [
      'Sunroom and patio enclosure options for Surrey homes',
      'Useful for larger family backyards',
      'Compare against open patio covers before deciding',
      'Fast rough estimate followed by free measurement',
    ],
    localAngle:
      'From South Surrey to Cloverdale and Fleetwood, lot sizes and patio layouts vary. A rough estimate helps decide whether a sunroom or simpler cover is the better next step.',
    sections: [
      {
        h2: 'Sunroom vs open patio cover',
        body: 'An open cover adds roof protection. A sunroom adds enclosure and a more room-like feel, which usually means a higher budget and more planning.',
      },
      {
        h2: 'What we need to estimate',
        body: 'Approximate size, photos, existing patio condition, and whether the area already has a cover help us create a more useful starting range.',
      },
    ],
    pricingNote:
      'Start with the size and how you plan to use the space. We can ballpark sunroom and patio cover directions in one conversation.',
    faqs: [
      {
        q: 'Do you build sunrooms in Surrey?',
        a: 'Yes, Surrey is part of our Lower Mainland service area.',
      },
      {
        q: 'Should I choose a sunroom or patio cover?',
        a: 'If you mainly need rain protection, start with a patio cover. If you want more enclosure and comfort, compare a sunroom.',
      },
    ],
  },
  'contractor-vancouver': {
    id: 'contractor-vancouver',
    path: '/patio-cover-contractor-vancouver',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Vancouver | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Vancouver? Compare aluminum, glass, skyline combo, and sunroom options with a fast rough quote and free measurement.',
    h1: 'Patio Cover Contractor in Vancouver',
    serviceType: 'Patio cover contractor',
    areaServed: 'Vancouver, British Columbia',
    intro:
      'If you are searching for a patio cover contractor in Vancouver, you probably want a clear path from rough price to measured final quote. LoomiHome helps you compare cover types first, then book a free on-site measurement when the range makes sense.',
    highlights: [
      'Fast rough quote before a sales appointment',
      'Compare aluminum, glass, skyline combo, and sunroom options',
      'Local Lower Mainland team for Vancouver-area homes',
      'Free on-site measurement for final pricing',
    ],
    localAngle:
      'Vancouver homes vary by neighbourhood, lot shape, and attachment conditions. A rough online estimate saves time before a contractor visit.',
    sections: [
      {
        h2: 'What a good contractor quote should clarify',
        body: 'A useful quote should explain product direction, approximate size, attachment assumptions, drainage, and what still needs to be confirmed on site.',
      },
      {
        h2: 'Why start online',
        body: 'Starting with a ballpark helps you avoid booking multiple appointments before you know whether the project fits your budget.',
      },
    ],
    pricingNote:
      'Send your city, rough dimensions, and preferred cover type. We will give a starting range before booking a free measurement.',
    faqs: [
      {
        q: 'Do you provide patio cover quotes in Vancouver?',
        a: 'Yes. Start with a fast rough estimate in chat, then book a free on-site measurement for your formal quote.',
      },
      {
        q: 'What patio cover types can I compare?',
        a: 'You can compare aluminum, glass, skyline combo, and sunroom directions before choosing what to measure.',
      },
      {
        q: 'How much does a Vancouver patio cover usually cost?',
        a: PRICING_COPY.aluminumGlassCompare,
      },
    ],
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Finished glass patio cover installation on a Vancouver-area backyard patio',
      caption:
        'Vancouver glass patio cover project — tempered glass roof with black frame. Get a similar rough range in chat, then book a free measurement.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-vancouver', label: 'Patio covers in Vancouver' },
      { path: '/glass-patio-covers-vancouver', label: 'Glass patio covers in Vancouver' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
    ],
  },
  'installer-vancouver': {
    id: 'installer-vancouver',
    path: '/patio-cover-installer-vancouver',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Vancouver | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Vancouver BC — aluminum, glass, combo covers, and sunrooms. Fast rough estimate in ~60 seconds and free measurement.',
    h1: 'Patio Cover Installer in Vancouver',
    serviceType: 'Patio cover installation',
    areaServed: 'Vancouver, British Columbia',
    intro:
      'Searching for patio cover installers near you in Vancouver? Start with a fast rough estimate in chat — about a minute — compare aluminum, glass, skyline combo, and sunroom options, then book a free on-site measurement when the range makes sense.',
    highlights: [
      'Patio cover installation for Vancouver and nearby cities',
      'Compare product types before anyone visits your home',
      'Built for Lower Mainland rain and coastal weather',
      'Free measurement for final installation pricing',
    ],
    localAngle:
      'From Kitsilano to East Van to the North Shore, Vancouver patios vary in size, slope, and attachment. A ballpark online saves time before an installer visit.',
    sections: [
      {
        h2: 'What affects installation price in Vancouver',
        body: 'Width, projection, attachment height, posts, drainage, access, and cover type all shape the final installed price. We explain assumptions clearly after your rough estimate.',
      },
      {
        h2: 'Why compare installers with a range first',
        body: 'A useful starting budget helps you decide whether aluminum, glass, combo, or a sunroom fits before booking multiple contractor appointments.',
      },
    ],
    pricingNote:
      'Share your Vancouver neighbourhood, approximate dimensions, and preferred cover type. We will give a starting range before the free measurement visit.',
    faqs: [
      {
        q: 'Do you install patio covers in Vancouver?',
        a: 'Yes — Vancouver and the wider Lower Mainland are our primary service area. Start with a fast online estimate, then book a free on-site measurement.',
      },
      {
        q: 'Can I find patio cover installers near me without calling multiple companies?',
        a: 'Yes. Chat gives a rough range in about a minute. If it fits your budget, we measure on site for free and tighten the quote.',
      },
      {
        q: 'What patio cover types do you install?',
        a: 'Aluminum, glass, skyline combo, and sunroom directions — we help you compare before finalizing installation details.',
      },
    ],
  },
  'installer-richmond': {
    id: 'installer-richmond',
    path: '/patio-cover-installer-richmond',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Richmond | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Richmond BC — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.',
    h1: 'Patio Cover Installer in Richmond',
    serviceType: 'Patio cover installation',
    areaServed: 'Richmond, British Columbia',
    intro:
      'Richmond homeowners looking for a patio cover installer often need practical answers first: what type fits, what it might cost, and whether the site is suitable. We start with a rough estimate, then confirm details during a free measurement.',
    highlights: [
      'Patio cover installation options in Richmond',
      'Compare aluminum, glass, combo, and sunroom paths',
      'Helpful for back patios, side yards, and carport-style spaces',
      'Fast ballpark followed by free measurement',
    ],
    localAngle:
      'Richmond homes can have flat lots, side driveways, and coastal weather exposure. Installation details like drainage, clearance, and attachment matter for the final quote.',
    sections: [
      {
        h2: 'Installation process in Richmond',
        body: 'Post placement, wall attachment, roof slope, gutter direction, access, and clearance all shape a proper patio cover installation.',
      },
      {
        h2: 'Estimate first, install planning second',
        body: 'The first estimate helps you decide whether the project is worth measuring. The site visit handles the practical installation details.',
      },
    ],
    pricingNote:
      'Share rough dimensions and one or two photos. We can ballpark the likely product direction before a Richmond site visit.',
    faqs: [
      {
        q: 'Do you install patio covers in Richmond?',
        a: 'Yes, we serve Richmond and nearby Lower Mainland cities.',
      },
      {
        q: 'Can you install glass and aluminum covers?',
        a: 'We help homeowners compare aluminum, glass, skyline combo, and sunroom options before final measurement.',
      },
    ],
  },
  'aluminum-delta': {
    id: 'aluminum-delta',
    path: '/aluminum-patio-covers-delta',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Aluminum Patio Covers Delta | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Delta BC — practical rain protection for patios, side yards, and carport-style spaces. Fast quote and free measurement.',
    h1: 'Aluminum Patio Covers in Delta',
    serviceType: 'Aluminum patio cover installation',
    areaServed: 'Delta, British Columbia',
    intro:
      'Delta homeowners often want a durable patio cover that handles rain, wind exposure, and everyday family use. Aluminum is a practical starting point when you want dependable coverage with a clear budget range.',
    highlights: [
      'Low-maintenance aluminum patio covers for Delta homes',
      'Good fit for patios, back doors, and side-yard covers',
      'Fast rough estimate before a site visit',
      'Free measurement for final quote details',
    ],
    localAngle:
      'From Ladner to Tsawwassen and North Delta, exposure and lot layout can change the design. Photos and rough dimensions help us prepare a better first estimate.',
    sections: [
      {
        h2: 'Why aluminum is a strong Delta option',
        body: 'Aluminum offers practical rain protection without the higher cost of full glass. It works well when coverage, drainage, and maintenance matter most.',
      },
      {
        h2: 'What we confirm before final pricing',
        body: 'Post placement, attachment height, roof projection, gutter direction, and access all affect the final number. The site visit confirms those details.',
      },
    ],
    pricingNote:
      'Start with rough width, projection, and your Delta neighbourhood. We can also compare aluminum with glass if light is important.',
    faqs: [
      {
        q: 'Do you install aluminum patio covers in Delta?',
        a: 'Yes, Delta is part of our Lower Mainland service area.',
      },
      {
        q: 'Can aluminum work for a side-yard cover?',
        a: 'Often yes, depending on clearance, drainage, and attachment. We confirm those details during measurement.',
      },
      {
        q: 'How much does a Delta aluminum patio cover cost?',
        a: PRICING_COPY.aluminumOnly,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-delta', label: 'Patio cover contractor in Delta' },
      { path: '/patio-covers-delta', label: 'Patio covers in Delta' },
      { path: '/best-patio-cover-for-rain-vancouver', label: 'Best cover for rain guide' },
    ],
    caseStudy: {
      image: '/house/before-after/delta-aluminum-after.png',
      alt: 'Delta aluminum patio cover providing rain protection on a side-yard patio',
      caption:
        'Delta aluminum cover — practical rain protection for Ladner, Tsawwassen, and North Delta patios. Compare glass in chat on the same size.',
      projectPath: '/projects/delta-aluminum-patio-cover',
    },
  },
  'aluminum-coquitlam': {
    id: 'aluminum-coquitlam',
    path: '/aluminum-patio-covers-coquitlam',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Aluminum Patio Covers Coquitlam | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Coquitlam — rain-ready, low-maintenance covers for back patios and family spaces. Fast rough quote and free measurement.',
    h1: 'Aluminum Patio Covers in Coquitlam',
    serviceType: 'Aluminum patio cover installation',
    areaServed: 'Coquitlam, British Columbia',
    intro:
      'Coquitlam homes can have sloped lots, raised decks, and varied patio layouts. Aluminum is a dependable first option when you want rain protection and cost control before comparing premium choices.',
    highlights: [
      'Practical rain protection for Coquitlam patios',
      'Lower-maintenance alternative to wood covers',
      'Compare aluminum, glass, and combo options',
      'Fast ballpark before free site measurement',
    ],
    localAngle:
      'In areas like Burke Mountain, Maillardville, and Austin Heights, attachment and height can vary. A few photos help shape a realistic first estimate.',
    sections: [
      {
        h2: 'Good fit for everyday outdoor space',
        body: 'Aluminum covers are usually chosen when the goal is a dry, usable patio with a straightforward design and manageable budget.',
      },
      {
        h2: 'Site details matter in Coquitlam',
        body: 'Slope, elevation, deck structure, wall attachment, and drainage can all affect the final quote. We use measurement to verify those details.',
      },
    ],
    pricingNote:
      'Send approximate dimensions and whether the cover is over a patio, deck, or side walkway. That helps make the first range useful.',
    faqs: [
      {
        q: 'Do you install aluminum patio covers in Coquitlam?',
        a: 'Yes, we serve Coquitlam and nearby Tri-Cities areas.',
      },
      {
        q: 'Is aluminum cheaper than glass?',
        a: 'Usually yes. Aluminum is often the practical starting point when budget and rain protection are the main priorities.',
      },
    ],
  },
  'glass-delta': {
    id: 'glass-delta',
    path: '/glass-patio-covers-delta',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass Patio Covers Delta | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Delta BC — bright, modern rain protection for patios and back doors. Compare glass vs aluminum with a fast estimate.',
    h1: 'Glass Patio Covers in Delta',
    serviceType: 'Glass patio cover installation',
    areaServed: 'Delta, British Columbia',
    intro:
      'Glass patio covers are worth comparing in Delta when the covered area sits near main windows or doors. They add rain protection while helping the patio and indoor space stay brighter.',
    highlights: [
      'Bright glass patio roof options for Delta homes',
      'Modern look for back patios and outdoor seating',
      'Compare glass and aluminum budget ranges',
      'Free measurement after the first estimate',
    ],
    localAngle:
      'Delta homes can face different exposure depending on neighbourhood and lot position. Proper slope and drainage are important for a glass cover to perform well.',
    sections: [
      {
        h2: 'When glass makes sense',
        body: 'Glass is usually selected when daylight and appearance matter. It can feel more open than a solid cover, especially near kitchens and family rooms.',
      },
      {
        h2: 'What affects glass pricing',
        body: 'Panel layout, span, support posts, attachment height, glass type, and drainage direction all affect the final quote.',
      },
    ],
    pricingNote:
      'Share your rough dimensions and whether you want maximum light. We can compare glass against aluminum before booking a site visit.',
    faqs: [
      {
        q: 'Do glass patio covers work in Delta rain?',
        a: 'Yes, when designed with proper slope, guttering, and attachment details.',
      },
      {
        q: 'Is glass always the best patio cover choice?',
        a: 'Not always. Glass is best when light and appearance are priorities; aluminum may be better for a lower budget.',
      },
      {
        q: 'How much does a Delta glass patio cover cost?',
        a: PRICING_COPY.glassAluminumSameSize,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-delta', label: 'Patio cover contractor in Delta' },
      { path: '/aluminum-patio-covers-delta', label: 'Aluminum patio covers in Delta' },
      { path: '/glass-vs-aluminum-patio-covers', label: 'Glass vs aluminum guide' },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover after installation with tempered glass roof and black frame',
      caption:
        'Glass patio cover — bright rain protection for patios near rear doors and windows. Compare aluminum on the same footprint in chat.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  'sunrooms-coquitlam': {
    id: 'sunrooms-coquitlam',
    path: '/sunrooms-coquitlam',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: 'Sunrooms Coquitlam | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Coquitlam — enclosed patio and glass room options for brighter usable space. Fast rough estimate and free measurement.',
    h1: 'Sunrooms in Coquitlam',
    serviceType: 'Sunroom installation',
    areaServed: 'Coquitlam, British Columbia',
    intro:
      'A sunroom can make a Coquitlam patio feel more comfortable and usable than an open cover alone. Because site conditions vary, we start with a rough range before deeper planning.',
    highlights: [
      'Sunroom and patio enclosure options in Coquitlam',
      'Compare enclosed space against open patio covers',
      'Useful for brighter sitting or hobby spaces',
      'Fast estimate before free site measurement',
    ],
    localAngle:
      'Coquitlam properties may involve slopes, decks, and different attachment heights. A measured visit confirms what type of enclosure is realistic.',
    sections: [
      {
        h2: 'Sunroom planning starts with use',
        body: 'How you plan to use the space affects the direction. A casual sitting area, hobby room, or enclosed transition space can lead to different budgets.',
      },
      {
        h2: 'Why the first quote is a range',
        body: 'Sunroom pricing depends heavily on size, enclosure level, glass, existing structure, and site access. The first estimate helps decide whether to continue.',
      },
    ],
    pricingNote:
      'Send the approximate footprint and photos of the current patio or deck. We can compare sunroom and patio cover options.',
    faqs: [
      {
        q: 'Do you build sunrooms in Coquitlam?',
        a: 'Yes, Coquitlam is part of our Lower Mainland service area.',
      },
      {
        q: 'Can a sunroom go over an existing patio?',
        a: 'Sometimes, but the existing surface, attachment, drainage, and structure need to be checked during measurement.',
      },
      {
        q: 'What is the rough sunroom pricing range?',
        a: PRICING_COPY.sunroomWallOnly,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-coquitlam', label: 'Patio cover contractor in Coquitlam' },
      { path: '/patio-covers-coquitlam', label: 'Patio covers in Coquitlam' },
      { path: '/sunrooms-burnaby', label: 'Sunrooms in Burnaby' },
    ],
    caseStudy: {
      image: '/house/realprojects/sunroom-white.png',
      alt: 'White-framed sunroom enclosure with glass walls on a Lower Mainland home',
      caption:
        'Sunroom-style enclosed patio — compare sunroom budget against an open patio cover before booking free measurement.',
    },
  },
  'contractor-burnaby': {
    id: 'contractor-burnaby',
    path: '/patio-cover-contractor-burnaby',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Burnaby | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Burnaby? Compare aluminum, glass, combo, and sunroom options with a fast quote and free measurement.',
    h1: 'Patio Cover Contractor in Burnaby',
    serviceType: 'Patio cover contractor',
    areaServed: 'Burnaby, British Columbia',
    intro:
      'If you are comparing patio cover contractors in Burnaby, the first useful step is a clear budget range. LoomiHome helps you compare material options before booking a free on-site measurement.',
    highlights: [
      'Fast rough patio cover quote for Burnaby homes',
      'Compare aluminum, glass, combo, and sunroom options',
      'Useful for patios, back doors, and side-yard layouts',
      'Free measurement for final contractor pricing',
    ],
    localAngle:
      'Burnaby homes range from tight urban patios to larger suburban yards. A few measurements and photos help us make the first contractor estimate more realistic.',
    sections: [
      {
        h2: 'What to ask a patio cover contractor',
        body: 'Ask how the cover attaches, how rain drains, where posts land, and what assumptions are included in the first price range.',
      },
      {
        h2: 'Why compare options first',
        body: 'Aluminum, glass, combo, and sunroom projects can have very different budgets. Comparing early keeps the site visit focused.',
      },
    ],
    pricingNote:
      'Share your Burnaby neighbourhood and rough patio size. We will give a starting range before the measured quote.',
    faqs: [
      {
        q: 'Do you provide patio cover contractor quotes in Burnaby?',
        a: 'Yes. Start with a rough online quote in chat, then book a free measurement if the range works.',
      },
      {
        q: 'Can I compare different patio cover types?',
        a: 'Yes. We can compare aluminum, glass, skyline combo, and sunroom directions.',
      },
      {
        q: 'Is the online contractor quote final?',
        a: 'No — chat gives a planning range only. Your formal contractor quote is confirmed after free on-site measurement.',
      },
      {
        q: 'Which Burnaby neighbourhoods do you serve?',
        a: 'Metrotown, Brentwood, Deer Lake, Edmonds, Capitol Hill, and surrounding Burnaby areas — same fast estimate flow for each.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-burnaby', label: 'Patio covers in Burnaby' },
      { path: '/aluminum-patio-covers-burnaby', label: 'Aluminum patio covers in Burnaby' },
      { path: '/sunrooms-burnaby', label: 'Sunrooms in Burnaby' },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Burnaby aluminum patio cover after installation with black frame over backyard patio',
      caption:
        'Burnaby aluminum patio cover — approx. 24×20 ft backyard cover for rain protection and everyday use.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
  },
  'installer-surrey': {
    id: 'installer-surrey',
    path: '/patio-cover-installer-surrey',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Surrey | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Surrey — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.',
    h1: 'Patio Cover Installer in Surrey',
    serviceType: 'Patio cover installation',
    areaServed: 'Surrey, British Columbia',
    intro:
      'Surrey homeowners searching for a patio cover installer often want a practical price range before scheduling a visit. We help compare the main cover types and then confirm installation details on site.',
    highlights: [
      'Patio cover installation options across Surrey',
      'Compare aluminum, glass, combo, and sunroom projects',
      'Good for larger back patios and family spaces',
      'Fast rough estimate followed by free measurement',
    ],
    localAngle:
      'Surrey includes compact townhome patios and larger detached-home yards. Installation details like span, post placement, and drainage change with the site.',
    sections: [
      {
        h2: 'Installation details that change the quote',
        body: 'Width, projection, attachment height, posts, access, drainage, and cover type all shape the final installation price.',
      },
      {
        h2: 'Estimate before site visit',
        body: 'A first ballpark helps you decide whether aluminum, glass, combo, or a sunroom is the right direction before measuring.',
      },
    ],
    pricingNote:
      'Send your Surrey area and approximate dimensions. We can give a useful starting range before the free measurement.',
    faqs: [
      {
        q: 'Do you install patio covers in Surrey?',
        a: 'Yes, we serve Surrey broadly, including South Surrey, Cloverdale, Newton, Fleetwood, and Guildford.',
      },
      {
        q: 'Can I get an installation estimate online?',
        a: 'Yes. The online estimate is a starting range; final installation pricing comes after measurement.',
      },
      {
        q: 'Which Surrey areas do you install in most often?',
        a: 'Guildford, Cloverdale, Newton, Fleetwood, and South Surrey — townhome patios to larger detached-home yards.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-surrey', label: 'Patio cover contractor in Surrey' },
      { path: '/skyline-combo-patio-covers-surrey', label: 'Skyline combo covers in Surrey' },
      { path: '/how-long-does-patio-cover-installation-take', label: 'Installation timeline guide' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Surrey skyline combo patio cover after installation on a large backyard',
      caption:
        'Surrey skyline combo install — larger backyard layout. Chat ballpark first, then free measurement for install planning.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'contractor-richmond': {
    id: 'contractor-richmond',
    path: '/patio-cover-contractor-richmond',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Richmond | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Richmond BC? Compare aluminum, glass, combo, and sunroom options with a fast rough quote and free measurement.',
    h1: 'Patio Cover Contractor in Richmond',
    serviceType: 'Patio cover contractor',
    areaServed: 'Richmond, British Columbia',
    intro:
      'If you are comparing patio cover contractors in Richmond, the most useful first step is a clear budget range. LoomiHome helps you compare cover types before booking a free on-site measurement, so you are not guessing on price.',
    highlights: [
      'Fast rough patio cover quote for Richmond homes',
      'Compare aluminum, glass, skyline combo, and sunroom options',
      'Useful for flat lots, side driveways, and back patios',
      'Free on-site measurement for final contractor pricing',
    ],
    localAngle:
      'Richmond is mostly flat with coastal exposure, so drainage direction and wind matter on many lots. From Steveston to Broadmoor and East Cambie, rough dimensions and a photo help shape a realistic first estimate.',
    sections: [
      {
        h2: 'What a Richmond contractor quote should clarify',
        body: 'A useful quote should explain product direction, approximate size, wall attachment, drainage, and what still needs to be confirmed on site. That keeps the final price from drifting later.',
      },
      {
        h2: 'Why start with a ballpark',
        body: 'Starting online helps you avoid booking several appointments before you know whether the project fits your budget. If the range works, the measured visit handles the rest.',
      },
    ],
    pricingNote:
      'Send your Richmond neighbourhood, rough dimensions, and preferred cover type. We will give a starting range before booking a free measurement.',
    faqs: [
      {
        q: 'Do you provide patio cover contractor quotes in Richmond?',
        a: 'Yes. Start with a fast rough quote in chat, then book a free on-site measurement if the range works.',
      },
      {
        q: 'What patio cover types can I compare?',
        a: 'You can compare aluminum, glass, skyline combo, and sunroom directions before choosing what to measure.',
      },
      {
        q: 'Why get a ballpark before booking a Richmond contractor visit?',
        a: 'A planning range helps you filter contractors and product types before spending an evening on appointments that may not fit your budget.',
      },
      {
        q: 'Which Richmond areas do you quote most often?',
        a: 'Steveston, Broadmoor, East Cambie, Burkeville, and City Centre — flat lots and side-yard patios are common. Share your neighbourhood in chat for a faster ballpark.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-richmond', label: 'Patio covers in Richmond' },
      { path: '/glass-patio-covers-richmond', label: 'Glass patio covers in Richmond' },
    ],
    caseStudy: {
      image: '/house/before-after/richmond-carport-after.png',
      alt: 'Richmond aluminum carport-style patio cover with black frame after installation',
      caption:
        'Richmond carport-style aluminum cover — practical rain protection for side-yard and patio layouts common on flat Richmond lots.',
      projectPath: '/projects/richmond-aluminum-carport-cover',
    },
  },
  'contractor-surrey': {
    id: 'contractor-surrey',
    path: '/patio-cover-contractor-surrey',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Surrey | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Surrey? Compare aluminum, glass, combo, and sunroom options with a fast rough quote and free on-site measurement.',
    h1: 'Patio Cover Contractor in Surrey',
    serviceType: 'Patio cover contractor',
    areaServed: 'Surrey, British Columbia',
    intro:
      'Surrey homeowners comparing patio cover contractors usually want a price range before scheduling a visit. LoomiHome lets you compare material options first, then book a free measurement once the budget direction makes sense.',
    highlights: [
      'Fast rough patio cover quote for Surrey homes',
      'Compare aluminum, glass, skyline combo, and sunroom options',
      'Good for larger family backyards and townhome patios',
      'Free on-site measurement for final contractor pricing',
    ],
    localAngle:
      'Surrey ranges from compact townhome patios to wide detached-home yards across South Surrey, Cloverdale, Newton, Fleetwood, and Guildford. A few details up front make the first contractor estimate more accurate.',
    sections: [
      {
        h2: 'What to ask a Surrey patio cover contractor',
        body: 'Ask how the cover attaches, how rain drains, where posts land, and what assumptions are built into the first price range. Clear answers early prevent surprises later.',
      },
      {
        h2: 'Why compare options first',
        body: 'Aluminum, glass, combo, and sunroom projects can have very different budgets. Comparing early keeps the site visit focused on the direction you actually want.',
      },
    ],
    pricingNote:
      'Share your Surrey area and rough patio size. We will give a starting range before the measured quote.',
    faqs: [
      {
        q: 'Do you provide patio cover contractor quotes in Surrey?',
        a: 'Yes. Start with a rough online quote in chat, then book a free measurement if the range works.',
      },
      {
        q: 'Can I compare different patio cover types?',
        a: 'Yes. We can compare aluminum, glass, skyline combo, and sunroom directions before measuring.',
      },
      {
        q: 'Is the online Surrey contractor quote final?',
        a: 'No — chat gives a planning range only. Your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: 'Which Surrey areas do you serve?',
        a: 'Guildford, Cloverdale, Newton, Fleetwood, South Surrey, and surrounding areas — from townhome patios to larger detached-home yards.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-surrey', label: 'Patio covers in Surrey' },
      { path: '/skyline-combo-patio-covers-surrey', label: 'Skyline combo covers in Surrey' },
      { path: '/aluminum-patio-covers-surrey', label: 'Aluminum patio covers in Surrey' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Surrey skyline combo patio cover after installation with glass and V-panel sections',
      caption:
        'Surrey skyline combo project — approx. 12×26 ft cover balancing shade and natural light on a larger backyard patio.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'contractor-coquitlam': {
    id: 'contractor-coquitlam',
    path: '/patio-cover-contractor-coquitlam',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Coquitlam | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Coquitlam? Compare aluminum, glass, combo, and sunroom options with a fast rough quote and free measurement.',
    h1: 'Patio Cover Contractor in Coquitlam',
    serviceType: 'Patio cover contractor',
    areaServed: 'Coquitlam, British Columbia',
    intro:
      'If you are looking for a patio cover contractor in Coquitlam, sloped lots and raised decks make a clear plan important. LoomiHome helps you compare cover types and get a rough budget before a free on-site measurement.',
    highlights: [
      'Fast rough patio cover quote for Coquitlam homes',
      'Compare aluminum, glass, skyline combo, and sunroom options',
      'Useful for sloped lots, raised decks, and Tri-Cities yards',
      'Free on-site measurement for final contractor pricing',
    ],
    localAngle:
      'Coquitlam properties from Burke Mountain to Maillardville and Austin Heights can involve slopes, elevation changes, and varied attachment heights. Photos help us judge what is realistic before a visit.',
    sections: [
      {
        h2: 'What a Coquitlam contractor quote should cover',
        body: 'A useful quote should explain attachment height, post placement on sloped ground, drainage, and any deck structure that affects the build. Those details drive the real price.',
      },
      {
        h2: 'Why start online first',
        body: 'A rough range helps you decide whether to keep going before booking appointments. If the budget works, the measured visit confirms the structural details.',
      },
    ],
    pricingNote:
      'Send your Coquitlam neighbourhood, rough size, and whether the cover is over a patio, deck, or walkway. We will give a starting range first.',
    faqs: [
      {
        q: 'Do you provide patio cover contractor quotes in Coquitlam?',
        a: 'Yes. Start with a rough online quote in chat, then book a free measurement if the range works.',
      },
      {
        q: 'Can you cover a raised deck?',
        a: 'Often yes, but the deck structure, attachment, and clearance need to be checked during measurement.',
      },
      {
        q: 'Is the online Coquitlam contractor quote final?',
        a: 'No — chat gives a planning range only. Your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: 'Which Coquitlam neighbourhoods do you quote?',
        a: 'Burke Mountain, Westwood Plateau, Maillardville, Austin Heights, and surrounding Tri-Cities areas — sloped lots and raised decks are common.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-coquitlam', label: 'Patio covers in Coquitlam' },
      { path: '/glass-patio-covers-coquitlam', label: 'Glass patio covers in Coquitlam' },
      { path: '/aluminum-patio-covers-coquitlam', label: 'Aluminum patio covers in Coquitlam' },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Coquitlam glass patio cover after installation with black frame and tempered glass roof',
      caption:
        'Coquitlam glass patio cover example — bright overhead rain protection on a sloped-lot backyard patio.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  'installer-burnaby': {
    id: 'installer-burnaby',
    path: '/patio-cover-installer-burnaby',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Burnaby | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Burnaby — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.',
    h1: 'Patio Cover Installer in Burnaby',
    serviceType: 'Patio cover installation',
    areaServed: 'Burnaby, British Columbia',
    intro:
      'Burnaby homeowners searching for a patio cover installer usually want practical answers first: what type fits, what it might cost, and whether the site works. We start with a rough estimate, then confirm details during a free measurement.',
    highlights: [
      'Patio cover installation options across Burnaby',
      'Compare aluminum, glass, combo, and sunroom paths',
      'Good for tight urban patios and larger suburban yards',
      'Fast ballpark followed by free measurement',
    ],
    localAngle:
      'Burnaby homes range from compact Metrotown-area yards to wider Deer Lake and North Burnaby spaces. Attachment height and clearance often change with the home, so site details matter.',
    sections: [
      {
        h2: 'Installation details that matter in Burnaby',
        body: 'Post placement, wall attachment, roof slope, gutter direction, access, and clearance all shape a proper patio cover installation and the final quote.',
      },
      {
        h2: 'Estimate first, install planning second',
        body: 'The first estimate helps you decide whether the project is worth measuring. The site visit handles the practical installation details and confirms pricing.',
      },
    ],
    pricingNote:
      'Share rough dimensions and one or two photos. We can ballpark the likely product direction before a Burnaby site visit.',
    faqs: [
      {
        q: 'Do you install patio covers in Burnaby?',
        a: 'Yes, Burnaby is one of our main Lower Mainland service areas.',
      },
      {
        q: 'Can you install glass and aluminum covers?',
        a: 'Yes. We help homeowners compare aluminum, glass, skyline combo, and sunroom options before final measurement.',
      },
      {
        q: 'Is the online Burnaby installation estimate final?',
        a: 'No — chat gives a planning range only. Final installation pricing is confirmed after free on-site measurement.',
      },
      {
        q: 'Which Burnaby areas do you install in most often?',
        a: 'Metrotown, Brentwood, Deer Lake, and North Burnaby — from compact patios to larger suburban yards.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-burnaby', label: 'Patio cover contractor in Burnaby' },
      { path: '/aluminum-patio-covers-burnaby', label: 'Aluminum patio covers in Burnaby' },
      { path: '/how-long-does-patio-cover-installation-take', label: 'Installation timeline guide' },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Burnaby aluminum patio cover after installation on a backyard patio',
      caption:
        'Burnaby aluminum install — chat ballpark first, free measurement second, then scheduling once materials arrive.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
  },
  'installer-coquitlam': {
    id: 'installer-coquitlam',
    path: '/patio-cover-installer-coquitlam',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Coquitlam | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Coquitlam — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.',
    h1: 'Patio Cover Installer in Coquitlam',
    serviceType: 'Patio cover installation',
    areaServed: 'Coquitlam, British Columbia',
    intro:
      'Coquitlam homeowners looking for a patio cover installer often need to know whether a sloped lot or raised deck changes the plan. We start with a rough estimate, then confirm the structural details during a free measurement.',
    highlights: [
      'Patio cover installation options across Coquitlam',
      'Compare aluminum, glass, combo, and sunroom paths',
      'Helpful for sloped lots, decks, and Tri-Cities homes',
      'Fast ballpark followed by free measurement',
    ],
    localAngle:
      'In areas like Burke Mountain, Maillardville, and Austin Heights, elevation, deck structure, and attachment height can change the install. A few photos help shape a realistic first estimate.',
    sections: [
      {
        h2: 'Installation details that change the quote',
        body: 'Post placement on sloped ground, deck structure, attachment height, roof slope, drainage, and access all affect a Coquitlam patio cover installation.',
      },
      {
        h2: 'Estimate before the site visit',
        body: 'A first ballpark helps you decide whether aluminum, glass, combo, or a sunroom is the right direction before measuring.',
      },
    ],
    pricingNote:
      'Send your Coquitlam area, rough dimensions, and whether the cover is over a patio or deck. We can ballpark the likely direction first.',
    faqs: [
      {
        q: 'Do you install patio covers in Coquitlam?',
        a: 'Yes, we serve Coquitlam and nearby Tri-Cities areas.',
      },
      {
        q: 'Can you install a cover over a raised deck?',
        a: 'Often yes, but the deck structure, attachment, and clearance need to be confirmed during measurement.',
      },
      {
        q: 'Is the online Coquitlam installation estimate final?',
        a: 'No — chat gives a planning range only. Final installation pricing is confirmed after free on-site measurement.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-coquitlam', label: 'Patio cover contractor in Coquitlam' },
      { path: '/glass-patio-covers-coquitlam', label: 'Glass patio covers in Coquitlam' },
      { path: '/how-long-does-patio-cover-installation-take', label: 'Installation timeline guide' },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Coquitlam glass patio cover after installation on a sloped-lot backyard',
      caption:
        'Coquitlam glass install — sloped lots and raised decks confirmed during free measurement before final pricing.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  'sunrooms-delta': {
    id: 'sunrooms-delta',
    path: '/sunrooms-delta',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: 'Sunrooms Delta | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Delta BC — enclosed patio and glass room options for brighter, more usable space. Fast rough estimate and free site measurement.',
    h1: 'Sunrooms in Delta',
    serviceType: 'Sunroom installation',
    areaServed: 'Delta, British Columbia',
    intro:
      'A sunroom can make a Delta patio comfortable through more of the year. It is a bigger investment than an open cover, so we start with a rough budget range before moving into detailed design.',
    highlights: [
      'Enclosed patio and sunroom options in Delta',
      'Compare sunroom budget against open patio covers',
      'Good for brighter sitting or transition spaces',
      'Free measurement after the initial rough estimate',
    ],
    localAngle:
      'From Ladner to Tsawwassen and North Delta, exposure and lot layout vary, and coastal wind can matter near the water. Site conditions, attachment, and drainage need to be reviewed before final pricing.',
    sections: [
      {
        h2: 'When to consider a sunroom',
        body: 'Choose a sunroom when you want more enclosure and comfort than a roof alone provides. It can work well for sitting areas, hobby spaces, or a protected transition to the backyard.',
      },
      {
        h2: 'Budget before design',
        body: 'Because sunrooms vary widely, the first step is understanding whether the project range makes sense. Final details come after measurement.',
      },
    ],
    pricingNote:
      'Share the approximate footprint and a few photos. We can compare a sunroom with simpler patio cover options if budget is uncertain.',
    faqs: [
      {
        q: 'Are sunrooms more expensive than patio covers?',
        a: 'Usually yes. Sunrooms add enclosure, more glass, and more planning than an open patio cover.',
      },
      {
        q: 'Can I get a Delta sunroom estimate online?',
        a: 'Yes. The first estimate is a rough planning range, then a free measurement confirms final pricing.',
      },
      {
        q: 'What is the rough sunroom pricing range?',
        a: PRICING_COPY.sunroomWallOnly,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-delta', label: 'Patio cover contractor in Delta' },
      { path: '/aluminum-patio-covers-delta', label: 'Aluminum patio covers in Delta' },
      { path: '/sunrooms-burnaby', label: 'Sunrooms in Burnaby' },
    ],
    caseStudy: {
      image: '/house/realprojects/sunroom-white.png',
      alt: 'White-framed sunroom enclosure with glass walls on a Lower Mainland home',
      caption:
        'Sunroom enclosure reference — useful when comparing enclosed space against an open aluminum or glass patio cover in Delta.',
    },
  },
  'aluminum-langley': {
    id: 'aluminum-langley',
    path: '/aluminum-patio-covers-langley',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Aluminum Patio Covers Langley | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Langley — durable, low-maintenance rain protection for larger backyards and newer subdivisions. Fast rough quote and free measurement.',
    h1: 'Aluminum Patio Covers in Langley',
    serviceType: 'Aluminum patio cover installation',
    areaServed: 'Langley, British Columbia',
    intro:
      'Langley homes often have generous backyards and newer decks that suit a full-size patio cover. Aluminum is usually the first option to compare when you want strong rain protection, low maintenance, and a clear budget range.',
    highlights: [
      'Practical rain protection for larger Langley backyards',
      'Low-maintenance aluminum covers for decks and patios',
      'Good fit for Willoughby, Walnut Grove, and Brookswood homes',
      'Fast ballpark before a free on-site measurement',
    ],
    localAngle:
      'From the newer Willoughby and Walnut Grove subdivisions to established Murrayville, Brookswood, and Fort Langley properties, lot sizes and deck setups vary a lot. Rough dimensions and a photo help shape a useful first estimate.',
    sections: [
      {
        h2: 'Why aluminum works well in Langley',
        body: 'Many Langley backyards are large enough to make a covered outdoor area genuinely useful. Aluminum delivers dependable rain coverage and a clean finish without the higher cost of a full glass roof.',
      },
      {
        h2: 'What changes the final quote',
        body: 'Width, projection, attachment to the home or deck, post placement, gutter direction, and access all affect the final number. The free measurement confirms those details.',
      },
    ],
    pricingNote:
      'Share your Langley neighbourhood and rough size. We can compare aluminum against glass or combo if you are unsure which direction fits your backyard.',
    faqs: [
      {
        q: 'Do you install aluminum patio covers in Langley?',
        a: 'Yes, Langley is part of our Lower Mainland service area, including the Township and City of Langley.',
      },
      {
        q: 'Can a cover attach to an existing deck?',
        a: 'Often yes, depending on the deck structure, attachment, and clearance. We confirm those details during measurement.',
      },
      {
        q: 'How much does a Langley aluminum patio cover cost?',
        a: PRICING_COPY.aluminumOnly,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-langley', label: 'Patio cover contractor in Langley' },
      { path: '/patio-covers-langley', label: 'Patio covers in Langley' },
      { path: '/best-patio-cover-for-rain-vancouver', label: 'Best cover for rain guide' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Large backyard patio cover on a suburban Langley-style lot',
      caption:
        'Large backyard cover — common on Langley subdivisions. Start with aluminum in chat for rain-first budget, then compare glass.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'glass-langley': {
    id: 'glass-langley',
    path: '/glass-patio-covers-langley',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass Patio Covers Langley | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Langley — bright, modern rain protection that keeps backyards and decks full of natural light. Fast estimate and free measurement.',
    h1: 'Glass Patio Covers in Langley',
    serviceType: 'Glass patio cover installation',
    areaServed: 'Langley, British Columbia',
    intro:
      'Glass patio covers are worth comparing in Langley when you want rain protection but still want the deck and back of the home to stay bright. They suit newer homes with large windows and walkout decks.',
    highlights: [
      'Bright overhead rain protection for Langley decks',
      'Modern glass and black-frame design direction',
      'Good fit for newer Willoughby and Walnut Grove homes',
      'Free measurement after your first ballpark estimate',
    ],
    localAngle:
      'Many newer Langley homes have walkout decks and large rear windows where a solid roof would feel too dark. Glass keeps the space bright while still shedding rain when the slope and drainage are planned correctly.',
    sections: [
      {
        h2: 'When glass is worth the upgrade',
        body: 'Glass usually costs more than a basic aluminum cover, but it keeps the deck and adjoining rooms brighter and can look more premium from inside the home.',
      },
      {
        h2: 'What affects glass pricing',
        body: 'Panel layout, span, support posts, attachment height, glass type, and drainage direction all affect the final quote. A quick estimate helps you decide before measuring.',
      },
    ],
    pricingNote:
      'Send rough dimensions and whether you want maximum light or a balanced mix of shade. We can compare glass and aluminum from the same measurements.',
    faqs: [
      {
        q: 'Are glass patio covers good for Langley homes?',
        a: 'Yes, especially for newer homes with walkout decks and large windows where keeping natural light matters. Slope and drainage are confirmed on site.',
      },
      {
        q: 'Can I compare glass and aluminum pricing?',
        a: 'Yes. We can ballpark both from the same approximate dimensions.',
      },
      {
        q: 'How much does a Langley glass patio cover cost?',
        a: PRICING_COPY.glassAluminumSameSize,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-langley', label: 'Patio cover contractor in Langley' },
      { path: '/aluminum-patio-covers-langley', label: 'Aluminum patio covers in Langley' },
      { path: '/glass-vs-aluminum-patio-covers', label: 'Glass vs aluminum guide' },
    ],
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Glass patio cover keeping a walkout deck bright with tempered glass roof panels',
      caption:
        'Glass patio cover — suited to newer Langley walkout decks and large rear windows. Compare aluminum in chat on the same dimensions.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
  },
  'sunrooms-langley': {
    id: 'sunrooms-langley',
    path: '/sunrooms-langley',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    metaTitle: 'Sunrooms Langley | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Langley — enclosed patio and glass room options for brighter, year-round usable space. Fast rough estimate and free site measurement.',
    h1: 'Sunrooms in Langley',
    serviceType: 'Sunroom installation',
    areaServed: 'Langley, British Columbia',
    intro:
      'Langley homes often have the backyard space to support a comfortable enclosed sunroom. It is a bigger step than an open cover, so we start with a rough budget range before detailed design.',
    highlights: [
      'Enclosed patio and sunroom options in Langley',
      'Compare sunroom budget against open patio covers',
      'Good for brighter sitting, hobby, or family spaces',
      'Free measurement after the initial rough estimate',
    ],
    localAngle:
      'Larger Langley lots in areas like Murrayville, Brookswood, and the Township give room for a real room-like sunroom. Existing deck condition, attachment, and drainage are reviewed before final pricing.',
    sections: [
      {
        h2: 'When to consider a sunroom',
        body: 'Choose a sunroom when you want more enclosure and comfort than a roof alone provides. It works well for sitting areas, hobby rooms, or a protected transition to a large backyard.',
      },
      {
        h2: 'Budget before design',
        body: 'Because sunrooms vary widely, the first step is understanding whether the project range makes sense. Final details come after measurement.',
      },
    ],
    pricingNote:
      'Share the approximate footprint and a few photos. We can compare a sunroom with simpler patio cover options if budget is uncertain.',
    faqs: [
      {
        q: 'Do you build sunrooms in Langley?',
        a: 'Yes, Langley is part of our Lower Mainland service area.',
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
      { path: '/patio-cover-contractor-langley', label: 'Patio cover contractor in Langley' },
      { path: '/patio-covers-langley', label: 'Patio covers in Langley' },
      { path: '/sunrooms-burnaby', label: 'Sunrooms in Burnaby' },
    ],
    caseStudy: {
      image: '/house/realprojects/sunroom-white.png',
      alt: 'White-framed sunroom enclosure with glass walls on a Lower Mainland home',
      caption:
        'Sunroom enclosure — larger Langley lots often have room for enclosed patio space. Compare against an open cover in chat first.',
    },
  },
  'contractor-langley': {
    id: 'contractor-langley',
    path: '/patio-cover-contractor-langley',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Langley | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Langley? Compare aluminum, glass, combo, and sunroom options with a fast rough quote and free on-site measurement.',
    h1: 'Patio Cover Contractor in Langley',
    serviceType: 'Patio cover contractor',
    areaServed: 'Langley, British Columbia',
    intro:
      'If you are comparing patio cover contractors in Langley, the most useful first step is a clear budget range. LoomiHome helps you compare cover types before booking a free on-site measurement, so you are not guessing on price.',
    highlights: [
      'Fast rough patio cover quote for Langley homes',
      'Compare aluminum, glass, skyline combo, and sunroom options',
      'Good for larger backyards, decks, and newer subdivisions',
      'Free on-site measurement for final contractor pricing',
    ],
    localAngle:
      'Langley spans newer Willoughby and Walnut Grove developments and more established areas like Murrayville, Brookswood, and Fort Langley. Lot size and deck setup vary, so a rough online estimate saves time before a contractor visit.',
    sections: [
      {
        h2: 'What a Langley contractor quote should clarify',
        body: 'A useful quote should explain product direction, approximate size, attachment to the home or deck, drainage, and what still needs to be confirmed on site.',
      },
      {
        h2: 'Why start online',
        body: 'Starting with a ballpark helps you avoid booking multiple appointments before you know whether the project fits your budget. If the range works, the measured visit handles the rest.',
      },
    ],
    pricingNote:
      'Send your Langley neighbourhood, rough dimensions, and preferred cover type. We will give a starting range before booking a free measurement.',
    faqs: [
      {
        q: 'Do you provide patio cover quotes in Langley?',
        a: 'Yes. Start with a fast rough quote online, then book a free on-site measurement if the range works.',
      },
      {
        q: 'What patio cover types can I compare?',
        a: 'You can compare aluminum, glass, skyline combo, and sunroom directions before choosing what to measure.',
      },
      {
        q: 'Is the online Langley contractor quote final?',
        a: 'No — chat gives a planning range only. Your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: 'Which Langley areas do you quote most often?',
        a: 'Willoughby, Walnut Grove, Murrayville, Brookswood, and Fort Langley — larger backyards and newer decks are common. Share your neighbourhood in chat for a faster ballpark.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-langley', label: 'Patio covers in Langley' },
      { path: '/aluminum-patio-covers-langley', label: 'Aluminum patio covers in Langley' },
      { path: '/glass-patio-covers-langley', label: 'Glass patio covers in Langley' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Skyline combo patio cover on a large suburban backyard patio similar to Langley lot layouts',
      caption:
        'Large backyard skyline combo cover — approx. 12×26 ft layout common on Langley subdivisions. Compare aluminum and glass on your size in chat.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'installer-langley': {
    id: 'installer-langley',
    path: '/patio-cover-installer-langley',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Langley | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Langley — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.',
    h1: 'Patio Cover Installer in Langley',
    serviceType: 'Patio cover installation',
    areaServed: 'Langley, British Columbia',
    intro:
      'Langley homeowners searching for a patio cover installer often want practical answers first: what type fits, what it might cost, and how it will handle local weather. We start with a rough estimate, then confirm details during a free measurement.',
    highlights: [
      'Patio cover installation options across Langley',
      'Compare aluminum, glass, combo, and sunroom paths',
      'Helpful for Willoughby, Walnut Grove, and Murrayville homes',
      'Fast ballpark followed by free measurement',
    ],
    localAngle:
      'Langley lots range from newer subdivisions to larger Township properties. Attachment, span, and drainage are confirmed during the free site visit before final installation pricing.',
    sections: [
      {
        h2: 'Installation details that matter in Langley',
        body: 'Post placement, wall or deck attachment, roof slope, gutter direction, access, and exposure all shape a proper patio cover installation and the final quote.',
      },
      {
        h2: 'Estimate first, install planning second',
        body: 'The first estimate helps you decide whether the project is worth measuring. The site visit handles practical installation details and confirms pricing.',
      },
    ],
    pricingNote:
      'Share rough dimensions and one or two photos. We can ballpark the likely product direction before a Langley site visit.',
    faqs: [
      {
        q: 'Do you install patio covers in Langley?',
        a: 'Yes, we serve Langley, including the Township and City of Langley.',
      },
      {
        q: 'Can you install glass and aluminum covers?',
        a: 'Yes. We help homeowners compare aluminum, glass, skyline combo, and sunroom options before final measurement.',
      },
      {
        q: 'Is the online Langley installation estimate final?',
        a: 'No — chat gives a planning range only. Final installation pricing is confirmed after free on-site measurement.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-langley', label: 'Patio cover contractor in Langley' },
      { path: '/aluminum-patio-covers-langley', label: 'Aluminum patio covers in Langley' },
      { path: '/how-long-does-patio-cover-installation-take', label: 'Installation timeline guide' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Large backyard patio cover installation on a suburban Langley-style lot',
      caption:
        'Langley-area install reference — larger backyards common in Willoughby and Walnut Grove. Ballpark in chat before site visit.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'contractor-delta': {
    id: 'contractor-delta',
    path: '/patio-cover-contractor-delta',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractor Delta | LoomiHome Patios',
    metaDescription:
      'Looking for a patio cover contractor in Delta BC? Compare aluminum, glass, combo, and sunroom options with a fast rough quote and free measurement.',
    h1: 'Patio Cover Contractor in Delta',
    serviceType: 'Patio cover contractor',
    areaServed: 'Delta, British Columbia',
    intro:
      'If you are looking for a patio cover contractor in Delta, coastal exposure and wind make a clear plan important. LoomiHome helps you compare cover types and get a rough budget before a free on-site measurement.',
    highlights: [
      'Fast rough patio cover quote for Delta homes',
      'Compare aluminum, glass, skyline combo, and sunroom options',
      'Good for Ladner, Tsawwassen, and North Delta properties',
      'Free on-site measurement for final contractor pricing',
    ],
    localAngle:
      'Delta ranges from Ladner and Tsawwassen near the water to North Delta. Coastal wind and exposure can affect the design, so drainage and attachment are worth confirming early.',
    sections: [
      {
        h2: 'What a Delta contractor quote should clarify',
        body: 'A useful quote should explain product direction, approximate size, attachment, drainage, and how the design handles wind and coastal exposure where relevant.',
      },
      {
        h2: 'Why start online first',
        body: 'A rough range helps you decide whether to keep going before booking appointments. If the budget works, the measured visit confirms the details.',
      },
    ],
    pricingNote:
      'Send your Delta neighbourhood, rough dimensions, and preferred cover type. We will give a starting range before booking a free measurement.',
    faqs: [
      {
        q: 'Do you provide patio cover contractor quotes in Delta?',
        a: 'Yes. Start with a rough online quote, then book a free measurement if the range works.',
      },
      {
        q: 'Do you serve Ladner and Tsawwassen?',
        a: 'Yes, we serve Delta broadly, including Ladner, Tsawwassen, and North Delta.',
      },
      {
        q: 'Is the online Delta contractor quote final?',
        a: 'No — chat gives a planning range only. Your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: 'What patio cover types can I compare?',
        a: 'You can compare aluminum, glass, skyline combo, and sunroom directions before choosing what to measure.',
      },
      {
        q: 'How does coastal wind affect Delta patio covers?',
        a: 'Exposure varies from Tsawwassen waterfront to sheltered North Delta lots. Attachment, drainage, and span are confirmed during free measurement.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-delta', label: 'Patio covers in Delta' },
      { path: '/aluminum-patio-covers-delta', label: 'Aluminum patio covers in Delta' },
      { path: '/glass-patio-covers-delta', label: 'Glass patio covers in Delta' },
    ],
    caseStudy: {
      image: '/house/before-after/delta-aluminum-after.png',
      alt: 'Delta aluminum patio cover after installation on a compact side-yard patio',
      caption:
        'Delta aluminum patio cover — approx. 11×14 ft compact layout common in Ladner and North Delta. Ballpark in chat, then free measurement.',
      projectPath: '/projects/delta-aluminum-patio-cover',
    },
  },
  'installer-delta': {
    id: 'installer-delta',
    path: '/patio-cover-installer-delta',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Installer Delta | LoomiHome Patios',
    metaDescription:
      'Patio cover installer in Delta BC — aluminum, glass, combo covers, and sunrooms. Fast rough estimate and free on-site measurement.',
    h1: 'Patio Cover Installer in Delta',
    serviceType: 'Patio cover installation',
    areaServed: 'Delta, British Columbia',
    intro:
      'Delta homeowners searching for a patio cover installer often want practical answers first: what type fits, what it might cost, and how it will handle coastal weather. We start with a rough estimate, then confirm details during a free measurement.',
    highlights: [
      'Patio cover installation options across Delta',
      'Compare aluminum, glass, combo, and sunroom paths',
      'Helpful for Ladner, Tsawwassen, and North Delta homes',
      'Fast ballpark followed by free measurement',
    ],
    localAngle:
      'Delta exposure varies from breezy waterfront areas in Tsawwassen and Ladner to more sheltered North Delta lots. Wind, drainage, and attachment all matter for a durable installation.',
    sections: [
      {
        h2: 'Installation details that matter in Delta',
        body: 'Post placement, wall or deck attachment, roof slope, gutter direction, access, and wind exposure all shape a proper patio cover installation and the final quote.',
      },
      {
        h2: 'Estimate first, install planning second',
        body: 'The first estimate helps you decide whether the project is worth measuring. The site visit handles the practical installation details and confirms pricing.',
      },
    ],
    pricingNote:
      'Share rough dimensions and one or two photos. We can ballpark the likely product direction before a Delta site visit.',
    faqs: [
      {
        q: 'Do you install patio covers in Delta?',
        a: 'Yes, we serve Delta, including Ladner, Tsawwassen, and North Delta.',
      },
      {
        q: 'Can you install glass and aluminum covers?',
        a: 'Yes. We help homeowners compare aluminum, glass, skyline combo, and sunroom options before final measurement.',
      },
      {
        q: 'How does coastal wind affect Delta patio cover installation?',
        a: 'Exposure varies from Tsawwassen waterfront to sheltered North Delta lots. Attachment, span, and drainage are confirmed during free measurement.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractor-delta', label: 'Patio cover contractor in Delta' },
      { path: '/aluminum-patio-covers-delta', label: 'Aluminum patio covers in Delta' },
      { path: '/how-long-does-patio-cover-installation-take', label: 'Installation timeline guide' },
    ],
    caseStudy: {
      image: '/house/before-after/delta-aluminum-after.png',
      alt: 'Delta aluminum patio cover after installation on a compact side-yard patio',
      caption:
        'Delta aluminum install — Ladner and North Delta side-yard layout. Chat estimate first, measurement confirms install details.',
      projectPath: '/projects/delta-aluminum-patio-cover',
    },
  },
  ...SKYLINE_CITY_PAGES,
  ...CITY_SERVICE_EXPANSION_PAGES,
};
