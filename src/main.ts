import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from './router'

const pinia = createPinia()
pinia.use(persistPlugin)
export function createApp() {
  const app = createSSRApp(App)
  app.use(router)
  app.use(pinia)
  return {
    app,
  }
}
