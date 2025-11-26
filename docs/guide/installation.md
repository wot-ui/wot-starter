---
title: 起步
iframe: true
url: ''
---

# 起步

你可以直接使用在线编辑器快速试用，或者使用终端在本地开始使用。

## 在线试用

您可以使用在线编辑器在浏览器中开始试用：

- [StackBlitz](https://stackblitz.com/github/wot-ui/wot-starter)
- [GitHub Template](https://github.com/wot-ui/wot-starter/generate)

## 本地使用

### 前置依赖

- **Node.js** - `>= 20.19.0 || >= 22.12.0 || >= 24.0.0`
- **文本编辑器** - 推荐使用 [VS Code](https://code.visualstudio.com/) 并使用 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件
- **终端** - 为了运行 `uni` 命令，Windows 推荐 Git Bash，Linux 和 macOS 推荐 zsh

::: details 最佳实践

- **Node.js**: 总是使用偶数版本 (即 [LTS 版本](https://nodejs.org/en/about/previous-releases)，例如 20, 22)
- **Volar**: 推荐启用 [接管模式 takeover mode](https://cn.vuejs.org/guide/typescript/overview#volar-takeover-mode)

:::

打开终端，然后使用以下命令：

::: code-group

```bash [create-uni]
pnpm create uni <project-name> -t wot-starter
```

```bash [degit]
pnpx degit wot-ui/wot-starter <project-name>
```

```bash [giget]
pnpx giget gh:wot-ui/wot-starter <project-name>
```

:::

在 VS Code 中打开项目文件夹：

```bash
code <project-name>
```

安装依赖：

::: code-group

```bash [pnpm]
pnpm install
```

```bash [yarn]
npx rimraf pnpm-lock.yaml
yarn install
```

```bash [npm]
npx rimraf pnpm-lock.yaml
npm install
```

```bash [bun]
npx rimraf pnpm-lock.yaml
bun install
```

:::

## 开发

你可以使用 `dev` 命令直接启动 `h5` 模式的开发服务器

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [yarn]
yarn dev
```

```bash [npm]
npm dev
```

```bash [bun]
bun dev
```

:::

### 跨端开发

同样使用 `dev` 命令，不同的是你需要使用冒号并跟着你要开发的平台标识。

::: code-group

```bash [pnpm]
pnpm dev:<platform>
```

```bash [yarn]
yarn dev:<platform>
```

```bash [npm]
npm dev:<platform>
```

```bash [bun]
bun dev:<platform>
```

:::
