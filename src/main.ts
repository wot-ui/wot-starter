import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from './router'

export function createApp() {
  const app = createSSRApp(App)
  app.use(router)
  return {
    app,
  }
}
