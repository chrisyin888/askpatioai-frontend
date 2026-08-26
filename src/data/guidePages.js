/** High-intent SEO guides / blog-style pages. */
import { PRICING_COPY } from './pricingCopy.js';

export const GUIDE_PAGE_ORDER = [
  'contractors-near-me',
  'patio-cover-cost',
  'glass-vs-aluminum',
  'permit',
  'rain',
  'install-timeline',
  'fraser-valley',
  'coastal',
  'tri-cities',
  'patio-cover-cost-abbotsford',
  'patio-cover-cost-surrey',
  'patio-cover-cost-burnaby',
  'patio-cover-cost-langley',
  'patio-cover-cost-richmond',
  'patio-cover-cost-coquitlam',
];

export const GUIDE_PAGES = {
  'contractors-near-me': {
    id: 'contractors-near-me',
    path: '/patio-cover-contractors-near-me',
    datePublished: '2026-06-01',
    dateModified: '2026-06-19',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Contractors Near Me | LoomiHome Patios',
    metaDescription:
      'Patio cover contractors near you in Metro Vancouver. Compare aluminum, glass, combo, and sunroom options with a fast rough estimate in ~60 seconds.',
    h1: 'Patio Cover Contractors Near Me — Metro Vancouver',
    intro:
      'If you searched “patio cover contractors near me” or “patio cover installers near me,” you probably want two things: a trustworthy local team and a clear price range before booking visits. LoomiHome serves Metro Vancouver and the Lower Mainland — Vancouver, Burnaby, Richmond, Surrey, Delta, Coquitlam, Port Coquitlam, Port Moody, Langley, North Vancouver, West Vancouver, New Westminster, Maple Ridge, Pitt Meadows, Abbotsford, White Rock, and nearby areas. Start with a fast rough estimate in chat (about 60 seconds), then book a free on-site measurement when the range fits your budget.',
    sections: [
      {
        h2: 'How to compare patio cover contractors without wasting evenings',
        body: 'Call three contractors and you may get three different formats, timelines, and vague “starting from” numbers. A structured ballpark first — city, approximate size, product type — lets you filter who is worth a site visit.',
      },
      {
        h2: 'What to look for in a local patio cover contractor',
        body: 'Clear product options (aluminum, glass, combo, sunroom), measured final quotes, drainage and attachment details, and photos of completed local work. For BC homes, rain performance matters as much as looks.',
      },
      {
        h2: 'Cities we serve in Metro Vancouver',
        body: 'We regularly work in Vancouver, Burnaby, Richmond, Surrey, Delta, Coquitlam, Port Coquitlam, Port Moody, Langley, North Vancouver, West Vancouver, New Westminster, Maple Ridge, Pitt Meadows, Abbotsford, and White Rock. If you are on the edge of the Lower Mainland, ask in chat — we can usually confirm quickly.',
      },
      {
        h2: 'Installer vs contractor — what homeowners usually mean',
        body: 'Most people use both terms for the same goal: someone local who can price, supply, and install a patio cover correctly. Our flow covers estimate, measurement, and installation planning in one place.',
      },
    ],
    pricingNote:
      'Use the homepage chat with your city and rough patio size. You will get a planning range before anyone visits your home.',
    faqs: [
      {
        q: 'Do you serve patio cover searches from Vancouver and nearby cities?',
        a: 'Yes — Metro Vancouver and the broader Lower Mainland are our primary service area. We are a BC team, not a US contractor listing.',
      },
      {
        q: 'How fast can I get a quote from a patio cover contractor?',
        a: 'Rough range in about a minute in chat. Your formal quote is confirmed after a free on-site measurement.',
      },
      {
        q: 'What patio cover types can I compare?',
        a: 'Aluminum, glass, skyline combo, and sunroom directions — helpful if you are still deciding product type.',
      },
      {
        q: 'How much does a patio cover usually cost in Metro Vancouver?',
        a: PRICING_COPY.threeWayShort,
      },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Finished aluminum patio cover on a Burnaby backyard patio, Lower Mainland project',
      caption:
        'Recent Burnaby aluminum patio cover — approx. 24×20 ft rain-ready backyard cover. Use chat for a similar rough range, then book a free measurement.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-cover-contractor-vancouver', label: 'Patio cover contractor — Vancouver' },
      { path: '/patio-cover-contractor-richmond', label: 'Patio cover contractor — Richmond' },
      { path: '/patio-cover-contractor-burnaby', label: 'Patio cover contractor — Burnaby' },
      { path: '/patio-covers-surrey', label: 'Patio covers — Surrey' },
      { path: '/patio-covers-port-coquitlam', label: 'Patio covers — Port Coquitlam' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost in Vancouver' },
    ],
  },
  'patio-cover-cost': {
    id: 'patio-cover-cost',
    path: '/patio-cover-cost-vancouver',
    datePublished: '2026-06-01',
    dateModified: '2026-06-19',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Vancouver | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Vancouver? What drives price, typical ranges, and how to get a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Vancouver',
    intro:
      'If you are researching patio cover cost in Vancouver, you have probably seen numbers all over the map. That is normal — size, product type, attachment, and finish level all move the total. The fastest way to get oriented is a rough chat estimate for your actual patio: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price?',
        body: 'Size (square footage or span), whether you choose aluminum, glass, or a combo system, how the structure ties into your home, height and engineering needs, and any custom details (lighting, ceiling finish, etc.) all matter. Coastal weather also means we spec materials that last — that can differ from bargain online kits.',
      },
      {
        h2: 'Why a “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses your city and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
      {
        h2: 'Why local pricing is different from online kits',
        body: 'Online kits can be useful for comparison, but Vancouver-area installs need to account for rain, wind exposure, attachment conditions, access, and finishing details. A local installed price includes more than just panels in a box.',
      },
      {
        h2: 'What to prepare for a better estimate',
        body: 'A rough width, projection from the house, city, and one or two photos are enough to make the first ballpark more useful. Exact measurements come later during the free site visit.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your size and location.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Vancouver?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Are sunrooms more expensive than patio covers?',
        a: PRICING_COPY.sunroomMoreExpensive,
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost?',
        a: PRICING_COPY.example12x14Aluminum,
      },
    ],
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Finished glass patio cover on a Vancouver-area home with black frame and tempered glass panels',
      caption:
        'Vancouver-area glass patio cover example — bright rain protection without losing natural light. Compare aluminum and glass in chat before you measure.',
      projectPath: '/projects/vancouver-glass-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-cover-contractors-near-me', label: 'Patio cover contractors near me' },
      { path: '/glass-patio-covers-vancouver', label: 'Glass patio covers in Vancouver' },
      { path: '/glass-vs-aluminum-patio-covers', label: 'Glass vs aluminum guide' },
      { path: '/patio-cover-cost-surrey', label: 'Patio cover cost in Surrey' },
      { path: '/patio-cover-cost-abbotsford', label: 'Patio cover cost in Abbotsford' },
      { path: '/patio-cover-cost-burnaby', label: 'Patio cover cost in Burnaby' },
      { path: '/patio-cover-cost-langley', label: 'Patio cover cost in Langley' },
      { path: '/patio-cover-cost-richmond', label: 'Patio cover cost in Richmond' },
      { path: '/patio-cover-cost-coquitlam', label: 'Patio cover cost in Coquitlam' },
    ],
  },
  'glass-vs-aluminum': {
    id: 'glass-vs-aluminum',
    path: '/glass-vs-aluminum-patio-covers',
    datePublished: '2026-06-01',
    dateModified: '2026-06-19',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Glass vs Aluminum Covers | Vancouver | LoomiHome',
    metaDescription:
      'Glass vs aluminum patio cover for Vancouver homes. Compare light, rain protection, maintenance, and budget. Get a fast rough estimate for both in chat.',
    h1: 'Glass vs Aluminum Patio Covers',
    intro:
      'Choosing between a glass patio cover and an aluminum patio cover is less about “which is best in the world” and more about what you want from the space. Aluminum leans practical: strong rain protection, lower maintenance, often friendlier on budget. Glass leans bright: more natural light, a premium modern look, often a higher investment. In Vancouver’s grey months, both can work — the right pick depends on how you use the patio and what you want to spend.',
    sections: [
      {
        h2: 'Aluminum patio covers — when they shine',
        body: 'Great when rain protection and simplicity top the list. Aluminum systems shed water well, need little upkeep, and fit a wide range of home styles. Popular across Burnaby, Surrey, and coastal-facing lots where durability matters.',
      },
      {
        h2: 'Glass patio covers — when they shine',
        body: 'Ideal when you want the patio to feel open and bright without giving up a roof. Tempered glass systems are built for durability, but expect a higher price point than basic aluminum.',
      },
      {
        h2: 'Skyline combo — the middle path',
        body: 'Some homeowners want both light and shade panels. Our skyline-style combo blends glass with V-panel sections — worth comparing alongside pure glass or pure aluminum.',
      },
      {
        h2: 'Budget and maintenance differences',
        body: 'Aluminum is usually the simpler, lower-maintenance choice. Glass often costs more and needs occasional cleaning, but it keeps the patio and nearby rooms brighter.',
      },
      {
        h2: 'How to choose for Vancouver weather',
        body: 'If rain protection is the main goal, start with aluminum or combo. If keeping daylight is just as important, compare glass at the same approximate size so the trade-off is based on numbers instead of guesswork.',
      },
    ],
    pricingNote: PRICING_COPY.glassAluminumSameSize,
    faqs: [
      {
        q: 'Which patio cover type is best?',
        a: 'The best type matches your light, budget, and maintenance comfort. We help you compare quickly instead of guessing from photos online.',
      },
      {
        q: 'Is glass harder to maintain in rainy Vancouver?',
        a: 'Glass needs occasional cleaning like any exterior glass. Aluminum roofs are lower-touch. We explain real-world upkeep when you compare.',
      },
      {
        q: 'How much more does glass cost than aluminum?',
        a: PRICING_COPY.glassVsAluminumShort,
      },
      {
        q: 'Can I get aluminum and glass estimates in the same chat?',
        a: 'Yes. Share city and rough dimensions once — we can ballpark aluminum, glass, and skyline combo from the same measurements.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover on a Coquitlam-area home showing bright natural light under a tempered glass roof',
      caption:
        'Glass patio cover — keeps the patio bright while adding rain protection. Compare aluminum on the same dimensions in chat to see the budget difference.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
    relatedPageLinks: [
      { path: '/glass-patio-covers-vancouver', label: 'Glass patio covers in Vancouver' },
      { path: '/aluminum-patio-covers-vancouver', label: 'Aluminum patio covers in Vancouver' },
      { path: '/projects/vancouver-aluminum-patio-cover', label: 'Vancouver aluminum project' },
      { path: '/projects/vancouver-glass-patio-cover', label: 'Vancouver glass project' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
      { path: '/skyline-combo-patio-covers-vancouver', label: 'Skyline combo covers' },
    ],
  },
  permit: {
    id: 'permit',
    path: '/do-you-need-a-permit-for-a-patio-cover-in-vancouver',
    datePublished: '2026-06-01',
    dateModified: '2026-06-19',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Permits Vancouver | LoomiHome Patios',
    metaDescription:
      'Do you need a permit for a patio cover in Vancouver or BC? General guidance on when permits apply and how to plan your patio cover project.',
    h1: 'Do You Need a Permit for a Patio Cover in Vancouver?',
    intro:
      'Permit rules depend on your municipality, how the cover attaches to the home, height, projection, and sometimes whether there is existing work on the property. We are a patio cover team — not your city hall — so we cannot stamp “yes” or “no” for every lot. What we can do is build to compliant details once requirements are known, and help you move quickly on pricing while you check local rules.',
    sections: [
      {
        h2: 'Where to verify (do not skip this)',
        body: 'Contact your city’s building department or review their published guidelines for accessory structures and roof projections. Vancouver, Burnaby, Surrey, and other Lower Mainland municipalities do not all use identical thresholds.',
      },
      {
        h2: 'Why homeowners still start with us first',
        body: 'Most people want to know if the project is financially realistic before spending hours on paperwork. Our fast rough estimate gives you that orientation; permitting runs parallel when you decide to proceed.',
      },
      {
        h2: 'Details that can affect permit requirements',
        body: 'Attachment to the house, projection, height, lot coverage, drainage, and whether the cover is enclosed can all matter. A simple open cover and an enclosed sunroom may be treated very differently.',
      },
      {
        h2: 'How the site visit helps',
        body: 'During measurement we can document dimensions, attachment points, and site conditions so you have clearer information when speaking with your municipality or reviewing next steps.',
      },
    ],
    pricingNote:
      'Permit or not, the measurement visit is how we finalize structure details and price accurately.',
    faqs: [
      {
        q: 'Do I need a permit for a patio cover in BC?',
        a: 'Often yes for attached structures or larger projections, but it varies by city and design. Always confirm with your municipality.',
      },
      {
        q: 'Can LoomiHome help with permits?',
        a: 'We focus on design, product, and installation coordination. For permit questions, your city’s guidance is authoritative — we align construction details to what they require.',
      },
      {
        q: 'Should I get a price estimate before checking permits?',
        a: 'Most homeowners do — a chat ballpark tells you if the project is financially realistic while you verify municipal rules in parallel.',
      },
      {
        q: 'Do permit rules differ between Vancouver and Surrey?',
        a: 'Yes. Attachment, projection, height, and enclosure level can be treated differently. Always confirm with your city’s building department.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
      { path: '/how-long-does-patio-cover-installation-take', label: 'Installation timeline guide' },
      { path: '/patio-cover-contractor-vancouver', label: 'Patio cover contractor — Vancouver' },
    ],
    caseStudy: {
      image: '/house/before-after/delta-aluminum-after.png',
      alt: 'Aluminum patio cover after installation on a Lower Mainland suburban backyard patio',
      caption:
        'Attached aluminum patio cover — typical open-roof project where municipal rules depend on projection and attachment. Ballpark in chat first, then confirm permits with your city.',
      projectPath: '/projects/delta-aluminum-patio-cover',
    },
  },
  rain: {
    id: 'rain',
    path: '/best-patio-cover-for-rain-vancouver',
    datePublished: '2026-06-01',
    dateModified: '2026-06-19',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Best Patio Cover for Rain | Vancouver | LoomiHome',
    metaDescription:
      'Best patio cover for rainy Vancouver weather — aluminum, glass, drainage, and durability. Compare options with a fast rough estimate in chat.',
    h1: 'Best Patio Cover for Rain in Vancouver',
    intro:
      'Vancouver’s rainy season is long. The “best” patio cover for rain is one that sheds water reliably, attaches securely to your home, and uses materials that will not fall apart after a few coastal winters. For many homeowners, that means a quality aluminum roof system or a well-engineered glass roof — not a flimsy big-box kit. We help you compare options fast so you are not guessing from marketing photos.',
    sections: [
      {
        h2: 'Why drainage and attachment matter as much as the panel',
        body: 'Rain performance is not only the surface material — it is gutters, slope, flashing, and how the structure loads against your house. That is why final pricing and engineering details happen after a proper site visit.',
      },
      {
        h2: 'Aluminum vs glass in wet months',
        body: 'Solid aluminum-style roofs are the straightforward rain shield. Glass roofs still shed water when engineered correctly, with the bonus of light. Combo systems split the difference.',
      },
      {
        h2: 'Do not ignore gutters and slope',
        body: 'A patio cover that looks good but drains poorly can create new problems. We look at where water should move, how it leaves the roof, and whether the house connection is appropriate for the space.',
      },
      {
        h2: 'Best value for most rain-first projects',
        body: 'For homeowners who mainly want furniture, doors, and walkways drier, aluminum is often the practical starting point. Glass and combo systems are worth comparing when light and appearance are higher priorities.',
      },
    ],
    pricingNote:
      'Tell us your priorities — dry floor space vs maximum light — and we will ballpark the right family of products.',
    faqs: [
      {
        q: 'Do patio covers really help with Vancouver rain?',
        a: 'A properly built cover keeps furniture drier and makes the patio usable on misty days. It is one of the most common reasons people call us.',
      },
      {
        q: 'What is the fastest way to compare rain-ready options?',
        a: 'Use the chat estimate — we will talk through aluminum, glass, and combo directions for your size and city.',
      },
      {
        q: 'How much does a rain-ready aluminum cover cost in Vancouver?',
        a: PRICING_COPY.aluminumOnly,
      },
      {
        q: 'Is glass still good for Vancouver rain?',
        a: 'Yes when engineered with proper slope and drainage — it sheds water while keeping the patio brighter than a solid roof.',
      },
    ],
    relatedPageLinks: [
      { path: '/glass-vs-aluminum-patio-covers', label: 'Glass vs aluminum guide' },
      { path: '/aluminum-patio-covers-vancouver', label: 'Aluminum patio covers in Vancouver' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Burnaby aluminum patio cover providing rain protection over a backyard seating area',
      caption:
        'Burnaby aluminum patio cover — rain-first protection for a typical Lower Mainland backyard. A practical starting point before comparing glass.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
  },
  'install-timeline': {
    id: 'install-timeline',
    path: '/how-long-does-patio-cover-installation-take',
    datePublished: '2026-06-01',
    dateModified: '2026-06-19',
    heroImage: '/house/skyline/skyline-hero.png',
    metaTitle: 'Patio Cover Install Timeline | Vancouver | LoomiHome',
    metaDescription:
      'Patio cover installation timeline — typical phases from estimate to completion in Metro Vancouver. Plan your project with a fast rough quote first.',
    h1: 'How Long Does Patio Cover Installation Take?',
    intro:
      'Most homeowners care about two timelines: how long until they understand price, and how long until the cover is installed. We compress the first part — you can get a rough patio cover estimate in about a minute in chat. After that, a free site visit locks measurements and scope. Install timing then depends on product, season, and how busy the schedule is — we give realistic ranges once your project is defined.',
    sections: [
      {
        h2: 'Phase 1 — fast ballpark (same day)',
        body: 'Chat estimate with approximate size and location. No site visit required yet.',
      },
      {
        h2: 'Phase 2 — measurement & final quote',
        body: 'We visit, measure, confirm attachment and product choice, then provide firm pricing and next steps.',
      },
      {
        h2: 'Phase 3 — order & install',
        body: 'Lead times vary by product and season. We communicate scheduling clearly once you approve the quote.',
      },
      {
        h2: 'What can slow the project down',
        body: 'Custom sizes, material availability, weather windows, permit requirements, and unusual attachment conditions can all affect timing. The earlier we understand the site, the easier it is to give a realistic schedule.',
      },
      {
        h2: 'How to speed up the first step',
        body: 'Send approximate dimensions, city, product preference, and photos if you have them. That gives us enough context to ballpark quickly before booking a site visit.',
      },
    ],
    pricingNote:
      'Wondering if the project fits your timeline and budget? Start with chat — it is the fastest way to answer the budget side.',
    faqs: [
      {
        q: 'How long does patio cover installation take on site?',
        a: 'Many residential covers take a modest number of days on site once materials arrive, but scope drives everything. We give a realistic window after measurement.',
      },
      {
        q: 'Can I get an estimate today?',
        a: 'Yes — the rough estimate is designed to happen immediately in chat.',
      },
      {
        q: 'What happens between chat estimate and installation?',
        a: 'Free on-site measurement locks dimensions and scope, then you approve final pricing before materials are ordered and install is scheduled.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-cover-contractors-near-me', label: 'Patio cover contractors near me' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost guide' },
      { path: '/do-you-need-a-permit-for-a-patio-cover-in-vancouver', label: 'Patio cover permit guide' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Surrey skyline combo patio cover after installation on a residential backyard',
      caption:
        'Surrey skyline combo install — chat ballpark first, measurement second, then scheduling once materials arrive. Typical flow for combo and glass projects.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
  },
  'fraser-valley': {
    id: 'fraser-valley',
    path: '/fraser-valley-patio-covers',
    datePublished: '2026-07-31',
    dateModified: '2026-07-31',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Fraser Valley Patio Covers | Abbotsford & Pitt Meadows | LoomiHome',
    metaDescription:
      'Fraser Valley patio covers — Abbotsford, Pitt Meadows, Maple Ridge, and nearby communities. Compare aluminum, glass, and combo covers with a fast rough estimate.',
    h1: 'Fraser Valley Patio Covers — Abbotsford, Pitt Meadows & Nearby',
    intro:
      'Fraser Valley homeowners searching for patio covers often have larger backyards, seasonal rain, and a mix of suburban and semi-rural lots. Whether you are in Abbotsford, Pitt Meadows, Maple Ridge, or nearby communities, the process is the same: get a fast rough estimate in chat, compare aluminum, glass, skyline combo, or sunroom options, then book a free on-site measurement when the range fits your budget.',
    sections: [
      {
        h2: 'Why Fraser Valley patios are different from city lots',
        body: 'Many Fraser Valley homes have wider spans, more yard access, and different wind exposure than compact Vancouver lots. That can change post placement, drainage, and which product type makes sense first.',
      },
      {
        h2: 'Aluminum vs glass vs combo in the Valley',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass is worth comparing when you want more light. Skyline combo covers sit in the middle when you want both shade and brightness without a full-glass budget.',
      },
      {
        h2: 'Abbotsford and Clearbrook considerations',
        body: 'Larger suburban lots in Clearbrook, Sumas Mountain, and Downtown Abbotsford often support wider patio footprints. Chat helps you ballpark aluminum and combo options before anyone visits the property.',
      },
      {
        h2: 'Pitt Meadows and Maple Ridge spans',
        body: 'Wider backyards can make combo and aluminum layouts especially useful. Share approximate dimensions in chat — we can compare multiple product directions from the same size.',
      },
      {
        h2: 'Estimate first, measure second',
        body: 'We designed the flow so you understand budget range before booking visits. Formal pricing always follows a free on-site measurement.',
      },
    ],
    pricingNote:
      'Share your Fraser Valley city, neighbourhood, and rough patio size in chat for a planning range before free measurement.',
    faqs: [
      {
        q: 'Do you install patio covers in Abbotsford?',
        a: 'Yes — Clearbrook, Sumas Mountain, and Downtown Abbotsford are regular Fraser Valley service areas.',
      },
      {
        q: 'Do you serve Pitt Meadows and Maple Ridge?',
        a: 'Yes — both are part of our Lower Mainland coverage with the same chat estimate flow.',
      },
      {
        q: 'What is a typical aluminum patio cover cost in the Fraser Valley?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Can I compare aluminum and glass for the same patio?',
        a: 'Yes. We can ballpark both from the same rough dimensions in one chat session.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-abbotsford', label: 'Patio covers in Abbotsford' },
      { path: '/patio-cover-contractor-abbotsford', label: 'Patio cover contractor in Abbotsford' },
      { path: '/patio-cover-cost-abbotsford', label: 'Patio cover cost in Abbotsford' },
      { path: '/patio-covers-pitt-meadows', label: 'Patio covers in Pitt Meadows' },
      { path: '/patio-covers-maple-ridge', label: 'Patio covers in Maple Ridge' },
      { path: '/projects/abbotsford-aluminum-patio-cover', label: 'Abbotsford project example' },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Skyline combo patio cover on a large suburban backyard similar to Fraser Valley lots',
      caption:
        'Fraser Valley-style combo cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/abbotsford-aluminum-patio-cover',
    },
  },
  coastal: {
    id: 'coastal',
    path: '/coastal-patio-covers-vancouver',
    datePublished: '2026-08-04',
    dateModified: '2026-08-04',
    heroImage: '/house/glass/glass-hero.png',
    metaTitle: 'Coastal Patio Covers Vancouver | White Rock & West Van | LoomiHome',
    metaDescription:
      'Coastal patio covers for White Rock, West Vancouver, Delta, and South Surrey — wind, rain, and light considerations. Compare aluminum and glass with a fast rough estimate.',
    h1: 'Coastal Patio Covers — White Rock, West Vancouver & South Surrey',
    intro:
      'Coastal patio covers face a different set of questions than inland city lots: ocean exposure, wind, compact seaside decks, and the need to keep living areas bright. Whether you are in White Rock, West Vancouver, Delta, or nearby South Surrey, start with a fast rough estimate in chat, compare aluminum and glass, then book a free measurement when the range fits.',
    sections: [
      {
        h2: 'Wind and rain on coastal patios',
        body: 'Coastal homes often need proper slope, attachment, and drainage — not just a roof overhead. We confirm those details during measurement rather than guessing from photos alone.',
      },
      {
        h2: 'Glass vs aluminum near the water',
        body: 'Glass is popular when homeowners want rain protection without darkening walkout decks and rear windows. Aluminum is usually the practical budget option when rain coverage matters most.',
      },
      {
        h2: 'White Rock and South Surrey decks',
        body: 'Compact seaside lots in White Rock and nearby South Surrey often need careful post placement and product choice. Chat helps narrow aluminum vs glass before a site visit.',
      },
      {
        h2: 'West Vancouver and North Shore exposure',
        body: 'West Vancouver and North Shore homes may balance view lines, wind, and premium finishes. Glass and combo options are worth comparing when light is a priority.',
      },
      {
        h2: 'Delta and Tsawwassen coastal considerations',
        body: 'Delta patios can see coastal wind and rain exposure similar to other waterfront communities. Share your neighbourhood and rough size for a useful first ballpark.',
      },
    ],
    pricingNote:
      'Tell us your coastal city, approximate patio size, and whether light or budget matters more. We can compare products in one chat session.',
    faqs: [
      {
        q: 'Do you install patio covers in White Rock?',
        a: 'Yes — East Beach, West Beach, and nearby South Surrey are regular service areas.',
      },
      {
        q: 'Do you serve West Vancouver for patio covers?',
        a: 'Yes — Ambleside, Dundarave, and the British Properties are part of our North Shore coverage.',
      },
      {
        q: 'Is glass practical for coastal rain and wind?',
        a: 'Yes when engineered with proper slope, flashing, and drainage. We confirm those details on site.',
      },
      {
        q: 'What is a typical aluminum patio cover cost?',
        a: PRICING_COPY.example12x14Aluminum,
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-white-rock', label: 'Patio covers in White Rock' },
      { path: '/patio-covers-west-vancouver', label: 'Patio covers in West Vancouver' },
      { path: '/glass-patio-covers-white-rock', label: 'Glass patio covers in White Rock' },
      { path: '/projects/white-rock-glass-patio-cover', label: 'White Rock glass project' },
      { path: '/projects/west-vancouver-glass-patio-cover', label: 'West Vancouver glass project' },
    ],
    caseStudy: {
      image: '/house/before-after/vancouver-glass-after.png',
      alt: 'Glass patio cover on a coastal Metro Vancouver home with natural light under tempered glass roof',
      caption:
        'Coastal glass patio cover reference — compare glass and aluminum on your deck size in chat before free measurement.',
      projectPath: '/projects/white-rock-glass-patio-cover',
    },
  },
  'tri-cities': {
    id: 'tri-cities',
    path: '/tri-cities-patio-covers',
    datePublished: '2026-08-26',
    dateModified: '2026-08-26',
    heroImage: '/house/before-after/coquitlam-glass-after.png',
    metaTitle: 'Tri-Cities Patio Covers | Coquitlam Port Moody PoCo | LoomiHome',
    metaDescription:
      'Tri-Cities patio covers — Coquitlam, Port Coquitlam, and Port Moody. Compare aluminum, glass, and combo covers with a fast rough estimate before free measurement.',
    h1: 'Tri-Cities Patio Covers — Coquitlam, Port Coquitlam & Port Moody',
    intro:
      'Tri-Cities homeowners searching for patio covers often deal with hillside decks, compact townhome patios, and wet springs that keep outdoor spaces unused. Whether you are in Coquitlam, Port Coquitlam, or Port Moody, the process is the same: get a fast rough estimate in chat, compare aluminum, glass, skyline combo, or sunroom options, then book a free on-site measurement when the range fits your budget.',
    sections: [
      {
        h2: 'Why Tri-Cities patios need local planning',
        body: 'Burke Mountain slopes, Port Coquitlam family yards, and Port Moody walkout decks do not share the same attachment or drainage conditions. A chat ballpark uses your city and size first; measurement confirms the layout.',
      },
      {
        h2: 'Aluminum vs glass vs combo in the Tri-Cities',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass is worth comparing when you want more light near rear doors and windows. Skyline combo covers sit in the middle when you want both shade and brightness.',
      },
      {
        h2: 'Coquitlam — Burke Mountain, Maillardville, Westwood Plateau',
        body: 'Hillside decks and varied elevations are common. Share approximate dimensions and a photo so the first estimate reflects attachment height and span.',
      },
      {
        h2: 'Port Coquitlam and Port Moody neighbourhoods',
        body: 'Citadel Heights, Mary Hill, Moody Centre, and Suter Brook each have different lot depths and view lines. Chat helps you compare products before anyone visits.',
      },
      {
        h2: 'Estimate first, measure second',
        body: 'We designed the flow so you understand budget range before booking visits. Formal pricing always follows a free on-site measurement.',
      },
    ],
    pricingNote:
      'Share your Tri-Cities city, neighbourhood, and rough patio size in chat for a planning range before free measurement.',
    faqs: [
      {
        q: 'Do you install patio covers in Coquitlam?',
        a: 'Yes — Burke Mountain, Maillardville, Westwood Plateau, and nearby areas are regular Tri-Cities service areas.',
      },
      {
        q: 'Do you serve Port Coquitlam and Port Moody?',
        a: 'Yes — both are part of our Lower Mainland coverage with the same chat estimate flow.',
      },
      {
        q: 'What is a typical aluminum patio cover cost in the Tri-Cities?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Can I compare aluminum and glass for the same patio?',
        a: 'Yes. We can ballpark both from the same rough dimensions in one chat session.',
      },
    ],
    relatedPageLinks: [
      { path: '/patio-covers-coquitlam', label: 'Patio covers in Coquitlam' },
      { path: '/patio-cover-cost-coquitlam', label: 'Patio cover cost in Coquitlam' },
      { path: '/patio-covers-port-coquitlam', label: 'Patio covers in Port Coquitlam' },
      { path: '/patio-covers-port-moody', label: 'Patio covers in Port Moody' },
      { path: '/projects/coquitlam-glass-patio-cover', label: 'Coquitlam glass project' },
      { path: '/projects/coquitlam-aluminum-patio-cover', label: 'Coquitlam aluminum project' },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover on a Coquitlam Tri-Cities backyard patio',
      caption:
        'Tri-Cities glass patio cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
  },
  'patio-cover-cost-abbotsford': {
    id: 'patio-cover-cost-abbotsford',
    path: '/patio-cover-cost-abbotsford',
    datePublished: '2026-08-05',
    dateModified: '2026-08-05',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Abbotsford | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Abbotsford? What drives price in the Fraser Valley, typical ranges, and how to get a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Abbotsford',
    intro:
      'If you are researching patio cover cost in Abbotsford, you have probably seen numbers that do not match your lot. Fraser Valley homes often have wider spans, larger backyards, and different attachment conditions than compact Vancouver patios — and that changes the planning range. The fastest way to get oriented is a rough chat estimate for your actual size: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price in Abbotsford?',
        body: 'Size and span, product type (aluminum, glass, or skyline combo), attachment to the home, post placement, slope, and finish level all matter. Larger Clearbrook and Sumas Mountain lots can support wider footprints, which changes layout and engineering compared to townhome patios.',
      },
      {
        h2: 'Fraser Valley pricing vs Vancouver city lots',
        body: 'Abbotsford installs often involve more yard access and wider spans than dense city lots. That can change post count and material direction even when the square footage looks similar on paper.',
      },
      {
        h2: 'Why a generic “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses Abbotsford and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
      {
        h2: 'What to prepare for a better Abbotsford estimate',
        body: 'A rough width, projection from the house, neighbourhood, and one or two photos are enough to make the first ballpark more useful. Exact measurements come later during the free site visit.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your Abbotsford size and product direction.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Abbotsford?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost in Abbotsford?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Do you also serve Pitt Meadows and Maple Ridge?',
        a: 'Yes — both are part of our Fraser Valley coverage with the same chat estimate flow.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Aluminum patio cover on a wide suburban backyard similar to Abbotsford lots',
      caption:
        'Abbotsford-style aluminum patio cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/abbotsford-aluminum-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-abbotsford', label: 'Patio covers in Abbotsford' },
      { path: '/patio-cover-contractor-abbotsford', label: 'Patio cover contractor in Abbotsford' },
      { path: '/fraser-valley-patio-covers', label: 'Fraser Valley patio covers guide' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost in Vancouver' },
      { path: '/patio-cover-cost-surrey', label: 'Patio cover cost in Surrey' },
    ],
  },
  'patio-cover-cost-surrey': {
    id: 'patio-cover-cost-surrey',
    path: '/patio-cover-cost-surrey',
    datePublished: '2026-08-18',
    dateModified: '2026-08-18',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Surrey | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Surrey? What drives price for Guildford, Cloverdale, and South Surrey lots, typical ranges, and a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Surrey',
    intro:
      'If you are researching patio cover cost in Surrey, you have probably seen generic numbers that do not match Guildford townhome patios or wider Cloverdale and South Surrey backyards. Size, product type, and lot layout all move the total. The fastest way to get oriented is a rough chat estimate for your actual patio: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price in Surrey?',
        body: 'Span and square footage, whether you choose aluminum, glass, or skyline combo, attachment to the home, post placement, slope, and finish level all matter. Surrey includes compact townhome patios and wide detached-home yards — those two layouts rarely price the same even when the city name is identical.',
      },
      {
        h2: 'Guildford, Cloverdale, Newton, and South Surrey',
        body: 'Neighbourhood layout changes access, span, and how much cover you actually need. South Surrey and Cloverdale lots often have room for wider footprints; Newton and Guildford can be tighter. Share the neighbourhood with approximate dimensions so the first ballpark is useful.',
      },
      {
        h2: 'Aluminum vs glass vs combo on Surrey pricing',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass costs more when you want to keep the patio and rear rooms bright. Skyline combo sits in the middle for larger Surrey backyards that want both shade and light.',
      },
      {
        h2: 'Why a generic “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses Surrey and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your Surrey size, neighbourhood, and product direction.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Surrey?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost in Surrey?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Do you also serve White Rock and Langley?',
        a: 'Yes — White Rock, South Surrey, Langley, and nearby Lower Mainland communities use the same chat estimate flow.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/surrey-skyline-after.png',
      alt: 'Skyline combo patio cover on a large Surrey backyard with glass and V-panel sections',
      caption:
        'Surrey skyline combo reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/surrey-skyline-combo-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-surrey', label: 'Patio covers in Surrey' },
      { path: '/patio-cover-contractor-surrey', label: 'Patio cover contractor in Surrey' },
      { path: '/aluminum-patio-covers-surrey', label: 'Aluminum patio covers in Surrey' },
      { path: '/projects/surrey-aluminum-patio-cover', label: 'Surrey aluminum project' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost in Vancouver' },
      { path: '/patio-cover-cost-burnaby', label: 'Patio cover cost in Burnaby' },
    ],
  },
  'patio-cover-cost-burnaby': {
    id: 'patio-cover-cost-burnaby',
    path: '/patio-cover-cost-burnaby',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Burnaby | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Burnaby? What drives price for Metrotown, Brentwood, and Deer Lake lots, typical ranges, and a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Burnaby',
    intro:
      'If you are researching patio cover cost in Burnaby, you have probably seen numbers that do not match tight Metrotown lots or roomier Deer Lake backyards. Size, product type, and attachment conditions all move the total. The fastest way to get oriented is a rough chat estimate for your actual patio: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price in Burnaby?',
        body: 'Span and square footage, whether you choose aluminum, glass, or skyline combo, attachment to the home, post placement, slope, and finish level all matter. Burnaby includes compact city yards near Metrotown and wider suburban spaces near Deer Lake — those layouts rarely price the same even when the city name is identical.',
      },
      {
        h2: 'Metrotown, Brentwood, Edmonds, and Deer Lake',
        body: 'Neighbourhood layout changes access, span, and how much cover you actually need. Tight lots often need careful post placement; larger yards can support wider footprints. Share the neighbourhood with approximate dimensions so the first ballpark is useful.',
      },
      {
        h2: 'Aluminum vs glass vs combo on Burnaby pricing',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass costs more when you want to keep the patio and rear rooms bright. Skyline combo sits in the middle when you want both shade and light without a full-glass budget.',
      },
      {
        h2: 'Why a generic “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses Burnaby and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your Burnaby size, neighbourhood, and product direction.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Burnaby?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost in Burnaby?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Do you also serve Vancouver and Coquitlam?',
        a: 'Yes — Vancouver, Coquitlam, and nearby Metro Vancouver communities use the same chat estimate flow.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/burnaby-aluminum-after.png',
      alt: 'Aluminum patio cover on a Burnaby backyard patio for rain protection',
      caption:
        'Burnaby aluminum patio cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/burnaby-aluminum-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-burnaby', label: 'Patio covers in Burnaby' },
      { path: '/patio-cover-contractor-burnaby', label: 'Patio cover contractor in Burnaby' },
      { path: '/aluminum-patio-covers-burnaby', label: 'Aluminum patio covers in Burnaby' },
      { path: '/glass-patio-covers-burnaby', label: 'Glass patio covers in Burnaby' },
      { path: '/projects/burnaby-glass-patio-cover', label: 'Burnaby glass project' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost in Vancouver' },
      { path: '/patio-cover-cost-langley', label: 'Patio cover cost in Langley' },
    ],
  },
  'patio-cover-cost-langley': {
    id: 'patio-cover-cost-langley',
    path: '/patio-cover-cost-langley',
    datePublished: '2026-08-21',
    dateModified: '2026-08-21',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Langley | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Langley? What drives price for Willoughby, Walnut Grove, and Brookswood lots, typical ranges, and a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Langley',
    intro:
      'If you are researching patio cover cost in Langley, you have probably seen generic numbers that do not match newer Willoughby walkout decks or wider Walnut Grove and Brookswood backyards. Size, product type, and attachment conditions all move the total. The fastest way to get oriented is a rough chat estimate for your actual patio: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price in Langley?',
        body: 'Span and square footage, whether you choose aluminum, glass, or skyline combo, attachment to the home or deck, post placement, slope, and finish level all matter. Langley includes townhome patios and generous detached-home yards — those layouts rarely price the same even when the city name is identical.',
      },
      {
        h2: 'Willoughby, Walnut Grove, Murrayville, and Brookswood',
        body: 'Neighbourhood layout changes access, span, and how much cover you actually need. Newer subdivisions often have walkout decks and larger rear windows; established lots can support wider footprints. Share the neighbourhood with approximate dimensions so the first ballpark is useful.',
      },
      {
        h2: 'Aluminum vs glass vs combo on Langley pricing',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass costs more when you want to keep the deck and rear rooms bright. Skyline combo sits in the middle when you want both shade and light without a full-glass budget.',
      },
      {
        h2: 'Why a generic “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses Langley and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your Langley size, neighbourhood, and product direction.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Langley?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost in Langley?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Do you also serve Surrey and Abbotsford?',
        a: 'Yes — Surrey, Abbotsford, and nearby Fraser Valley communities use the same chat estimate flow.',
      },
    ],
    caseStudy: {
      image: '/house/Aluminum/p27.jpg',
      alt: 'Aluminum patio cover on a Langley family backyard patio',
      caption:
        'Langley aluminum patio cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/langley-aluminum-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-langley', label: 'Patio covers in Langley' },
      { path: '/patio-cover-contractor-langley', label: 'Patio cover contractor in Langley' },
      { path: '/aluminum-patio-covers-langley', label: 'Aluminum patio covers in Langley' },
      { path: '/glass-patio-covers-langley', label: 'Glass patio covers in Langley' },
      { path: '/projects/langley-glass-patio-cover', label: 'Langley glass project' },
      { path: '/patio-cover-cost-surrey', label: 'Patio cover cost in Surrey' },
      { path: '/patio-cover-cost-richmond', label: 'Patio cover cost in Richmond' },
    ],
  },
  'patio-cover-cost-richmond': {
    id: 'patio-cover-cost-richmond',
    path: '/patio-cover-cost-richmond',
    datePublished: '2026-08-25',
    dateModified: '2026-08-25',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Richmond | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Richmond? What drives price for Steveston, Broadmoor, and East Cambie lots, typical ranges, and a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Richmond',
    intro:
      'If you are researching patio cover cost in Richmond, you have probably seen numbers that do not match compact City Centre patios or wider Steveston and Broadmoor backyards. Size, product type, coastal exposure, and whether you need a backyard cover or a carport-style side cover all move the total. The fastest way to get oriented is a rough chat estimate for your actual patio: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price in Richmond?',
        body: 'Span and square footage, whether you choose aluminum, glass, or skyline combo, attachment to the home, post placement, slope, and finish level all matter. Richmond also includes long narrow side-driveway covers that price differently than square backyard patios — even when the city name is the same.',
      },
      {
        h2: 'Steveston, Broadmoor, East Cambie, and Burkeville',
        body: 'Neighbourhood layout changes access, span, and how much cover you actually need. Flat lots near the water can still see wind and rain exposure. Share the neighbourhood with approximate dimensions so the first ballpark is useful.',
      },
      {
        h2: 'Aluminum vs glass vs combo on Richmond pricing',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass costs more when you want to keep the patio and rear rooms bright. Skyline combo sits in the middle when you want both shade and light without a full-glass budget.',
      },
      {
        h2: 'Why a generic “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses Richmond and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your Richmond size, neighbourhood, and product direction.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Richmond?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost in Richmond?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Do you also serve Vancouver and Delta?',
        a: 'Yes — Vancouver, Delta, and nearby Metro Vancouver communities use the same chat estimate flow.',
      },
    ],
    caseStudy: {
      image: '/house/Aluminum/p27.jpg',
      alt: 'Aluminum patio cover on a Richmond backyard patio',
      caption:
        'Richmond aluminum patio cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/richmond-aluminum-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-richmond', label: 'Patio covers in Richmond' },
      { path: '/patio-cover-contractor-richmond', label: 'Patio cover contractor in Richmond' },
      { path: '/aluminum-patio-covers-richmond', label: 'Aluminum patio covers in Richmond' },
      { path: '/glass-patio-covers-richmond', label: 'Glass patio covers in Richmond' },
      { path: '/projects/richmond-glass-patio-cover', label: 'Richmond glass project' },
      { path: '/patio-cover-cost-vancouver', label: 'Patio cover cost in Vancouver' },
      { path: '/patio-cover-cost-coquitlam', label: 'Patio cover cost in Coquitlam' },
    ],
  },
  'patio-cover-cost-coquitlam': {
    id: 'patio-cover-cost-coquitlam',
    path: '/patio-cover-cost-coquitlam',
    datePublished: '2026-08-26',
    dateModified: '2026-08-26',
    heroImage: '/house/Aluminum/aluminum-hero.png',
    metaTitle: 'Patio Cover Cost Coquitlam | LoomiHome Patios',
    metaDescription:
      'How much does a patio cover cost in Coquitlam? What drives price for Burke Mountain, Maillardville, and Tri-Cities lots, typical ranges, and a fast rough estimate before free measurement.',
    h1: 'Patio Cover Cost in Coquitlam',
    intro:
      'If you are researching patio cover cost in Coquitlam, you have probably seen numbers that do not match hillside Burke Mountain decks or more compact Maillardville and Austin Heights patios. Size, product type, slope, and attachment conditions all move the total. The fastest way to get oriented is a rough chat estimate for your actual patio: about a minute, no site visit yet. Then, if the range makes sense, we book a free measurement and give you firm numbers.',
    sections: [
      {
        h2: 'What usually drives patio cover price in Coquitlam?',
        body: 'Span and square footage, whether you choose aluminum, glass, or skyline combo, attachment to the home or deck, post placement, slope, and finish level all matter. Coquitlam includes hillside lots and flatter Tri-Cities yards — those layouts rarely price the same even when the city name is identical.',
      },
      {
        h2: 'Burke Mountain, Maillardville, Westwood Plateau, and Austin Heights',
        body: 'Neighbourhood layout changes access, height, and how much cover you actually need. Sloped lots often need careful attachment planning; wider yards can support larger footprints. Share the neighbourhood with approximate dimensions so the first ballpark is useful.',
      },
      {
        h2: 'Aluminum vs glass vs combo on Coquitlam pricing',
        body: 'Aluminum is usually the rain-first starting point for practical budget. Glass costs more when you want to keep the patio and rear rooms bright. Skyline combo sits in the middle when you want both shade and light without a full-glass budget.',
      },
      {
        h2: 'Why a generic “starting from” number is not enough',
        body: 'Starting prices are useful for orientation, but your patio is not generic. A ballpark that uses Coquitlam and approximate dimensions is far more actionable — which is why we built the fast estimate flow first.',
      },
      {
        h2: 'Rough quote first, accurate quote second',
        body: 'We believe you should understand budget range before spending an evening on sales appointments. Chat for a ballpark, then a free on-site visit when you want line-item clarity and a measured final price.',
      },
    ],
    pricingNote:
      'Browse our product cards on the homepage for example “from” pricing by cover type — then refine in chat for your Coquitlam size, neighbourhood, and product direction.',
    faqs: [
      {
        q: 'How much does a patio cover usually cost in Coquitlam?',
        a: PRICING_COPY.threeWayCompare,
      },
      {
        q: 'Is the chat estimate binding?',
        a: 'It is a planning range only. Your formal quote is always confirmed after free on-site measurement and site review.',
      },
      {
        q: 'Example: what might a 12×14 ft aluminum cover cost in Coquitlam?',
        a: PRICING_COPY.example12x14Aluminum,
      },
      {
        q: 'Do you also serve Port Coquitlam and Port Moody?',
        a: 'Yes — both Tri-Cities neighbours use the same chat estimate flow. See our Tri-Cities patio covers guide for nearby examples.',
      },
    ],
    caseStudy: {
      image: '/house/before-after/coquitlam-glass-after.png',
      alt: 'Glass patio cover on a Coquitlam backyard patio',
      caption:
        'Coquitlam patio cover reference — compare aluminum, glass, and combo on your dimensions in chat before free measurement.',
      projectPath: '/projects/coquitlam-glass-patio-cover',
    },
    relatedPageLinks: [
      { path: '/patio-covers-coquitlam', label: 'Patio covers in Coquitlam' },
      { path: '/patio-cover-contractor-coquitlam', label: 'Patio cover contractor in Coquitlam' },
      { path: '/tri-cities-patio-covers', label: 'Tri-Cities patio covers guide' },
      { path: '/aluminum-patio-covers-coquitlam', label: 'Aluminum patio covers in Coquitlam' },
      { path: '/glass-patio-covers-coquitlam', label: 'Glass patio covers in Coquitlam' },
      { path: '/projects/coquitlam-aluminum-patio-cover', label: 'Coquitlam aluminum project' },
    ],
  },
};
