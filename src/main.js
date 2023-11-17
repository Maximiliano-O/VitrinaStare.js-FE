import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { messages } from './locales'; // assuming you have an index.js file in the ./locales directory that exports your messages

import '../css/custom.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.js';

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'english', // get locale from local storage or default to 'en'
  fallbackLocale: 'english', // set fallback locale
  messages,
});
const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(i18n);
app.provide('axios', app.config.globalProperties.axios);
app.mount('#app');