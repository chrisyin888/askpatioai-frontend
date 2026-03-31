import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../HomePage.vue';
import ServicePage from '../views/ServicePage.vue';
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from '../data/servicePages';

const DEFAULT_TITLE = 'LoomiHome Patios | Fast Patio Cover Estimates in Vancouver';
const DEFAULT_DESCRIPTION =
  'Get a fast patio cover estimate in Vancouver. Compare aluminum, glass, skyline combo, and sunroom options in under 60 seconds. Free quote and on-site measurement available across the Lower Mainland.';

function setMetaDescription(content) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector('meta[name="description"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', 'description');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

const serviceRoutes = SERVICE_PAGE_ORDER.map((key) => {
  const p = SERVICE_PAGES[key];
  return {
    path: p.path,
    name: `svc-${key}`,
    component: ServicePage,
    props: { serviceKey: key },
    meta: {
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
      },
    },
    ...serviceRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const title = to.meta.title || DEFAULT_TITLE;
  const desc = to.meta.description || DEFAULT_DESCRIPTION;
  document.title = title;
  setMetaDescription(desc);
});

export default router;
