---
name: wot-ui
description: wot-ui uni-app 组件库开发指南。当用户询问 wot-ui 组件使用、配置、示例或 API 时使用此技能。
---

# wot-ui

此技能提供使用 wot-ui 组件库开发应用程序的专业知识。

## 何时使用

当用户需要以下帮助时使用此技能：
- 实现特定的 wot-ui 组件（例如，“如何使用 Calendar 日历组件？”）
- 配置全局 Provider 或主题
- 排查组件行为问题
- 查找 props、events 和 slots 的 API 参考

## 组件参考

`references/` 目录包含每个组件的详细文档。当用户询问特定组件时，请检查 `references/` 中对应的 markdown 文件。

### 常用组件

- **布局与导航**: [button.md](references/button.md), [cell.md](references/cell.md), [grid.md](references/grid.md), [navbar.md](references/navbar.md), [tabbar.md](references/tabbar.md)
- **数据录入**: [calendar.md](references/calendar.md), [checkbox.md](references/checkbox.md), [form.md](references/form.md), [input.md](references/input.md), [picker.md](references/picker.md), [upload.md](references/upload.md)
- **反馈**: [message-box.md](references/message-box.md), [toast.md](references/toast.md), [loading.md](references/loading.md), [notify.md](references/notify.md)
- **展示**: [card.md](references/card.md), [tag.md](references/tag.md), [badge.md](references/badge.md), [swiper.md](references/swiper.md)

## 使用模式

1. **识别组件**: 确定用户感兴趣的组件。
2. **查阅参考**: 阅读 `references/<component-name>.md` 中的具体组件文档。
3. **提供示例**: 使用文档中的示例来指导用户。确保证严格遵守参考中定义的 API（props, events）。

## 最佳实践

- **类型**: 使用文档中显示的正确 TypeScript 接口。
- **v-model**: 注意支持 `v-model` 双向绑定的组件。
- **事件**: 注意某些事件可能具有特定参数（例如 `{ item, index }`）。
