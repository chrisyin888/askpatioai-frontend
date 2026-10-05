<template>
  <div class="instant-quote">
    <nav class="iq-topbar">
      <router-link to="/" class="iq-brand">LoomiHome <span>Patios</span></router-link>
      <router-link to="/" class="iq-back">← Back to home</router-link>
    </nav>

    <header class="iq-hero">
      <p class="iq-eyebrow">Instant quote</p>
      <h1 class="iq-title">Design Your Patio Cover — See the Price Instantly</h1>
      <p class="iq-subtitle">
        Pick a roof style, set your size, and get a planning total right now.
        No waiting for a callback. Final quote confirmed after a free on-site measurement.
      </p>
    </header>

    <section class="iq-panel">
      <h2 class="iq-step-title"><span class="iq-step-num">1</span> Choose your roof style</h2>
      <div class="iq-cards">
        <button
          v-for="opt in roofOptions"
          :key="opt.key"
          type="button"
          :class="['iq-card', { active: roofType === opt.key }]"
          :aria-pressed="roofType === opt.key"
          @click="roofType = opt.key"
        >
          <span class="iq-card-media">
            <img :src="assetUrl(opt.image)" :alt="opt.alt" loading="lazy" />
            <span v-if="roofType === opt.key" class="iq-card-check" aria-hidden="true">✓</span>
          </span>
          <span class="iq-card-body">
            <span class="iq-card-name">{{ opt.name }}</span>
            <span class="iq-card-desc">{{ opt.desc }}</span>
          </span>
        </button>
      </div>
    </section>

    <section class="iq-panel">
      <h2 class="iq-step-title"><span class="iq-step-num">2</span> Set your size</h2>
      <div class="iq-sliders">
        <div class="iq-slider-row">
          <label for="iq-length">Length <strong>{{ length }} ft</strong></label>
          <input id="iq-length" v-model.number="length" type="range" min="4" max="40" step="1" />
        </div>
        <div class="iq-slider-row">
          <label for="iq-width">Width (projection) <strong>{{ width }} ft</strong></label>
          <input id="iq-width" v-model.number="width" type="range" min="8" max="30" step="1" />
        </div>
        <div class="iq-slider-row">
          <label for="iq-cover-height">Cover height <strong>{{ coverHeight }} ft</strong></label>
          <input
            id="iq-cover-height"
            v-model.number="coverHeight"
            type="range"
            :min="coverHeightRange.min"
            :max="coverHeightRange.max"
            step="1"
          />
          <p class="iq-hint">
            Height from the floor or deck surface to the underside of the roof.
            Up to {{ coverHeightRange.includedUpToFt }} ft is standard; taller covers need longer posts and extra bracing.
          </p>
        </div>
        <p class="iq-sqft">{{ length }} × {{ width }} ft = <strong>{{ sqft }} sq ft</strong></p>
      </div>
    </section>

    <section class="iq-panel">
      <h2 class="iq-step-title"><span class="iq-step-num">3</span> Location &amp; deck height</h2>
      <div class="iq-field">
        <label for="iq-city" class="iq-field-label">City</label>
        <select id="iq-city" v-model="city" class="iq-select">
          <option value="" disabled>Select your city</option>
          <option v-for="c in cityOptions" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <p class="iq-field-label">Which floor is the patio or deck on?</p>
      <div class="iq-floors">
        <button
          v-for="opt in floorOptions"
          :key="opt.floor"
          type="button"
          :class="['iq-floor', { active: floor === opt.floor }]"
          :aria-pressed="floor === opt.floor"
          @click="floor = opt.floor"
        >
          <span class="iq-floor-name">{{ opt.name }}</span>
          <span class="iq-floor-desc">{{ opt.desc }}</span>
        </button>
      </div>
    </section>

    <section class="iq-panel iq-estimate">
      <h2 class="iq-step-title"><span class="iq-step-num">4</span> Your planning total</h2>
      <div class="iq-estimate-grid">
        <figure class="iq-preview">
          <img :src="assetUrl(selectedRoof.render)" :alt="selectedRoof.renderAlt" />
          <figcaption>{{ selectedRoof.name }} · {{ length }}×{{ width }} ft · {{ coverHeight }} ft high · {{ selectedFloor.name }}</figcaption>
        </figure>

        <div class="iq-estimate-body">
          <div class="iq-price">
            {{ priceLabel }}
            <span class="iq-price-note">CAD, before GST</span>
          </div>
          <p v-if="quote.isMinimum" class="iq-minimum">
            Minimum charge of ${{ minimumCharge.toLocaleString() }} applies to covers under {{ minimumSqft }} sq ft.
          </p>
          <p class="iq-disclaimer">
            Planning total for {{ roofArticle }} {{ roofLabel }} patio cover, {{ length }}×{{ width }} ft, {{ coverHeight }} ft high,
            {{ selectedFloor.name.toLowerCase() }}{{ city ? ` in ${city}` : '' }}.
            Final pricing is confirmed after a free on-site measurement.
          </p>

          <form class="iq-form" @submit.prevent="submitLead">
            <input v-model="name" type="text" placeholder="Your name" autocomplete="name" required />
            <input v-model="email" type="email" placeholder="Email address" autocomplete="email" required />
            <input v-model="phone" type="tel" placeholder="Phone number" autocomplete="tel" required />
            <button class="iq-submit" type="submit" :disabled="leadSent || leadSending">
              {{ leadSent ? 'Quote Sent — Check Your Inbox' : (leadSending ? 'Sending…' : 'Email Me This Quote') }}
            </button>
            <p v-if="leadError" class="iq-error">{{ leadError }}</p>
          </form>
        </div>
      </div>

      <div v-if="depositUrl" class="iq-deposit">
        <p class="iq-deposit-title">Ready to move forward?</p>
        <p class="iq-deposit-desc">
          Pay a <strong>$100 booking deposit</strong> to lock in your free on-site measurement.
          Fully deducted from your project total.
        </p>
        <a class="iq-submit" :href="depositUrl" target="_blank" rel="noopener">
          Pay $100 Booking Deposit
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import { CHAT_PRICING, CITY_TRAVEL_TIERS, COVER_HEIGHT, instantPatioQuote } from '../utils/chatPricing.js';
import { publicAssetUrl } from '../utils/publicAssetUrl';
import siteData from '../data/siteData.json';

