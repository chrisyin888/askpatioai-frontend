<template>
  <div class="landing-patio">
    <nav class="lp-topbar">
      <router-link to="/" class="lp-brand">LoomiHome <span>Patios</span></router-link>
      <router-link to="/" class="lp-back">← Back to home</router-link>
    </nav>

    <!-- Pain-point hero -->
    <header class="lp-hero">
      <p class="lp-eyebrow">Metro Vancouver patio covers</p>
      <h1 class="lp-title">Rain Steals Your Patio 8 Months a Year.<br />Take It Back.</h1>
      <p class="lp-subtitle">
        A covered patio turns Metro Vancouver's lost rainy months into the room
        your family uses most — rain or shine.
      </p>
      <ul class="lp-badges">
        <li><span aria-hidden="true">✓</span> Free On-Site Measurement</li>
        <li><span aria-hidden="true">✓</span> 60-Second Instant Quote</li>
        <li><span aria-hidden="true">✓</span> Locally Installed in Metro Vancouver</li>
      </ul>
    </header>

    <!-- Real project photo -->
    <section class="lp-photo">
      <img
        :src="assetUrl('/house/Aluminum/aluminum-hero.png')"
        alt="Aluminum patio cover installed on a Metro Vancouver home"
        loading="eager"
      />
      <p class="lp-photo-caption">A recent aluminum patio cover install in Metro Vancouver.</p>
    </section>

    <!-- Designer entry card -->
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

    <!-- Bottom repeat CTA -->
    <section class="lp-final">
      <h2 class="lp-final-title">Your patio, usable all year.</h2>
      <router-link to="/instant-quote/" class="lp-final-cta">Launch the Patio Cover Designer</router-link>
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
  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(232, 163, 61, 0.12), transparent 60%),
    linear-gradient(180deg, #0c1410 0%, #14231b 55%, #0c1410 100%);
  color: #f2f5f3;
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
  color: #f2f5f3;
  text-decoration: none;
}
.lp-brand span {
  color: #e8a33d;
}
.lp-back {
  color: #9fb0a6;
  font-size: 15px;
  text-decoration: none;
}

.lp-hero {
  max-width: 760px;
  margin: 26px auto 30px;
  text-align: center;
}
.lp-eyebrow {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #e8a33d;
}
.lp-title {
  margin: 0 0 16px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(32px, 5.4vw, 52px);
  line-height: 1.12;
  color: #ffffff;
}
.lp-subtitle {
  margin: 0 auto;
  max-width: 600px;
  font-size: 17px;
  line-height: 1.6;
  color: #c3cec8;
}
.lp-badges {
  list-style: none;
  margin: 24px 0 0;
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
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #eef3f0;
}
.lp-badges li span {
  color: #e8a33d;
  font-weight: 900;
}

.lp-photo {
  max-width: 1040px;
  margin: 0 auto 30px;
}
.lp-photo img {
  width: 100%;
  border-radius: 18px;
  display: block;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}
.lp-photo-caption {
  margin: 10px 4px 0;
  font-size: 13px;
  color: #8fa098;
}

.lp-designer {
  max-width: 720px;
  margin: 0 auto 40px;
}
.lp-card {
  background: #ffffff;
  color: #0f172a;
  border-radius: 22px;
  padding: 36px 28px;
  text-align: center;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
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
  background: #111111;
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
  background: #2a2a2a;
}
.lp-card-micro {
  margin: 16px 0 0;
  font-size: 13px;
  color: #64748b;
}

.lp-final {
  max-width: 720px;
  margin: 0 auto 30px;
  text-align: center;
}
.lp-final-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(24px, 4vw, 36px);
  margin: 0 0 22px;
  color: #ffffff;
}
.lp-final-cta {
  display: inline-block;
  background: #e8a33d;
  color: #1a1206;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 34px;
  border-radius: 10px;
}
.lp-final-cta:hover {
  background: #f0b45a;
}
.lp-areas {
  margin: 16px 0 0;
  font-size: 14px;
  color: #8fa098;
}

.lp-footer {
  max-width: 1040px;
  margin: 0 auto;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  text-align: center;
  font-size: 13px;
  color: #6f7f77;
}

@media (max-width: 640px) {
  .lp-card {
    padding: 28px 18px;
  }
  .lp-card-cta,
  .lp-final-cta {
    display: block;
    padding: 16px 12px;
  }
}
</style>
