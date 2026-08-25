<template>
  <div class="app seo-page">
    <div class="hero-bg seo-page__bg" aria-hidden="true"></div>
    <div class="scroll-container seo-page__scroll">
      <article class="section section-hero seo-page__article">
        <div class="content-wrapper glass-panel seo-page__panel">
          <!-- Hero: matches homepage hierarchy — brand, title, intro, CTAs, image, subnav -->
          <header class="header hero-header seo-page__hero">
            <div class="seo-page__hero-grid">
              <div class="seo-page__hero-copy">
                <nav class="seo-page__breadcrumb" aria-label="Breadcrumb">
                  <router-link to="/" class="seo-page__breadcrumb-link">Home</router-link>
                  <span class="seo-page__breadcrumb-sep" aria-hidden="true">/</span>
                  <span class="seo-page__breadcrumb-current">{{ page.h1 }}</span>
                </nav>

                <p class="hero-eyebrow">
                  <span class="hero-eyebrow-name">LoomiHome</span>
                  <span class="hero-eyebrow-suffix">Patios</span>
                  <span class="seo-page__eyebrow-tag">{{ heroKindLabel }}</span>
                </p>

                <h1 class="hero-main-title">{{ page.h1 }}</h1>
                <p class="subtitle hero-subtitle seo-page__intro">{{ page.intro }}</p>

                <p class="seo-page__trust">
                  <span class="seo-page__trust-badge">10+ years experience</span>
                  <span class="seo-page__trust-badge">Hundreds of projects completed</span>
                  <span class="seo-page__trust-badge">Lower Mainland team</span>
                </p>

                <div class="hero-cta-row">
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

              <div v-if="heroImageUrl" class="seo-page__hero-visual">
                <img
                  class="seo-page__hero-img"
                  :src="heroImageUrl"
                  :alt="heroImageAlt"
                  width="1200"
                  height="900"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>
            </div>

            <nav class="hero-subnav seo-page__subnav" aria-label="Quick navigation">
              <router-link to="/" class="hero-subnav__link hero-subnav__link--emphasized">
                Home
              </router-link>
              <router-link
                :to="{ path: '/', hash: '#our-products' }"
                class="hero-subnav__link hero-subnav__link--emphasized"
              >
                Our products
              </router-link>
              <router-link
                :to="{ path: '/', hash: '#before-after-projects' }"
                class="hero-subnav__link hero-subnav__link--emphasized"
              >
                Before &amp; after
              </router-link>
              <router-link
                :to="{ path: '/', hash: '#home' }"
                class="hero-subnav__link hero-subnav__link--inverse"
                @click="primeOpenChat"
              >
                Get estimate
              </router-link>
            </nav>
          </header>

          <!-- Body: same rhythm as homepage sections below hero -->
          <div class="body-section seo-page__body">
            <section v-if="page.highlights && page.highlights.length" class="seo-page__section">
              <div class="our-products-intro seo-page__section-head">
                <h2 class="our-products-heading">At a glance</h2>
                <p class="our-products-lead">
                  Key reasons homeowners start with a fast ballpark, then book a free measurement.
                </p>
              </div>
              <div class="seo-page__highlight-grid">
                <div
                  v-for="(h, i) in page.highlights"
                  :key="'h-' + i"
                  class="seo-page__highlight-card"
                >
                  <span class="seo-page__highlight-icon" aria-hidden="true">✓</span>
                  <p class="seo-page__highlight-text">{{ h }}</p>
                </div>
              </div>
            </section>

            <section v-if="page.localAngle" class="seo-page__section">
              <div class="home-seo-block seo-page__block">
                <h2 class="home-seo-block__title">
                  {{ kind === 'city' ? 'Local to your area' : 'What this means for you' }}
                </h2>
                <p class="home-seo-block__body">{{ page.localAngle }}</p>
              </div>
            </section>

            <section v-if="page.caseStudy && caseStudyImageUrl" class="seo-page__section">
              <div class="our-products-intro seo-page__section-head">
                <h2 class="our-products-heading">Recent project example</h2>
                <p class="our-products-lead">Real Lower Mainland work — use chat for a similar rough range.</p>
              </div>
              <figure class="seo-page__case-study">
                <img
                  class="seo-page__case-study-img"
                  :src="caseStudyImageUrl"
                  :alt="page.caseStudy.alt || 'Patio cover project photo'"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption v-if="page.caseStudy.caption" class="seo-page__case-caption">
                  {{ page.caseStudy.caption }}
                </figcaption>
                <p v-if="page.caseStudy.projectPath" class="seo-page__case-link-wrap">
                  <router-link :to="page.caseStudy.projectPath" class="seo-page__case-link">
                    View full project →
                  </router-link>
                </p>
              </figure>
            </section>

            <section
              v-for="(sec, si) in page.sections || []"
              :key="'sec-' + si"
              class="seo-page__section"
            >
              <div class="home-seo-block seo-page__block">
                <h2 class="home-seo-block__title">{{ sec.h2 }}</h2>
                <p class="home-seo-block__body">{{ sec.body }}</p>
              </div>
            </section>

            <section v-if="page.relatedPageLinks && page.relatedPageLinks.length" class="seo-page__section">
              <div class="our-products-intro seo-page__section-head">
                <h2 class="our-products-heading">Related pages</h2>
                <p class="our-products-lead">More local guides and service pages for the same area or product.</p>
              </div>
              <ul class="seo-page__related-list">
                <li v-for="(link, ri) in page.relatedPageLinks" :key="'rel-' + ri">
                  <router-link :to="link.path" class="seo-page__explore-link">{{ link.label }}</router-link>
                </li>
              </ul>
            </section>

            <section v-if="page.pricingNote" class="seo-page__section">
              <div class="seo-page__pricing-callout">
                <h2 class="seo-page__pricing-title">Pricing direction</h2>
                <p class="seo-page__pricing-body">{{ page.pricingNote }}</p>
              </div>
            </section>

            <section class="seo-page__section seo-page__section--cta">
              <div class="seo-page__cta-panel">
                <h2 class="seo-page__cta-title">Get a fast rough estimate</h2>
                <p class="seo-page__cta-lead">
                  About 60 seconds in chat — compare options before you book a free on-site
                  measurement.
                </p>
                <div class="hero-cta-row seo-page__cta-row">
                  <button
                    type="button"
                    class="hero-cta hero-cta--primary seo-page__cta-btn-primary"
                    @click="goHomeOpenEstimate"
                  >
                    Get My Fast Estimate
                  </button>
                  <router-link
                    :to="{ path: '/', hash: '#our-products' }"
                    class="hero-cta hero-cta--secondary seo-page__cta-btn-secondary"
                  >
                    Compare Cover Types
                  </router-link>
                </div>
              </div>
            </section>

            <section v-if="page.faqs && page.faqs.length" class="home-faq seo-page__faq">
              <h2 class="home-faq__title">Questions we hear a lot</h2>
              <div class="home-faq__list">
                <details
                  v-for="(item, fi) in page.faqs"
                  :key="'faq-' + fi"
                  class="home-faq__item seo-page__faq-item"
                >
                  <summary class="home-faq__q">{{ item.q }}</summary>
                  <p class="home-faq__a">{{ item.a }}</p>
                </details>
              </div>
            </section>

            <section class="seo-page__section seo-page__explore">
              <div class="our-products-intro seo-page__section-head">
                <h2 class="our-products-heading">Explore more</h2>
                <p class="our-products-lead">Jump to related services, cities, and guides.</p>
              </div>
              <div class="seo-page__explore-grid">
                <div v-if="priorityLinks.length" class="seo-page__explore-card">
                  <h3 class="seo-page__explore-card-title">High-intent local pages</h3>
                  <ul class="seo-page__explore-list">
                    <li v-for="l in priorityLinks" :key="'prio-' + l.path">
                      <router-link :to="l.path" class="seo-page__explore-link">{{ l.label }}</router-link>
                    </li>
                  </ul>
                </div>
                <div v-if="serviceLinks.length" class="seo-page__explore-card">
                  <h3 class="seo-page__explore-card-title">Cover types</h3>
                  <ul class="seo-page__explore-list">
                    <li v-for="s in serviceLinks" :key="s.path">
                      <router-link :to="s.path" class="seo-page__explore-link">{{ s.label }}</router-link>
                    </li>
                  </ul>
                </div>
                <div v-if="cityLinks.length" class="seo-page__explore-card">
                  <h3 class="seo-page__explore-card-title">Service areas</h3>
                  <ul class="seo-page__explore-list">
                    <li v-for="c in cityLinks" :key="c.path">
                      <router-link :to="c.path" class="seo-page__explore-link">{{ c.label }}</router-link>
                    </li>
                  </ul>
                </div>
                <div v-if="guideLinks.length" class="seo-page__explore-card">
                  <h3 class="seo-page__explore-card-title">Guides</h3>
                  <ul class="seo-page__explore-list">
                    <li v-for="g in guideLinks" :key="g.path">
                      <router-link :to="g.path" class="seo-page__explore-link">{{ g.label }}</router-link>
                    </li>
                  </ul>
                </div>
                <div v-if="cityServiceLinks.length" class="seo-page__explore-card">
                  <h3 class="seo-page__explore-card-title">City service pages</h3>
                  <ul class="seo-page__explore-list">
                    <li v-for="l in cityServiceLinks" :key="l.path">
                      <router-link :to="l.path" class="seo-page__explore-link">{{ l.label }}</router-link>
                    </li>
                  </ul>
                </div>
                <div v-if="projectLinks.length" class="seo-page__explore-card">
                  <h3 class="seo-page__explore-card-title">Project examples</h3>
                  <ul class="seo-page__explore-list">
                    <li v-for="p in projectLinks" :key="p.path">
                      <router-link :to="p.path" class="seo-page__explore-link">{{ p.label }}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <p class="seo-page__back-home">
                <router-link to="/" class="seo-page__back-home-link">← Back to homepage</router-link>
              </p>
            </section>
          </div>
        </div>
      </article>

      <footer class="site-footer seo-page__footer" role="contentinfo">
        <div class="site-footer__inner">
          <p class="site-footer__copy">© 2026 LoomiHome Patios · Vancouver &amp; Lower Mainland</p>
          <a href="/llms.txt" class="seo-page__footer-link">LLM site summary</a>
          <router-link to="/" class="seo-page__footer-link">Home</router-link>
          <a href="/llms.txt" class="seo-page__footer-link">LLM summary</a>
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
  articleNode,
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
      validator: (v) => v === 'city' || v === 'guide' || v === 'project' || v === 'cityService',
    },
    pageId: {
      type: String,
      required: true,
    },
  },
  computed: {
    page() {
      if (this.kind === 'city') return CITY_PAGES[this.pageId] || CITY_PAGES.vancouver;
      if (this.kind === 'cityService') {
        return CITY_SERVICE_PAGES[this.pageId] || CITY_SERVICE_PAGES['aluminum-burnaby'];
      }
      if (this.kind === 'project') {
        return PROJECT_PAGES[this.pageId] || PROJECT_PAGES['burnaby-aluminum-patio-cover'];
      }
      return GUIDE_PAGES[this.pageId] || GUIDE_PAGES['patio-cover-cost'];
    },
    heroKindLabel() {
      if (this.kind === 'city') return 'Local page';
      if (this.kind === 'cityService') return 'Local service';
      if (this.kind === 'project') return 'Project';
      return 'Guide';
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
          label: CITY_PAGES[id].h1.replace(/^Patio Covers in /i, 'Patio covers — '),
        }),
      );
    },
    guideLinks() {
      const labels = {
        'patio-cover-cost': 'Patio cover cost',
        'patio-cover-cost-abbotsford': 'Patio cover cost — Abbotsford',
        'patio-cover-cost-surrey': 'Patio cover cost — Surrey',
        'patio-cover-cost-burnaby': 'Patio cover cost — Burnaby',
        'patio-cover-cost-langley': 'Patio cover cost — Langley',
        'patio-cover-cost-richmond': 'Patio cover cost — Richmond',
        'glass-vs-aluminum': 'Glass vs aluminum',
        permit: 'Permits',
        rain: 'Rain & weather',
        'install-timeline': 'Install timeline',
        'contractors-near-me': 'Contractors near me',
        'fraser-valley': 'Fraser Valley',
        coastal: 'Coastal covers',
      };
      return GUIDE_PAGE_ORDER.filter((id) => !(this.kind === 'guide' && id === this.pageId)).map(
        (id) => ({
          path: GUIDE_PAGES[id].path,
          label: labels[id] || id,
        }),
      );
    },
    cityServiceLinks() {
      const citySlug = this.relatedCitySlug();
      if (!citySlug) return [];
      const ids = CITY_SERVICE_PAGE_ORDER.filter(
        (id) => !(this.kind === 'cityService' && id === this.pageId),
      ).filter((id) => id.endsWith(`-${citySlug}`));
      return ids.map((id) => ({
        path: CITY_SERVICE_PAGES[id].path,
        label: CITY_SERVICE_PAGES[id].h1,
      }));
    },
    projectLinks() {
      const citySlug = this.relatedCitySlug();
      return PROJECT_PAGE_ORDER.filter((id) => {
        if (this.kind === 'project' && id === this.pageId) return false;
        if (citySlug && !id.startsWith(`${citySlug}-`)) return false;
        return true;
      }).map((id) => ({
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
      breadcrumbNode(this.buildBreadcrumbSchema()),
    ].filter(Boolean);
    if (this.kind === 'project') {
      const article = articleNode(this.page);
      if (article) graph.push(article);
    }
    if (this.kind === 'guide') {
      const article = articleNode(this.page);
      if (article) graph.push(article);
    }
    if (this.kind === 'cityService') {
      const service = serviceNode(this.page);
      if (service) graph.push(service);
    }
    if (this.kind === 'city') {
      const service = serviceNode({ ...this.page, serviceType: 'Patio cover installation' });
      if (service) graph.push(service);
    }
    const f = faqPageNode(this.page.faqs);
    if (f) graph.push(f);
    injectJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  },
  unmounted() {
    removeJsonLd();
  },
  methods: {
    relatedCitySlug() {
      if (this.kind === 'city') return this.pageId;
      if (this.kind === 'cityService') {
        const dash = this.pageId.indexOf('-');
        return dash === -1 ? null : this.pageId.slice(dash + 1);
      }
      if (this.kind === 'project') {
        const match = this.page.path.match(/\/projects\/([^/]+)-/);
        return match ? match[1] : null;
      }
      return null;
    },
    buildBreadcrumbSchema() {
      const items = [{ name: 'Home', path: '/' }];
      if (this.kind === 'cityService') {
        const slug = this.relatedCitySlug();
        if (slug && CITY_PAGES[slug]) {
          items.push({ name: CITY_PAGES[slug].h1, path: CITY_PAGES[slug].path });
        }
      } else if (this.kind === 'guide') {
        items.push({ name: 'Guides', path: GUIDE_PAGES[GUIDE_PAGE_ORDER[0]].path });
      } else if (this.kind === 'project') {
        const slug = this.relatedCitySlug();
        if (slug && CITY_PAGES[slug]) {
          items.push({ name: CITY_PAGES[slug].h1, path: CITY_PAGES[slug].path });
        } else {
          items.push({ name: 'Project examples', path: PROJECT_PAGES[PROJECT_PAGE_ORDER[0]].path });
        }
      }
      items.push({ name: this.page.h1, path: this.page.path });
      return items;
    },
    primeOpenChat() {
      try {
        sessionStorage.setItem('openChat', '1');
      } catch {
        /* ignore */
      }
    },
    goHomeOpenEstimate() {
      this.primeOpenChat();
      this.$router.push({ path: '/', hash: '#home' });
    },
  },
};
</script>

<style>
/* Layout shell (homepage .section-hero / .scroll-container / .hero-bg come from global HomePage.css) */
.seo-page__bg {
  position: fixed;
}
.seo-page__scroll {
  position: relative;
  z-index: 1;
}

.seo-page__panel {
  width: 100%;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
}

/* Hero grid: title + image */
.seo-page__hero .seo-page__hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: center;
  width: 100%;
}

