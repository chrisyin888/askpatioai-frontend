<template>
  <div class="app seo-content-root">
    <div class="hero-bg seo-content-bg" aria-hidden="true"></div>
    <div class="scroll-container seo-content-scroll">
      <article class="section section-hero seo-content-section">
        <div class="content-wrapper glass-panel seo-content-panel">
          <nav class="seo-breadcrumb" aria-label="Breadcrumb">
            <router-link to="/" class="seo-breadcrumb__link">Home</router-link>
            <span class="seo-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="seo-breadcrumb__current">{{ page.h1 }}</span>
          </nav>

          <header class="header seo-content-header">
            <h1 class="hero-main-title seo-content-h1">{{ page.h1 }}</h1>
            <p class="subtitle hero-subtitle">{{ page.intro }}</p>
          </header>

          <section v-if="page.highlights && page.highlights.length" class="seo-block">
            <h2 class="seo-h2">At a glance</h2>
            <ul class="seo-list">
              <li v-for="(h, i) in page.highlights" :key="'h-' + i">{{ h }}</li>
            </ul>
          </section>

          <section v-if="page.localAngle" class="seo-block">
            <h2 class="seo-h2">{{ kind === 'city' ? 'Local to your area' : 'What this means for you' }}</h2>
            <p class="seo-prose">{{ page.localAngle }}</p>
          </section>

          <section
            v-for="(sec, si) in page.sections || []"
            :key="'sec-' + si"
            class="seo-block"
          >
            <h2 class="seo-h2">{{ sec.h2 }}</h2>
            <p class="seo-prose">{{ sec.body }}</p>
          </section>

          <section v-if="page.pricingNote" class="seo-block seo-block--note">
            <h2 class="seo-h2">Pricing direction</h2>
            <p class="seo-prose">{{ page.pricingNote }}</p>
          </section>

          <section class="seo-cta-block">
            <h2 class="seo-h2">Get a fast rough estimate</h2>
            <p class="seo-cta-body">
              About 60 seconds in chat — compare options before you book a free on-site measurement.
            </p>
            <div class="hero-cta-row seo-cta-row">
              <button type="button" class="hero-cta hero-cta--primary" @click="goHomeOpenEstimate">
                Get My Fast Estimate
              </button>
              <router-link
                :to="{ path: '/', hash: '#our-products' }"
                class="hero-cta hero-cta--secondary"
              >
                Compare Cover Types
              </router-link>
            </div>
          </section>

          <section v-if="page.faqs && page.faqs.length" class="seo-faq">
            <h2 class="seo-h2">Questions we hear a lot</h2>
            <div class="seo-faq-list">
              <details v-for="(item, fi) in page.faqs" :key="'faq-' + fi" class="seo-faq-item">
                <summary class="seo-faq-q">{{ item.q }}</summary>
                <p class="seo-faq-a">{{ item.a }}</p>
              </details>
            </div>
          </section>

          <section class="seo-crosslinks">
            <h2 class="seo-h2">Explore more</h2>
            <div class="seo-crosslinks-grid">
              <div v-if="serviceLinks.length" class="seo-crosslinks-col">
                <h3 class="seo-h3">Cover types</h3>
                <ul>
                  <li v-for="s in serviceLinks" :key="s.path">
                    <router-link :to="s.path">{{ s.label }}</router-link>
                  </li>
                </ul>
              </div>
              <div v-if="cityLinks.length" class="seo-crosslinks-col">
                <h3 class="seo-h3">Service areas</h3>
                <ul>
                  <li v-for="c in cityLinks" :key="c.path">
                    <router-link :to="c.path">{{ c.label }}</router-link>
                  </li>
                </ul>
              </div>
              <div v-if="guideLinks.length" class="seo-crosslinks-col">
                <h3 class="seo-h3">Guides</h3>
                <ul>
                  <li v-for="g in guideLinks" :key="g.path">
                    <router-link :to="g.path">{{ g.label }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <p class="seo-crosslinks-home">
              <router-link to="/">← Back to homepage</router-link>
            </p>
          </section>
        </div>
      </article>

      <footer class="site-footer seo-content-footer" role="contentinfo">
        <div class="site-footer__inner">
          <p class="site-footer__copy">© 2026 LoomiHome Patios · Vancouver &amp; Lower Mainland</p>
          <router-link to="/" class="seo-footer-link">Home</router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { CITY_PAGES, CITY_PAGE_ORDER } from '../data/cityPages';
import { GUIDE_PAGES, GUIDE_PAGE_ORDER } from '../data/guidePages';
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from '../data/servicePages';
import { faqPageNode, injectJsonLd, removeJsonLd } from '../utils/seoHead';

const SERVICE_LABELS = {
  aluminum: 'Aluminum patio covers',
  glass: 'Glass patio covers',
  skyline: 'Skyline combo',
  sunrooms: 'Sunrooms',
};

export default {
  name: 'SeoContentPage',
  props: {
    kind: {
      type: String,
      required: true,
      validator: (v) => v === 'city' || v === 'guide',
    },
    pageId: {
      type: String,
      required: true,
    },
  },
  computed: {
    page() {
      if (this.kind === 'city') return CITY_PAGES[this.pageId] || CITY_PAGES.vancouver;
      return GUIDE_PAGES[this.pageId] || GUIDE_PAGES['patio-cover-cost'];
    },
    serviceLinks() {
      return SERVICE_PAGE_ORDER.map((k) => ({
        path: SERVICE_PAGES[k].path,
        label: SERVICE_LABELS[k],
      }));
    },
    cityLinks() {
      return CITY_PAGE_ORDER.filter((id) => !(this.kind === 'city' && id === this.pageId)).map(
        (id) => ({
          path: CITY_PAGES[id].path,
          label: `Patio covers — ${id.charAt(0).toUpperCase() + id.slice(1)}`,
        }),
      );
    },
    guideLinks() {
      const labels = {
        'patio-cover-cost': 'Patio cover cost',
        'glass-vs-aluminum': 'Glass vs aluminum',
        permit: 'Permits',
        rain: 'Rain & weather',
        'install-timeline': 'Install timeline',
      };
      return GUIDE_PAGE_ORDER.filter((id) => !(this.kind === 'guide' && id === this.pageId)).map(
        (id) => ({
          path: GUIDE_PAGES[id].path,
          label: labels[id] || id,
        }),
      );
    },
  },
  mounted() {
    const f = faqPageNode(this.page.faqs);
    if (f) injectJsonLd({ '@context': 'https://schema.org', '@graph': [f] });
  },
  unmounted() {
    removeJsonLd();
  },
  methods: {
    goHomeOpenEstimate() {
      try {
        sessionStorage.setItem('openChat', '1');
      } catch {
        /* ignore */
      }
      this.$router.push({ path: '/', hash: '#home' });
    },
  },
};
</script>

<style>
.seo-content-root {
  min-height: 100vh;
}
.seo-content-bg {
  position: fixed;
}
.seo-content-scroll {
  position: relative;
  z-index: 1;
}
.seo-content-panel {
  padding: 1.5rem 1.25rem 2rem;
  max-width: 720px;
  margin: 0 auto;
}
.seo-breadcrumb {
  font-size: 0.85rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}
.seo-breadcrumb__link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.seo-breadcrumb__sep {
  margin: 0 0.35rem;
  opacity: 0.6;
}
.seo-content-h1 {
  margin-bottom: 0.65rem;
}
.seo-block {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
}
.seo-block--note {
  background: rgba(248, 250, 252, 0.9);
  padding: 1rem 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.95);
}
.seo-h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.65rem;
  letter-spacing: -0.02em;
}
.seo-h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  margin: 0 0 0.5rem;
}
.seo-prose {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
}
.seo-list {
  margin: 0;
  padding-left: 1.2rem;
  color: #334155;
  line-height: 1.55;
  font-size: 15px;
}
.seo-list li {
  margin-bottom: 0.4rem;
}
.seo-cta-block {
  margin-top: 1.75rem;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  border-bottom: 1px solid rgba(226, 232, 240, 0.95);
}
.seo-cta-body {
  margin: 0 0 1rem;
  font-size: 15px;
  line-height: 1.55;
  color: #475569;
}
.seo-cta-row {
  flex-wrap: wrap;
  gap: 0.65rem;
}
.seo-faq {
  margin-top: 1.5rem;
}
.seo-faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.seo-faq-item {
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 10px;
  padding: 0 12px;
  background: #fff;
}
.seo-faq-q {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  padding: 12px 4px;
  cursor: pointer;
  list-style: none;
}
.seo-faq-q::-webkit-details-marker {
  display: none;
}
.seo-faq-a {
  margin: 0 4px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #475569;
}
.seo-crosslinks {
  margin-top: 1.75rem;
}
.seo-crosslinks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.25rem;
  margin-top: 0.75rem;
}
.seo-crosslinks-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.seo-crosslinks-col li {
  margin-bottom: 0.45rem;
}
.seo-crosslinks-col a {
  color: #0f172a;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.seo-crosslinks-home {
  margin: 1.25rem 0 0;
  font-size: 14px;
}
.seo-crosslinks-home a {
  color: #0f172a;
  font-weight: 600;
}
.seo-content-footer .site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
}
.seo-footer-link {
  color: inherit;
  text-decoration: underline;
  font-size: 0.9rem;
}
@media (max-width: 640px) {
  .seo-cta-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
