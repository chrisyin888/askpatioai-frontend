<template>
  <div class="app service-page-root">
    <div class="hero-bg service-page-bg" aria-hidden="true"></div>
    <div class="scroll-container service-page-scroll">
      <section class="section section-hero service-page-section">
        <figure v-if="heroImageUrl" class="service-hero-banner">
          <img
            class="service-hero-banner__img"
            :src="heroImageUrl"
            :alt="heroImageAlt"
            width="1200"
            height="630"
            decoding="async"
            fetchpriority="high"
          />
        </figure>
        <div class="content-wrapper glass-panel service-page-panel">
          <nav class="service-page-breadcrumb" aria-label="Breadcrumb">
            <router-link to="/" class="service-page-breadcrumb__link">Home</router-link>
            <span class="service-page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="service-page-breadcrumb__current">{{ page.h1 }}</span>
          </nav>

          <header class="header service-page-header">
            <h1 class="hero-main-title service-page-h1">{{ page.h1 }}</h1>
            <p class="subtitle hero-subtitle">{{ page.intro }}</p>
            <p class="service-page-trust">
              <span class="service-page-trust__badge">10+ years experience</span>
              <span class="service-page-trust__badge">Hundreds of projects completed</span>
              <span class="service-page-trust__badge">Lower Mainland team</span>
            </p>
          </header>

          <div class="service-page-benefits">
            <h2 class="service-page-h2">Why homeowners choose this option</h2>
            <ul class="service-page-benefits-list">
              <li v-for="(b, i) in page.benefits" :key="i">{{ b }}</li>
            </ul>
          </div>

          <div v-if="page.caseStudy && caseStudyImageUrl" class="service-page-case-study">
            <h2 class="service-page-h2">Recent project example</h2>
            <figure class="service-page-case-study__figure">
              <img
                class="service-page-case-study__img"
                :src="caseStudyImageUrl"
                :alt="page.caseStudy.alt || page.h1"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <figcaption v-if="page.caseStudy.caption" class="service-page-case-study__caption">
                {{ page.caseStudy.caption }}
              </figcaption>
              <p v-if="page.caseStudy.projectPath" class="service-page-case-study__link-wrap">
                <router-link :to="page.caseStudy.projectPath" class="service-page-crosslinks__a">
                  View full project →
                </router-link>
              </p>
            </figure>
          </div>

          <div v-if="page.relatedPageLinks && page.relatedPageLinks.length" class="service-page-related">
            <h2 class="service-page-h2">Related pages</h2>
            <ul class="service-page-crosslinks-list">
              <li v-for="(link, ri) in page.relatedPageLinks" :key="'rel-' + ri">
                <router-link :to="link.path" class="service-page-crosslinks__a">{{ link.label }}</router-link>
              </li>
            </ul>
          </div>

          <div
            v-for="(sec, si) in page.sections || []"
            :key="'service-sec-' + si"
            class="service-page-info"
          >
            <h2 class="service-page-h2">{{ sec.h2 }}</h2>
            <p class="service-page-info-text">{{ sec.body }}</p>
          </div>

          <div v-if="page.pricingLine" class="service-page-pricing">
            <h2 class="service-page-h2">Ballpark pricing</h2>
            <p class="service-page-pricing-text">{{ page.pricingLine }}</p>
          </div>

          <div class="service-page-cta-block">
            <h2 class="service-page-h2">{{ page.ctaTitle }}</h2>
            <p class="service-page-cta-body">{{ page.ctaBody }}</p>
            <div class="hero-cta-row service-page-cta-row">
              <button
                type="button"
                class="hero-cta hero-cta--primary"
                @click="goHomeOpenEstimate"
              >
                Get My Fast Estimate
              </button>
              <router-link
                :to="{ path: '/', hash: '#our-products' }"
                class="hero-cta hero-cta--secondary"
              >
                Compare Cover Types
              </router-link>
            </div>
          </div>

          <div v-if="page.faqs && page.faqs.length" class="service-page-faq">
            <h2 class="service-page-h2">Common questions</h2>
            <div class="service-page-faq-list">
              <details
                v-for="(item, fi) in page.faqs"
                :key="'sf-' + fi"
                class="service-page-faq-item"
              >
                <summary class="service-page-faq-q">{{ item.q }}</summary>
                <p class="service-page-faq-a">{{ item.a }}</p>
              </details>
            </div>
          </div>

          <div class="service-page-crosslinks">
            <h2 class="service-page-h2">High-intent local pages</h2>
            <ul class="service-page-crosslinks-list">
              <li v-for="l in priorityLinks" :key="'prio-' + l.path">
                <router-link :to="l.path" class="service-page-crosslinks__a">{{ l.label }}</router-link>
              </li>
            </ul>
            <h2 class="service-page-h2">More patio options in Vancouver</h2>
            <p class="service-page-crosslinks-lead">
              Compare cover types and get a quick ballpark before booking a free measurement.
            </p>
            <ul class="service-page-crosslinks-list">
              <li v-for="l in siblingLinks" :key="l.path">
                <router-link :to="l.path" class="service-page-crosslinks__a">{{ l.label }}</router-link>
              </li>
              <li>
                <router-link to="/" class="service-page-crosslinks__a">Home — all services</router-link>
              </li>
            </ul>
            <h3 class="service-page-h3">Service areas</h3>
            <ul class="service-page-crosslinks-list">
              <li v-for="c in cityLinks" :key="c.path">
                <router-link :to="c.path" class="service-page-crosslinks__a">{{ c.label }}</router-link>
              </li>
            </ul>
            <h3 class="service-page-h3">Helpful guides</h3>
            <ul class="service-page-crosslinks-list">
              <li v-for="g in guideLinks" :key="g.path">
                <router-link :to="g.path" class="service-page-crosslinks__a">{{ g.label }}</router-link>
              </li>
            </ul>
            <h3 class="service-page-h3">City service pages</h3>
            <ul class="service-page-crosslinks-list">
              <li v-for="l in cityServiceLinks" :key="l.path">
                <router-link :to="l.path" class="service-page-crosslinks__a">{{ l.label }}</router-link>
              </li>
            </ul>
            <h3 class="service-page-h3">Project examples</h3>
            <ul class="service-page-crosslinks-list">
              <li v-for="p in projectLinks" :key="p.path">
                <router-link :to="p.path" class="service-page-crosslinks__a">{{ p.label }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="site-footer service-page-footer" role="contentinfo">
        <div class="site-footer__inner">
          <p class="site-footer__copy">© 2026 LoomiHome Patios · Vancouver &amp; Lower Mainland</p>
          <a href="/llms.txt" class="service-page-footer-link">LLM site summary</a>
          <router-link to="/" class="service-page-footer-link">Back to home</router-link>
          <a href="/llms.txt" class="service-page-footer-link">LLM summary</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { CITY_PAGES, CITY_PAGE_ORDER } from '../data/cityPages';
import { CITY_SERVICE_PAGES, CITY_SERVICE_PAGE_ORDER } from '../data/cityServicePages';
import { GUIDE_PAGES, GUIDE_PAGE_ORDER } from '../data/guidePages';
import { PRIORITY_SEO_PAGE_LINKS } from '../data/prioritySeoPages';
import { PROJECT_PAGES, PROJECT_PAGE_ORDER } from '../data/projectPages';
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from '../data/servicePages';
import {
  breadcrumbNode,
  faqPageNode,
  injectJsonLd,
  localBusinessNode,
  removeJsonLd,
  serviceNode,
  webSiteNode,
  webPageNode,
} from '../utils/seoHead';
import { publicAssetUrl } from '../utils/publicAssetUrl';

const SERVICE_SCHEMA_TYPE = {
  aluminum: 'Aluminum patio cover installation',
  glass: 'Glass patio cover installation',
  skyline: 'Skyline combo patio cover installation',
  sunrooms: 'Sunroom installation',
};

const LABELS = {
  aluminum: 'Aluminum patio covers',
  glass: 'Glass patio covers',
  skyline: 'Skyline combo covers',
  sunrooms: 'Sunrooms',
};

export default {
  name: 'ServicePage',
  props: {
    serviceKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    page() {
      return SERVICE_PAGES[this.serviceKey] || SERVICE_PAGES.aluminum;
    },
    siblingLinks() {
      return SERVICE_PAGE_ORDER.filter((k) => k !== this.serviceKey).map((k) => ({
        path: SERVICE_PAGES[k].path,
        label: LABELS[k],
      }));
    },
    cityLinks() {
      return CITY_PAGE_ORDER.map((id) => ({
        path: CITY_PAGES[id].path,
        label: CITY_PAGES[id].h1.replace(/^Patio Covers in /i, 'Patio covers — '),
      }));
    },
    guideLinks() {
      const labels = {
        'patio-cover-cost': 'Patio cover cost',
        'patio-cover-cost-abbotsford': 'Patio cover cost — Abbotsford',
        'patio-cover-cost-surrey': 'Patio cover cost — Surrey',
        'patio-cover-cost-burnaby': 'Patio cover cost — Burnaby',
        'patio-cover-cost-langley': 'Patio cover cost — Langley',
        'patio-cover-cost-richmond': 'Patio cover cost — Richmond',
        'patio-cover-cost-coquitlam': 'Patio cover cost — Coquitlam',
        'glass-vs-aluminum': 'Glass vs aluminum',
        permit: 'Permits',
        rain: 'Rain & weather',
        'install-timeline': 'Install timeline',
        'contractors-near-me': 'Contractors near me',
        'fraser-valley': 'Fraser Valley',
        coastal: 'Coastal covers',
        'tri-cities': 'Tri-Cities',
      };
      return GUIDE_PAGE_ORDER.map((id) => ({
        path: GUIDE_PAGES[id].path,
        label: labels[id] || id,
      }));
    },
    cityServiceLinks() {
      return CITY_SERVICE_PAGE_ORDER.filter((id) => id.endsWith('-vancouver')).map((id) => ({
        path: CITY_SERVICE_PAGES[id].path,
        label: CITY_SERVICE_PAGES[id].h1,
      }));
    },
    projectLinks() {
      return PROJECT_PAGE_ORDER.map((id) => ({
        path: PROJECT_PAGES[id].path,
        label: PROJECT_PAGES[id].h1.replace(' Project', ''),
      }));
    },
    priorityLinks() {
      const current = this.page && this.page.path;
      return PRIORITY_SEO_PAGE_LINKS.filter((l) => l.path !== current);
    },
    heroImageUrl() {
      const raw = this.page && this.page.heroImage;
      return publicAssetUrl(raw);
    },
    heroImageAlt() {
      return (this.page && this.page.h1) || 'Patio cover project photo';
    },
    caseStudyImageUrl() {
      const raw = this.page && this.page.caseStudy && this.page.caseStudy.image;
      return raw ? publicAssetUrl(raw) : '';
    },
  },
  mounted() {
    const graph = [
      localBusinessNode(),
      webSiteNode(),
      webPageNode(this.page),
      breadcrumbNode([
        { name: 'Home', path: '/' },
        { name: 'Cover types', path: SERVICE_PAGES.aluminum.path },
        { name: this.page.h1, path: this.page.path },
      ]),
    ].filter(Boolean);
    const st = SERVICE_SCHEMA_TYPE[this.serviceKey];
    if (st) {
      const service = serviceNode({
        ...this.page,
        serviceType: st,
        areaServed: this.page.areaServed || 'Vancouver, British Columbia',
      });
      if (service) graph.push(service);
    }
    const f = faqPageNode(this.page.faqs);
    if (f) graph.push(f);
    if (graph.length) injectJsonLd({ '@context': 'https://schema.org', '@graph': graph });
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
.service-page-root {
  min-height: 100vh;
}
.service-page-bg {
  position: fixed;
}
.service-hero-banner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 720px;
  margin: 0 auto 1rem;
  padding: 0 max(12px, env(safe-area-inset-left)) 0 max(12px, env(safe-area-inset-right));
  box-sizing: border-box;
}
.service-hero-banner__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(42vh, 320px);
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.12);
}
.service-page-scroll {
  position: relative;
  z-index: 1;
}
.service-page-panel {
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}
.service-page-breadcrumb {
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  opacity: 0.9;
}
.service-page-breadcrumb__link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.service-page-breadcrumb__sep {
  margin: 0 0.35rem;
  opacity: 0.6;
}
.service-page-breadcrumb__current {
  opacity: 0.85;
}
.service-page-header {
  text-align: left;
  margin-bottom: 1.75rem;
}
.service-page-h1 {
  margin-bottom: 0.75rem;
}
.service-page-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
}
.service-page-trust__badge {
  display: inline-flex;
  align-items: center;
  font-size: 12.5px;
  font-weight: 700;
  color: #0f172a;
  background: #f1f5f9;
  border: 1px solid rgba(203, 213, 225, 0.9);
  border-radius: 999px;
  padding: 5px 12px;
  line-height: 1.2;
}
.service-page-trust__badge::before {
  content: "✓";
  margin-right: 6px;
  font-weight: 800;
  color: #16a34a;
}
.service-page-benefits {
  margin-bottom: 2rem;
}
.service-page-h2 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  letter-spacing: 0.02em;
}
.service-page-benefits-list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.55;
}
.service-page-benefits-list li {
  margin-bottom: 0.5rem;
}
.service-page-case-study {
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
}
.service-page-case-study__figure {
  margin: 0.75rem 0 0;
}
.service-page-case-study__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.95);
}
.service-page-case-study__caption {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}
.service-page-case-study__link-wrap {
  margin: 10px 0 0;
}
.service-page-related {
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
}
.service-page-info {
  margin-bottom: 1.5rem;
  padding: 1rem 1rem 1.15rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.95);
}
.service-page-info-text {
  margin: 0;
  line-height: 1.6;
  font-size: 15px;
  color: #334155;
}
.service-page-pricing {
  margin-bottom: 1.5rem;
  padding: 1rem 1rem 1.15rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.95);
}
.service-page-pricing-text {
  margin: 0;
  line-height: 1.55;
  font-size: 15px;
  color: #334155;
}
.service-page-h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 1.25rem 0 0.5rem;
  color: #0f172a;
}
.service-page-faq {
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
}
.service-page-faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.service-page-faq-item {
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 10px;
  padding: 0 12px;
  background: #fff;
}
.service-page-faq-q {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  padding: 12px 4px;
  cursor: pointer;
  list-style: none;
}
.service-page-faq-q::-webkit-details-marker {
  display: none;
}
.service-page-faq-a {
  margin: 0 4px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #475569;
}
.service-page-cta-block {
  padding: 1.25rem 0 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  border-bottom: 1px solid rgba(226, 232, 240, 0.95);
  margin-bottom: 2rem;
}
.service-page-cta-body {
  line-height: 1.55;
  margin: 0 0 1.25rem;
  opacity: 0.95;
}
.service-page-cta-row {
  flex-wrap: wrap;
  gap: 0.75rem;
}
.service-page-crosslinks-lead {
  margin: 0 0 0.75rem;
  line-height: 1.5;
  opacity: 0.92;
  font-size: 0.95rem;
}
.service-page-crosslinks-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}
.service-page-crosslinks__a {
  color: inherit;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.service-page-footer .site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
}
.service-page-footer-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: 0.9rem;
}
@media (max-width: 640px) {
  .service-page-cta-row {
    flex-direction: column;
    align-items: stretch;
  }
  .service-page-cta-row .hero-cta--secondary {
    width: 100%;
  }
}
</style>
