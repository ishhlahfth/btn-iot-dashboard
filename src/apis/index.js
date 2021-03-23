import axios from 'axios';

const API = axios.create({
  baseURL: 'http://buynsell-dev.wehelpyou.xyz/api/v1/',
  headers: {
    'x-api-key': 'secret-xApiKey-for-developer',
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

export default API;
