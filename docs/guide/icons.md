---
title: 图标使用
iframe: true
url: pages/icon/index
---

# 图标使用

你可以使用多种方案来在项目中使用图标。一般情况下，可以直接使用 UI 组件库内置的图标，也可以使用更加灵活的 Iconify 图标集，以下是我们推荐的一些实践方案。

## WotUI 内置图标

最简单的图标使用方式是使用 [WotUI](https://wot-ui.cn/component/icon.html) 的内置图标。

```html
<!-- 基础用法 -->
<wd-icon name="star" size="20px" color="#f59e0b" />

<!-- 在按钮中使用 -->
<wd-button icon="add" type="primary">添加</wd-button>

<!-- 主题色适配 -->
<wd-icon name="home" size="24px" color="var(--wot-color-theme)" />
```

## Iconify 图标集

如果你需要更多图标选择，可以使用 [Iconify](https://iconify.design/) 图标集配合 [UnoCSS](https://unocss.dev/) 使用，我们已经默认集成了 [Carbon](https://icones.js.org/collection/carbon) 图标集，也可以在 [Icones](https://icones.js.org/) 中搜索你需要的图标。

```html
<!-- 基础用法 -->
<text class="i-carbon:star text-xl text-yellow-500"></text>

<!-- 响应式大小 -->
<text class="i-carbon:home text-sm md:text-lg lg:text-xl"></text>

<!-- 暗黑模式适配 -->
<text class="i-carbon:favorite text-gray-600 dark:text-white"></text>
```


### 常用 Carbon 图标

```html
<!-- 系统图标 -->
<div class="i-carbon:add"></div>          <!-- 添加 -->
<div class="i-carbon:close"></div>        <!-- 关闭 -->
<div class="i-carbon:checkmark"></div>    <!-- 确认 -->
<div class="i-carbon:arrow-right"></div>  <!-- 右箭头 -->

<!-- 功能图标 -->
<div class="i-carbon:home"></div>         <!-- 首页 -->
<div class="i-carbon:search"></div>       <!-- 搜索 -->
<div class="i-carbon:user"></div>         <!-- 用户 -->
<div class="i-carbon:settings"></div>     <!-- 设置 -->

<!-- 状态图标 -->
<div class="i-carbon:star"></div>         <!-- 星级 -->
<div class="i-carbon:favorite"></div>     <!-- 收藏 -->
<div class="i-carbon:warning"></div>      <!-- 警告 -->
<div class="i-carbon:error"></div>        <!-- 错误 -->
```

> 📖 **了解更多**: [Carbon 图标集](https://icones.js.org/collection/carbon) | [Iconify 官网](https://iconify.design/) | [Icones](https://icones.js.org/)
