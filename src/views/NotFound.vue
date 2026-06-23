<template>
  <div class="app seo-page">
    <div class="hero-bg seo-page__bg" aria-hidden="true"></div>
    <div class="scroll-container seo-page__scroll">
      <article class="section section-hero seo-page__article">
        <div class="content-wrapper glass-panel seo-page__panel">
          <header class="header hero-header seo-page__hero">
            <p class="hero-eyebrow">
              <span class="hero-eyebrow-name">LoomiHome</span>
              <span class="hero-eyebrow-suffix">Patios</span>
            </p>
            <h1 class="hero-main-title">Page not found</h1>
            <p class="subtitle hero-subtitle">
              That page does not exist. Return to the homepage for patio cover estimates and local service info.
              Try the
              <router-link to="/">homepage</router-link>,
              <router-link to="/patio-cover-cost-vancouver">pricing guide</router-link>, or
              <router-link to="/patio-covers-vancouver">Vancouver patio covers</router-link>.
            </p>
            <div class="hero-cta-row">
              <router-link to="/" class="hero-cta hero-cta--primary">Back to homepage</router-link>
            </div>
          </header>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>
