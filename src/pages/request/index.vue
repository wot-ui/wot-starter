<script setup lang="ts">
definePage({
  name: 'request',
  style: {
    navigationBarTitleText: '网络请求',
  },
})

const GlobalToast = useGlobalToast()

// Alova 核心特性
const alovaFeatures = [
  {
    icon: '⚡',
    title: '简单易用',
    description: '观看视频5分钟上手',
    details: '极简的API设计，直观的使用方式，让开发者快速掌握并投入使用',
    color: 'blue',
  },
  {
    icon: '🔧',
    title: '完美兼容',
    description: '兼容你最喜欢的技术栈',
    details: '支持Vue、React、Angular等主流框架，以及各种HTTP客户端库',
    color: 'green',
  },
  {
    icon: '🚀',
    title: '高性能模块',
    description: '20+ 高性能的业务模块',
    details: '提供分页、实时数据、文件上传下载等开箱即用的高性能解决方案',
    color: 'purple',
  },
  {
    icon: '🔗',
    title: 'OpenAPI 解决方案',
    description: '更先进的 openAPI 解决方案',
    details: '在代码中和API信息高效交互，自动生成类型定义和请求函数',
    color: 'orange',
  },
  {
    icon: '📦',
    title: '请求共享缓存',
    description: '请求共享和响应缓存',
    details: '智能的请求去重和响应缓存机制，显著提升应用性能',
    color: 'cyan',
  },
  {
    icon: '🛡️',
    title: '类型安全',
    description: '完整的 TypeScript 支持',
    details: '从请求到响应的全链路类型安全，减少运行时错误',
    color: 'red',
  },
]

// 使用真正的 useRequest hook - 获取宠物列表
const {
  data: petData,
  loading: petLoading,
  error: petError,
  send: loadPetData,
} = useRequest(
  (status: 'available' | 'pending' | 'sold' = 'available') => Apis.pet.findPetsByStatus({
    params: { status },
  }),
  {
    immediate: false,
  },
).onError((error) => {
  GlobalToast.error(error.error?.message || '获取宠物列表失败')
})

// 使用真正的 useRequest hook - 用户登录演示
const {
  data: loginData,
  loading: loginLoading,
  error: loginError,
  send: performLogin,
} = useRequest(
  (username: string, password: string) => Apis.user.loginUser({
    params: {
      username,
      password,
    },
  }),
  {
    immediate: false,
  },
).onError((error) => {
  GlobalToast.error(error.error?.message || '用户登录失败')
})

// useRequest 演示函数
function demoLoadPets() {
  loadPetData('available')
}

function demoLogin() {
  performLogin('testuser', 'testpass')
}

// 链接导航处理
function handleNavigate(url: string) {
  // #ifdef H5
  window.open(url, '_blank')
  // #endif
  // #ifndef H5
  uni.setClipboardData({
    data: url,
    showToast: false,
    success: () => {
      uni.hideToast()
      GlobalToast.success(`${url} 已复制到剪贴板`)
    },
  })
  // #endif
}
</script>

