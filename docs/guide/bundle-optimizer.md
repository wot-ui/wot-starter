# 分包优化



本项目基于 [@uni-ku/bundle-optimizer](https://github.com/uni-ku/bundle-optimizer) 分包优化插件，实现 uni-app Vue3 项目分包优化插件，解决小程序主包体积超限问题。

:::tip 提示
本章节基于 @uni-ku/bundle-optimizer@2.x 版本编写，1.x 版本请参考 [@uni-ku/bundle-optimizer](https://github.com/uni-ku/bundle-optimizer) 文档处理。
:::

## 插件简介

### 为什么需要这个插件？

uni-app Vue3（vite 构建）官方为了"简化配置"，移除了 Vue2（webpack 构建）中内置的分包优化逻辑。这导致所有第三方库、公共组件、工具函数全部打进 `common/vendor.js`，主包体积瞬间超限，无法满足微信小程序 2 MB 限制。

**@uni-ku/bundle-optimizer** 把官方砍掉的「自动拆包」能力补了回来，并提供：
- **分包优化**：自动将公共依赖抽离到主包，各分包仅保留自用代码
- **模块异步跨包调用**：使用 `import()` 语法异步引用模块
- **组件异步跨包引用**：通过 `componentPlaceholder` 配置实现

### 功能特性

| 功能 | 说明 |
|---|---|
| 分包优化 | 自动将公共依赖抽离到主包，控制主包体积 |
| 模块异步跨包调用 | 允许使用 `import()` 语法，异步引用 JS/TS 模块 |
| 组件异步跨包引用 | 通过 `componentPlaceholder` 配置，实现组件异步跨包引用 |

### 适用范围

> ⚠️ **暂时不支持 App 平台**

适用于 uni-app CLI 或 HBuilderX 创建的 Vue3 项目

---

## 快速上手

> 本项目已集成 @uni-ku/bundle-optimizer 插件，无需额外安装。

### 1. 安装插件

```bash
pnpm add -D @uni-ku/bundle-optimizer
```

### 2. 配置 vite.config.ts

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Optimization from '@uni-ku/bundle-optimizer'

export default defineConfig({
  plugins: [
    uni(),
    Optimization({
      logger: false, // 是否输出日志
    }),
  ],
})
```

### 3. 开启微信小程序分包优化

在 `manifest.json` 或 `manifest.config.ts` 中配置：

```json
{
  "mp-weixin": {
    "optimization": {
      "subPackages": true
    }
  }
}
```

或使用 `@uni-helper/vite-plugin-uni-manifest`：

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'mp-weixin': {
    optimization: {
      subPackages: true,
    },
  },
})
```

### 4. （可选）添加 TypeScript 类型支持

在 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    "types": ["@uni-ku/bundle-optimizer/client"]
  }
}
```

或在入口文件顶部添加：

```ts
/// <reference types="@uni-ku/bundle-optimizer/client" />
```

---

## 使用示例

### 模块异步跨包调用

使用 ESM 原生异步导入语法 `import()` 来实现模块的异步引入：

```ts
// 异步引入 JS/TS 模块
import('@/pages-sub-pkg/utils/encrypt.ts').then((mod) => {
  mod?.aesEncrypt('hello')
})

// 或使用 async/await
const mod = await import('@/pages-sub-pkg/utils/encrypt.ts')
mod?.aesEncrypt('hello')
```

> ⚠️ **注意**：不要使用 `import('./Comp.vue').then(...)` 动态导入 Vue 文件，这会导致组件/页面空白，与分包优化逻辑冲突。

### 组件异步跨包引用

通过 `componentPlaceholder` 配置实现组件异步跨包引用：

#### 方式一：使用 `<script setup>`（推荐）

```vue
<script setup lang="ts">
import Chart from '@/pages-sub-echarts/chart.vue'

defineOptions({
  componentPlaceholder: {
    Chart: 'view',
  },
})
</script>

<template>
  <Chart />
</template>
```

#### 方式二：使用选项式 API

```vue
<script>
import Chart from '@/pages-sub-echarts/chart.vue'

