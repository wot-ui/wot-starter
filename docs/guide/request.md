---
title: 网络请求
iframe: true
url: pages/request/index
---

# 网络请求

你可以使用你喜欢的第三方请求库来获取数据。一般情况下，直接使用 `uni-app` 内置方法即可，以下是我们推荐的一些实践方案，本项目内置的请求库是 [alova](#alova) ，可以接着向下看。

## `uni-app` 内置方法

`uni-app` 提供了 [uni.request](https://uniapp.dcloud.net.cn/api/request/request.html)、[uni.uploadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)、[uni.downloadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#downloadfile)、[WebSocket](https://uniapp.dcloud.net.cn/api/request/websocket.html) 等支持。一般情况下，你可以直接使用它们。

## axios

如果你更喜欢 [axios](https://github.com/axios/axios) 及其相关生态，你可以使用 [@uni-helper/axios-adapter](https://github.com/uni-helper/axios-adapter)。它是专为 `uni-app` 打造的 `axios` 适配器，支持全平台！

```ts
import axios from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

axios.defaults.adapter = createUniAppAxiosAdapter()
const { data, isFinished } = useAxios('/user?ID=12345')
```

## @uni-helper/uni-network

[@uni-helper/uni-network](https://github.com/uni-helper/uni-network) 是一个为 `uni-app` 打造的基于 `Promise` 的 HTTP 客户端，灵感和代码绝大部分源于 `axios@0.27.2`。`@uni-helper/uni-network` 在底层做了 `uni-app` 适配，体积更小，TypeScript 类型更贴近 `uni-app`。

```ts
import { un } from '@uni-helper/uni-network'

try {
  const response = await un.get('/user?ID=12345')
  console.log(response)
}
catch (error) {
  console.error(error)
}
```

## alova

[Alova](https://github.com/alovajs/alova) 是一个极致高效的请求工具集，本项目已集成此方案，无需额外安装。

:::danger ⚠️ 非常重要
我们通过[@alova/wormhole](https://alova.js.org/zh-CN/tutorial/getting-started/extension-integration) 完成了编辑器扩展集成，集成 alova 的编辑器扩展可以让它展现出它更强大的力量。

- 自动生成请求代码和响应数据类型，在 js 项目中也能体验对接口数据的智能提示。
- 将 api 文档嵌入代码中，带你体验边查边用 API 的效果。
- 定时更新 api 并主动通知前端开发，不再依赖服务端开发人员通知。

但是此方案在部分小程序平台存在`globalThis`报错问题，请参考[#657](https://github.com/alovajs/alova/issues/657)，本项目通过 `AutoImport` 临时处理。
:::

### 特性

- 简单易用，[观看视频](https://alova.js.org/video-tutorial)5分钟上手。
- 完美兼容你最喜欢的技术栈。
- 20+ 高性能的业务模块，帮助你快速开发性能更好的应用。
- 更先进的 openAPI 解决方案，在代码中和API信息高效交互。
- 请求共享和响应缓存，提升应用性能。
- 类型安全。

### 有什么不同吗？

与 `@tanstack/react-query`、`swrjs`、`ahooks` 的 `useRequest` 等库不同，alova 旨在让API集成变得非常轻松高效，还能保持更高效的数据交互，为用户带来更流畅的体验。

> 您还可以查看 [与其他请求库的比较](https://alova.js.org/about/comparison) 以详细了解 alova 的不同之处。

### 基础使用

```typescript
// 定义 API
import { createAlova } from 'alova'
import { uniappAdapter } from '@alova/adapter-uniapp'

const alova = createAlova({
  baseURL: 'https://api.example.com',
  ...uniappAdapter(),
  responded: response => response.data
})

// 定义请求方法
const getUserInfo = (id: string) => alova.Get(`/user/${id}`)
const updateUser = (data: UserInfo) => alova.Post('/user', data)
```

### useRequest Hook

```typescript
// 使用 useRequest 发送请求
const {
  data, // 响应数据
  loading, // 加载状态
  error, // 错误信息
  send, // 手动发送请求
  onSuccess, // 成功回调
  onError, // 错误回调
} = useRequest(getUserInfo('123'), {
  immediate: true, // 立即发送请求
})

// 监听请求状态
onSuccess((data) => {
  console.log('请求成功:', data)
})

onError((error) => {
  console.error('请求失败:', error)
})
```

### 高级特性

```typescript
// 请求去重
const { data } = useRequest(getUserInfo('123'), {
  shareRequest: true // 相同请求自动去重
})

// 响应缓存
const { data } = useRequest(getUserInfo('123'), {
  cacheFor: 300000 // 缓存5分钟
})

// 分页请求
const {
  data: list,
  page,
  pageSize,
  total,
  isLastPage,
  loading,
  loadMore,
  loadPrev,
  refresh
} = usePagination(
  (page, pageSize) => getApiList({ page, pageSize }),
  {
    initialPage: 1,
    initialPageSize: 10
  }
)
```

### 移除 alova

如果你不需要使用 alova 作为请求库，可以按照以下步骤将其从项目中移除：

1. **卸载依赖包**
   ```bash
   npm uninstall alova @alova/adapter-uniapp @alova/mock @alova/shared @alova/wormhole
   # 或者使用 pnpm
   pnpm remove alova @alova/adapter-uniapp @alova/mock @alova/shared @alova/wormhole
   ```

2. **删除相关配置文件**
   - 删除 `src/api/` 目录下的 alova 相关配置文件
   - 移除项目中引入 alova 的代码
   - 移除`alova.config.ts`文件

3. **替换为其他请求方案**
   - 可以选择上述提到的 [axios](#axios)、[@uni-helper/uni-network](#uni-helperuni-network) 或直接使用 [uni-app 内置方法](#uni-app-内置方法)

4. **更新相关引用**
   - 查找并替换项目中所有使用 `useRequest`、`usePagination` 等 alova hooks 的地方
   - 更新对应的导入语句

> 💡 **提示**: 移除前建议先备份项目，确保不会影响现有功能。

> 📖 **了解更多**: [Alova 官方文档](https://alova.js.org/zh-CN/)
