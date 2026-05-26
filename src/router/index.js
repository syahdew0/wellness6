import { createRouter, createWebHashHistory } from 'vue-router';
import PageManagement from '@/views/PageManagement.vue';

const routes = [
  { path: '/', name: 'home', component: PageManagement },
  { path: '/listing', name: 'listing', component: () => import('@/views/ListingPage.vue') },
  { path: '/listing/:id', name: 'listing-detail', component: () => import('@/views/ListingDetailPage.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
  { path: '/help', name: 'help', component: () => import('@/views/HelpPage.vue') },
];

const router = createRouter({
  history: createWebHashHistory(window.PATH_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
