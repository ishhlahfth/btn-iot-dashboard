import axios from 'axios';

const basicAuth = 'Basic MTphbDJXa2l0a3dtbEJnT0VhN0tPTTdnbFJaYmphTXJsQmU3RjY1R2w1T0RlM0QwbkdYaUI5N2dkZXJlbW5Db1VOTmJoaG5oS2xpM3l3cnhxWjJJWjVycDBqZXpocU52U3ZUQzBjVWgwOVI5ZUphMjJ1N1lHdUpuMVRiZThBT3Z4Wg==';

const API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
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
    authorization: basicAuth,
  },
});

export default API;
