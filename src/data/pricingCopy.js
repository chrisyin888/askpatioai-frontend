import {
  formatChatTotalRange,
  patioCoverQuoteForMaterial,
  sunroomQuoteForType,
} from '../utils/chatPricing.js';

function patioExample(material, w, h) {
  const quote = patioCoverQuoteForMaterial(material, w * h);
  const label =
    material === 'Glass'
      ? 'glass patio cover'
      : material === 'Skyline Combo'
        ? 'skyline combo patio cover'
        : 'aluminum patio cover';
  return {
    quote,
    line: `A ${w}×${h} ft ${label} is ${formatChatTotalRange(quote)}`,
    short: `${w}×${h} ft ${label}: about $${quote.totalMin.toLocaleString('en-CA')}–$${quote.totalMax.toLocaleString('en-CA')} before GST`,
  };
}

function sunroomExample(type, w, h) {
  const sqft = w * h;
  const quote = sunroomQuoteForType(type, sqft);
  const label = type === 'wall' ? 'sunroom wall/panel area' : 'sunroom floor/buildable area';
  return {
    quote,
    line: `A ${w}×${h} ft ${label} (${sqft} sq ft) is ${formatChatTotalRange(quote)}`,
    short: `${w}×${h} ft ${label}: about $${quote.totalMin.toLocaleString('en-CA')}–$${quote.totalMax.toLocaleString('en-CA')} before GST`,
  };
}

const al12x14 = patioExample('Aluminum', 12, 14);
const gl12x14 = patioExample('Glass', 12, 14);
const sk12x14 = patioExample('Skyline Combo', 12, 14);
const al10x10 = patioExample('Aluminum', 10, 10);
const gl10x10 = patioExample('Glass', 10, 10);
const gl20x20 = patioExample('Glass', 20, 20);
const sk12x26 = patioExample('Skyline Combo', 12, 26);
const sunWall12x8 = sunroomExample('wall', 12, 8);
const sunFloor10x12 = sunroomExample('buildable', 10, 12);

export const PRICING_COPY = {
  chatCta: 'Chat gives a planning range for your size; formal pricing is confirmed after free on-site measurement.',
  patioCostFaq:
    `${al12x14.line}. ${gl12x14.line}. ${sk12x14.line}. Chat gives a planning range for your actual size; your formal quote is confirmed after free on-site measurement.`,
  patioCostSeo:
    `Rough planning ranges (before GST): ${al12x14.short}; ${gl12x14.short}; ${sk12x26.short}. Chat gives a range for your size; formal pricing is confirmed after free on-site measurement.`,
  aluminumGlassCompare:
    `On a 12×14 ft patio, aluminum is about $${al12x14.quote.totalMin.toLocaleString('en-CA')}–$${al12x14.quote.totalMax.toLocaleString('en-CA')} before GST and glass is about $${gl12x14.quote.totalMin.toLocaleString('en-CA')}–$${gl12x14.quote.totalMax.toLocaleString('en-CA')} before GST. Chat compares both from your size.`,
  aluminumOnly:
    `${al12x14.line}. Chat gives a planning range for your size; measurement confirms final pricing.`,
  glassOnly:
    `${gl12x14.line}. Chat gives a planning range; measurement confirms final pricing.`,
  glassVsAluminumShort:
    `Usually yes. On a 12×14 ft patio, glass is about $${gl12x14.quote.totalMin.toLocaleString('en-CA')}–$${gl12x14.quote.totalMax.toLocaleString('en-CA')} before GST versus aluminum at about $${al12x14.quote.totalMin.toLocaleString('en-CA')}–$${al12x14.quote.totalMax.toLocaleString('en-CA')}.`,
  glassAluminumSameSize:
    `On a 12×14 ft patio, glass is about $${gl12x14.quote.totalMin.toLocaleString('en-CA')}–$${gl12x14.quote.totalMax.toLocaleString('en-CA')} before GST. Aluminum on the same size is about $${al12x14.quote.totalMin.toLocaleString('en-CA')}–$${al12x14.quote.totalMax.toLocaleString('en-CA')}. Chat compares both from one size.`,
  threeWayCompare:
    `${al12x14.short}. ${gl12x14.short}. ${sk12x14.short}. Chat is the quickest way to get a range for your actual patio size.`,
  threeWayShort:
    `${al12x14.short}. ${gl12x14.short}. ${sk12x14.short}. Chat gives a planning range; measurement locks the final price.`,
  example12x14Aluminum:
    `${al12x14.line}. Chat refines this for your city; measurement confirms the formal quote.`,
  skylineComboNote:
    `${sk12x26.line}. Send approximate size in chat for a useful planning range; formal pricing follows free measurement.`,
  sunroomCompare:
    `${sunWall12x8.line}. ${sunFloor10x12.line}. We can ballpark both if you are comparing.`,
  sunroomCost:
    `${sunWall12x8.line}. ${sunFloor10x12.line}. Chat gives a planning range; measurement confirms final pricing.`,
  sunroomWallOnly:
    `${sunWall12x8.line}. Final price depends on enclosure level and site conditions.`,
  sunroomMoreExpensive:
    `Usually yes — more enclosure, glass, and planning. ${sunWall12x8.line}. ${sunFloor10x12.line}.`,
  rainGuide:
    `Aluminum is the practical rain-first starting point (${al12x14.short}). Glass and skyline combo work when light matters too.`,
  examples: {
    al12x14,
    gl12x14,
    sk12x14,
    al10x10,
    gl10x10,
    gl20x20,
    sk12x26,
    sunWall12x8,
    sunFloor10x12,
  },
};