@media (min-width: 768px) {
  .seo-page__hero .seo-page__hero-grid {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 44%);
    gap: 32px;
    align-items: stretch;
  }
}

.seo-page__hero-copy {
  min-width: 0;
}

.seo-page__breadcrumb {
  font-size: 0.85rem;
  margin: 0 0 14px;
  color: #64748b;
  font-weight: 500;
}

.seo-page__breadcrumb-link {
  color: #0f172a;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid rgba(15, 23, 42, 0.2);
  transition: border-color 0.15s ease;
}

.seo-page__breadcrumb-link:hover {
  border-bottom-color: #0f172a;
}

.seo-page__breadcrumb-sep {
  margin: 0 0.35rem;
  opacity: 0.55;
}

.seo-page__breadcrumb-current {
  color: #475569;
}

.seo-page__eyebrow-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-left: 0.35rem;
  padding: 0.2em 0.5em;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.seo-page__intro {
  max-width: 40em;
}

.seo-page__trust {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
}

.seo-page__trust-badge {
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

.seo-page__trust-badge::before {
  content: "✓";
  margin-right: 6px;
  font-weight: 800;
  color: #16a34a;
}

.seo-page__hero-visual {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03);
  background: #ffffff;
  min-height: 200px;
}

.seo-page__hero-img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  object-position: center;
}

