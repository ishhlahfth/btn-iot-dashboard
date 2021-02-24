import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/AnotherPage.vue'),
  },
  {
    path: '/uwu',
    name: 'AnotherPage',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/nanana',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/hore',
    name: 'DummyPage',
    component: () => import('../views/DummyPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
