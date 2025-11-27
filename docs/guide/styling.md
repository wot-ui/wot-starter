---
title: UnoCSS 样式
iframe: true
url: subPages/styles/index
---

# 样式

模板基于 `UnoCSS` 提供主要样式支持。当然，你可以结合 CSS 预处理器、组件库等使用。

## UnoCSS

[UnoCSS](https://unocss.dev/) 是按需使用的原子 CSS 引擎，提供了良好的样式支持。

模板内置了 [@uni-helper/unocss-preset-uni](https://github.com/uni-helper/unocss-preset-uni)，它在底层使用 [unocss-applet](https://github.com/unocss-applet/unocss-applet) 来兼容不同平台，并提供了按平台编写样式的能力。

```html
<!-- 只在 H5 编译时生成 mx-auto 类 -->
<view class='uni-h5:mx-auto'></view>
<!-- 只在 APP 编译时生成 mx-auto 类 -->
<view class='uni-app:mx-auto'></view>
<!-- 只在小程序编译时生成 mx-auto 类 -->
<view class='uni-mp:mx-auto'></view>
<!-- 只在微信小程序编译时生成 mx-auto 类 -->
<view class='uni-weixin:mx-auto'></view>
<!-- 只在支付宝小程序编译时生成 mx-auto 类 -->
<view class='uni-mp-alipay:mx-auto'></view>
```

## CSS 预处理器

你可以参考 [Vite 文档 CSS 预处理器](https://cn.vitejs.dev/guide/features.html#css-pre-processors)，了解相关使用方法。

## 单文件组件样式

你可以参考 [Vue 文档单文件组件 CSS 功能](https://cn.vuejs.org/api/sfc-css-features.html)，了解相关使用方法。

## 组件库

除了 Wot UI 组件库，你还可以查看 [uni-helper/awesome-uni-app] 整理的 [组件库](https://github.com/uni-helper/awesome-uni-app#ui-%E7%BB%84%E4%BB%B6%E5%BA%93)，当然最好不要看，如果你非要看，那么选一个你心动的即可~