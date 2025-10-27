import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import directives from './directives'
import { createPinia } from 'pinia'
import { router } from './routes'
import Toast from 'vue3-toastify'
import { setupVeeValidate } from '@/plugins/vee-validate'
import 'vue3-toastify/dist/index.css'
const app = createApp(App)
const pinia = createPinia()

setupVeeValidate()

app.use(pinia)
app.use(router)
app.use(directives)
app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  position: 'top-right',
  timeout: 1500,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: true,
})
app.mount('#app')
