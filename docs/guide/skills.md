---
title: 路由Agent Skills
iframe: true
url: subPages/skills/index
---
# Agent Skills

大家好，我是不如摸鱼去，欢迎来到我的 AI Coding 分享专栏。

wot-starter  是一个让你拥有飞一般开发体验的 uni-app 模板。

最近 Agent Skills 很火，它最初由 Claude 作为跨平台可移植的开放标准发布，本质上是一个包含指令、脚本和资源的**文件夹**。

如果说 Prompt 是给新员工的口头指令，那么 Skill 就是一本**长期的、可复用的“数字 SOP 手册”**。它将特定的工作流程转化为 AI Agent 可以理解和执行的标准操作程序。

> [!NOTE]
> wot-starter 中的 Agent Skills (位于 `.agent/skills` 目录) 专为 **Antigravity** 进行了配置。
>
> 如果你使用其他 AI 编程工具（如 Cursor、Trae、VS Code + Copilot 等），需要自行将 `SKILL.md` 中的指令迁移为对应工具支持的格式。


### 一个典型的 Skill 包含什么？

一个完整的 Skill 通常由以下部分组成：

- **`SKILL.md` (必选)**：核心指令文件。包含 YAML Frontmatter（定义名称和描述）以及详细的 Markdown 指令。
- **`scripts/` (可选)**：辅助脚本。例如自动化代码生成的 Python/Go 脚本，Agent 可以直接调用这些脚本来完成复杂任务。
- **`examples/` (可选)**：示例参考。提供“正确答案”的范例，让 AI 通过 Few-shot 学习快速掌握风格。
- **`resources/` (可选)**：额外资源。如配置文件模板、静态素材等。

### Skills 是如何工作的？

1. **自动发现 (Discovery)**：当你将 Skill 文件夹放入项目的 `.agent/skills` 目录时，Agent 会定期扫描这些目录。
2. **渐进式披露 (Progressive Disclosure)**：Agent 不会一次性读取所有 Skill（那太费 Token 了）。它会根据 `SKILL.md` 中的 `description` 来判断当前任务是否需要加载特定的技能。
3. **按需注入 (Injection)**：一旦匹配，该技能的详细 SOP、脚本入口和示例才会被“披露”给 Agent，并注入到上下文中。


### 为什么需要 Skills？

- **持久化能力**：不同于临时性的对话（Prompt），Skills 是随项目代码一同演进的经验沉淀，不会随着对话结束而丢失。
- **渐进式披露 (Progressive Disclosure)**：采用“按需加载”模式。只有在需要时才会读取详细指令，这就像是给 Agent 准备了一个工具箱，只有当它需要修水龙头时才会打开那一格，避免了在 System Prompt 中塞入过多无关信息导致的性能和成本问题。
- **标准化与一致性**：通过预定义的模板、示例和自动化脚本，确保团队中的每个成员（甚至不同的 Agent）产出的代码风格和业务逻辑完全一致。
- **跨工具可移植性**：虽然目前完美支持的是 Antigravity，但由于其结构基于 Markdown 和文件系统，迁移到 Cursor 或 Trae 的成本极低。

## wot-starter 的实战进化：将最佳实践“灌输”给 AI

理论聊完了，我们来看看在具体项目中是如何落地的。

在维护 `wot-starter` (一个基于 Vue3 + Vite + UnoCSS 的 uni-app 模板) 的过程中，我发现虽然文档很全，但每次让 AI 帮我写业务代码时，它总会按照“它以为的正确方式”去写，而不是按照“项目的最佳实践”去写。

为了解决这个问题，我把项目中的核心开发流程（页面生成、状态管理、网络请求等）全部封装成了 Agent Skills。现在，当你使用 Antigravity 调教项目时，它就像是一个已经和你配合了半年的老同事，张嘴就是“我们的规范”。

以下是 `wot-starter` 目前内置的技能包：

### Skills 合集

#### alova-api-module
**描述**: 快速创建 Alova 请求模块和 Mock 数据
**用途**: 标准化 API 请求层的创建，包含自动生成 Mock 数据模板，提高前后端联调效率。

#### global-feedback
**描述**: 全局反馈组件（Toast/Message/Loading）使用指南
**用途**: 统一项目中的交互反馈，确保 Toast、Message 和 Loading 的使用符合设计规范。

#### pinia-store-generator
**描述**: 创建符合项目规范的 Pinia Store
**用途**: 快速生成 Pinia 状态管理模块，包含 State、Getters 和 Actions 的标准结构。

#### uni-page-generator
**描述**: 基于项目规范快速生成 uni-app 页面
**用途**: 自动化页面创建流程，支持普通页面和分包页面，自动配置 `pages.json` 和路由。

#### vue-composable-creator
**描述**: 快速创建 Vue 3 组合式函数
**用途**: 封装可复用的逻辑代码，遵循 VueUse 风格，提升代码复用性和可维护性。

#### wot-router-usage
**描述**: @wot-ui/router 轻量级路由库使用指南
**用途**: 提供路由跳转的最佳实践，利用 `uni-helper` 的类型安全特性进行页面导航。

#### wot-ui
**描述**: wot-ui uni-app 组件库开发指南
**用途**: 包含组件的使用方法、配置、API参考和最佳实践，帮助开发者快速上手和使用 wot-ui 组件。


## 总结

今天我们给 wot-starter 添加了以上 skills，通过将最佳实践固化为 Skill，让 AI 在辅助开发时能更精准地遵循项目规范，提升开发效率和代码质量。如果你有更好的实践欢迎在 GitHub 留言！

## 参考资料

- Agent Skills - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Wot Starter - https://starter.wot-ui.cn/
