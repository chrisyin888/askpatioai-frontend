<template>
  <router-view />
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
