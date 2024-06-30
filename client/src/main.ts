import './assets/styles/fonts.css'
import './assets/styles/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth.store'

const app = createApp(App)

app.use(createPinia())

const { hybridUser } = useAuthStore()

hybridUser().then(() => {
  // add router after hydrating the current user to avoid false redirecting from beforeEach hook
  app.use(router)
  app.mount('#app')
})
