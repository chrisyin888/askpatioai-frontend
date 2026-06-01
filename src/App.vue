<template>
  <router-view />
  <router-link
    v-if="showContractorEnter"
    to="/contractor-login"
    class="site-contractor-enter"
  >
    Contractor<br />Enter
  </router-link>
</template>

<script>
const MARKETPLACE_PATHS = new Set(['/contractor-login', '/admin-login', '/contractor', '/lobby', '/account', '/admin-leads']);

function syncScrollLock(path) {
  if (typeof document === 'undefined') return;
  const lock = !MARKETPLACE_PATHS.has(path);
  document.documentElement.classList.toggle('app-scroll-lock', lock);
  document.body.classList.toggle('app-scroll-lock', lock);
}

export default {
  name: 'App',
  computed: {
    showContractorEnter() {
      return !MARKETPLACE_PATHS.has(this.$route.path);
    },
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler(path) {
        syncScrollLock(path);
      },
    },
  },
  unmounted() {
    syncScrollLock('/');
  },
};
</script>

<style>
.site-contractor-enter {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 1200;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  min-height: 132px;
  padding: 18px 22px;
  border-radius: 999px;
  background: linear-gradient(145deg, #0f172a 0%, #334155 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0.04em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.28);
  border: 3px solid rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.site-contractor-enter:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.34);
}

@media (max-width: 640px) {
  .site-contractor-enter {
    top: 12px;
    right: 12px;
    min-width: 108px;
    min-height: 108px;
    padding: 14px 16px;
    font-size: 12px;
  }
}
</style>