@media (min-width: 768px) {
  .seo-page__hero-img {
    min-height: 280px;
    aspect-ratio: 4 / 3;
  }
}

.seo-page__subnav {
  margin-top: 20px;
}

/* Body */
.seo-page__body {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 12px 0 8px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  margin-top: 4px;
  background: #ffffff;
}

.seo-page__section {
  padding: 20px max(16px, env(safe-area-inset-left)) 8px
    max(16px, env(safe-area-inset-right));
}

.our-products-intro.seo-page__section-head {
  margin-bottom: 14px;
  padding-top: 4px;
  border-top: none;
  margin-top: 0;
}

.seo-page__section:first-of-type .our-products-intro.seo-page__section-head {
  padding-top: 0;
}

.seo-page__highlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 12px;
  margin-bottom: 8px;
}

.seo-page__highlight-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.seo-page__highlight-card:hover {
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  border-color: rgba(203, 213, 225, 0.95);
}

.seo-page__highlight-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #0f172a;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
}

.seo-page__highlight-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
  color: #334155;
}

.seo-page__block.home-seo-block {
  margin-top: 0;
  border-top: none;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.92);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
}

.seo-page__pricing-callout {
  margin: 0;
  padding: 20px 22px 22px;
  border-radius: 14px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-left: 4px solid #0f172a;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);
}

