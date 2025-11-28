<script setup lang="ts">
definePage({
  name: 'router',
  style: {
    navigationBarTitleText: '路由管理',
  },
})

const { success: showSuccess } = useGlobalToast()
const router = useRouter()
const route = useRoute()

// 表单数据
const userId = ref('eduardo')
const searchKeyword = ref('vue')
const userName = ref('小星星')
const userLabel = ref('小熊熊')

// 基础导航方法
function pushByString() {
  // 字符串路径
  router.push('/pages/router/demo-string')
  showSuccess({ msg: '使用字符串路径跳转' })
}

function pushByPath() {
  // 带有路径的对象
  router.push({ path: '/pages/router/demo-object' })
  showSuccess({ msg: '使用path对象跳转' })
}

function pushByName() {
  // 命名的路由
  router.push({ name: 'demo-object' })
  showSuccess({ msg: '使用name跳转' })
}

// 参数传递示例
function pushWithParams() {
  if (!userId.value) {
    uni.showToast({
      title: '请输入用户ID',
      icon: 'none',
    })
    return
  }
  // 命名的路由，并加上参数
  router.push({ name: 'demo-params', params: { username: userId.value } })
  showSuccess({ msg: `传递参数: ${userId.value}` })
}

function pushWithQuery() {
  if (!searchKeyword.value) {
    uni.showToast({
      title: '请输入搜索关键词',
      icon: 'none',
    })
    return
  }
  // 带查询参数
  router.push({ path: '/pages/router/demo-query', query: { username: searchKeyword.value } })
  showSuccess({ msg: `传递查询参数: ${searchKeyword.value}` })
}

// 传递对象参数
function pushWithObjectParams() {
  const user = {
    name: userName.value,
    label: userLabel.value,
  }
  // 命名路由传递对象参数
  router.push({
    name: 'demo-params',
    params: { user: encodeURIComponent(JSON.stringify(user)) },
  })
  showSuccess({ msg: '传递对象参数(params)' })
}

function pushWithObjectQuery() {
  const user = {
    name: userName.value,
    label: userLabel.value,
  }
  // path+query传递对象参数
  router.push({
    path: '/pages/router/demo-query',
    query: { user: encodeURIComponent(JSON.stringify(user)) },
  })
  showSuccess({ msg: '传递对象参数(query)' })
}

// 导航守卫演示
function demoNavigationGuards() {
  showSuccess({ msg: '跳转到完整的导航守卫演示页面' })
  router.push({
    name: 'demo-guard',
  })
}

// Router方法演示
function demoPush() {
  router.push('/pages/router/demo-string')
  showSuccess({ msg: 'router.push() - 保留当前页面跳转' })
}

function demoPushTab() {
  router.pushTab('/pages/index/index')
  showSuccess({ msg: 'router.pushTab() - 跳转到tabBar页面' })
}

function demoReplace() {
  router.replace('/pages/router/demo-object')
  showSuccess({ msg: 'router.replace() - 替换当前页面' })
}

function demoReplaceAll() {
  router.replaceAll('/pages/index/index')
  showSuccess({ msg: 'router.replaceAll() - 关闭所有页面重新开始' })
}

function demoBack() {
  router.back()
  showSuccess({ msg: 'router.back() - 返回上一页' })
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
      showSuccess({ msg: `${url} 已复制到剪贴板` })
    },
  })
  // #endif
}
</script>

