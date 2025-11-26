# 介绍

Wot Starter 是一个基于 [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 深度整合 [Wot UI](https://github.com/Moonofweisheng/wot-design-uni) 组件库的快速启动模板，采用直观且可扩展的方式创建类型安全、高性能和生产级的跨端应用。你可以直接开始编写 `.vue` 文件，而无需从头开始配置。

## 为什么

`uni-app` 背后的公司 DCloudio 选择创建自己的生态，比如 HBuilderX、uni_modules 等。这部分工作对部分开发者来说意义非凡，他们可以轻松上手并享受社区提供的一切资源。

但是，`uni-app` 社区生态远不如 npm 生态繁荣，我们常常需要求助于 npm 生态来实现部分需求，而 `uni-app` 的黑盒性阻碍了这一点。

vitesse-uni-app 充分拥抱开放生态，比如 VS Code 和 npm，希望能带给你更好的体验。

同样的，基于以上前提，我们选择基于 vitesse-uni-app 深度整合 WotUI 为使用 WotUI 组件库的开发者提供一个拥有更好体验的快速启动模板。

当然，如果你希望使用一个相对纯净的启动模板， [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 是一个绝佳选择。此外，仍可以使用 [create-uni](https://github.com/uni-helper/create-uni) 自行搭建启动模板。

## 主要依赖

vitess-uni-app 主要由以下开源包组成：

- 核心：[@uni-helper](https://uni-helper.js.org/)
- 引擎：[uni-app](https://github.com/dcloudio/uni-app)
- 打包器：[Vite](http://vite.dev/)
- CSS 样式：[UnoCSS](https://unocss.dev/)
- 代码质量：[ESLint](https://github.com/uni-helper/eslint-config) 和 [TypeScript](https://www.typescriptlang.org/)

wot-starter 在以上开源包的基础上引入了以下开源包：
- 组件库：[Wot UI](https://github.com/Moonofweisheng/wot-design-uni)
- CI/CD：[uni-mini-ci](https://github.com/Moonofweisheng/uni-mini-ci)
- 路由：[uni-mini-router](https://github.com/Moonofweisheng/uni-mini-router)
- 网络请求：[Alova](https://github.com/alovajs/alova)
- Pinia：[Pinia ](https://pinia.vuejs.org/zh/)

## 鸣谢

- [uni-helper](https://github.com/uni-helper) - 感谢 uni-helper 团队为 uni-app 开发体验优化做出的贡献。
- [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) - 感谢 vitesse-uni-app 提供的快速起手项目。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

