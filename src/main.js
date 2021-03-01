import { createApp } from 'vue';
import { VuelidatePlugin } from '@vuelidate/core';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
// import store from './store';
import './assets/tailwind.css';

// createApp(App).use(store).use(router).mount('#app');
createApp(App)
  .use(router)
  .use(VuelidatePlugin)
  .mount('#app');
