<template>
  <div class="hero" role="region" aria-label="LoomiHome Patios introduction">
    <div class="hero__bg" aria-hidden="true">
      <img
        :src="bgSrc"
        alt=""
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero__overlay"></div>
    </div>

    <div class="hero__content">
      <p v-if="eyebrowName" class="hero__eyebrow">
        <span class="hero__eyebrow-name">{{ eyebrowName }}</span>
        <span
          v-if="eyebrowSuffix"
          class="hero__eyebrow-suffix"
        >{{ eyebrowSuffix }}</span>
      </p>

      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__subtitle">{{ subtitle }}</p>

      <div class="hero__cta-row">
        <button
          type="button"
          class="hero__cta hero__cta--primary"
          @click="$emit('estimate')"
        >
          Get My Fast Estimate
        </button>
        <router-link
          to="/instant-quote"
          class="hero__cta hero__cta--secondary"
        >Design &amp; Price It Yourself</router-link>
      </div>

      <ul
        v-if="trustPoints && trustPoints.length"
        class="hero__badges"
      >
        <li
          v-for="(point, i) in trustPoints"
          :key="i"
          class="hero__badge"
        >
          {{ point }}
        </li>
      </ul>
    </div>

    <a
      href="#our-products"
      class="hero__scroll-hint"
      aria-label="Scroll to products"
      @click.prevent="$emit('nav', '#our-products')"
    >
      <span aria-hidden="true"></span>
    </a>
  </div>
</template>

<script>
import { publicAssetUrl } from '../../utils/publicAssetUrl';

export default {
  name: 'HeroSection',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    eyebrowName: { type: String, default: '' },
    eyebrowSuffix: { type: String, default: '' },
    trustPoints: { type: Array, default: () => [] },
  },
  emits: ['estimate', 'nav'],
  computed: {
    bgSrc() {
      return publicAssetUrl('/house/showroom/showroom-wide-hero.jpg');
    },
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: min(94vh, 880px);
  overflow: hidden;
  background: #0f172a;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 62%;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      100deg,
      rgba(9, 14, 26, 0.82) 0%,
      rgba(9, 14, 26, 0.62) 34%,
      rgba(9, 14, 26, 0.28) 62%,
      rgba(9, 14, 26, 0.12) 100%
    ),
    linear-gradient(
      to top,
      rgba(9, 14, 26, 0.55) 0%,
      rgba(9, 14, 26, 0) 32%
    );
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 24px 120px;
}

.hero__eyebrow {
  margin: 0 0 18px;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.28em;
}

.hero__eyebrow-name {
  color: #fbbf24;
}

.hero__eyebrow-suffix {
  color: rgba(255, 255, 255, 0.85);
  margin-left: 10px;
}

.hero__title {
  margin: 0 0 20px;
  max-width: 15ch;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(2.4rem, 5.6vw, 4.2rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: #fff;
  text-wrap: balance;
}

.hero__subtitle {
  margin: 0 0 34px;
  max-width: 46ch;
  font-size: clamp(1.02rem, 1.6vw, 1.22rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
}

.hero__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 44px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1.02rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  border: 2px solid transparent;
}

.hero__cta--primary {
  background: #d97706;
  border-color: #d97706;
  color: #fff;
  box-shadow: 0 10px 28px rgba(217, 119, 6, 0.45);
}

.hero__cta--primary:hover {
  background: #b45309;
  border-color: #b45309;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(217, 119, 6, 0.5);
}

.hero__cta--secondary {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.65);
  color: #fff;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.hero__cta--secondary:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

.hero__badges {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero__badge {
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.86rem;
  font-weight: 600;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.hero__scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  z-index: 1;
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.55);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.hero__scroll-hint span {
  width: 4px;
  height: 9px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.85);
  animation: hero-scroll-dot 1.8s ease-in-out infinite;
}

@keyframes hero-scroll-dot {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.35; }
}

@media (max-width: 640px) {
  .hero {
    min-height: 100svh;
    align-items: flex-end;
  }

  .hero__content {
    padding: 120px 20px 96px;
  }

  .hero__overlay {
    background:
      linear-gradient(
        to top,
        rgba(9, 14, 26, 0.88) 0%,
        rgba(9, 14, 26, 0.55) 45%,
        rgba(9, 14, 26, 0.18) 100%
      );
  }

  .hero__bg img {
    object-position: center 30%;
  }

  .hero__cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__cta {
    width: 100%;
  }

  .hero__scroll-hint {
    display: none;
  }
}
</style>
