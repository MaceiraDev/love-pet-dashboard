import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/index.css'
import VueMask from '@devindex/vue-mask';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/layouts/layout.css";
import VueApexCharts from 'vue3-apexcharts'
const app = createApp(App)

app.use(VueMask)
app.use(VueApexCharts)
app.use(Toast)
app.use(router)
app.mount('#app')
