/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { pages } from 'virtual:uni-pages'

console.log(pages)

const router = createRouter({
  routes: pages.map((page) => {
    page.path = `/${page.path}`
    return page
  })
  ,
})
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  next()
})
router.afterEach((to, from) => {
  console.log(to)
  console.log(from)
})

export default router
