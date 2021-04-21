import axios from 'axios';

const basicAuth = 'Basic Q01TOjEyMzQ1';
const BNSHeaders = {
  'x-api-key': 'secret-xApiKey-for-developer',
  'x-device-type': 'LINUX',
  'x-device-os-version': 'Ubuntu18.04',
  'x-device-model': '4s-dk0115AU',
  'x-app-version': 'v1.2',
  'x-request-id': '1234',
  'x-device-utc-offset': '+07:00',
  'x-device-lang': 'en',
  'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
};

export const AUTH_API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    ...BNSHeaders,
    authorization: basicAuth,
  },
});

export const API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: BNSHeaders,
});