.seo-page__pricing-title {
  margin: 0 0 10px;
  font-size: clamp(1.05rem, 2.2vw, 1.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.seo-page__pricing-body {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
}

/* Dark CTA panel — homepage inverse / trust-strip energy */
.seo-page__section--cta {
  padding-top: 24px;
  padding-bottom: 8px;
}

.seo-page__cta-panel {
  margin: 0 max(4px, env(safe-area-inset-left)) 0 max(4px, env(safe-area-inset-right));
  padding: 28px 24px 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #172554 100%);
  color: #f8fafc;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.seo-page__cta-title {
  margin: 0 0 10px;
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  line-height: 1.2;
}

.seo-page__cta-lead {
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 1.55;
  color: rgba(248, 250, 252, 0.88);
  max-width: 36em;
}

.seo-page__cta-row {
  margin-top: 4px;
}

.seo-page__cta-btn-primary {
  background: #ffffff !important;
  color: #0f172a !important;
  border-color: #ffffff !important;
}

.seo-page__cta-btn-primary:hover {
  background: #f1f5f9 !important;
  border-color: #f1f5f9 !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2) !important;
}

.seo-page__cta-btn-secondary {
  background: transparent !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.45) !important;
}

.seo-page__cta-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.75) !important;
}

/* FAQ: reuse home-faq block */
.seo-page__faq {
  margin-top: 12px;
}

