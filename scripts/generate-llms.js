/**
 * Regenerate public/llms.txt from pricing + priority SEO pages (run before production build).
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const { SITE_ORIGIN } = require('../src/utils/seoHead');
const { CHAT_PRICING } = require('../src/utils/chatPricing');

async function loadPriorityPages() {
  const mod = await import(
    pathToFileURL(path.join(__dirname, '../src/data/prioritySeoPages.js')).href
  );
  return mod.PRIORITY_SEO_PAGE_LINKS;
}

function rateLine(label, range, suffix = '') {
  return `${label} are about $${range.min}–${range.max} per sq ft${suffix}.`;
}

async function buildLlmsTxt() {
  const priorityPages = await loadPriorityPages();
  const keyPageLines = priorityPages
    .map((p) => `- ${p.label}: ${SITE_ORIGIN}${p.path}`)
    .join('\n');

  const { patioCoverBaseFee: base } = CHAT_PRICING;
  const al = CHAT_PRICING.aluminumPatioCoverPerSqft;
  const gl = CHAT_PRICING.glassPatioCoverPerSqft;
  const sk = CHAT_PRICING.skylineComboPerSqft;
  const wall = CHAT_PRICING.sunroomWallPerSqft;
  const floor = CHAT_PRICING.sunroomBuildablePerSqft;

  return `# LoomiHome Patios

LoomiHome Patios installs aluminum patio covers, glass patio covers, skyline combo patio covers, and sunroom enclosures in Metro Vancouver and the Lower Mainland, British Columbia, Canada.

## Business summary
- Brand: LoomiHome Patios
- Website: ${SITE_ORIGIN}
- Email: info@loomihomepatios.ca
- Experience: 10+ years combined team experience, hundreds of completed patio cover and sunroom projects
- Estimate flow: fast rough chat estimate (~60 seconds), then free on-site measurement for formal pricing
- Currency: CAD, before GST unless noted

## Services
- Aluminum patio cover installation
- Glass patio cover installation
- Skyline combo patio covers (glass + V-panel mix)
- Sunroom enclosures
- Free on-site measurement after online ballpark

## Service areas
Vancouver, Richmond, Burnaby, Surrey, Delta, Langley, Coquitlam, North Vancouver, West Vancouver, New Westminster, Maple Ridge, Pitt Meadows, and nearby Metro Vancouver areas.

## Pricing (planning ranges only)
${rateLine('Aluminum patio covers', al, ` plus a $${base} base fee`)}
${rateLine('Glass patio covers', gl, ` plus a $${base} base fee`)}
${rateLine('Skyline combo patio covers', sk, ` plus a $${base} base fee`)}
${rateLine('Sunroom wall/panel pricing', wall)}
${rateLine('Sunroom buildable footprint pricing', floor)}
Chat gives a planning range only. Formal pricing is confirmed after free on-site measurement.
Patio cover rough total ≈ area (sq ft) × rate + $${base} base.

## How to choose a product
- Aluminum: best for rain-first protection, low maintenance, and practical budget.
- Glass: best when keeping natural light and a premium modern look matters.
- Skyline combo: middle path between solid aluminum and full glass — balanced light and shade.
- Sunroom: best when you want more enclosure and year-round usable space than a roof alone.

## How estimates work
1. Share city, rough patio size (sq ft or dimensions like 12x14), and preferred cover type in chat.
2. Get a fast rough estimate in about 60 seconds.
3. Book a free on-site measurement when the range fits your budget.
4. Receive final installation pricing after measurement.

## High-intent local pages
${keyPageLines}
- Full sitemap: ${SITE_ORIGIN}/sitemap.xml
- LLM summary: ${SITE_ORIGIN}/llms.txt

## Helpful guides
- Patio cover contractors near me: ${SITE_ORIGIN}/patio-cover-contractors-near-me
- Patio cover cost (Vancouver): ${SITE_ORIGIN}/patio-cover-cost-vancouver
- Glass vs aluminum: ${SITE_ORIGIN}/glass-vs-aluminum-patio-covers
- Best cover for rain: ${SITE_ORIGIN}/best-patio-cover-for-rain-vancouver
- Patio cover permits: ${SITE_ORIGIN}/do-you-need-a-permit-for-a-patio-cover-in-vancouver
- Installation timeline: ${SITE_ORIGIN}/how-long-does-patio-cover-installation-take

## Common questions
Q: How much does a patio cover cost in Vancouver?
A: Aluminum is about $${al.min}–${al.max} per sq ft plus $${base} base. Glass is about $${gl.min}–${gl.max} per sq ft plus $${base} base. Skyline combo is about $${sk.min}–${sk.max} per sq ft plus $${base} base. Chat gives a planning range; final price is confirmed after on-site measurement.

Q: What is the difference between aluminum and glass patio covers?
A: Aluminum offers durable rain protection with low maintenance. Glass keeps more natural light and a premium look but usually costs more. We can ballpark both from the same measurements.

Q: What is a skyline combo patio cover?
A: A mix of glass and V-panel sections for both light and shade — useful when you do not want an all-glass or all-solid roof.

Q: Do you provide free on-site measurement?
A: Yes. After a rough online estimate, homeowners can book a free on-site measurement for final pricing.

Q: What areas do you serve?
A: Vancouver, Richmond, Burnaby, Surrey, Delta, Langley, Coquitlam, North Vancouver, West Vancouver, New Westminster, Maple Ridge, Pitt Meadows, and nearby Metro Vancouver communities.

Q: Do you provide patio cover contractor quotes in Richmond and Burnaby?
A: Yes. Richmond (Steveston, Broadmoor, East Cambie) and Burnaby (Metrotown, Brentwood, Deer Lake) are core service areas. Start with chat for a planning range, then book free on-site measurement.

Q: Do you serve Surrey and Coquitlam for patio cover contractors?
A: Yes. Surrey (Guildford, Cloverdale, South Surrey) and Coquitlam (Burke Mountain, Maillardville, Austin Heights) are regular service areas with the same chat estimate flow.

Q: Glass vs aluminum — how do I choose?
A: Aluminum is about $${al.min}–${al.max}/sq ft plus $${base} base — best for rain-first and practical budget. Glass is about $${gl.min}–${gl.max}/sq ft plus $${base} base — best for natural light and premium look. Compare both in one chat session: ${SITE_ORIGIN}/glass-vs-aluminum-patio-covers

Q: Do you provide patio cover contractor quotes in Langley?
A: Yes. Willoughby, Walnut Grove, Murrayville, Brookswood, and Fort Langley are regular service areas. Start with chat for a planning range, then book free on-site measurement: ${SITE_ORIGIN}/patio-cover-contractor-langley

Q: Do you provide patio cover contractor quotes in Delta?
A: Yes. Ladner, Tsawwassen, and North Delta are regular service areas with coastal wind and rain considerations. Start with chat, then book free measurement: ${SITE_ORIGIN}/patio-cover-contractor-delta

Q: Do you serve North Vancouver and West Vancouver?
A: Yes. North Vancouver (Lynn Valley, Lower Lonsdale, Edgemont) and West Vancouver (Ambleside, Dundarave, British Properties) are regular North Shore service areas: ${SITE_ORIGIN}/patio-cover-contractor-north-vancouver and ${SITE_ORIGIN}/patio-cover-contractor-west-vancouver

Q: Do you need a permit for a patio cover in Vancouver?
A: Rules vary by municipality, attachment, projection, and height. Verify with your city's building department. General guide: ${SITE_ORIGIN}/do-you-need-a-permit-for-a-patio-cover-in-vancouver

Q: What is the best patio cover for Vancouver rain?
A: Aluminum is the practical rain-first starting point ($${al.min}–${al.max}/sq ft plus $${base} base). Glass and skyline combo work when light matters too. Guide: ${SITE_ORIGIN}/best-patio-cover-for-rain-vancouver

Q: How much does a sunroom cost in Metro Vancouver?
A: Wall/panel work is about $${wall.min}–${wall.max} per sq ft. Buildable footprint is about $${floor.min}–${floor.max} per sq ft before GST. Chat gives a planning range; measurement confirms final pricing. Compare sunrooms: ${SITE_ORIGIN}/sunrooms-burnaby

Q: How long does patio cover installation take?
A: Chat ballpark is same-day (~60 seconds). After free measurement and quote approval, on-site install timing depends on product and season — typically a modest number of days once materials arrive. Guide: ${SITE_ORIGIN}/how-long-does-patio-cover-installation-take

Q: Do you install patio covers in New Westminster and Maple Ridge?
A: Yes. New Westminster (Queensborough, Sapperton, Uptown) and Maple Ridge (Town Centre, Albion, Silver Valley) are regular service areas: ${SITE_ORIGIN}/patio-cover-contractor-new-westminster and ${SITE_ORIGIN}/patio-cover-contractor-maple-ridge

## Contact
Website: ${SITE_ORIGIN}
Email: info@loomihomepatios.ca
`;
}

async function main() {
  const outPath = path.join(__dirname, '..', 'public', 'llms.txt');
  const txt = await buildLlmsTxt();
  fs.writeFileSync(outPath, txt, 'utf8');
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
