import { createRouter, createWebHistory } from 'vue-router';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import store from '../store';

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
  if (user) {
    user = JSON.parse(user);
    store.commit('SET_CURRENT_USER', user);
  }
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
    redirect: '/bns/merchant',
    name: 'BNS',
    component: () => import('@/components/layouts/Main.vue'),
    beforeEnter: authenticate,
    children: [
      {
        path: 'merchant',
        name: 'Merchant',
        component: () => import('@/views/Merchant.vue'),
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/Role.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/Order.vue'),
      },
      {
        path: 'transfer',
        name: 'Transfer',
        component: () => import('@/views/Transfer.vue'),
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/views/Payment.vue'),
      },
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/Banner.vue'),
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/Test.vue'),
      },
    ],
  },
  {
    path: '/invoice/:id/',
    name: 'Invoice',
    component: () => import('@/views/Invoice.vue'),
    children: [
      {
        path: 'download',
        name: 'InvoiceDownload',
        component: () => import('@/views/InvoiceDownload.vue'),
      },
    ],
  },
  {
    path: '/tnc',
    name: 'TermsConditions',
    component: () => import('@/views/TermsConditions.vue'),
  },
  {
    path: '/reset_password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue'),
  },
  {
    path: '/doc',
    name: 'Doc',
    component: () => import('@/views/_Components.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
