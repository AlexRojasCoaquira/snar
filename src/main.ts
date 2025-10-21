import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import directives from './directives'
import { createPinia } from 'pinia'
import { router } from './routes'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(directives)
app.mount('#app')
