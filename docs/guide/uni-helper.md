# Uni Helper 插件

Uni Helper 是一个旨在增强 uni-app 系列产品的开发体验为爱发电的非官方组织。作为靠爱发电的非官方项目，Uni Helper 提供了打包工具插件支持、编辑器扩展支持、NPM 包等并尽力维护它们，而他们提供的众多插件组成了本项目的核心插件库。

## Components 组件

大多数组件都是用户界面的可重用部分，如按钮和菜单。

得益于 [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components)，组件将自动注册到全局，你不需要显式导入它们。只需要在 `src/components` 目录下创建组件，然后直接使用即可。

:::code-group

```vue [src/pages/index.vue]
<template>
  <div>
    <h1>欢迎使用 vitesse-uni-app </h1>
    <AppAlert>
      这个组件会自动导入
    </AppAlert>
  </div>
</template>
```

```vue [src/components/AppAlert.vue]
<template>
  <span>
    <slot />
  </span>
</template>
```

:::

## Pages 页面

通过组合使用组件，我们可以得到展示给用户的页面。

得益于 [@uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages)，约定式路由（文件路由）的实现轻而易举。`src/pages` 目录下的每个文件都代表着一个路由。要创建新页面，只需要在这个目录里新增 `.vue` 文件。

:::code-group

```vue [src/pages/index.vue]
<template>
  <div>
    <h1>欢迎使用 vitesse-uni-app </h1>
    <AppAlert>
      这个组件会自动导入
    </AppAlert>
  </div>
</template>
```

```vue [src/pages/about.vue]
<template>
  <section>
    <p>通过 `/pages/about` 来访问这个页面</p>
  </section>
</template>
```

[@uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) 也支持配置排除指定目录的页面（例如组件目录），相对于 dir 和 subPackages，我们在`vite.config.ts`中已经做了相应的配置排除了`components`目录：  
```ts
// vite.config.ts
...
UniHelperPages({
  dts: 'src/uni-pages.d.ts',
  subPackages: [
    'src/subPages',
  ],
  /**
   * 排除的页面，相对于 dir 和 subPackages
   * @default []
   */
  exclude: ['**/components/**/*.*'],
})
...
```


:::

## Layouts 布局

布局可以用来创建通用界面（如页眉和页脚显示）的包装器，不同的页面可能需要不同的布局。布局是使用 `Vue` 的插槽功能实现的。

得益于 [@uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts)，你可以轻松地切换不同的布局。

`src/layouts/default.vue` 文件将作为默认布局。

:::code-group

```vue [src/layouts/default.vue]
<template>
  <div>
    <AppHeader />
    <!-- src/pages/index.vue 和 src/pages/about.vue 内容展示 -->
    <slot />
    <AppFooter />
  </div>
</template>
```

```vue [src/pages/index.vue]
<template>
  <div>
    <h1>欢迎使用 vitesse-uni-app </h1>
    <AppAlert>
      这个组件会自动导入
    </AppAlert>
  </div>
</template>
```

```vue [src/pages/about.vue]
<template>
  <section>
    <p>通过 `/pages/about` 来访问这个页面</p>
  </section>
</template>
```

:::

在页面文件内设置 `route` 代码块可以指定自定义布局。

```vue [src/pages/index.vue]
<route lang="json">
{
  "layout": "custom"
}
</route>
```

## manifest 应用配置
`manifest.json` 文件是应用的配置文件，用于指定应用的名称、图标、权限等。 

得益于 [@uni-helper/vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest)，你可以使用 `TypeScript` 编写 `uni-app` 的 `manifest.json`。

```ts
// vite.config.ts
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UniManifest(), Uni()],
})
```
创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`, 然后用 `TypeScript` 编写你的 `manifest.json`。

``` ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // code here...
})
```

在 [这里](https://github.com/uni-helper/vite-plugin-uni-manifest/blob/main/playground/manifest.config.ts)，你可以找到 `uni-app` 默认的 Vite-TS 模版的 `manifest.json` 是如何用 TypeScript 编写的。
