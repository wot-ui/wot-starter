---
title: 全局反馈组件
iframe: true
url: pages/feedback/index
---

# 全局反馈组件

基于 [WotUI](https://wot-ui.cn/) 组件扩展，支持在路由导航守卫和网络请求拦截器等场景使用的可全局调用的反馈组件：[GlobalLoading](#全局加载)、[GlobalMessage](#全局弹窗)、[GlobalToast](#全局提示)。 

:::tip 提示
[WotUI](https://wot-ui.cn/) 组件库基于 `Provide/Inject` 实现了包括 `Toast`、`Loading`、`MessageBox` 组件在内的反馈组件的函数式调用，不过基于此实现方案，反馈组件的调用需要要确保在setup中，但是确实存在某些场景无法适用，例如：网络请求拦截器、路由导航守卫中要使用反馈组件，所以本项目基于 Pinia 与 [WotUI](https://wot-ui.cn/) 提供了统一的、可全局调用的反馈组件，包括 Toast、Loading、Message。
:::


## 全局加载

### 概述

GlobalLoading 是基于 `wot-design-uni` 的 `wd-toast` 组件封装的全局加载组件，可以结合`axios`、`alova`等请求库使用，显示加载状态，通过 Pinia 状态管理实现全局调用，用于显示数据加载、操作处理等场景的等待状态。

### 组件特性

- 基于 `wd-toast` 组件封装
- 显示加载动画，默认不自动关闭
- 支持遮罩层覆盖，防止用户操作

### 使用

```typescript
import { useGlobalLoading } from '@/composables/useGlobalLoading'

const loading = useGlobalLoading()
```

### API 文档

#### 基础用法

```typescript
// 显示加载（字符串参数）
loading.loading('加载中...')

// 显示加载（配置对象）
loading.loading({
  msg: '数据加载中',
  cover: true
})

// 关闭加载
loading.close()
```

#### 方法说明

##### loading(option)
显示加载状态

```typescript
// 简单文本
loading.loading('请稍候...')

// 自定义配置
loading.loading({
  msg: '数据处理中，请稍候',
  cover: false,
  position: 'middle'
})
```

**默认配置：**
- 图标：loading（旋转动画）
- 持续时间：0（不自动关闭）
- 遮罩：true
- 位置：middle
- 显示：true

##### close()
关闭加载状态

```typescript
loading.close()
```

### 参数说明

#### ToastOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| msg | string | - | 加载提示文本 |
| iconName | string | 'loading' | 图标名称（固定为loading） |
| duration | number | 0 | 持续时间(ms)，0表示不自动关闭 |
| cover | boolean | true | 是否显示遮罩层 |
| position | string | 'middle' | 显示位置：'top' \| 'middle' \| 'bottom' |
| show | boolean | - | 是否显示（内部使用） |

#### 方法参数

支持两种参数类型：

1. **字符串参数**：直接传入加载提示文本
2. **选项对象**：传入完整的 ToastOptions 配置

## 全局提示

### 概述

GlobalToast 是基于 `wot-design-uni` 的 `wd-toast` 组件封装的全局提示组件，通过 Pinia 状态管理实现全局调用。

### 组件特性

- 基于 `wd-toast` 组件封装
- 支持多种提示类型：成功、错误、信息、警告
- 支持自定义图标、位置、持续时间等

### 使用

```typescript
import { useGlobalToast } from '@/composables/useGlobalToast'

const toast = useGlobalToast()
```

### API 文档

#### 基础用法

```typescript
// 普通提示
toast.show('这是一条提示信息')

// 自定义配置
toast.show({
  msg: '自定义提示',
  duration: 3000,
  position: 'top'
})
```

#### 快捷方法

##### success(option)
成功提示，显示绿色成功图标

```typescript
toast.success('操作成功')
toast.success({
  msg: '保存成功',
  duration: 2000
})
```

**默认配置：**
- 图标：success
- 持续时间：1500ms

##### error(option)
错误提示，显示红色错误图标

```typescript
toast.error('操作失败')
toast.error({
  msg: '网络错误，请重试',
  duration: 3000
})
```

**默认配置：**
- 图标：error
- 方向：vertical（垂直布局）

##### info(option)
信息提示，显示蓝色信息图标

```typescript
toast.info('这是一条信息')
toast.info({
  msg: '请注意查看',
  position: 'top'
})
```

**默认配置：**
- 图标：info

##### warning(option)
警告提示，显示黄色警告图标

```typescript
toast.warning('警告信息')
toast.warning({
  msg: '请谨慎操作',
  iconName: 'warning'
})
```

**默认配置：**
- 图标：warning

##### close()
手动关闭提示

```typescript
toast.close()
```

### 参数说明

#### ToastOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| msg | string | - | 提示内容 |
| duration | number | 2000 | 持续时间(ms)，0表示不自动关闭 |
| position | string | 'middle' | 显示位置：'top' \| 'middle' \| 'bottom' |
| iconName | string | - | 图标名称 |
| direction | string | - | 布局方向：'horizontal' \| 'vertical' |
| cover | boolean | false | 是否显示遮罩 |
| show | boolean | - | 是否显示（内部使用） |

#### 方法参数

所有方法都支持两种参数类型：

1. **字符串参数**：直接传入提示文本
2. **选项对象**：传入完整的 ToastOptions 配置


## 全局弹窗

### 概述

GlobalMessage 是基于 `wot-design-uni` 的 `wd-message-box` 组件封装的全局弹窗组件，通过 Pinia 状态管理实现全局调用，用于显示提醒、确认、输入等交互场景。

### 组件特性

- 基于 `wd-message-box` 组件封装
- 支持提醒（alert）、确认（confirm）、输入（prompt）三种类型
- 支持成功/失败回调处理

### 使用

```typescript
import { useGlobalMessage } from '@/composables/useGlobalMessage'

const message = useGlobalMessage()
```

### API 文档

#### 基础用法

```typescript
// 通用弹窗
message.show({
  title: '提示',
  message: '这是一条消息'
})

// 字符串参数
message.show('简单提示')
```

#### 方法说明

##### show(option)
显示通用弹窗

```typescript
message.show({
  title: '标题',
  message: '内容',
  success: res => console.log('成功', res),
  fail: res => console.log('失败', res)
})
```

##### alert(option)
显示提醒弹窗（只有确认按钮）

```typescript
// 简单提醒
message.alert('操作完成')

// 详细配置
message.alert({
  title: '提醒',
  message: '请注意查看结果',
  success: (res) => {
    console.log('用户确认了')
  }
})
```

##### confirm(option)
显示确认弹窗（有确认和取消按钮）

```typescript
// 简单确认
message.confirm('确定要删除吗？')

// 详细配置
message.confirm({
  title: '确认删除',
  message: '删除后不可恢复，确定要删除吗？',
  success: (res) => {
    if (res.action === 'confirm') {
      console.log('用户确认删除')
      // 执行删除操作
    }
  },
  fail: (res) => {
    console.log('用户取消删除')
  }
})
```

##### prompt(option)
显示输入弹窗（有输入框和确认取消按钮）

```typescript
// 简单输入
message.prompt('请输入您的姓名')

// 详细配置
message.prompt({
  title: '输入信息',
  message: '请输入新的名称',
  inputValue: '默认值',
  inputPlaceholder: '请输入内容',
  success: (res) => {
    if (res.action === 'confirm') {
      console.log('用户输入:', res.value)
    }
  },
  fail: (res) => {
    console.log('用户取消输入')
  }
})
```

##### close()
手动关闭弹窗

```typescript
message.close()
```

### 参数说明

#### GlobalMessageOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 弹窗标题 |
| message | string | - | 弹窗内容 |
| type | string | - | 弹窗类型：'alert' \| 'confirm' \| 'prompt' |
| showCancelButton | boolean | - | 是否显示取消按钮（自动设置） |
| inputValue | string | - | 输入框默认值（prompt类型） |
| inputPlaceholder | string | - | 输入框占位符（prompt类型） |
| success | Function | - | 成功回调函数 |
| fail | Function | - | 失败回调函数 |
| confirmButtonText | string | '确定' | 确认按钮文本 |
| cancelButtonText | string | '取消' | 取消按钮文本 |

#### MessageResult

回调函数接收的参数对象：

| 参数 | 类型 | 说明 |
|------|------|------|
| action | string | 用户操作：'confirm' \| 'cancel' |
| value | string | 输入框的值（仅prompt类型） |

#### 方法参数

所有方法都支持两种参数类型：

1. **字符串参数**：直接传入标题文本
2. **选项对象**：传入完整的 GlobalMessageOptions 配置

