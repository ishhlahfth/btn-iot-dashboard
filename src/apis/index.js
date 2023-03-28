import axios from 'axios';
// import store from '@/store';

const API = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}`,
  headers: {
    'x-device-type': 'LINUX',
    'x-device-os-version': 'Ubuntu18.04',
    'x-device-model': '4s-dk0115AU',
    'x-app-version': 'v1.2',
    'x-request-id': '1234',
    'Referrer-Policy': 'no-referrer',
    'x-device-utc-offset': '+07:00',
    'x-device-lang': 'en',
    'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
});

// API.interceptors.request.use(
//   (config) => {
//     config.headers['x-api-key'] = store.state.currentUser.access_token;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default API;
