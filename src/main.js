import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { messages } from './locales'; 

import '../css/custom.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.js';

if (localStorage.getItem('guest') === null) {
  localStorage.setItem('guest', 'true');
}
if (localStorage.getItem('user') === null) {
  localStorage.setItem('user', 'Invitado' );
}


const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'english', 
  fallbackLocale: 'english', 
  messages,
});
const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(i18n);
app.provide('axios', app.config.globalProperties.axios);
app.mount('#app');