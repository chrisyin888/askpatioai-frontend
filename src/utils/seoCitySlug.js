/** Extract city slug from city-service page ids like `contractor-north-vancouver`. */
export function citySlugFromServicePageId(pageId) {
  const m = String(pageId).match(/^(?:contractor|installer|aluminum|glass|sunrooms)-(.+)$/);
  return m ? m[1] : null;
}

/** Service page id prefixes we generate per city. */
export const CITY_SERVICE_PREFIXES = ['contractor', 'installer', 'aluminum', 'glass', 'sunrooms'];
