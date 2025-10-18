import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import directives from './directives'
import { router } from './routes'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(directives)
app.mount('#app')
