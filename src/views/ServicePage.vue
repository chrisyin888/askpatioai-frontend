<template>
  <div class="app service-page-root">
    <div class="hero-bg service-page-bg" aria-hidden="true"></div>
    <div class="scroll-container service-page-scroll">
      <section class="section section-hero service-page-section">
        <div class="content-wrapper glass-panel service-page-panel">
          <nav class="service-page-breadcrumb" aria-label="Breadcrumb">
            <router-link to="/" class="service-page-breadcrumb__link">Home</router-link>
            <span class="service-page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="service-page-breadcrumb__current">{{ page.h1 }}</span>
          </nav>

          <header class="header service-page-header">
            <h1 class="hero-main-title service-page-h1">{{ page.h1 }}</h1>
            <p class="subtitle hero-subtitle">{{ page.intro }}</p>
          </header>

          <div class="service-page-benefits">
            <h2 class="service-page-h2">Why homeowners choose this option</h2>
            <ul class="service-page-benefits-list">
              <li v-for="(b, i) in page.benefits" :key="i">{{ b }}</li>
            </ul>
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

          <div class="service-page-crosslinks">
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
          </div>
        </div>
      </section>

      <footer class="site-footer service-page-footer" role="contentinfo">
        <div class="site-footer__inner">
          <p class="site-footer__copy">© 2026 LoomiHome Patios · Vancouver &amp; Lower Mainland</p>
          <router-link to="/" class="service-page-footer-link">Back to home</router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from '../data/servicePages';

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
.service-page-cta-block {
  padding: 1.25rem 0 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
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