/** Stripe Payment Link for the $100 booking deposit — set after creating it in the Stripe dashboard. */
const DEPOSIT_PAYMENT_URL = '';
const LEAD_API_URL = (siteData.site && siteData.site.leadApiUrl) || 'https://fastapi-0bcw.onrender.com/lead';

export default {
  name: 'InstantQuote',
  data() {
    return {
      roofType: 'aluminum',
      length: 16,
      width: 12,
      name: '',
      email: '',
      phone: '',
      city: '',
      floor: 1,
      coverHeight: COVER_HEIGHT.default,
      coverHeightRange: COVER_HEIGHT,
      cityOptions: CITY_TRAVEL_TIERS.flatMap((t) => t.cities),
      floorOptions: [
        { floor: 1, name: 'Ground / 1st floor', desc: 'Patio or low deck — standard install.' },
        { floor: 2, name: '2nd floor deck', desc: 'Taller posts and lifting — moderate install.' },
        { floor: 3, name: '3rd floor deck', desc: 'Highest posts and access work — complex install.' },
      ],
      minimumCharge: CHAT_PRICING.patioCoverMinimumCharge,
      minimumSqft: CHAT_PRICING.patioCoverMinimumChargeBelowSqft,
      leadSending: false,
      leadSent: false,
      leadError: '',
      depositUrl: DEPOSIT_PAYMENT_URL,
      roofOptions: [
        {
          key: 'aluminum',
          name: 'Aluminum Roof',
          desc: 'Solid shade, lowest maintenance, most popular.',
          image: '/house/Aluminum/aluminum-hero.png',
          alt: 'Aluminum patio cover with solid roof panels',
          render: '/house/instant-quote/aluminum-render.jpg',
          renderAlt: '3D render of an aluminum patio cover with solid V-panel roof, posts, beam and downpipe',
        },
        {
          key: 'glass',
          name: 'Glass Roof',
          desc: 'Maximum daylight, bright and open feel.',
          image: '/house/glass/glass-hero.png',
          alt: 'Glass patio cover with tempered glass roof',
          render: '/house/instant-quote/glass-render.jpg',
          renderAlt: '3D render of a glass patio cover with tempered glass roof panels on an aluminum frame',
        },
        {
          key: 'combo',
          name: 'Skyline Combo',
          desc: 'Glass center with solid borders — the best of both.',
          image: '/house/skyline/skyline-hero.png',
          alt: 'Skyline combo patio cover mixing glass and solid panels',
          render: '/house/instant-quote/skyline-render.jpg',
          renderAlt: '3D render of a Skyline combo patio cover alternating solid panels and glass skylight strips',
        },
      ],
    };
  },
  computed: {
    sqft() {
      return this.length * this.width;
    },
    quote() {
      return instantPatioQuote({
        material: this.roofType,
        sqft: this.sqft,
        floor: this.floor,
        city: this.city,
        coverHeight: this.coverHeight,
      });
    },
    priceLabel() {
      const { totalMin, totalMax } = this.quote;
      if (totalMin === totalMax) return `$${totalMin.toLocaleString()}`;
      return `$${totalMin.toLocaleString()} – $${totalMax.toLocaleString()}`;
    },
    selectedFloor() {
      return this.floorOptions.find((o) => o.floor === this.floor) || this.floorOptions[0];
    },
    selectedRoof() {
      return this.roofOptions.find((o) => o.key === this.roofType) || this.roofOptions[0];
    },
    roofLabel() {
      return this.selectedRoof.name.toLowerCase();
    },
    roofArticle() {
      return /^[aeiou]/.test(this.roofLabel) ? 'an' : 'a';
    },
  },
  methods: {
    assetUrl(path) {
      return publicAssetUrl(path);
    },
    async submitLead() {
      if (this.leadSending || this.leadSent) return;
      if (!this.city) {
        this.leadError = 'Please select your city in step 3.';
        return;
      }
      this.leadSending = true;
      this.leadError = '';
      try {
        const res = await fetch(LEAD_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'instant_quote',
            name: this.name,
            email: this.email,
            phone: this.phone,
            city: this.city,
            project_type: 'patio cover',
            size: `${this.length}x${this.width} ft (${this.sqft} sq ft)`,
            message: `Instant quote configurator: ${this.roofLabel}, ${this.coverHeight} ft cover height, ${this.selectedFloor.name}, planning total ${this.priceLabel} CAD before GST`,
            notes: `roof=${this.roofType}; floor=${this.floor}; cover_height_ft=${this.coverHeight}`,
          }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        this.leadSent = true;
      } catch (e) {
        this.leadError = 'Something went wrong. Please try again or contact us directly.';
      } finally {
        this.leadSending = false;
      }
    },
  },
};
</script>

