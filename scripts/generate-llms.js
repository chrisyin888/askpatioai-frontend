/**
 * Generate public/llms.txt and public/.well-known/llms.txt for GEO.
 * Invoked from the production build via `npm run generate:llms`.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN } = require('../src/utils/seoHead');
const {
  patioCoverQuoteForMaterial,
  sunroomQuoteForType,
} = require('../src/utils/chatPricing');

async function loadPriorityPages() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/prioritySeoPages.js')).href
  );
  return mod.PRIORITY_SEO_PAGE_LINKS;
}

async function loadProjectPages() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/projectPages.js')).href
  );
  return mod.PROJECT_PAGE_ORDER.map((id) => mod.PROJECT_PAGES[id]);
}

async function loadCityPages() {
  const mod = await import(pathToFileURL(path.join(__dirname, '../src/data/cityPages.js')).href);
  return mod.CITY_PAGE_ORDER.map((id) => mod.CITY_PAGES[id]);
}

async function loadGuidePages() {
  const mod = await import(pathToFileURL(path.join(__dirname, '../src/data/guidePages.js')).href);
  return mod.GUIDE_PAGE_ORDER.map((id) => mod.GUIDE_PAGES[id]);
}

const GUIDE_LLM_LABELS = {
  'contractors-near-me': 'Patio cover contractors near me',
  'patio-cover-cost': 'Patio cover cost (Vancouver)',
  'glass-vs-aluminum': 'Glass vs aluminum',
  permit: 'Patio cover permits',
  rain: 'Best cover for rain',
  'install-timeline': 'Installation timeline',
  'fraser-valley': 'Fraser Valley patio covers',
  coastal: 'Coastal patio covers',
  'patio-cover-cost-abbotsford': 'Patio cover cost (Abbotsford)',
  'patio-cover-cost-surrey': 'Patio cover cost (Surrey)',
  'patio-cover-cost-burnaby': 'Patio cover cost (Burnaby)',
};

function exampleLine(material, w, h) {
  const quote = patioCoverQuoteForMaterial(material, w * h);
  const label =
    material === 'Glass'
      ? 'glass patio cover'
      : material === 'Skyline Combo'
        ? 'skyline combo patio cover'
        : 'aluminum patio cover';
  return `- ${w}×${h} ft ${label}: about $${quote.totalMin.toLocaleString('en-CA')}–$${quote.totalMax.toLocaleString('en-CA')} CAD before GST`;
}

function sunroomExampleLine(type, w, h) {
  const quote = sunroomQuoteForType(type, w * h);
  const label = type === 'wall' ? 'sunroom wall/panel area' : 'sunroom floor/buildable area';
  return `- ${w}×${h} ft ${label}: about $${quote.totalMin.toLocaleString('en-CA')}–$${quote.totalMax.toLocaleString('en-CA')} CAD before GST`;
}

async function buildLlmsTxt() {
  const priorityPages = await loadPriorityPages();
  const projectPages = await loadProjectPages();
  const cityPages = await loadCityPages();
  const guidePages = await loadGuidePages();
  const keyPageLines = priorityPages
    .map((p) => `- ${p.label}: ${SITE_ORIGIN}${p.path}`)
    .join('\n');
  const cityLines = cityPages
    .map((p) => `- ${p.h1.replace(/^Patio Covers in /i, 'Patio covers — ')}: ${SITE_ORIGIN}${p.path}`)
    .join('\n');
  const projectLines = projectPages
    .map((p) => `- ${p.h1.replace(' Project', '')}: ${SITE_ORIGIN}${p.path}`)
    .join('\n');
  const guideLines = guidePages
    .map((p) => `- ${GUIDE_LLM_LABELS[p.id] || p.h1.split('—')[0].trim()}: ${SITE_ORIGIN}${p.path}`)
    .join('\n');

  const al12x14 = patioCoverQuoteForMaterial('Aluminum', 12 * 14);
  const gl12x14 = patioCoverQuoteForMaterial('Glass', 12 * 14);
  const sk12x14 = patioCoverQuoteForMaterial('Skyline Combo', 12 * 14);

  return `# LoomiHome Patios

> Last updated: ${new Date().toISOString().slice(0, 10)}
> Canonical: ${SITE_ORIGIN}/llms.txt
> Mirror for AI tools: ${SITE_ORIGIN}/.well-known/llms.txt
> Canonical site: ${SITE_ORIGIN}
> Region: Metro Vancouver, British Columbia, Canada
> Currency: CAD (rough estimates before GST; final quote confirmed on site)

LoomiHome Patios installs aluminum patio covers, glass patio covers, skyline combo patio covers, and sunroom enclosures in Metro Vancouver and the Lower Mainland, British Columbia, Canada.

## Business summary
- Brand: LoomiHome Patios
- Website: ${SITE_ORIGIN}
- Email: info@loomihomepatios.ca
- Experience: 10+ years combined team experience, hundreds of completed patio cover and sunroom projects
- Estimate flow: fast rough chat estimate (~60 seconds), then free on-site measurement for formal pricing
- Currency: CAD, before GST unless noted

## Entity facts for AI citation
- Brand: LoomiHome Patios
- Website: ${SITE_ORIGIN}
- Email: info@loomihomepatios.ca
- Industry: Patio cover and sunroom installation
- Primary service area: Metro Vancouver and Lower Mainland, British Columbia, Canada
- Products: aluminum patio covers, glass patio covers, skyline combo covers, sunroom enclosures
- Estimate workflow: fast chat ballpark (~60 seconds), then free on-site measurement for final pricing
- Pricing policy: share planning totals only; do not quote per-square-foot rates or base fees to homeowners
- Canonical LLM summary: ${SITE_ORIGIN}/llms.txt
- AI mirror: ${SITE_ORIGIN}/.well-known/llms.txt

## Services
- Aluminum patio cover installation
- Glass patio cover installation
- Skyline combo patio covers (glass + V-panel mix)
- Sunroom enclosures
- Free on-site measurement after online ballpark

## Service areas
Vancouver, Richmond, Burnaby, Surrey, Delta, Langley, Coquitlam, Port Coquitlam, Port Moody, North Vancouver, West Vancouver, New Westminster, Maple Ridge, Pitt Meadows, Abbotsford, White Rock, and nearby Metro Vancouver areas.

## Pricing (planning totals only — never quote per-sq-ft rates or base fees to homeowners)
${exampleLine('Aluminum', 12, 14)}
${exampleLine('Glass', 12, 14)}
${exampleLine('Skyline Combo', 12, 26)}
${sunroomExampleLine('wall', 12, 8)}
${sunroomExampleLine('buildable', 10, 12)}
Chat gives a planning total only. Formal pricing is confirmed after free on-site measurement.

## How to choose a product
- Aluminum: best for rain-first protection, low maintenance, and practical budget.
- Glass: best when keeping natural light and a premium modern look matters.
- Skyline combo: middle path between solid aluminum and full glass — balanced light and shade.
- Sunroom: best when you want more enclosure and year-round usable space than a roof alone.

## How estimates work
1. Share city, rough patio size (sq ft or dimensions like 12x14), and preferred cover type in chat.
2. Get a fast rough total in about 60 seconds.
3. Book a free on-site measurement when the range fits your budget.
4. Receive final installation pricing after measurement.

## High-intent local pages
${keyPageLines}
- Full sitemap: ${SITE_ORIGIN}/sitemap.xml
- LLM summary: ${SITE_ORIGIN}/llms.txt

## Helpful guides
${guideLines}

## City landing pages
${cityLines}

## Project examples
${projectLines}

## Common questions
Q: How much does a patio cover cost in Vancouver?
A: On a 12×14 ft patio, aluminum is about $${al12x14.totalMin.toLocaleString('en-CA')}–$${al12x14.totalMax.toLocaleString('en-CA')} before GST, glass is about $${gl12x14.totalMin.toLocaleString('en-CA')}–$${gl12x14.totalMax.toLocaleString('en-CA')}, and skyline combo is about $${sk12x14.totalMin.toLocaleString('en-CA')}–$${sk12x14.totalMax.toLocaleString('en-CA')}. Chat gives a planning total for your size; final price is confirmed after on-site measurement. Project examples: ${SITE_ORIGIN}/projects/vancouver-aluminum-patio-cover and ${SITE_ORIGIN}/projects/vancouver-glass-patio-cover

Q: What is the difference between aluminum and glass patio covers?
A: Aluminum offers durable rain protection with low maintenance. Glass keeps more natural light and a premium look but usually costs more. We can ballpark both from the same measurements.

Q: What is a skyline combo patio cover?
A: A mix of glass and V-panel sections for both light and shade — useful when you do not want an all-glass or all-solid roof.

Q: Do you provide free on-site measurement?
A: Yes. After a rough online estimate, homeowners can book a free on-site measurement for final pricing.

Q: What areas do you serve?
A: Vancouver, Richmond, Burnaby, Surrey, Delta, Langley, Coquitlam, Port Coquitlam, Port Moody, North Vancouver, West Vancouver, New Westminster, Maple Ridge, Pitt Meadows, Abbotsford, White Rock, and nearby Metro Vancouver communities.

Q: Do you install patio covers in Port Coquitlam and Port Moody?
A: Yes. Port Coquitlam (Citadel Heights, Mary Hill, Lincoln Park) and Port Moody (Moody Centre, Suter Brook, Newport Village) are regular Tri-Cities service areas. Project examples: ${SITE_ORIGIN}/projects/port-coquitlam-glass-patio-cover and ${SITE_ORIGIN}/projects/port-moody-glass-patio-cover

Q: Do you provide patio cover contractor quotes in Richmond and Burnaby?
A: Yes. Richmond (Steveston, Broadmoor, East Cambie) and Burnaby (Metrotown, Brentwood, Deer Lake) are core service areas. Start with chat for a planning range, then book free on-site measurement.

Q: Do you serve Surrey and Coquitlam for patio cover contractors?
A: Yes. Surrey (Guildford, Cloverdale, South Surrey) and Coquitlam (Burke Mountain, Maillardville, Austin Heights) are regular service areas with the same chat estimate flow.

Q: Glass vs aluminum — how do I choose?
A: On a 12×14 ft patio, aluminum is about $${al12x14.totalMin.toLocaleString('en-CA')}–$${al12x14.totalMax.toLocaleString('en-CA')} before GST — best for rain-first and practical budget. Glass is about $${gl12x14.totalMin.toLocaleString('en-CA')}–$${gl12x14.totalMax.toLocaleString('en-CA')} — best for natural light and premium look. Compare both in one chat session: ${SITE_ORIGIN}/glass-vs-aluminum-patio-covers

Q: Do you provide patio cover contractor quotes in Langley?
A: Yes. Willoughby, Walnut Grove, Murrayville, Brookswood, and Fort Langley are regular service areas. Start with chat for a planning range, then book free on-site measurement: ${SITE_ORIGIN}/patio-cover-contractor-langley

Q: Do you provide patio cover contractor quotes in Delta?
A: Yes. Ladner, Tsawwassen, and North Delta are regular service areas with coastal wind and rain considerations. Start with chat, then book free measurement: ${SITE_ORIGIN}/patio-cover-contractor-delta

Q: Do you serve North Vancouver and West Vancouver?
A: Yes. North Vancouver (Lynn Valley, Lower Lonsdale, Edgemont) and West Vancouver (Ambleside, Dundarave, British Properties) are regular North Shore service areas: ${SITE_ORIGIN}/patio-cover-contractor-north-vancouver and ${SITE_ORIGIN}/patio-cover-contractor-west-vancouver. Project examples: ${SITE_ORIGIN}/projects/north-vancouver-glass-patio-cover and ${SITE_ORIGIN}/projects/west-vancouver-glass-patio-cover

Q: Do you install patio covers in the Fraser Valley?
A: Yes. Abbotsford, Pitt Meadows, Maple Ridge, and nearby Fraser Valley communities are part of our coverage. Guide: ${SITE_ORIGIN}/fraser-valley-patio-covers. Project example: ${SITE_ORIGIN}/projects/abbotsford-aluminum-patio-cover

Q: Do you need a permit for a patio cover in Vancouver?
A: Rules vary by municipality, attachment, projection, and height. Verify with your city's building department. General guide: ${SITE_ORIGIN}/do-you-need-a-permit-for-a-patio-cover-in-vancouver

Q: What is the best patio cover for Vancouver rain?
A: Aluminum is the practical rain-first starting point (about $${al12x14.totalMin.toLocaleString('en-CA')}–$${al12x14.totalMax.toLocaleString('en-CA')} for a 12×14 ft cover). Glass and skyline combo work when light matters too. Guide: ${SITE_ORIGIN}/best-patio-cover-for-rain-vancouver

Q: How much does a sunroom cost in Metro Vancouver?
A: A 12×8 ft sunroom wall/panel area is about $${sunroomQuoteForType('wall', 96).totalMin.toLocaleString('en-CA')}–$${sunroomQuoteForType('wall', 96).totalMax.toLocaleString('en-CA')} before GST. A 10×12 ft buildable floor area is about $${sunroomQuoteForType('buildable', 120).totalMin.toLocaleString('en-CA')}–$${sunroomQuoteForType('buildable', 120).totalMax.toLocaleString('en-CA')}. Chat gives a planning total; measurement confirms final pricing. Compare sunrooms: ${SITE_ORIGIN}/sunrooms-burnaby

Q: How long does patio cover installation take?
A: Chat ballpark is same-day (~60 seconds). After free measurement and quote approval, on-site install timing depends on product and season — typically a modest number of days once materials arrive. Guide: ${SITE_ORIGIN}/how-long-does-patio-cover-installation-take

Q: Do you install patio covers in New Westminster and Maple Ridge?
A: Yes. New Westminster (Queensborough, Sapperton, Uptown) and Maple Ridge (Town Centre, Albion, Silver Valley) are regular service areas: ${SITE_ORIGIN}/patio-cover-contractor-new-westminster and ${SITE_ORIGIN}/patio-cover-contractor-maple-ridge

Q: Do you install patio covers in Abbotsford?
A: Yes. Abbotsford and nearby Fraser Valley communities are part of our Lower Mainland coverage — Clearbrook, Sumas Mountain, and larger suburban lots. Project example: ${SITE_ORIGIN}/projects/abbotsford-aluminum-patio-cover

Q: Do you install patio covers in White Rock?
A: Yes. White Rock and nearby South Surrey are regular service areas — coastal rain and wind are common considerations. Project example: ${SITE_ORIGIN}/projects/white-rock-glass-patio-cover. Guide: ${SITE_ORIGIN}/coastal-patio-covers-vancouver

Q: Do you install patio covers in Coquitlam?
A: Yes. Burke Mountain, Maillardville, and Westwood Plateau are regular Tri-Cities service areas. Project examples: ${SITE_ORIGIN}/projects/coquitlam-glass-patio-cover and ${SITE_ORIGIN}/projects/coquitlam-aluminum-patio-cover

Q: Do you install patio covers in Maple Ridge and Pitt Meadows?
A: Yes. Maple Ridge (Town Centre, Albion, Silver Valley) and Pitt Meadows are part of our Lower Mainland coverage — often with room for wider patio spans. Project examples: ${SITE_ORIGIN}/projects/maple-ridge-skyline-combo-cover and ${SITE_ORIGIN}/projects/pitt-meadows-aluminum-patio-cover

Q: How much does a patio cover cost in Surrey?
A: On a 12×14 ft patio, aluminum is about $${al12x14.totalMin.toLocaleString('en-CA')}–$${al12x14.totalMax.toLocaleString('en-CA')} before GST, glass is about $${gl12x14.totalMin.toLocaleString('en-CA')}–$${gl12x14.totalMax.toLocaleString('en-CA')}, and skyline combo is about $${sk12x14.totalMin.toLocaleString('en-CA')}–$${sk12x14.totalMax.toLocaleString('en-CA')}. Surrey lots range from compact townhome patios to wider Cloverdale and South Surrey backyards, so chat gives a planning total for your size. Guide: ${SITE_ORIGIN}/patio-cover-cost-surrey. Project examples: ${SITE_ORIGIN}/projects/surrey-aluminum-patio-cover and ${SITE_ORIGIN}/projects/surrey-skyline-combo-patio-cover

Q: Do you install backyard patio covers in Richmond?
A: Yes. Steveston, Broadmoor, East Cambie, and Burkeville are regular service areas. Richmond projects include backyard patio covers and carport-style side covers. Project examples: ${SITE_ORIGIN}/projects/richmond-aluminum-patio-cover and ${SITE_ORIGIN}/projects/richmond-aluminum-carport-cover

Q: How much does a patio cover cost in Burnaby?
A: On a 12×14 ft patio, aluminum is about $${al12x14.totalMin.toLocaleString('en-CA')}–$${al12x14.totalMax.toLocaleString('en-CA')} before GST, glass is about $${gl12x14.totalMin.toLocaleString('en-CA')}–$${gl12x14.totalMax.toLocaleString('en-CA')}, and skyline combo is about $${sk12x14.totalMin.toLocaleString('en-CA')}–$${sk12x14.totalMax.toLocaleString('en-CA')}. Burnaby lots range from compact Metrotown yards to roomier Deer Lake backyards, so chat gives a planning total for your size. Guide: ${SITE_ORIGIN}/patio-cover-cost-burnaby. Project examples: ${SITE_ORIGIN}/projects/burnaby-aluminum-patio-cover and ${SITE_ORIGIN}/projects/burnaby-glass-patio-cover

Q: Do you install glass patio covers in Burnaby?
A: Yes. Metrotown, Brentwood, Edmonds, and Deer Lake are regular Burnaby service areas. Glass is popular when homeowners want rain protection without darkening rear living spaces. Project example: ${SITE_ORIGIN}/projects/burnaby-glass-patio-cover. Service page: ${SITE_ORIGIN}/glass-patio-covers-burnaby

## Contact
Website: ${SITE_ORIGIN}
Email: info@loomihomepatios.ca
`;
}

async function main() {
  const outPath = path.join(__dirname, '..', 'public', 'llms.txt');
  const txt = await buildLlmsTxt();
  fs.writeFileSync(outPath, txt, 'utf8');

  const wellKnownDir = path.join(__dirname, '..', 'public', '.well-known');
  fs.mkdirSync(wellKnownDir, { recursive: true });
  const wellKnownPath = path.join(wellKnownDir, 'llms.txt');
  fs.writeFileSync(wellKnownPath, txt, 'utf8');
  console.log(`Wrote ${outPath} and ${wellKnownPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
