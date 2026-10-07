<template>
  <div class="landing-patio">
    <nav class="lp-topbar">
      <router-link to="/" class="lp-brand">LoomiHome <span>Patios</span></router-link>
      <router-link to="/" class="lp-back">← Back to home</router-link>
    </nav>

    <!-- 1. Pain-point hero -->
    <header class="lp-hero">
      <p class="lp-eyebrow">Metro Vancouver patio covers</p>
      <h1 class="lp-title">Rain Steals Your Patio 8 Months a Year.<br />Take It Back.</h1>
      <p class="lp-subtitle">
        Metro Vancouver sees 160+ rainy days a year. A covered patio turns those
        lost months into the room your family uses most — rain or shine.
      </p>
      <ul class="lp-badges">
        <li><span aria-hidden="true">✓</span> Free On-Site Measurement</li>
        <li><span aria-hidden="true">✓</span> 60-Second Instant Quote</li>
        <li><span aria-hidden="true">✓</span> Locally Installed in Metro Vancouver</li>
      </ul>
    </header>

    <!-- 2. Real project photo -->
    <section class="lp-photo">
      <img
        :src="assetUrl('/house/Aluminum/aluminum-hero.png')"
        alt="Aluminum patio cover installed on a Metro Vancouver home"
        loading="eager"
      />
      <p class="lp-photo-caption">A recent aluminum patio cover install in Metro Vancouver.</p>
    </section>

    <!-- 3. Designer entry card -->
    <section class="lp-designer">
      <div class="lp-card">
        <h2 class="lp-card-title">Design Your Dream Patio Cover<br />&amp; Get Instant Pricing</h2>
        <img
          class="lp-card-preview"
          :src="assetUrl('/house/instant-quote/aluminum-render.jpg')"
          alt="Preview of the online patio cover designer"
          loading="lazy"
        />
        <p class="lp-card-sub">
          Configure your patio cover and see exactly what it costs in under 60 seconds.
        </p>
        <router-link to="/instant-quote/" class="lp-card-cta">Launch the Patio Cover Designer</router-link>
        <p class="lp-card-micro">No obligation &nbsp;•&nbsp; Takes 60 seconds &nbsp;•&nbsp; Accurate pricing</p>
      </div>
    </section>

    <!-- 4. How it works -->
    <section class="lp-steps">
      <div class="lp-step">
        <span class="lp-step-num">1</span>
        <p><strong>Pick a roof style.</strong> Aluminum, glass, or our skyline combo.</p>
      </div>
      <div class="lp-step">
        <span class="lp-step-num">2</span>
        <p><strong>Set your size.</strong> Sliders or your own measurements.</p>
      </div>
      <div class="lp-step">
        <span class="lp-step-num">3</span>
        <p><strong>See your price instantly</strong> and book a free on-site measurement.</p>
      </div>
    </section>

    <!-- 5. Bottom repeat CTA -->
    <section class="lp-final">
      <h2 class="lp-final-title">Your patio, usable all year.</h2>
      <router-link to="/instant-quote/" class="lp-card-cta">Launch the Patio Cover Designer</router-link>
      <p class="lp-areas">Serving Vancouver, Burnaby, Richmond, Surrey, Delta, Langley, Coquitlam &amp; more.</p>
    </section>

    <footer class="lp-footer">
      <p>© 2026 LoomiHome Patios · Metro Vancouver, BC</p>
    </footer>
  </div>
</template>

<script>
import { publicAssetUrl } from '../utils/publicAssetUrl';

export default {
  name: 'LandingPatioCover',
  methods: {
    assetUrl(path) {
      return publicAssetUrl(path);
    },
  },
};
</script>

<style scoped>
.landing-patio {
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen,
    Ubuntu, sans-serif;
  padding: 0 16px 48px;
  box-sizing: border-box;
}

.lp-topbar {
  max-width: 1040px;
  margin: 0 auto;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lp-brand {
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0f172a;
  text-decoration: none;
}
.lp-brand span {
  color: #d97706;
}
.lp-back {
  color: #475569;
  font-size: 15px;
  text-decoration: none;
}

.lp-hero {
  max-width: 760px;
  margin: 16px auto 28px;
  text-align: center;
}
.lp-eyebrow {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #059669;
}
.lp-title {
  margin: 0 0 14px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(30px, 5vw, 48px);
  line-height: 1.12;
}
.lp-subtitle {
  margin: 0 auto;
  max-width: 620px;
  font-size: 17px;
  line-height: 1.6;
  color: #475569;
}
.lp-badges {
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.lp-badges li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 700;
}
.lp-badges li span {
  color: #059669;
  font-weight: 900;
}

.lp-photo {
  max-width: 1040px;
  margin: 0 auto 28px;
}
.lp-photo img {
  width: 100%;
  border-radius: 18px;
  display: block;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
}
.lp-photo-caption {
  margin: 10px 4px 0;
  font-size: 13px;
  color: #64748b;
}

.lp-designer {
  max-width: 720px;
  margin: 0 auto 36px;
}
.lp-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  padding: 36px 28px;
  text-align: center;
  box-shadow: 0 16px 44px rgba(15, 23, 42, 0.1);
}
.lp-card-title {
  margin: 0 0 18px;
  font-size: clamp(22px, 3.6vw, 32px);
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 1.2;
}
.lp-card-preview {
  width: 100%;
  border-radius: 14px;
  border: 1px solid #eef2f7;
  display: block;
  margin-bottom: 18px;
}
.lp-card-sub {
  margin: 0 0 22px;
  font-size: 16px;
  color: #475569;
  line-height: 1.55;
}
.lp-card-cta {
  display: inline-block;
  background: #0f172a;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 34px;
  border-radius: 10px;
}
.lp-card-cta:hover {
  background: #1e293b;
}
.lp-card-micro {
  margin: 16px 0 0;
  font-size: 13px;
  color: #64748b;
}

.lp-steps {
  max-width: 1040px;
  margin: 0 auto 36px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.lp-step {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.lp-step-num {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #059669;
  color: #fff;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.lp-step p {
  margin: 2px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: #334155;
}

.lp-final {
  max-width: 720px;
  margin: 0 auto 30px;
  text-align: center;
}
.lp-final-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(24px, 4vw, 36px);
  margin: 0 0 20px;
}
.lp-areas {
  margin: 16px 0 0;
  font-size: 14px;
  color: #64748b;
}

.lp-footer {
  max-width: 1040px;
  margin: 0 auto;
  padding-top: 18px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .lp-steps {
    grid-template-columns: 1fr;
  }
  .lp-card {
    padding: 28px 18px;
  }
  .lp-card-cta {
    display: block;
    padding: 16px 12px;
  }
}
</style>
