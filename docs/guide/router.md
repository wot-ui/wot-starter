---
title: 路由
iframe: true
url: pages/router/index
---

# 路由管理

[uni-app](https://uniapp.dcloud.net.cn/tutorial/page.html#%E8%B7%AF%E7%94%B1) 页面路由为框架统一管理，开发者需要在 `pages.json` 里配置每个路由页面的路径及页面样式。类似小程序在 `app.json` 中配置页面路由一样。所以 `uni-app` 的路由用法与 `Vue Router` 不同，不过我们可以引入类似插件实现类似 `Vue Router` 的开发体验，例如 `uni-mini-router`。

[uni-mini-router](https://github.com/Moonofweisheng/uni-mini-router) 是专为 uni-app 设计的轻量级路由库，它提供了类似`Vue Router`的API和功能，可以帮助开发者实现在uni-app中进行路由跳转、传参、拦截等常用操作。

:::tip 提示
`uni-mini-router`的目标是基于小程序平台，将uni-app路由相关的API对齐Vue Router，而并非提供完全的Vue Router，`uni-app` [路由](https://uniapp.dcloud.net.cn/api/router.html)中存在的限制，使用`uni-mini-router`仍将存在。
:::

## 核心特性

- **📝 编程式导航**: 支持多种导航方式
- **🔄 参数传递**: 支持 params 和 query 参数
- **🛡️ 导航守卫**: 完整的导航守卫机制
- **📊 路由信息**: 获取当前路由状态
- **🎯 类型安全**: 完整的 TypeScript 支持

#### 基础用法

```typescript
// 获取路由实例
const router = useRouter()
const route = useRoute()

// 字符串路径跳转
router.push('/pages/detail/index')

// 对象路径跳转
router.push({ path: '/pages/detail/index' })

// 命名路由跳转
router.push({ name: 'detail' })

// 带参数跳转
router.push({
  name: 'detail',
  params: { id: '123' }
})

// 带查询参数跳转
router.push({
  path: '/pages/detail/index',
  query: { tab: 'info' }
})
```

#### 导航守卫

```typescript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户权限
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 页面跳转完成后的处理
  console.log(`从 ${from.path} 跳转到 ${to.path}`)
})
```

> 📖 **了解更多**: [uni-mini-router 文档](https://github.com/Moonofweisheng/uni-mini-router)
