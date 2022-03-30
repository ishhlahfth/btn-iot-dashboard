import axios from 'axios';
// import store from '@/store';

const ApiAgent = axios.create({
  baseURL: `${process.env.VUE_APP_HCM_AGENT_URL}`,
  referrerPolicy: 'no-referrer',
  headers: {
    'x-device-type': 'LINUX',
    'x-device-os-version': 'Ubuntu18.04',
    'x-device-model': '4s-dk0115AU',
    'x-app-version': 'v1.2',
    'x-request-id': '1234',
    'x-device-utc-offset': '+07:00',
    'Referrer-Policy': 'no-referrer',
    'x-device-lang': 'en',
    'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'content-type': 'application/json',
  },
  auth: {
    username: process.env.VUE_APP_HCM_AGENT_BASIC_UNAME,
    password: process.env.VUE_APP_HCM_AGENT_BASIC_PASSWORD,
  },
});

export default ApiAgent;
