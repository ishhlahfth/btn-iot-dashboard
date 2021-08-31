import { createApp } from 'vue';
import Toast from 'vue-toastification';
import VueFlatPickr from 'vue-flatpickr-component';
import Maska from 'maska';
import excel from 'vue-excel-export';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';
import 'flatpickr/dist/flatpickr.css';
import 'cropperjs/dist/cropper.css';

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
  .use(VueFlatPickr)
  .use(excel)
  .mount('#app');
