import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/index.css'
import VueTheMask from 'vue-the-mask'
import '@fortawesome/fontawesome-free/css/all.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(VueTheMask)
app.use(Toast);
app.use(router)
app.mount('#app')
