/** Rough chat estimate rates (CAD, before GST). Pricing sync: scripts/generate-sitemap.js → public/llms.txt */
export const CHAT_PRICING = {
  patioCoverBaseFee: 500,
  aluminumPatioCoverPerSqft: { min: 8, max: 10 },
  glassPatioCoverPerSqft: { min: 10, max: 12 },
  skylineComboPerSqft: { min: 10, max: 12 },
  sunroomBuildablePerSqft: 125,
  sunroomWallPerSqft: 38,
};

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