.seo-page__case-study {
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
}

.seo-page__case-study-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 420px;
  object-fit: cover;
}

.seo-page__case-caption {
  margin: 0;
  padding: 14px 18px 0;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

.seo-page__case-link-wrap {
  margin: 10px 18px 16px;
}

.seo-page__case-link {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 2px solid rgba(15, 23, 42, 0.15);
}

.seo-page__case-link:hover {
  border-bottom-color: #0f172a;
}

.seo-page__related-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
}

.seo-page__related-list li {
  margin: 0;
}

.seo-page__faq-item {
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

/* Explore grid */
.seo-page__explore {
  padding-bottom: 28px;
}

.seo-page__explore-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 14px;
  margin-top: 4px;
}

.seo-page__explore-card {
  padding: 16px 18px 18px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

.seo-page__explore-card-title {
  margin: 0 0 12px;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.seo-page__explore-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.seo-page__explore-list li {
  margin-bottom: 8px;
}

.seo-page__explore-list li:last-child {
  margin-bottom: 0;
}

.seo-page__explore-link {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 1px solid rgba(15, 23, 42, 0.18);
  transition: border-color 0.15s ease, color 0.15s ease;
}

.seo-page__explore-link:hover {
  border-bottom-color: #0f172a;
  color: #334155;
}

.seo-page__back-home {
  margin: 20px 0 0;
  padding-top: 8px;
}

.seo-page__back-home-link {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 2px solid rgba(15, 23, 42, 0.15);
}

.seo-page__back-home-link:hover {
  border-bottom-color: #0f172a;
}

/* Footer strip — align with compact SEO footer */
.seo-page__footer .site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem max(16px, env(safe-area-inset-left)) 1.25rem
    max(16px, env(safe-area-inset-right));
  max-width: 920px;
}

.seo-page__footer-link {
  color: inherit;
  text-decoration: underline;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .seo-page__cta-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