<template>
  <view class="min-h-screen flex-col gap-3 py-3">
    <!-- 头部介绍 -->
    <wd-card class="!mb-0" custom-content-class="p-4 text-center">
      <view class="text-10">
        🚀
      </view>
      <view class="text-6 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        uni-mini-router
      </view>
      <view class="text-3.5">
        轻量级路由管理解决方案
      </view>
      <view class="text-3">
        支持编程式导航、参数传递、导航守卫等功能
      </view>
    </wd-card>

    <!-- 当前路由信息 -->
    <demo-block title="当前路由信息" custom-card-content-class="px-0">
      <wd-cell-group class="cell-justify-end">
        <wd-cell size="small" title="路径:" :value="route.path" />
        <wd-cell size="small" title="名称:" :value="route.name || '未设置'" />
        <wd-cell size="small" title="参数:" :value="JSON.stringify(route.params)" />
        <wd-cell size="small" title="查询:" :value="JSON.stringify(route.query)" />
      </wd-cell-group>
    </demo-block>

    <!-- 编程式导航 -->
    <demo-block title="编程式导航">
      <view class="text-4 text-gray-800 font-bold font-bold dark:text-[var(--wot-dark-color)]">
        基础用法
      </view>
      <code-content code="router.push('/user')" />
      <view class="grid grid-cols-1 gap-2">
        <wd-button type="primary" size="small" @click="pushByString">
          字符串路径跳转
        </wd-button>
        <wd-button type="success" size="small" @click="pushByPath">
          对象路径跳转
        </wd-button>
        <wd-button type="warning" size="small" @click="pushByName">
          命名路由跳转
        </wd-button>
      </view>
    </demo-block>

    <!-- Router方法演示 -->
    <demo-block title="Router方法演示">
      <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        push 方法
      </view>
      <view class="text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        保留当前页面，跳转到应用内的某个页面，相当于 uni.navigateTo()
      </view>
      <code-content code="router.push(target)" />
      <wd-button type="primary" block @click="demoPush">
        演示 push 方法
      </wd-button>

      <view class="mt-5 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        pushTab 方法
      </view>
      <view class="text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，相当于 uni.switchTab()
      </view>
      <code-content code="router.pushTab(target)" />
      <wd-button type="success" block @click="demoPushTab">
        演示 pushTab 方法
      </wd-button>

      <view class="mt-5 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        replace 方法
      </view>
      <view class="mb-3 text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        关闭当前页面，跳转到应用内的某个页面，相当于 uni.redirectTo()
      </view>
      <code-content code="router.replace(target)" />
      <wd-button type="warning" block @click="demoReplace">
        演示 replace 方法
      </wd-button>

      <view class="mt-5 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        replaceAll 方法
      </view>
      <view class="text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        关闭所有页面，打开到应用内的某个页面，相当于 uni.reLaunch()
      </view>
      <code-content code="router.replaceAll(target)" />
      <wd-button type="error" block @click="demoReplaceAll">
        演示 replaceAll 方法
      </wd-button>

      <view class="mt-5 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        back 方法
      </view>
      <view class="text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        关闭当前页面，返回上一页面或多级页面，相当于 uni.navigateBack()
      </view>
      <code-content code="router.back()" />
      <code-content code="router.back({ delta: 2 })" />
      <wd-button type="info" block @click="demoBack">
        返回上一页
      </wd-button>
    </demo-block>

    <!-- 参数传递 -->
    <demo-block title="参数传递">
      <template #description>
        <wd-notice-bar :scrollable="false" wrapable background-color="#7c2d1233" color="#fed7aa">
          <view class="mb-2 text-3.5 font-bold">
            ⚠️ 重要提示
          </view>
          <view class="text-3 leading-relaxed">
            在 uni-mini-router 中，params 和 query 参数都会以查询字符串形式放在 URL 中，两者在实际效果上并无区别。这种 API 设计主要是为了与 vue-router 保持一致。
          </view>
        </wd-notice-bar>
      </template>

      <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        params 参数
      </view>
      <view class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
        注意：name 和 params 搭配使用，与 query 效果相同
      </view>
      <wd-input v-model="userId" placeholder="请输入用户名" />
      <code-content code="router.push({ name: 'user', params: { username: 'eduardo' } })" />
      <wd-button type="primary" block @click="pushWithParams">
        传递 params 参数
      </wd-button>

      <view class="mt-5 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        query 参数
      </view>
      <view class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
        注意：path 可以与 query 一起使用，与 params 效果相同
      </view>
      <wd-input v-model="searchKeyword" placeholder="请输入搜索关键词" />
      <code-content code="router.push({ path: '/user', query: { username: 'eduardo' } })" />
      <wd-button type="success" block @click="pushWithQuery">
        传递 query 参数
      </wd-button>

      <view class="mt-5 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        传递对象参数
      </view>
      <view class="text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        URL有长度限制，复杂对象需要使用 encodeURIComponent 编码
      </view>
      <view class="grid grid-cols-2 gap-2">
        <wd-input v-model="userName" placeholder="姓名" />
        <wd-input v-model="userLabel" placeholder="标签" />
      </view>
      <view class="grid grid-cols-2 gap-2">
        <wd-button type="primary" size="small" @click="pushWithObjectParams">
          对象 params
        </wd-button>
        <wd-button type="success" size="small" @click="pushWithObjectQuery">
          对象 query
        </wd-button>
      </view>
    </demo-block>

    <!-- 导航守卫 -->
    <demo-block title="导航守卫">
      <template #description>
        <wd-notice-bar :scrollable="false" wrapable background-color="#1e3a8a33" color="#bfdbfe">
          <view class="mb-2 text-3.5 font-bold">
            💡 完整演示
          </view>
          <view class="text-3 leading-relaxed">
            导航守卫功能比较复杂，我们准备了专门的演示页面，包含实时日志、权限验证、参数检查等完整功能演示。
          </view>
        </wd-notice-bar>
      </template>

      <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        基础守卫 API
      </view>
      <view class="text-3.5 text-gray-600 leading-relaxed dark:text-[var(--wot-dark-color2)]">
        beforeEach 和 afterEach 是最常用的导航守卫
      </view>
      <code-content code="router.beforeEach((to, from, next) => { next() })" />
      <code-content code="router.afterEach((to, from) => { console.log(to) })" />
      <wd-button type="primary" block @click="demoNavigationGuards">
        🛡️ 进入完整守卫演示
      </wd-button>
    </demo-block>

    <!-- 相关链接 -->
    <demo-block title="相关链接" custom-card-content-class="!p-0">
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell title="📚 uni-mini-router 文档" value="路由管理" is-link @click="handleNavigate('https://moonofweisheng.github.io/uni-mini-router/')" />
        <wd-cell title="🐙 GitHub 仓库" value="uni-mini-router" is-link @click="handleNavigate('https://github.com/Moonofweisheng/uni-mini-router')" />
        <wd-cell title="📖 uni-app 路由文档" value="页面路由" is-link @click="handleNavigate('https://uniapp.dcloud.net.cn/tutorial/page.html')" />
      </wd-cell-group>
    </demo-block>
  </view>
</template>