<template>
  <view class="min-h-screen flex-col gap-3 py-3">
    <!-- 头部介绍 -->
    <wd-card class="text-center !mb-0 !py-3">
      <view class="mb-3 text-10">
        🌐
      </view>
      <view class="mb-2 text-6 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        Alova 网络请求
      </view>
      <view class="mb-2 text-3.5 leading-relaxed">
        极致高效的请求工具集
      </view>
      <view class="text-3 leading-relaxed">
        alova完美兼容你最喜欢的HTTP client和UI框架，快速开发客户端和服务的应用的业务逻辑，同时让API信息与代码进行交互，像虫洞一样拉近后端协作距离，极致高效地集成你的APIs
      </view>
    </wd-card>

    <!-- Alova 核心特性 -->
    <view class="mx-4 flex-col gap-1">
      <wd-text class="my-2 text-14px" text="核心特性" />
      <view class="grid grid-cols-2 gap-3">
        <wd-card
          v-for="feature in alovaFeatures"
          :key="feature.title"
          custom-class="!mx-0 !mb-0"
          custom-content-class="py-4 text-center"
        >
          <view class="mr-2 text-6">
            {{ feature.icon }}
          </view>
          <view class="flex-1">
            <view class="text-3.5 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
              {{ feature.title }}
            </view>
            <view class="text-3">
              {{ feature.description }}
            </view>
          </view>
        </wd-card>
      </view>
    </view>

    <!-- Alova useRequest 演示 -->
    <demo-block title="useRequest Hook 演示">
      <!-- 宠物列表请求 -->
      <view class="flex items-center">
        <view class="mr-2 text-5">
          🐾
        </view>
        <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          宠物列表请求
        </view>
      </view>
      <view class="text-3 leading-relaxed">
        使用 useRequest 获取宠物列表，支持参数传递和错误处理
      </view>

      <wd-button
        type="primary"
        block
        :loading="petLoading"
        @click="demoLoadPets"
      >
        获取宠物列表
      </wd-button>

      <!-- 请求状态显示 -->
      <view class="space-y-2">
        <view v-if="petLoading" class="flex items-center text-3 text-blue-600">
          <wd-icon name="loading" size="14px" class="mr-1" />
          正在加载宠物数据...
        </view>
        <view v-if="petError" class="text-3 text-red-600">
          ❌ 请求失败: {{ petError.message }}
        </view>
        <view v-if="petData && !petLoading" class="text-3 text-green-600">
          ✅ 成功获取 {{ petData.length }} 只宠物数据
        </view>
      </view>

      <!-- 代码示例 -->
      <code-content>
        代码示例:
        <template #pre>
          {{ `const { data, loading, send } = useRequest(
  (status) => Apis.pet.findPetsByStatus({ params: { status } }),
  { immediate: false }
).onError((error) => { ... })` }}
        </template>
      </code-content>

      <!-- 用户登录请求 -->
      <view class="mt-5 flex items-center">
        <view class="mr-2 text-5">
          👤
        </view>
        <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          用户登录请求
        </view>
      </view>
      <view class="text-3 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        演示多参数传递和POST请求处理
      </view>

      <wd-button
        type="warning"
        block
        :loading="loginLoading"
        @click="demoLogin"
      >
        模拟用户登录
      </wd-button>

      <!-- 请求状态显示 -->
      <view class="space-y-2">
        <view v-if="loginLoading" class="flex items-center text-3 text-blue-600">
          <wd-icon name="loading" size="14px" class="mr-1" />
          正在登录中...
        </view>
        <view v-if="loginError" class="text-3 text-red-600">
          ❌ 登录失败: {{ loginError.message }}
        </view>
        <view v-if="loginData && !loginLoading" class="text-3 text-green-600">
          ✅ 登录成功！
        </view>
      </view>

      <!-- 代码示例 -->
      <code-content>
        代码示例:
        <template #pre>
          {{ `const { data, loading, send } = useRequest(
  (username, password) => Apis.user.loginUser({
    params: { username, password }
  }),
  { immediate: false }
).onError((error) => { ... })` }}
        </template>
      </code-content>
    </demo-block>

    <!-- 相关链接 -->
    <demo-block title="相关链接" custom-card-content-class="!p-0">
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell title="📚 Alova 官方文档" value="alova.js.org" is-link @click="handleNavigate('https://alova.js.org/')" />
        <wd-cell title="🐙 GitHub 仓库" value="alovajs/alova" is-link @click="handleNavigate('https://github.com/alovajs/alova')" />
        <wd-cell title="📖 uni-app 文档" value="网络请求" is-link @click="handleNavigate('https://uniapp.dcloud.net.cn/api/request/request.html')" />
        <wd-cell title="🎯 Alova Hooks" value="请求策略" is-link @click="handleNavigate('https://alova.js.org/zh-CN/tutorial/client/strategy/')" />
        <wd-cell title="💡 最佳实践" value="使用指南" is-link @click="handleNavigate('https://alova.js.org/zh-CN/tutorial/project/best-practice/')" />
      </wd-cell-group>
    </demo-block>
  </view>
</template>
