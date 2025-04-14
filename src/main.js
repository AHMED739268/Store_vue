// import './assets/main.css'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Home_component from './components/home_component.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,  
    position: "top-right",
  });
app.use(createPinia())

app.mount('#app')
