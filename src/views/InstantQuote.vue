<template>
  <div class="instant-quote">
    <!-- Hero -->
    <section class="section iq-hero">
      <div class="content-wrapper glass-panel iq-hero-panel">
        <h1 class="title">Design Your Patio Cover — See the Price Instantly</h1>
        <p class="subtitle">
          Pick a roof style, set your size, and get a planning total right now.
          No waiting for a callback. Final quote confirmed after a free on-site measurement.
        </p>
      </div>
    </section>

    <!-- Step 1: roof type -->
    <section class="section iq-step">
      <div class="content-wrapper glass-panel">
        <h2 class="iq-step-title"><span class="iq-step-num">1</span> Choose your roof style</h2>
        <div class="iq-cards">
          <button
            v-for="opt in roofOptions"
            :key="opt.key"
            :class="['iq-card', { active: roofType === opt.key }]"
            @click="roofType = opt.key"
          >
            <div class="iq-card-icon">{{ opt.icon }}</div>
            <div class="iq-card-name">{{ opt.name }}</div>
            <div class="iq-card-desc">{{ opt.desc }}</div>
          </button>
        </div>
      </div>
    </section>

    <!-- Step 2: size -->
    <section class="section iq-step">
      <div class="content-wrapper glass-panel">
        <h2 class="iq-step-title"><span class="iq-step-num">2</span> Set your size</h2>
        <div class="iq-sliders">
          <div class="iq-slider-row">
            <label>Length: <strong>{{ length }} ft</strong></label>
            <input type="range" min="8" max="40" step="1" v-model.number="length" />
          </div>
          <div class="iq-slider-row">
            <label>Width: <strong>{{ width }} ft</strong></label>
            <input type="range" min="8" max="30" step="1" v-model.number="width" />
          </div>
          <p class="iq-sqft">{{ length }} × {{ width }} ft = <strong>{{ sqft }} sq ft</strong></p>
        </div>
      </div>
    </section>

    <!-- Live estimate -->
    <section class="section iq-step">
      <div class="content-wrapper glass-panel iq-estimate-panel">
        <h2 class="iq-step-title"><span class="iq-step-num">3</span> Your planning total</h2>
        <div class="iq-price">
          ${{ quote.totalMin.toLocaleString() }} – ${{ quote.totalMax.toLocaleString() }}
          <span class="iq-price-note">CAD, before GST</span>
        </div>
        <p class="iq-disclaimer">
          Planning total for a {{ roofLabel }} patio cover, {{ length }}×{{ width }} ft.
          Final pricing is confirmed after a free on-site measurement.
        </p>

        <!-- Lead form -->
        <form class="iq-form" @submit.prevent="submitLead">
          <input v-model="name" type="text" placeholder="Your name" required />
          <input v-model="email" type="email" placeholder="Email address" required />
          <input v-model="city" type="text" placeholder="City (e.g. Burnaby)" required />
          <button class="hero-cta hero-cta--primary" type="submit" :disabled="leadSent || leadSending">
            {{ leadSent ? 'Quote Sent — Check Your Inbox' : (leadSending ? 'Sending…' : 'Email Me This Quote') }}
          </button>
          <p v-if="leadError" class="iq-error">{{ leadError }}</p>
        </form>

        <!-- Deposit -->
        <div v-if="depositUrl" class="iq-deposit">
          <p class="iq-deposit-title">Ready to move forward?</p>
          <p class="iq-deposit-desc">
            Pay a <strong>$100 booking deposit</strong> to lock in your free on-site measurement.
            Fully deducted from your project total.
          </p>
          <a class="hero-cta hero-cta--primary" :href="depositUrl" target="_blank" rel="noopener">
            Pay $100 Booking Deposit
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { patioCoverQuoteForMaterial } from '../utils/chatPricing.js';
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
      city: '',
      leadSending: false,
      leadSent: false,
      leadError: '',
      depositUrl: DEPOSIT_PAYMENT_URL,
      roofOptions: [
        { key: 'aluminum', icon: '🏠', name: 'Aluminum Roof', desc: 'Solid shade, lowest maintenance, most popular.' },
        { key: 'glass', icon: '🔆', name: 'Glass Roof', desc: 'Maximum daylight, bright and open feel.' },
        { key: 'combo', icon: '✨', name: 'Skyline Combo', desc: 'Glass center with solid borders — the best of both.' },
      ],
    };
  },
  computed: {
    sqft() {
      return this.length * this.width;
    },
    quote() {
      return patioCoverQuoteForMaterial(this.roofType, this.sqft);
    },
    roofLabel() {
      const opt = this.roofOptions.find((o) => o.key === this.roofType);
      return opt ? opt.name.toLowerCase() : '';
    },
  },
  methods: {
    async submitLead() {
      if (this.leadSending || this.leadSent) return;
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
            city: this.city,
            project_type: 'patio cover',
            size: `${this.length}x${this.width} ft (${this.sqft} sq ft)`,
            message: `Instant quote configurator: ${this.roofLabel}, planning total $${this.quote.totalMin}-$${this.quote.totalMax} CAD before GST`,
            notes: `roof=${this.roofType}`,
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
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}
.iq-hero-panel {
  text-align: center;
  padding: 48px 24px;
  background: #ffffff;
}
.iq-step {
  margin-top: 24px;
}
.iq-step .content-wrapper {
  background: #ffffff;
  padding: 32px 24px;
}
.iq-step-title {
  font-size: 22px;
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
  background: #0f172a;
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
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 12px;
  background: #fff;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.iq-card:hover {
  border-color: #94a3b8;
}
.iq-card.active {
  border-color: #0f172a;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
}
.iq-card-icon {
  font-size: 32px;
}
.iq-card-name {
  font-weight: 700;
  margin-top: 8px;
}
.iq-card-desc {
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
}
.iq-sliders {
  max-width: 560px;
}
.iq-slider-row {
  margin-bottom: 18px;
}
.iq-slider-row label {
  display: block;
  margin-bottom: 8px;
}
.iq-slider-row input[type='range'] {
  width: 100%;
}
.iq-sqft {
  font-size: 18px;
  margin-top: 8px;
}
.iq-estimate-panel {
  text-align: center;
}
.iq-estimate-panel .iq-step-title {
  justify-content: center;
}
.iq-price {
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin: 12px 0;
}
.iq-price-note {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
}
.iq-disclaimer {
  color: #64748b;
  font-size: 14px;
  max-width: 560px;
  margin: 0 auto 24px;
}
.iq-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
  margin: 0 auto;
}
.iq-form input {
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
}
.iq-form .hero-cta {
  text-decoration: none;
  display: inline-block;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #0f172a;
}
.iq-error {
  color: #dc2626;
  font-size: 14px;
}
.iq-deposit {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}
.iq-deposit-title {
  font-size: 20px;
  font-weight: 700;
}
.iq-deposit-desc {
  color: #475569;
  max-width: 520px;
  margin: 8px auto 16px;
}
.iq-deposit .hero-cta {
  text-decoration: none;
  display: inline-block;
  padding: 14px 28px;
  border-radius: 8px;
}
@media (max-width: 640px) {
  .iq-cards {
    grid-template-columns: 1fr;
  }
  .iq-price {
    font-size: 32px;
  }
}
</style>