<style scoped>
.instant-quote {
  min-height: 100vh;
  background: #f8fafc;
  padding: 0 16px 72px;
  box-sizing: border-box;
  color: #0f172a;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen,
    Ubuntu, sans-serif;
}

.iq-topbar {
  max-width: 1040px;
  margin: 0 auto;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iq-brand {
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0f172a;
  text-decoration: none;
}
.iq-brand span {
  color: #d97706;
}
.iq-back {
  color: #475569;
  font-size: 15px;
  text-decoration: none;
}
.iq-back:hover {
  color: #0f172a;
}

.iq-hero {
  max-width: 760px;
  margin: 12px auto 28px;
  text-align: center;
}
.iq-eyebrow {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #059669;
}
.iq-title {
  margin: 0 0 14px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(28px, 4.4vw, 44px);
  line-height: 1.12;
}
.iq-subtitle {
  margin: 0;
  color: #475569;
  font-size: 17px;
  line-height: 1.6;
}

.iq-panel {
  max-width: 1040px;
  margin: 0 auto 20px;
  padding: 28px 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
  box-sizing: border-box;
}
.iq-step-title {
  font-size: 21px;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.iq-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #059669;
  color: #fff;
  font-size: 16px;
  flex-shrink: 0;
}

.iq-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.iq-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
}
.iq-card:hover {
  border-color: #94a3b8;
  transform: translateY(-2px);
}
.iq-card.active {
  border-color: #059669;
  box-shadow: 0 8px 24px rgba(5, 150, 105, 0.2);
}
.iq-card-media {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f1f5f9;
}
.iq-card-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.iq-card-check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #059669;
  color: #fff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.iq-card-body {
  display: block;
  padding: 14px 16px 16px;
}
.iq-card-name {
  display: block;
  font-weight: 700;
  font-size: 16px;
}
.iq-card-desc {
  display: block;
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.45;
}

