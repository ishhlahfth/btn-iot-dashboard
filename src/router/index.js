import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/bns',
    name: 'BNS',
    component: () => import('@/components/layouts/Main.vue'),
    children: [
      {
        path: 'home',
        name: 'TheDummyPage',
        component: () => import('@/views/TheDummyPage.vue'),
      },
      {
        path: 'another-page',
        name: 'AnotherPage',
        component: () => import('@/views/AnotherPage.vue'),
      },
      {
        path: 'dummy-page-1',
        name: 'DummyPage1',
        component: () => import('@/views/DummyPage.vue'),
      },
      {
        path: 'dummy-page-2',
        name: 'DummyPage2',
        component: () => import('@/views/DummyPage2.vue'),
      },
      {
        path: 'dummy-page-3',
        name: 'DummyPage3',
        component: () => import('@/views/DummyPage3.vue'),
      },
      {
        path: 'lorem-ipsum',
        name: 'LoremIpsum',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/bns',
    redirect: '/bns/home',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
