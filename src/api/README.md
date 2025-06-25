# API 接口模块

本目录包含了项目的所有 API 接口定义和配置，基于 [Alova](https://alova.js.org/) 请求库构建，集成了完整的 Mock 数据支持。

## 📁 目录结构

```
api/
├── core/                          # 核心配置
│   ├── instance.ts               # Alova 实例配置
│   ├── middleware.ts             # 请求中间件
│   └── handlers.ts               # 响应处理器
├── mock/                          # Mock 数据
│   ├── modules/                  # 按模块分类的 Mock 数据
│   │   ├── common.ts            # 通用 Mock 处理
│   │   ├── pet.ts               # 宠物相关接口 Mock
│   │   ├── store.ts             # 商店相关接口 Mock
│   │   └── user.ts              # 用户相关接口 Mock
│   ├── utils/                   # Mock 工具
│   │   ├── index.ts            # 工具导出
│   │   └── generators.ts       # Mock 数据生成器
│   ├── mockAdapter.ts          # Mock 适配器配置
│   └── README.md               # Mock 使用说明
├── apiDefinitions.ts            # API 接口定义（自动生成）
├── createApis.ts               # API 创建器（自动生成）
├── globals.d.ts                # 全局类型定义（自动生成）
├── index.ts                    # API 主入口
└── README.md                   # 本文档
```

## 🚀 快速开始

### 基础使用

```typescript
// 导入全局 API 对象
import Apis from '@/api'

// 使用示例
const { send } = Apis.pet.getPetById({
  pathParams: { petId: 1 }
})

const petData = await send()
```

### 配置方法选项

```typescript
import { $$userConfigMap } from '@/api'

// 在 $$userConfigMap 中配置特定 API 的选项
export const $$userConfigMap = withConfigType({
  'pet.getPetById': {
    // 响应数据转换
    transform: (data: any) => data?.pet || data,
    // 缓存配置
    cacheFor: 300000, // 5分钟
  },
  'user.loginUser': {
    // 请求超时
    timeout: 10000,
    // 响应转换
    transform: (data: any) => ({
      ...data,
      isLoggedIn: true
    })
  }
})
```

## 📡 API 接口说明

项目基于 **Swagger Petstore** API 规范，包含三个主要模块：

### 🐾 Pet（宠物）模块

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/pet/{petId}/uploadImage` | 上传宠物图片 |
| POST | `/pet` | 添加新宠物 |
| PUT | `/pet` | 更新宠物信息 |
| GET | `/pet/findByStatus` | 根据状态查找宠物 |
| GET | `/pet/{petId}` | 根据ID获取宠物 |
| POST | `/pet/{petId}` | 使用表单数据更新宠物 |
| DELETE | `/pet/{petId}` | 删除宠物 |

#### 使用示例

```typescript
// 获取宠物信息
const pet = await Apis.pet.getPetById({
  pathParams: { petId: 123 }
}).send()

// 根据状态查找宠物
const availablePets = await Apis.pet.findPetsByStatus({
  params: { status: 'available' }
}).send()

// 添加新宠物
const newPet = await Apis.pet.addPet({
  data: {
    name: 'Buddy',
    category: { id: 1, name: 'Dogs' },
    status: 'available',
    photoUrls: ['https://example.com/photo.jpg']
  }
}).send()
```

### 🏪 Store（商店）模块

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/store/inventory` | 获取库存 |
| POST | `/store/order` | 下单购买宠物 |
| GET | `/store/order/{orderId}` | 根据ID获取订单 |
| DELETE | `/store/order/{orderId}` | 删除订单 |

#### 使用示例

```typescript
// 获取库存信息
const inventory = await Apis.store.getInventory().send()

// 下单
const order = await Apis.store.placeOrder({
  data: {
    petId: 123,
    quantity: 1,
    shipDate: '2024-12-31T00:00:00.000Z',
    status: 'placed'
  }
}).send()

// 获取订单信息
const orderInfo = await Apis.store.getOrderById({
  pathParams: { orderId: 1 }
}).send()
```

### 👤 User（用户）模块

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/user/createWithList` | 批量创建用户（列表） |
| GET | `/user/{username}` | 根据用户名获取用户 |
| PUT | `/user/{username}` | 更新用户信息 |
| DELETE | `/user/{username}` | 删除用户 |
| GET | `/user/login` | 用户登录 |
| GET | `/user/logout` | 用户登出 |
| POST | `/user/createWithArray` | 批量创建用户（数组） |
| POST | `/user` | 创建用户 |

#### 使用示例

```typescript
// 用户登录
const loginResult = await Apis.user.loginUser({
  params: {
    username: 'admin',
    password: 'admin'
  }
}).send()

// 获取用户信息
const userInfo = await Apis.user.getUserByName({
  pathParams: { username: 'john' }
}).send()

// 创建用户
const newUser = await Apis.user.createUser({
  data: {
    username: 'newuser',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '1234567890',
    userStatus: 1
  }
}).send()
```

## 🎭 Mock 数据支持

项目集成了完整的 Mock 数据支持，使用 `@alova/mock` 实现。

### Mock 配置

Mock 功能通过环境变量 `VITE_ENABLE_MOCK` 控制：

```env
# .env.development
VITE_ENABLE_MOCK=true   # 启用 Mock

# .env.production
VITE_ENABLE_MOCK=false  # 禁用 Mock
```

### Mock 数据特性

#### 🐾 Pet Mock 特性
- 支持多种宠物类型（Dogs, Cats, Birds, Fish, Reptiles）
- 随机生成宠物标签（friendly, playful, calm 等）
- 状态验证（available, pending, sold）
- 完整的错误处理（400, 404, 401 状态码）

#### 🏪 Store Mock 特性
- 动态库存数据生成
- 订单状态管理（placed, approved, delivered）
- 订单ID验证（支持特定范围验证）
- 完整的订单生命周期模拟

#### 👤 User Mock 特性
- 预设管理员账户（admin/admin）
- 随机用户数据生成
- 用户状态管理（离线、在线、忙碌）
- 完整的CRUD操作支持

### Mock 测试用例

```typescript
// 测试宠物不存在的情况
const pet404 = await Apis.pet.getPetById({
  pathParams: { petId: 404 }
}).send() // 返回 404 错误

// 测试用户名不存在的情况
const user404 = await Apis.user.getUserByName({
  pathParams: { username: 'notfound' }
}).send() // 返回 404 错误

// 测试管理员登录
const adminLogin = await Apis.user.loginUser({
  params: { username: 'admin', password: 'admin' }
}).send() // 返回成功登录信息
```

## ⚙️ 环境配置

### 环境变量

```env
# API 基础地址
VITE_API_BASE_URL=https://petstore.swagger.io/v2

# 启用/禁用 Mock
VITE_ENABLE_MOCK=true

# 环境名称
VITE_ENV_NAME=development
```

### 请求配置

- **超时时间**：60秒
- **缓存策略**：全局关闭（cacheFor: null）
- **请求头**：自动添加 Content-Type
- **防缓存**：GET 请求自动添加时间戳

## 🔧 自定义配置

### 添加请求拦截器

```typescript
// 在 core/instance.ts 的 beforeRequest 中添加
beforeRequest: (method) => {
  // 添加认证token
  const token = getToken()
  if (token) {
    method.config.headers.Authorization = `Bearer ${token}`
  }

  // 其他自定义逻辑
}
```

### 添加响应拦截器

```typescript
// 在 core/handlers.ts 中自定义响应处理
export async function handleAlovaResponse(response: any) {
  // 自定义响应处理逻辑
  if (response.code !== 200) {
    throw new Error(response.message)
  }
  return response.data
}
```

## 📝 开发指南

### 添加新的 Mock 数据

1. 在 `mock/modules/` 目录下创建新的模块文件
2. 使用 `defineMock` 定义接口
3. 在 `mockAdapter.ts` 中导入并添加到 `allMocks` 数组

```typescript
// mock/modules/example.ts
import { defineMock } from '@alova/mock'

export default defineMock({
  '[GET]/api/example': () => {
    return { message: 'Hello Mock!' }
  }
}, true)
```

### API 生成

项目使用 Alova 的代码生成功能，通过以下命令更新API：

```bash
npm run alova-gen
```

### 类型安全

所有 API 都有完整的 TypeScript 类型支持：

```typescript
// 自动类型推断
const pet = await Apis.pet.getPetById({
  pathParams: { petId: 123 } // 类型检查
}).send() // 返回类型自动推断
```

## 🐛 调试指南

### 开启调试日志

```typescript
// 在开发环境自动开启
if (import.meta.env.MODE === 'development') {
  console.log(`[Alova Request] ${method.type} ${method.url}`)
}
```

### Mock 请求日志

Mock 请求会在控制台输出详细日志：

```
[Mock] GET /pet/123 {...}
[Mock] POST /store/order {...}
```

### 错误处理

所有API错误都会通过统一的错误处理器处理，支持：

- 网络错误
- 业务错误
- 认证错误
- 参数验证错误

## 📚 参考资料

- [Alova 官方文档](https://alova.js.org/)
- [Alova Mock 文档](https://alova.js.org/zh-CN/resource/request-adapter/alova-mock)
- [Swagger Petstore API](https://petstore.swagger.io/)
- [UniApp 适配器](https://alova.js.org/zh-CN/resource/request-adapter/alova-adapter-uniapp)