.iq-sliders {
  max-width: 620px;
}
.iq-slider-row {
  margin-bottom: 20px;
}
.iq-slider-row label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
  color: #334155;
}
.iq-slider-row label strong {
  color: #0f172a;
}
.iq-slider-row input[type='range'] {
  width: 100%;
  accent-color: #059669;
  cursor: pointer;
}
.iq-sqft {
  font-size: 18px;
  margin: 8px 0 0;
}
.iq-hint {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: #64748b;
}

.iq-field {
  max-width: 420px;
  margin-bottom: 22px;
}
.iq-field-label {
  display: block;
  margin: 0 0 8px;
  font-size: 15px;
  color: #334155;
  font-weight: 600;
}
.iq-select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  background: #fff;
  color: #0f172a;
  cursor: pointer;
}
.iq-select:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.18);
}
.iq-floors {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.iq-floor {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.iq-floor:hover {
  border-color: #94a3b8;
}
.iq-floor.active {
  border-color: #059669;
  box-shadow: 0 6px 18px rgba(5, 150, 105, 0.18);
}
.iq-floor-name {
  font-weight: 700;
  font-size: 15px;
}
.iq-floor-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}
.iq-minimum {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #b45309;
}

.iq-estimate-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 28px;
  align-items: start;
}
.iq-preview {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #f4f4f4;
}
.iq-preview img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  display: block;
}
.iq-preview figcaption {
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  background: #fff;
  border-top: 1px solid #e2e8f0;
}
.iq-price {
  font-size: 38px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
  line-height: 1.15;
}
.iq-price-note {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin-top: 4px;
}
.iq-disclaimer {
  color: #64748b;
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 20px;
}
.iq-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.iq-form input {
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
}
.iq-form input:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.18);
}
.iq-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 28px;
  border: none;
  border-radius: 999px;
  background: #d97706;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(217, 119, 6, 0.35);
  transition: background 0.15s, transform 0.15s;
}
.iq-submit:hover:not(:disabled) {
  background: #b45309;
  transform: translateY(-1px);
}
.iq-submit:disabled {
  opacity: 0.7;
  cursor: default;
}
.iq-error {
  color: #dc2626;
  font-size: 14px;
  margin: 0;
}

.iq-deposit {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
}
.iq-deposit-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.iq-deposit-desc {
  color: #475569;
  max-width: 520px;
  margin: 8px auto 16px;
}

@media (max-width: 760px) {
  .iq-cards,
  .iq-floors,
  .iq-estimate-grid {
    grid-template-columns: 1fr;
  }
  .iq-panel {
    padding: 22px 16px;
  }
  .iq-price {
    font-size: 32px;
  }
}
</style>
