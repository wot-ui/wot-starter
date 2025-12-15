# 部署

对于 uni-app 来说，部署即打包和发行。

## Web

使用下面的命令来打包：

```bash
pnpm build:h5
```

产物位于 `dist/build/h5`, 就像传统 SPA 一样部署即可。

## 小程序

以微信小程序为例，使用下面的命令来打包：

```bash
pnpm build:mp-weixin
```

产物位于 `dist/build/mp-weixin`, 使用微信开发者工具上传即可。

::: tip
如果想自动上传到微信小程序，可直接使用 [uni-mini-ci](https://www.npmjs.com/package/uni-mini-ci)，或参考 [这篇文章](https://juejin.cn/post/7272316909051346959) 自行配置。
:::

要发行其他小程序，执行 `pnpm build:mp-<platform>`打包，并使用对应开发者工具上传即可，具体可查看 `package.json` 的 `scripts` 部分。

## APP

### 离线打包

- [android](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)
- [ios](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios.html)

::: warning
你仍然可以使用 HBuilderX 提供的“安心”打包功能，但是由于这种方式强依赖 HBuilderX，故不做推荐。
:::
