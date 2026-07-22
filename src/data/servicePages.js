/** SEO service landing pages — paths must match router. */
import { PRICING_COPY } from './pricingCopy.js';

export const SERVICE_PAGES = {
  aluminum: {
    path: '/aluminum-patio-covers-vancouver',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    areaServed: 'Vancouver, British Columbia',
    metaTitle: 'Aluminum Patio Covers Vancouver | LoomiHome Patios',
    metaDescription:
      'Aluminum patio covers in Vancouver and the Lower Mainland. Fast estimate in chat (~60 sec), compare options, free measurement. Strong rain protection.',
    h1: 'Aluminum Patio Covers in Vancouver',
    intro:
      'Durable, low-maintenance aluminum patio covers are a practical choice for rain and sun in the Lower Mainland. LoomiHome helps you see quick ballpark pricing before you commit to a site visit — so you can compare options on your own timeline.',
    benefits: [
      'Strong weather resistance for Vancouver seasons',
      'Low upkeep compared to wood',
      'Clean look that works with most homes',
      'Fast estimate in chat — no waiting days for a first number',
    ],
    sections: [
      {
        h2: 'Best fit for rainy Lower Mainland patios',
        body: 'Aluminum is usually the first option we compare when homeowners want dependable rain coverage without making the patio feel complicated. It works well for everyday seating areas, side-yard covers, and carport-style spaces where function matters as much as appearance.',
      },
      {
        h2: 'What we confirm during measurement',
        body: 'The free site visit checks width, projection, wall attachment, post placement, gutter direction, and any details that affect final price. That keeps the online estimate useful while still leaving room for accurate structural decisions on site.',
      },
    ],
    pricingLine:
      'Many entry-style aluminum cover projects start in the neighbourhood of our homepage “from” pricing — your chat estimate adjusts for size, attachment, and site details.',
    ctaTitle: 'Get a fast rough estimate',
    ctaBody:
      'Use our 60-second style estimator to compare aluminum with glass, skyline combo, and sunroom options. Book a free on-site measurement after you have a ballpark you are comfortable with.',
    faqs: [
      {
        q: 'How fast can I get a rough aluminum patio cover quote?',
        a: 'Usually about a minute in chat once we have your city and approximate patio size — then we refine on a free visit if you want to proceed.',
      },
      {
        q: 'Is aluminum better than glass for Vancouver rain?',
        a: 'Aluminum roofs are the straightforward rain shield; glass adds light with proper engineering. We help you compare both for your goals.',
      },
      {
        q: 'Can I get pricing before a measurement?',
        a: 'Yes — ballpark first, measured final price second. That is how we run things.',
      },
      {
        q: 'Do you serve cities outside Vancouver?',
        a: 'Yes — Burnaby, Richmond, Surrey, Delta, Coquitlam, and nearby. See our city pages for local notes.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Aluminum patio cover on a Vancouver-area backyard patio for rain protection',
      caption:
        'Aluminum patio cover — practical rain protection for Vancouver backyards. Compare glass and skyline combo in chat on the same size.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-vancouver', label: 'Patio covers in Vancouver' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
      { path: '/aluminum-patio-covers-burnaby', label: 'Aluminum patio covers in Burnaby' },
    ],
  },
  glass: {
    path: '/glass-patio-covers-vancouver',
    heroImage: '/house/glass/glass-hero.png',
    areaServed: 'Vancouver, British Columbia',
    metaTitle: 'Glass Patio Covers Vancouver | LoomiHome Patios',
    metaDescription:
      'Glass patio covers in Vancouver — bright, modern, rain-ready when engineered right. Fast rough quote, compare vs aluminum. Free Lower Mainland measurement.',
    h1: 'Glass Patio Covers in Vancouver',
    intro:
      'Glass patio covers add brightness and a premium feel while keeping the weather out. We serve Vancouver-area homeowners who want clarity first: a fast rough estimate, then a free measurement when you want to move forward.',
    benefits: [
      'Tempered glass for durability',
      'More daylight on your patio',
      'Modern, open look',
      'Compare against aluminum and combo covers in one flow',
    ],
    sections: [
      {
        h2: 'When glass is worth comparing',
        body: 'Glass patio covers are strongest when the homeowner wants weather protection but does not want to darken the back of the house. They are popular for kitchens, dining rooms, and living rooms that face the patio because natural light stays part of the space.',
      },
      {
        h2: 'Rain performance still depends on the details',
        body: 'A glass roof still needs proper slope, flashing, guttering, and attachment. We talk through the budget range online first, then confirm the exact layout and drainage details during the measurement visit.',
      },
    ],
    pricingLine:
      'Glass systems typically sit above basic aluminum on budget — chat gives you a realistic ballpark for your footprint before we measure.',
    ctaTitle: 'See a quick ballpark price',
    ctaBody:
      'Start with an instant-style estimate so you understand range and options. There is no pressure to book until you are ready — free on-site measurement comes after.',
    faqs: [
      {
        q: 'Glass vs aluminum — which should I estimate first?',
        a: 'If budget and rain protection drive the decision, start with aluminum ballpark, then glass. If light and look are priorities, flip the order. We can run both in one chat.',
      },
      {
        q: 'How fast is the patio cover estimate?',
        a: 'Roughly 60 seconds in chat for a planning range. Your formal quote is confirmed after free on-site measurement.',
      },
      {
        q: 'How much does a glass patio cover cost in Vancouver?',
        a: `${PRICING_COPY.glassOnly} Final price depends on span, posts, attachment, and drainage confirmed on site.`,
      },
      {
        q: 'Do glass covers work in heavy rain?',
        a: 'When engineered and installed correctly, yes — slope, drainage, and attachment all matter. We confirm details on site.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Vancouver glass patio cover after installation with tempered glass panels and black aluminum frame',
      caption:
        'Vancouver glass patio cover — keeps the patio and back of the home bright while adding rain protection. See a similar rough range in chat.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-cover-contractor-vancouver', label: 'Patio cover contractor in Vancouver' },
      { path: '/glass-patio-covers-richmond', label: 'Glass patio covers in Richmond' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
    ],
  },
  skyline: {
    path: '/skyline-combo-patio-covers-vancouver',
    heroImage: '/house/skyline/skyline-hero.png',
    areaServed: 'Vancouver, British Columbia',
    metaTitle: 'Skyline Combo Covers Vancouver | LoomiHome Patios',
    metaDescription:
      'Skyline combo patio covers (glass + V-panel) in Vancouver. Quick estimate, compare with other types, free on-site measurement across the Lower Mainland.',
    h1: 'Skyline Combo Patio Covers in Vancouver',
    intro:
      'Skyline combo designs blend glass and V-panels for balanced light and shade. If you are researching patio covers in Vancouver, we make the first step fast: rough pricing and easy comparison before you book an on-site visit.',
    benefits: [
      'Balanced light and shade',
      'Distinct, architectural look',
      'Good fit when you want more than a flat solid cover',
      'Same quick estimate flow as our other cover types',
    ],
    sections: [
      {
        h2: 'A middle option between solid and glass',
        body: 'Skyline combo covers are useful when a fully solid roof feels too dark but a full glass roof feels too bright or too premium. Mixing glass with V-panel sections lets you tune the patio for light, shade, and budget.',
      },
      {
        h2: 'Good for design-focused backyards',
        body: 'This style is often chosen for newer homes, feature patios, and spaces where the roof is visible from inside the house. We can compare combo, glass, and aluminum in one estimate so you see the trade-offs clearly.',
      },
    ],
    pricingLine:
      'Combo systems often fall between premium glass and value aluminum depending on glass share and span — use chat for a ballpark tied to your size.',
    ctaTitle: 'Get my fast estimate',
    ctaBody:
      'Use the chat estimator for a ballpark in minutes. When you want exact measurements and final numbers, we book a free site visit — no obligation.',
    faqs: [
      {
        q: 'What is a skyline combo cover?',
        a: 'A mix of glass and V-panel sections for both light and shade — good when you do not want an all-glass or all-solid roof.',
      },
      {
        q: 'Can I compare combo vs aluminum in one go?',
        a: 'Yes — that is what the chat estimate flow is for.',
      },
      {
        q: 'Do I need a permit?',
        a: 'Depends on your city and design. See our permit guide for general guidance, and confirm with your municipality.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Skyline combo patio cover with glass and V-panel sections on a Metro Vancouver backyard',
      caption:
        'Skyline combo cover — balanced light and shade for Vancouver-area patios. Compare aluminum and full glass in chat.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
    relatedPageLinks: [
      { path: '/skyline-combo-patio-covers-surrey', label: 'Skyline combo covers in Surrey' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
      { path: '/aluminum-patio-covers-vancouver', label: 'Aluminum patio covers in Vancouver' },
    ],
  },
  sunrooms: {
    path: '/sunrooms-vancouver',
    heroImage: '/house/sunrooms/sunroom-hero.png',
    areaServed: 'Vancouver, British Columbia',
    metaTitle: 'Sunrooms Vancouver | LoomiHome Patios',
    metaDescription:
      'Sunrooms in Vancouver & Lower Mainland. Fast ballpark estimate, compare vs patio covers, free measurement. Enclosed glass living space.',
    h1: 'Sunrooms in Vancouver',
    intro:
      'Sunrooms extend usable living space with insulated, glass-forward builds. We focus on speed at the start: a fast rough estimate so you know whether the project fits your range — then a detailed site visit if you want to proceed.',
    benefits: [
      'Year-round comfort focus',
      'Adds usable square footage feel',
      'Thermal-break aluminum framing options',
      'Estimate first, measurement second — your pace',
    ],
    sections: [
      {
        h2: 'More enclosed than a patio cover',
        body: 'A sunroom is a bigger decision than an open patio cover because it adds walls, more glass, and more comfort planning. It can be a strong fit when you want a brighter sitting area, hobby space, or protected transition between indoors and outdoors.',
      },
      {
        h2: 'Start with budget before design details',
        body: 'Because sunrooms vary widely by size and finish level, the first goal is to understand whether the project fits your expected range. The chat estimate gives that early direction before we schedule a measured quote.',
      },
    ],
    pricingLine:
      'Sunrooms are typically a step above open patio covers in investment — chat helps you see whether the budget gap works before we measure.',
    ctaTitle: 'Estimate my sunroom project',
    ctaBody:
      'Get ballpark pricing without a long wait. Compare sunrooms with patio cover options in one conversation. Free on-site measurement is available after your initial estimate.',
    faqs: [
      {
        q: 'Are sunrooms more expensive than patio covers?',
        a: PRICING_COPY.sunroomMoreExpensive,
      },
      {
        q: 'How long does installation take?',
        a: 'Scope drives the calendar. We give a realistic range after measurement; see our timeline guide for typical phases.',
      },
      {
        q: 'Can I get a sunroom quote online first?',
        a: 'Yes — chat gives a planning range in about a minute. Your formal sunroom quote is confirmed after free on-site measurement.',
      },
    ],
    caseStudy: {
      image: '/house/realprojects/sunroom-white.png',
      alt: 'White-framed sunroom with glass walls attached to a Vancouver-area home',
      caption:
        'Sunroom enclosure example for Vancouver homeowners comparing a brighter enclosed space against an open patio cover.',
    },
    relatedPageLinks: [
      { path: '/sunrooms-burnaby', label: 'Sunrooms in Burnaby' },
      { path: '/patio-cover-contractor-vancouver', label: 'Patio cover contractor in Vancouver' },
    ],
  },
};

export const SERVICE_PAGE_ORDER = ['aluminum', 'glass', 'skyline', 'sunrooms'];
