import { createApp } from 'vue';
import Toast from 'vue-toastification';
import Maska from 'maska';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

const toastOption = {
  transition: 'Vue-Toastification__fade',
  maxToasts: 20,
  newestOnTop: true,
  position: 'top-center',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
  containerClassName: 'custom-container',
  toastClassName: 'custom-toast',
  bodyClassName: 'custom-body',
};

createApp(App)
  .use(router)
  .use(store)
  .use(Toast, toastOption)
  .use(Maska)
  .mount('#app');
