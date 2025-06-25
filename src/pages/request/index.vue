<script setup lang="ts">
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
      GlobalToast.success(`${url} 已复制到剪贴板`)
    },
  })
  // #endif
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 py-3 dark:bg-[var(--wot-dark-background)]">
    <!-- 头部介绍 -->
    <view class="mx-3 mb-3">
      <view class="rounded-3 bg-white px-5 py-8 text-center dark:bg-[var(--wot-dark-background2)]">
        <view class="mb-3 text-10">
          🌐
        </view>
        <view class="mb-2 text-6 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          Alova 网络请求
        </view>
        <view class="mb-2 text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
          极致高效的请求工具集
        </view>
        <view class="text-3 text-gray-500 leading-relaxed dark:text-[var(--wot-dark-color2)]">
          alova完美兼容你最喜欢的HTTP client和UI框架，快速开发客户端和服务的应用的业务逻辑，同时让API信息与代码进行交互，像虫洞一样拉近后端协作距离，极致高效地集成你的APIs
        </view>
      </view>
    </view>

    <!-- Alova 核心特性 -->
    <demo-block title="Alova 核心特性" transparent>
      <view class="grid grid-cols-2 gap-3">
        <view
          v-for="feature in alovaFeatures"
          :key="feature.title"
          class="rounded-2 bg-white p-3 dark:bg-[var(--wot-dark-background2)]"
        >
          <view class="mb-2 flex items-center">
            <view class="mr-2 text-5">
              {{ feature.icon }}
            </view>
            <view class="flex-1">
              <view class="text-3.5 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
                {{ feature.title }}
              </view>
              <view class="text-2.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
                {{ feature.description }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </demo-block>

    <!-- Alova useRequest 演示 -->
    <demo-block title="useRequest Hook 演示" transparent>
      <view class="space-y-3">
        <!-- 宠物列表请求 -->
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 flex items-center">
            <view class="mr-2 text-5">
              🐾
            </view>
            <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
              宠物列表请求
            </view>
          </view>
          <view class="mb-3 text-3 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
            使用 useRequest 获取宠物列表，支持参数传递和错误处理
          </view>

          <view class="mb-3">
            <wd-button
              type="primary"
              block
              :loading="petLoading"
              @click="demoLoadPets"
            >
              获取宠物列表
            </wd-button>
          </view>

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
          <view class="mt-3 rounded-2 bg-gray-50 p-3 dark:bg-[var(--wot-dark-background3)]">
            <view class="mb-2 text-3 text-gray-700 font-bold dark:text-[var(--wot-dark-color)]">
              代码示例:
            </view>
            <view class="text-2.5 text-gray-600 leading-relaxed font-mono dark:text-[var(--wot-dark-color2)]">
              const { data, loading, send } = useRequest(<br>
              &nbsp;&nbsp;(status) => Apis.pet.findPetsByStatus({ params: { status } }),<br>
              &nbsp;&nbsp;{ immediate: false }<br>
              ).onError((error) => { ... })
            </view>
          </view>
        </view>

        <!-- 用户登录请求 -->
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 flex items-center">
            <view class="mr-2 text-5">
              👤
            </view>
            <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
              用户登录请求
            </view>
          </view>
          <view class="mb-3 text-3 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
            演示多参数传递和POST请求处理
          </view>

          <view class="mb-3">
            <wd-button
              type="warning"
              block
              :loading="loginLoading"
              @click="demoLogin"
            >
              模拟用户登录
            </wd-button>
          </view>

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
          <view class="mt-3 rounded-2 bg-gray-50 p-3 dark:bg-[var(--wot-dark-background3)]">
            <view class="mb-2 text-3 text-gray-700 font-bold dark:text-[var(--wot-dark-color)]">
              代码示例:
            </view>
            <view class="text-2.5 text-gray-600 leading-relaxed font-mono dark:text-[var(--wot-dark-color2)]">
              const { data, loading, send } = useRequest(<br>
              &nbsp;&nbsp;(username, password) => Apis.user.loginUser({<br>
              &nbsp;&nbsp;&nbsp;&nbsp;params: { username, password }<br>
              &nbsp;&nbsp;}),<br>
              &nbsp;&nbsp;{ immediate: false }<br>
              ).onError((error) => { ... })
            </view>
          </view>
        </view>
      </view>
    </demo-block>

    <!-- 相关链接 -->
    <demo-block title="相关链接" transparent>
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

<route lang="json">
{
  "name": "request",
  "style": {
    "navigationBarTitleText": "网络请求"
  }
}
</route>
