import { createRouter, createWebHistory } from 'vue-router';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';

const authenticate = (to, from, next) => {
  const getCookie = (cookieName) => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  let user = getCookie('user');
  user = Base64.parse(user);
  user = Utf8.stringify(user);
  if (user) user = JSON.parse(user);
  console.log('🚀👉', user);
  if (user) {
    next();
  } else {
    next({ name: 'Login' });
  }
};

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/bns',
    redirect: '/bns/home',
    name: 'BNS',
    component: () => import('@/components/layouts/Main.vue'),
    beforeEnter: authenticate,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
