/** Rough chat estimate rates (CAD, before GST). Pricing sync: scripts/generate-sitemap.js → public/llms.txt */
export const CHAT_PRICING = {
  patioCoverBaseFee: 0,
  aluminumPatioCoverPerSqft: { min: 13, max: 13 },
  glassPatioCoverPerSqft: { min: 18, max: 18 },
  skylineComboPerSqft: { min: 15, max: 15 },
  sunroomBuildablePerSqft: { min: 130, max: 145 },
  sunroomWallPerSqft: { min: 40, max: 48 },
  patioCoverMinimumCharge: 1500,
  patioCoverMinimumChargeBelowSqft: 100,
};

/** Instant quote add-ons: flat CAD surcharges by install level and travel tier. Cover height does not change the price. */
export const PATIO_FLOOR_SURCHARGE = { 1: 0, 2: 200, 3: 400 };

export const COVER_HEIGHT = { min: 7, max: 14, default: 9 };

export const CITY_TRAVEL_TIERS = [
  {
    surcharge: 0,
    cities: [
      'Vancouver',
      'Burnaby',
      'New Westminster',
      'Richmond',
      'Coquitlam',
      'Port Coquitlam',
      'Port Moody',
      'North Vancouver',
      'Surrey',
      'Delta',
    ],
  },
  {
    surcharge: 200,
    cities: ['West Vancouver', 'Langley', 'White Rock', 'Pitt Meadows', 'Maple Ridge', 'Abbotsford'],
  },
];

export function patioCoverRateRangeForMaterial(material) {
  const value = String(material || '').toLowerCase();
  if (value.includes('glass')) return CHAT_PRICING.glassPatioCoverPerSqft;
  if (value.includes('skyline') || value.includes('combo')) return CHAT_PRICING.skylineComboPerSqft;
  return CHAT_PRICING.aluminumPatioCoverPerSqft;
}

export function patioCoverMidRateForMaterial(material) {
  const { min, max } = patioCoverRateRangeForMaterial(material);
  return (min + max) / 2;
}

export function patioCoverQuoteForMaterial(material, sqft) {
  const { min, max } = patioCoverRateRangeForMaterial(material);
  const area = Math.round(Number(sqft) || 0);
  const baseFee = CHAT_PRICING.patioCoverBaseFee;
  const totalMin = Math.round(area * min + baseFee);
  const totalMax = Math.round(area * max + baseFee);
  return {
    rateMin: min,
    rateMax: max,
    sqft: area,
    baseFee,
    totalMin,
    totalMax,
    rateLabel: `CAD $${min}-${max}`,
  };
}

export function cityTravelSurcharge(city) {
  const tier = CITY_TRAVEL_TIERS.find((t) => t.cities.includes(city));
  return tier ? tier.surcharge : 0;
}

/** Patio cover total with the small-job minimum, then flat install-level and travel surcharges. */
export function instantPatioQuote({ material, sqft, floor = 1, city = '' }) {
  const base = patioCoverQuoteForMaterial(material, sqft);
  const minCharge = CHAT_PRICING.patioCoverMinimumCharge;
  const isMinimum = base.sqft < CHAT_PRICING.patioCoverMinimumChargeBelowSqft;
  const baseMin = isMinimum ? minCharge : Math.max(base.totalMin, minCharge);
  const baseMax = isMinimum ? minCharge : Math.max(base.totalMax, minCharge);
  const surcharge = (PATIO_FLOOR_SURCHARGE[floor] || 0) + cityTravelSurcharge(city);
  return {
    ...base,
    isMinimum,
    totalMin: baseMin + surcharge,
    totalMax: baseMax + surcharge,
  };
}

export function sunroomRateRangeForType(type) {
  return type === 'wall' ? CHAT_PRICING.sunroomWallPerSqft : CHAT_PRICING.sunroomBuildablePerSqft;
}

export function sunroomMidRateForType(type) {
  const { min, max } = sunroomRateRangeForType(type);
  return (min + max) / 2;
}

export function sunroomQuoteForType(type, sqft) {
  const { min, max } = sunroomRateRangeForType(type);
  const area = Math.round(Number(sqft) || 0);
  const totalMin = Math.round(area * min);
  const totalMax = Math.round(area * max);
  return {
    rateMin: min,
    rateMax: max,
    sqft: area,
    totalMin,
    totalMax,
    rateLabel: `CAD $${min}-${max}`,
  };
}

export function formatDimensionLabel(textOrSize, sqft) {
  const text = String(textOrSize || '').trim();
  const dimMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:'|ft|feet|foot)?\s*(?:x|\*|×|by)\s*(\d+(?:\.\d+)?)/i);
  if (dimMatch) return `${dimMatch[1]}×${dimMatch[2]} ft`;
  const area = Math.round(Number(sqft) || 0);
  return area > 0 ? `${area.toLocaleString()} sq ft` : '';
}

export function formatChatTotalRange(quote) {
  return `approximately CAD $${quote.totalMin.toLocaleString()}–$${quote.totalMax.toLocaleString()} before GST`;
}

export function parseSizeSqft(textOrSize) {
  const text = String(textOrSize || '').trim();
  if (!text) return null;

  const sqftMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:sqft|sq\s*ft|sf)\b/i);
  if (sqftMatch) {
    const sqft = Number(sqftMatch[1]);
    return Number.isFinite(sqft) && sqft > 0 ? sqft : null;
  }

  const dimensionPatterns = [
    /(\d+(?:\.\d+)?)\s*(?:'|ft|feet|foot)?\s*(?:wide|width|w)?\s*(?:x|\*|×|by)\s*(\d+(?:\.\d+)?)\s*(?:'|ft|feet|foot)?\s*(?:long|length|l|deep|depth|projection)?/i,
    /(\d+(?:\.\d+)?)\s*(?:wide|width|w)\b.*?(\d+(?:\.\d+)?)\s*(?:long|length|l|deep|depth|projection)\b/i,
    /(\d+(?:\.\d+)?)\s*(?:long|length|l)\b.*?(\d+(?:\.\d+)?)\s*(?:wide|width|w)\b/i,
    /(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(?:'|ft|feet|foot)?\s*(?:by)\s*(\d+(?:\.\d+)?)\s*(?:'|ft|feet|foot)?/i,
    /size\s*[:=]?\s*(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i,
  ];

  for (const pattern of dimensionPatterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const first = Number(match[1]);
    const second = Number(match[2]);
    const sqft = first * second;
    if (Number.isFinite(sqft) && sqft > 0) return sqft;
  }

  return null;
}
