import axios from 'axios';
import store from '@/store';

const API = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}v1/`,
  headers: {
    // 'x-api-key': 'secret-xApiKey-for-developer',
    'x-device-type': 'LINUX',
    'x-device-os-version': 'Ubuntu18.04',
    'x-device-model': '4s-dk0115AU',
    'x-app-version': 'v1.2',
    'x-request-id': '1234',
    'x-device-utc-offset': '+07:00',
    'x-device-lang': 'en',
    'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
  },
});

API.interceptors.request.use(
  (config) => {
    console.log('🔥🔥🔥🔥');
    console.log(store.state.currentUser.xApiKey);
    console.log(config.headers);
    config.headers['x-api-key'] = store.state.currentUser.xApiKey;
    return config;
  },
  (error) => Promise.reject(error),
);

export default API;
