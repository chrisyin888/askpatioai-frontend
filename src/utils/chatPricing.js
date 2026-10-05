/** Rough chat estimate rates (CAD, before GST). Pricing sync: scripts/generate-sitemap.js → public/llms.txt */
export const CHAT_PRICING = {
  patioCoverBaseFee: 500,
  aluminumPatioCoverPerSqft: { min: 8, max: 10 },
  glassPatioCoverPerSqft: { min: 12, max: 15 },
  skylineComboPerSqft: { min: 11, max: 14 },
  sunroomBuildablePerSqft: { min: 130, max: 145 },
  sunroomWallPerSqft: { min: 40, max: 48 },
  patioCoverMinimumCharge: 1500,
  patioCoverMinimumChargeBelowSqft: 100,
};

/** Instant quote add-ons: deck height (floor level) and travel tier, as multipliers on the patio cover total. */
export const PATIO_HEIGHT_MULTIPLIERS = { 1: 1, 2: 1.15, 3: 1.3 };

export const COVER_HEIGHT = { min: 7, max: 14, default: 9, includedUpToFt: 10, surchargePerFt: 0.05 };

export function coverHeightMultiplier(heightFt) {
  const extraFt = Math.max(0, (Number(heightFt) || 0) - COVER_HEIGHT.includedUpToFt);
  return 1 + extraFt * COVER_HEIGHT.surchargePerFt;
}

export const CITY_TRAVEL_TIERS = [
  {
    multiplier: 1,
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
  { multiplier: 1.05, cities: ['West Vancouver', 'Langley', 'White Rock', 'Pitt Meadows', 'Maple Ridge'] },
  { multiplier: 1.1, cities: ['Abbotsford'] },
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

export function cityTravelMultiplier(city) {
  const tier = CITY_TRAVEL_TIERS.find((t) => t.cities.includes(city));
  return tier ? tier.multiplier : 1;
}

/** Patio cover total with the small-job minimum, deck height, and city travel tier applied. */
export function instantPatioQuote({ material, sqft, floor = 1, city = '', coverHeight = COVER_HEIGHT.default }) {
  const base = patioCoverQuoteForMaterial(material, sqft);
  const minCharge = CHAT_PRICING.patioCoverMinimumCharge;
  const isMinimum = base.sqft < CHAT_PRICING.patioCoverMinimumChargeBelowSqft;
  const baseMin = isMinimum ? minCharge : Math.max(base.totalMin, minCharge);
  const baseMax = isMinimum ? minCharge : Math.max(base.totalMax, minCharge);
  const multiplier =
    (PATIO_HEIGHT_MULTIPLIERS[floor] || 1) * cityTravelMultiplier(city) * coverHeightMultiplier(coverHeight);
  return {
    ...base,
    isMinimum,
    totalMin: Math.round(baseMin * multiplier),
    totalMax: Math.round(baseMax * multiplier),
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
