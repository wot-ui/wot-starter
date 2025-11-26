# 分包优化

基于[@uni-ku/bundle-optimizer](https://github.com/uni-ku/bundle-optimizer)的Uni-app Vue3 项目「分包优化」完整接入指南，本项目未直接接入此插件，开发者可以按照本指南快速接入（可以直接把本教程发给cursor或者其他AI编辑器）。
（CLI / HBuilderX 通用）  
 

---

### 为什么 Vue3 必须手动接入分包优化？

| 维度 | Vue2（webpack 构建） | Vue3（vite 构建） |
|---|---|---|
| **官方策略** | 内置 `CommonsChunkPlugin / SplitChunksPlugin`，自动把公共依赖抽到主包 `vendor.js`，各分包仅保留自用代码。 | 官方为了“简化配置”，**把分包优化逻辑整个移除**。 |
| **实际结果** | 主包体积天然受控，开发者“零配置”即可满足 2 MB 限制。 | 所有第三方库、公共组件、工具函数 **全部打进 `common/vendor.js`**，主包瞬间超限。 |
| **平台限制** | 微信小程序 2 MB 主包限制仍能轻松满足。 | 未优化时，**业务代码未写完就已超限**，无法上传。 |

因此，**@uni-ku/bundle-optimizer** 把官方砍掉的「自动拆包」能力补了回来，并额外提供：
- **模块异步跨包调用**：`AsyncImport('@/sub-pkg/xxx.ts')`  
- **组件异步跨包引用**：`import Comp from '@/sub-pkg/comp.vue?async'`

> **结论：Vue3 不是不能分包，而是官方没做；不想被 2 MB 限制卡脖子，就必须装这个插件。**

---

### 10 分钟接入流程

| 步骤 | CLI 项目 | HBuilderX 项目 |
|---|---|---|
| 1. 装包 | `pnpm add -D @uni-ku/bundle-optimizer` | 在「终端」或「自定义插件」里执行相同命令 |
| 2. 配置 vite | 已有 `vite.config.ts` 则直接编辑；没有就新建 | 在项目根目录新建 `vite.config.ts`（或 js） |
| 3. 开分包开关 | 修改 `manifest.json` | 同上 |
| 4. 类型提示 | 把生成的 `*.d.ts` 加进 `tsconfig.json` | 同上 |

---

### 分步详解

#### ① 安装
```bash
pnpm add -D @uni-ku/bundle-optimizer
```

#### ② 最简 vite 配置
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import optimizer from '@uni-ku/bundle-optimizer'

export default defineConfig({
  plugins: [
    uni(),
    optimizer({ logger: true }) // 所有功能默认开启
  ]
})
```

#### ③ 开启微信小程序分包优化
```jsonc
// manifest.json
{
  "mp-weixin": {
    "optimization": { "subPackages": true }
  }
}
```

#### ④ 让 TS 识别新语法
```jsonc
// tsconfig.json
{
  "include": ["async-import.d.ts", "async-component.d.ts"]
}
```
> 这两个文件可加入 `.gitignore`。

---

### 用法示例

#### 1. 模块异步跨包调用
```ts
const mod = await AsyncImport('@/pages-sub-pkg/utils/encrypt.ts')
mod?.aesEncrypt('hello')
```

#### 2. 组件异步跨包引用
```vue
<script setup>
import Chart from '@/pages-sub-echarts/chart.vue?async'
</script>
<template><Chart /></template>
```

---

### 常见问题速查
| 问题 | 原因 & 解决 |
|---|---|
| 主包体积没变 | `manifest.json` 未开启 `subPackages: true` |
| 编辑器报 `找不到 AsyncImport` | 类型文件未加入 `tsconfig.json` |
| HBuilderX 白屏 | 根目录缺失 `vite.config.*`，新建即可 |
| App 不支持 | 暂不支持 App，未来是否支持未知，大概率不会 |

---

### 一键验证效果
```bash
pnpm build:mp-weixin
```
用微信开发者工具「构建分析」对比主包大小，立见瘦身。

### 参考资料
- [uni-app 分包优化](https://uniapp.dcloud.net.cn/tutorial/app-sub-package.html)
- [@uni-ku/bundle-optimizer](https://github.com/uni-ku/bundle-optimizer)
