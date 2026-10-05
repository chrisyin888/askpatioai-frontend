<template>
  <header
    class="site-header"
    :class="{ 'site-header--menu-open': menuOpen }"
  >
    <div class="site-header__inner">
      <a
        href="#home"
        class="site-header__brand"
        aria-label="LoomiHome Patios — back to top"
        @click.prevent="go('#home')"
      >
        <span class="site-header__mark" aria-hidden="true">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            focusable="false"
          >
            <path
              d="M4 13.5 16 6l12 7.5"
              stroke="#d97706"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.5 13.5V24M23.5 13.5V24"
              stroke="#0f172a"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M4.5 24.5h23"
              stroke="#0f172a"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span class="site-header__wordmark">
          <span class="site-header__wordmark-main">LOOMIHOME</span>
          <span class="site-header__wordmark-sub">PATIOS</span>
        </span>
      </a>

      <nav class="site-header__nav" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.selector"
          :href="link.selector"
          class="site-header__link"
          @click.prevent="go(link.selector)"
        >{{ link.label }}</a>
      </nav>

      <div class="site-header__actions">
        <router-link to="/instant-quote" class="site-header__cta">
          Design &amp; Price
        </router-link>
        <button
          type="button"
          class="site-header__burger"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <transition name="site-header-menu">
      <nav
        v-show="menuOpen"
        class="site-header__mobile-nav"
        aria-label="Mobile"
      >
        <a
          v-for="link in navLinks"
          :key="'m-' + link.selector"
          :href="link.selector"
          class="site-header__mobile-link"
          @click.prevent="go(link.selector)"
        >{{ link.label }}</a>
        <router-link
          to="/instant-quote"
          class="site-header__cta site-header__cta--mobile"
          @click="menuOpen = false"
        >
          Design &amp; Price It Yourself
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  emits: ['nav'],
  data() {
    return {
      menuOpen: false,
      navLinks: [
        { label: 'Products', selector: '#our-products' },
        { label: 'Before & After', selector: '#before-after-projects' },
        { label: 'Projects', selector: '#past-projects' },
        { label: 'Why Us', selector: '#why-us' },
        { label: 'FAQ', selector: '#faq' },
        { label: 'Contact', selector: '#book-measurement' },
      ],
    };
  },
  methods: {
    go(selector) {
      this.menuOpen = false;
      this.$emit('nav', selector);
    },
  },
};
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 3000;
  background: rgba(255, 255, 255, 0.92);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e8edf3;
}

.site-header__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.site-header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}

.site-header__mark {
  width: 46px;
  height: 46px;
  display: inline-flex;
}

.site-header__mark svg {
  width: 100%;
  height: 100%;
}

.site-header__wordmark {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.site-header__wordmark-main {
  font-weight: 800;
  font-size: 1.45rem;
  letter-spacing: 0.05em;
  color: #0f172a;
}

.site-header__wordmark-sub {
  font-weight: 700;
  font-size: 0.86rem;
  letter-spacing: 0.5em;
  color: #d97706;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.site-header__link {
  padding: 10px 14px;
  border-radius: 10px;
  color: #334155;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease, background 0.15s ease;
}

.site-header__link:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.site-header__cta {
  appearance: none;
  border: none;
  cursor: pointer;
  background: #d97706;
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  padding: 15px 30px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(217, 119, 6, 0.32);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
}

.site-header__cta:hover {
  background: #b45309;
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(217, 119, 6, 0.38);
}

.site-header__cta:active {
  transform: translateY(0);
}

.site-header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 10px;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
}

.site-header__burger span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: #0f172a;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.site-header--menu-open .site-header__burger span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.site-header--menu-open .site-header__burger span:nth-child(2) {
  opacity: 0;
}

.site-header--menu-open .site-header__burger span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.site-header__mobile-nav {
  display: none;
  border-top: 1px solid #e8edf3;
  background: #fff;
  padding: 8px 20px 20px;
}

.site-header__mobile-link {
  display: block;
  padding: 13px 4px;
  color: #0f172a;
  font-weight: 600;
  font-size: 1.02rem;
  text-decoration: none;
  border-bottom: 1px solid #f1f5f9;
}

.site-header__cta--mobile {
  width: 100%;
  margin-top: 14px;
}

.site-header-menu-enter-active,
.site-header-menu-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.site-header-menu-enter-from,
.site-header-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 1180px) {
  .site-header__link {
    padding: 10px 10px;
  }

  .site-header__cta {
    font-size: 1rem;
    padding: 13px 22px;
  }
}

@media (max-width: 960px) {
  .site-header__nav {
    display: none;
  }

  .site-header__burger {
    display: flex;
  }

  .site-header__mobile-nav {
    display: block;
  }
}

@media (max-width: 480px) {
  .site-header__inner {
    padding: 0 16px;
    height: 66px;
  }

  .site-header__mark {
    width: 40px;
    height: 40px;
  }

  .site-header__wordmark-main {
    font-size: 1.25rem;
  }

  .site-header__wordmark-sub {
    font-size: 0.76rem;
  }

  .site-header__cta {
    display: none;
  }

  .site-header__cta--mobile {
    display: block;
  }
}
</style>
