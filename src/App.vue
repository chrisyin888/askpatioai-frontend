<template>
  <router-view />
  <router-link
    v-if="showContractorEnter"
    to="/lobby"
    class="site-contractor-enter"
  >
    Contractor Enter
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
  top: 16px;
  right: 16px;
  z-index: 1200;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.92);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-decoration: none;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.22);
  backdrop-filter: blur(8px);
  transition: transform 0.18s ease, background 0.18s ease;
}

.site-contractor-enter:hover {
  background: #0f172a;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .site-contractor-enter {
    top: 12px;
    right: 12px;
    padding: 9px 13px;
    font-size: 12px;
  }
}
</style>
