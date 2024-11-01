import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Linea magica para que tailwind funcione
import './style.css'

createApp(App).use(router).mount('#app')