import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

import '../css/custom.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
