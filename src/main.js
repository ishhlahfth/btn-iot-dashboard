import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';

// createApp(App).use(store).use(router).mount('#app');
createApp(App)
  .use(router)
  .use(store)
  .use(Toast)
  .mount('#app');
