import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/index.css'
import VueMask from '@devindex/vue-mask'; // <-- ADD THIS LINEimport '@fortawesome/fontawesome-free/css/all.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(VueMask)
app.use(Toast);
app.use(router)
app.mount('#app')
