<template>
  <footer class="site-footer" role="contentinfo">
    <div class="site-footer__inner">
      <div class="site-footer__grid">
        <div class="site-footer__col site-footer__brand">
          <p class="site-footer__wordmark">
            <span class="site-footer__wordmark-main">LOOMIHOME</span>
            <span class="site-footer__wordmark-sub">PATIOS</span>
          </p>
          <p class="site-footer__desc">
            Patio covers and sunrooms in Vancouver and the Lower Mainland —
            design and price your cover online, then book a free on-site
            measurement.
          </p>
          <router-link to="/instant-quote" class="site-footer__cta">
            Design &amp; Price It Yourself
          </router-link>
        </div>

        <nav class="site-footer__col" aria-label="Footer sections">
          <h3 class="site-footer__heading">Explore</h3>
          <ul class="site-footer__links">
            <li>
              <a
                href="#home"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#home')"
              >Home</a>
            </li>
            <li>
              <a
                href="#our-products"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#our-products')"
              >Our Products</a>
            </li>
            <li>
              <a
                href="#before-after-projects"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#before-after-projects')"
              >Before &amp; After</a>
            </li>
            <li>
              <a
                href="#past-projects"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#past-projects')"
              >Past Projects</a>
            </li>
            <li>
              <a
                href="#why-us"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#why-us')"
              >Why Choose Us</a>
            </li>
            <li>
              <a
                href="#faq"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#faq')"
              >FAQ</a>
            </li>
            <li>
              <a
                href="#book-measurement"
                class="site-footer__link"
                @click.prevent="$emit('nav', '#book-measurement')"
              >Book Free Measurement</a>
            </li>
          </ul>
        </nav>

        <nav class="site-footer__col" aria-label="Footer cover types">
          <h3 class="site-footer__heading">Cover Types</h3>
          <ul class="site-footer__links">
            <li
              v-for="link in serviceLinks"
              :key="'ft-' + link.to"
            >
              <router-link
                :to="link.to"
                class="site-footer__link"
              >{{ link.label }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="site-footer__col">
          <h3 class="site-footer__heading">Contact</h3>
          <a
            class="site-footer__email"
            :href="'mailto:' + (email || 'info@loomihomepatios.ca')"
          >{{ email || 'info@loomihomepatios.ca' }}</a>
          <p class="site-footer__area">
            Vancouver, Richmond, Burnaby, Surrey, Delta, Langley, Coquitlam,
            North Vancouver, West Vancouver, New Westminster, Maple Ridge,
            Pitt Meadows &amp; nearby
          </p>
          <p class="site-footer__note">
            See your price in about a minute with Design &amp; Price It Yourself — or send photos when you book a free measurement.
          </p>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__copy">© 2026 LoomiHome Patios. All rights reserved.</p>
        <a
          href="/llms.txt"
          class="site-footer__llms"
        >LLM site summary</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  props: {
    serviceLinks: { type: Array, default: () => [] },
    email: { type: String, default: '' },
  },
  emits: ['nav'],
};
</script>

<style scoped>
.site-footer {
  background: #0b1220;
  color: #cbd5e1;
}

.site-footer__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 64px 24px 0;
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 40px;
  padding-bottom: 48px;
}

.site-footer__wordmark {
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.site-footer__wordmark-main {
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  color: #fff;
}

.site-footer__wordmark-sub {
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.42em;
  color: #fbbf24;
}

.site-footer__desc {
  margin: 0 0 22px;
  font-size: 0.94rem;
  line-height: 1.7;
  color: #94a3b8;
  max-width: 34ch;
}

.site-footer__cta {
  appearance: none;
  border: none;
  cursor: pointer;
  background: #d97706;
  color: #fff;
  font-weight: 700;
  font-size: 0.92rem;
  padding: 12px 24px;
  border-radius: 999px;
  transition: background 0.15s ease, transform 0.15s ease;
  display: inline-block;
  text-decoration: none;
}

.site-footer__cta:hover {
  background: #b45309;
  transform: translateY(-1px);
}

.site-footer__heading {
  margin: 0 0 18px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fbbf24;
}

.site-footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.site-footer__link {
  display: inline-block;
  padding: 6px 0;
  color: #cbd5e1;
  font-size: 0.94rem;
  text-decoration: none;
  transition: color 0.12s ease, padding-left 0.12s ease;
}

.site-footer__link:hover {
  color: #fff;
  padding-left: 5px;
}

.site-footer__email {
  display: inline-block;
  margin-bottom: 14px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 1px solid #d97706;
  padding-bottom: 2px;
}

.site-footer__email:hover {
  color: #fbbf24;
}

.site-footer__area {
  margin: 0 0 14px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #94a3b8;
}

.site-footer__note {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: #94a3b8;
}

.site-footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 22px 0 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.site-footer__copy {
  margin: 0;
  font-size: 0.85rem;
  color: #64748b;
}

.site-footer__llms {
  font-size: 0.85rem;
  color: #94a3b8;
  text-decoration: none;
  border-bottom: 1px dotted #475569;
}

.site-footer__llms:hover {
  color: #fff;
}

@media (max-width: 900px) {
  .site-footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .site-footer__inner {
    padding: 48px 20px 0;
  }

  .site-footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-bottom: 36px;
  }

  .site-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
