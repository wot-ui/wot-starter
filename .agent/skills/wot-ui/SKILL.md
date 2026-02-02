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

### 基础 (Basic)

- [introduction.md](references/introduction.md), [quick-use.md](references/quick-use.md), [common-problems.md](references/common-problems.md), [custom-theme.md](references/custom-theme.md)
- [button.md](references/button.md), [cell.md](references/cell.md), [config-provider.md](references/config-provider.md), [icon.md](references/icon.md), [img.md](references/img.md), [layout.md](references/layout.md), [popup.md](references/popup.md), [resize.md](references/resize.md), [transition.md](references/transition.md)

### 表单 (Form)

- [calendar.md](references/calendar.md), [calendar-view.md](references/calendar-view.md)
- [checkbox.md](references/checkbox.md)
- [col-picker.md](references/col-picker.md)
- [datetime-picker.md](references/datetime-picker.md), [datetime-picker-view.md](references/datetime-picker-view.md)
- [form.md](references/form.md)
- [input.md](references/input.md), [input-number.md](references/input-number.md), [password-input.md](references/password-input.md), [textarea.md](references/textarea.md)
- [keyboard.md](references/keyboard.md), [number-keyboard.md](references/number-keyboard.md)
- [picker.md](references/picker.md), [picker-view.md](references/picker-view.md)
- [radio.md](references/radio.md)
- [rate.md](references/rate.md)
- [search.md](references/search.md)
- [select-picker.md](references/select-picker.md)
- [signature.md](references/signature.md)
- [slider.md](references/slider.md)
- [switch.md](references/switch.md)
- [upload.md](references/upload.md), [img-cropper.md](references/img-cropper.md)
- [slide-verify.md](references/slide-verify.md)

### 反馈 (Action)

- [action-sheet.md](references/action-sheet.md), [curtain.md](references/curtain.md), [drop-menu.md](references/drop-menu.md), [overlay.md](references/overlay.md), [popover.md](references/popover.md), [swipe-action.md](references/swipe-action.md)
- [message-box.md](references/message-box.md), [notify.md](references/notify.md), [toast.md](references/toast.md), [loading.md](references/loading.md)
- [tooltip.md](references/tooltip.md)
- [fab.md](references/fab.md), [floating-panel.md](references/floating-panel.md)

### 展示 (Display)

- [avatar.md](references/avatar.md), [badge.md](references/badge.md), [tag.md](references/tag.md)
- [card.md](references/card.md), [circle.md](references/circle.md), [divider.md](references/divider.md)
- [collapse.md](references/collapse.md)
- [count-down.md](references/count-down.md), [count-to.md](references/count-to.md)
- [grid.md](references/grid.md), [table.md](references/table.md)
- [notice-bar.md](references/notice-bar.md), [status-tip.md](references/status-tip.md)
- [progress.md](references/progress.md), [steps.md](references/steps.md)
- [segmented.md](references/segmented.md)
- [skeleton.md](references/skeleton.md)
- [sort-button.md](references/sort-button.md)
- [swiper.md](references/swiper.md)
- [text.md](references/text.md)
- [tour.md](references/tour.md)
- [watermark.md](references/watermark.md)
- [root-portal.md](references/root-portal.md)
- [gap.md](references/gap.md)

### 导航 (Navigation)

- [backtop.md](references/backtop.md)
- [index-bar.md](references/index-bar.md)
- [navbar.md](references/navbar.md)
- [pagination.md](references/pagination.md)
- [sidebar.md](references/sidebar.md)
- [sticky.md](references/sticky.md)
- [tabbar.md](references/tabbar.md)
- [tabs.md](references/tabs.md)

### 组合式函数 (Composables)

- [use-config-provider.md](references/use-config-provider.md)
- [use-count-down.md](references/use-count-down.md)
- [use-message.md](references/use-message.md)
- [use-notify.md](references/use-notify.md)
- [use-toast.md](references/use-toast.md)
- [use-upload.md](references/use-upload.md)

### 其他 (Other)

- [consultation.md](references/consultation.md)
- [cli-templates.md](references/cli-templates.md)
- [locale.md](references/locale.md)

## 使用模式

1. **识别组件**: 确定用户感兴趣的组件。
2. **查阅参考**: 阅读 `references/<component-name>.md` 中的具体组件文档。
3. **提供示例**: 使用文档中的示例来指导用户。确保证严格遵守参考中定义的 API（props, events）。

## 最佳实践

- **类型**: 使用文档中显示的正确 TypeScript 接口。
- **v-model**: 注意支持 `v-model` 双向绑定的组件。
- **事件**: 注意某些事件可能具有特定参数（例如 `{ item, index }`）。
