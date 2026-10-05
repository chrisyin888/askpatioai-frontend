<template>
  <router-view />
</template>

<script>
// Routes that use normal body scrolling. Every other route gets app-scroll-lock
// (the homepage scrolls inside its own .scroll-container instead).
const FREE_SCROLL_PATHS = new Set([
  '/contractor-login',
  '/admin-login',
  '/lobby',
  '/account',
  '/admin-leads',
  '/contractor',
  '/instant-quote',
]);

function syncScrollLock(path) {
  if (typeof document === 'undefined') return;
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
  const lock = !FREE_SCROLL_PATHS.has(normalized);
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
