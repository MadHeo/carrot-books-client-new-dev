import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { router } from './router'
import { AlertConfirm } from './plugin'

import '/src/assets/css/tailwind.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(AlertConfirm)
app.use(pinia)
app.use(router)

app.mount('#app')
