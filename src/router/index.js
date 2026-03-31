import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../HomePage.vue';
import ServicePage from '../views/ServicePage.vue';
import SeoContentPage from '../views/SeoContentPage.vue';
import { CITY_PAGES, CITY_PAGE_ORDER } from '../data/cityPages';
import { GUIDE_PAGES, GUIDE_PAGE_ORDER } from '../data/guidePages';
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from '../data/servicePages';
import { setCanonicalPath } from '../utils/seoHead';

const DEFAULT_TITLE =
  'Patio Covers Vancouver | Fast Quote in 60 Seconds | Sunrooms | LoomiHome Patios';
const DEFAULT_DESCRIPTION =
  'Patio covers and sunrooms for Vancouver and the Lower Mainland. Compare aluminum, glass, skyline combo, and sunroom options with a fast rough estimate in chat (~60 seconds). Free on-site measurement when you are ready.';

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

const cityRoutes = CITY_PAGE_ORDER.map((id) => {
  const p = CITY_PAGES[id];
  return {
    path: p.path,
    name: `city-${id}`,
    component: SeoContentPage,
    props: { kind: 'city', pageId: id },
    meta: {
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
});

const guideRoutes = GUIDE_PAGE_ORDER.map((id) => {
  const p = GUIDE_PAGES[id];
  return {
    path: p.path,
    name: `guide-${id}`,
    component: SeoContentPage,
    props: { kind: 'guide', pageId: id },
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
    ...cityRoutes,
    ...guideRoutes,
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
  setCanonicalPath(to.path);
});

export default router;