export default {
  components: { Chart },
  componentPlaceholder: {
    Chart: 'view',
  },
}
</script>

<template>
  <Chart />
</template>
```

> 💡 **提示**：`componentPlaceholder` 的值通常填写 `'view'` 即可。

---

## 本项目中的使用

### 配置说明

本项目已完整接入 `@uni-ku/bundle-optimizer` 插件，配置如下：

#### vite.config.ts 配置

```ts
import Optimization from '@uni-ku/bundle-optimizer'

export default defineConfig({
  plugins: [
    // ... 其他插件
    Optimization({
      logger: false,
    }),
  ],
})
```

#### manifest.config.ts 配置

```ts
export default defineManifestConfig({
  'mp-weixin': {
    optimization: {
      subPackages: true,
    },
  },
})
```

#### 分包配置

在 `vite.config.ts` 中配置了三个分包：

```ts
UniHelperPages({
  subPackages: [
    'src/subPages',
    'src/subEcharts',
    'src/subAsyncEcharts',
  ],
})
```

### 实际使用示例

#### 异步组件跨包引用示例

在 `src/subAsyncEcharts/asyncEcharts/index.vue` 中，展示了如何异步引用来自 `src/subEcharts` 分包的图表组件：

```vue
<script setup lang="ts">
import BarChart from '@/subEcharts/echarts/components/BarChart.vue'
import DonutChart from '@/subEcharts/echarts/components/DonutChart.vue'
import FunnelChart from '@/subEcharts/echarts/components/FunnelChart.vue'
import GaugeChart from '@/subEcharts/echarts/components/GaugeChart.vue'
import LineChart from '@/subEcharts/echarts/components/LineChart.vue'
import LiquidFillChart from '@/subEcharts/echarts/components/LiquidFillChart.vue'
import MiniLineChart from '@/subEcharts/echarts/components/MiniLineChart.vue'
import PieChart from '@/subEcharts/echarts/components/PieChart.vue'
import RadarChart from '@/subEcharts/echarts/components/RadarChart.vue'
import ScatterChart from '@/subEcharts/echarts/components/ScatterChart.vue'
import StackedBarChart from '@/subEcharts/echarts/components/StackedBarChart.vue'

defineOptions({
  componentPlaceholder: {
    BarChart: 'view',
    DonutChart: 'view',
    FunnelChart: 'view',
    GaugeChart: 'view',
    LineChart: 'view',
    LiquidFillChart: 'view',
    MiniLineChart: 'view',
    PieChart: 'view',
    RadarChart: 'view',
    ScatterChart: 'view',
    StackedBarChart: 'view',
  },
})
</script>

<template>
  <view class="bg-gray-50 p-5">
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        饼图示例
      </view>
      <PieChart />
    </view>
    <!-- 更多图表... -->
  </view>
</template>
```

这个示例展示了：
1. 从 `subEcharts` 分包异步引用多个图表组件
2. 使用 `componentPlaceholder` 配置所有异步组件
3. 在模板中正常使用这些组件

### 验证效果

构建项目并使用微信开发者工具查看主包大小：

```bash
pnpm build:mp-weixin
```

使用微信开发者工具的「构建分析」功能对比主包大小，可以看到分包优化带来的体积缩减效果。

---

## 常见问题

### Q: 主包体积没有变化？

A: 检查 `manifest.json` 或 `manifest.config.ts` 中是否开启了 `mp-weixin.optimization.subPackages: true`。

### Q: 组件或页面空白？

A: 可能使用了 `import('./Comp.vue').then(...)` 动态导入 Vue 文件，请改用 `componentPlaceholder` 配置式方案。

### Q: 如何配置异步组件？

A: 使用 `componentPlaceholder` 配置，通常填 `'view'` 即可。

### Q: 支持 App 平台吗？

A: 暂不支持 App 平台，未来是否支持未知。

### Q: 为什么要使用原生 `import()`？

A: 降低学习成本，提供更好的 IDE 类型支持，并使代码更符合标准。

---

## 参考资料

- [@uni-ku/bundle-optimizer 官方文档](https://github.com/uni-ku/bundle-optimizer)
- [微信小程序分包异步加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html)
