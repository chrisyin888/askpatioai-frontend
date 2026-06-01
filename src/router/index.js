import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../HomePage.vue';
import ContractorAccount from '../views/ContractorAccount.vue';
import AdminLogin from '../views/AdminLogin.vue';
import AdminLeads from '../views/AdminLeads.vue';
import ContractorDashboard from '../views/ContractorDashboard.vue';
import ContractorLogin from '../views/ContractorLogin.vue';
import ServicePage from '../views/ServicePage.vue';
import SeoContentPage from '../views/SeoContentPage.vue';
import { CITY_PAGES, CITY_PAGE_ORDER } from '../data/cityPages';
import { CITY_SERVICE_PAGES, CITY_SERVICE_PAGE_ORDER } from '../data/cityServicePages';
import { GUIDE_PAGES, GUIDE_PAGE_ORDER } from '../data/guidePages';
import { PROJECT_PAGES, PROJECT_PAGE_ORDER } from '../data/projectPages';
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from '../data/servicePages';
import { setCanonicalPath } from '../utils/seoHead';
import { getCurrentUser } from '../utils/leadMarketplaceStore';

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

/** Function props so each route record passes the right key/id (reliable in all Vue Router builds). */
const serviceRoutes = SERVICE_PAGE_ORDER.map((key) => {
  const p = SERVICE_PAGES[key];
  return {
    path: p.path,
    name: `svc-${key}`,
    component: ServicePage,
    props: () => ({ serviceKey: key }),
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
    props: () => ({ kind: 'city', pageId: id }),
    meta: {
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
});

const cityServiceRoutes = CITY_SERVICE_PAGE_ORDER.map((id) => {
  const p = CITY_SERVICE_PAGES[id];
  return {
    path: p.path,
    name: `city-service-${id}`,
    component: SeoContentPage,
    props: () => ({ kind: 'cityService', pageId: id }),
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
    props: () => ({ kind: 'guide', pageId: id }),
    meta: {
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
});

const projectRoutes = PROJECT_PAGE_ORDER.map((id) => {
  const p = PROJECT_PAGES[id];
  return {
    path: p.path,
    name: `project-${id}`,
    component: SeoContentPage,
    props: () => ({ kind: 'project', pageId: id }),
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
    {
      path: '/contractor-login',
      name: 'contractor-login',
      component: ContractorLogin,
      meta: {
        title: 'Contractor Login / 承包商登录 | LoomiHome Lead Marketplace',
        description: 'Contractor login for the LoomiHome lead marketplace lobby. / LoomiHome 承包商 lead marketplace 登录页面。',
      },
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminLogin,
      meta: {
        title: 'Admin Login / 管理员登录 | LoomiHome Lead Marketplace',
        description: 'Admin login for lead management and contractor wallets. / LoomiHome 管理员 lead 管理登录页面。',
      },
    },
    {
      path: '/contractor',
      redirect: '/lobby',
    },
    {
      path: '/lobby',
      name: 'contractor-lobby',
      component: ContractorDashboard,
      meta: {
        title: 'Lead Lobby / Lead 大厅 | LoomiHome Lead Marketplace',
        description: 'Shared contractor lead lobby where all contractors browse and purchase leads. / 所有承包商共享的 Lead 大厅。',
      },
    },
    {
      path: '/account',
      name: 'marketplace-account',
      component: ContractorAccount,
      meta: {
        title: 'Account / 账号设置 | LoomiHome Lead Marketplace',
        description: 'Change marketplace login password. / 修改 marketplace 登录密码。',
      },
    },
    {
      path: '/admin-leads',
      name: 'admin-leads',
      component: AdminLeads,
      meta: {
        title: 'Lead Admin / Lead 管理后台 | LoomiHome Lead Marketplace',
        description: 'Admin lead entry and contractor coin wallet management. / 管理员 lead 录入和 coin 钱包管理后台。',
      },
    },
    ...serviceRoutes,
    ...cityRoutes,
    ...cityServiceRoutes,
    ...guideRoutes,
    ...projectRoutes,
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

router.beforeEach((to) => {
  const user = getCurrentUser();

  if (to.path === '/lobby' || to.path === '/account') {
    if (!user || user.role !== 'contractor') {
      return {
        path: '/contractor-login',
        query: to.fullPath !== '/lobby' ? { redirect: to.fullPath } : {},
      };
    }
  }

  if (to.path === '/admin-leads') {
    if (!user || user.role !== 'admin') {
      return { path: '/admin-login' };
    }
  }

  return true;
});

router.afterEach((to) => {
  const title = to.meta.title || DEFAULT_TITLE;
  const desc = to.meta.description || DEFAULT_DESCRIPTION;
  document.title = title;
  setMetaDescription(desc);
  setCanonicalPath(to.path);
});

export default router;
