const LANG_KEY = 'loomihome_marketplace_lang';

export function getMarketplaceLang() {
  if (typeof window === 'undefined' || !window.localStorage) return 'en';
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === 'zh' ? 'zh' : 'en';
}

export function setMarketplaceLang(lang) {
  const normalized = lang === 'zh' ? 'zh' : 'en';
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(LANG_KEY, normalized);
  }
  return normalized;
}

export function marketText(en, zh, lang = getMarketplaceLang()) {
  return lang === 'zh' ? zh : en;
}
