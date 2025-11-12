<script setup lang="ts">
definePage({
  name: 'icon',
  style: {
    navigationBarTitleText: '图标演示',
  },
})

const { success: showSuccess } = useGlobalToast()

// WotUI 内置图标列表（精选9个）
const wotIcons = ref([
  { name: 'add', desc: '添加' },
  { name: 'close', desc: '关闭' },
  { name: 'check', desc: '勾选' },
  { name: 'arrow-right', desc: '右箭头' },
  { name: 'bags', desc: '购物袋' },
  { name: 'search', desc: '搜索' },
  { name: 'star', desc: '星标' },
  { name: 'heart', desc: '喜欢' },
  { name: 'setting', desc: '设置' },
])

// Carbon 图标是编译时的，不能动态渲染，所以直接在模板中静态写入

// 图标大小选项
const iconSizes = ref([
  { name: '小', value: '16px' },
  { name: '中', value: '20px' },
  { name: '大', value: '24px' },
  { name: '超大', value: '32px' },
])
const currentIconSize = ref('20px')

// 复制图标代码
function copyIconCode(iconName: string, isCarbon = false) {
  const code = isCarbon
    ? `<div class="i-carbon:${iconName} text-xl"></div>`
    : `<wd-icon name="${iconName}" size="20px" />`

  uni.setClipboardData({
    data: code,
    showToast: false,
    success: () => {
      uni.hideToast()
      showSuccess({ msg: '代码已复制到剪贴板' })
    },
  })
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
  <view class="min-h-screen flex-col gap-y-3 py-3">
    <!-- 头部介绍 -->
    <wd-card class="!mb-0" custom-content-class="p-4 text-center">
      <view class="mb-3 text-10">
        🎯
      </view>
      <view class="mb-2 text-6 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        图标使用演示
      </view>
      <view class="mb-2 text-3.5">
        WotUI 图标 & Iconify 图标集
      </view>
      <view class="text-3">
        丰富的图标资源，满足各种使用场景
      </view>
    </wd-card>

    <!-- 图标大小选择 -->
    <demo-block title="图标大小">
      <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        选择图标大小
      </view>
      <view class="flex flex-wrap gap-2">
        <view
          v-for="size in iconSizes"
          :key="size.value"
          class="rounded-2 px-3 py-2 text-3 transition-all duration-200"
          :class="[
            currentIconSize === size.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[var(--wot-dark-background3)] dark:text-[var(--wot-dark-color)] dark:hover:bg-[var(--wot-dark-border)]',
          ]"
          @click="currentIconSize = size.value"
        >
          {{ size.name }} ({{ size.value }})
        </view>
      </view>
      <view class="flex items-center justify-center rounded-2 bg-gray-50 p-4 space-x-4 dark:bg-[var(--wot-dark-background3)]">
        <wd-icon name="star" :size="currentIconSize" color="#f59e0b" />
        <view class="i-carbon:star text-yellow-500" :style="{ fontSize: currentIconSize }" />
        <text class="text-3 text-gray-600 dark:text-[var(--wot-dark-color2)]">
          当前大小: {{ currentIconSize }}
        </text>
      </view>
    </demo-block>

    <!-- WotUI 图标 -->
    <demo-block title="WotUI 内置图标（精选示例）">
      <template #description>
        <wd-notice-bar
          background-color="#1e3a8a33"
          color="#bfdbfe"
          wrapable
          :scrollable="false"
        >
          <view class="mb-1 text-3.5 text-blue-700 font-bold dark:text-blue-300">
            💡 说明
          </view>
          <view class="text-3 text-blue-600 leading-relaxed dark:text-blue-200">
            这里只展示了部分常用图标作为示例。完整的图标列表请查看
            <text class="text-blue-700 underline dark:text-blue-300" @click="handleNavigate('https://wot-ui.cn/component/icon.html')">
              WotUI 官方文档
            </text>
          </view>
        </wd-notice-bar>

        <!-- 图标网格 -->
        <view class="grid grid-cols-3 mt-3 gap-3 md:grid-cols-6 sm:grid-cols-4">
          <wd-card
            v-for="icon in wotIcons"
            :key="icon.name"
            custom-class="transition-all duration-200 !mx-0 !mb-0 active:scale-95 !text-center hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode(icon.name)"
          >
            <view class="mb-2 flex justify-center">
              <wd-icon :name="icon.name" :size="currentIconSize" color="#666" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              {{ icon.name }}
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              {{ icon.desc }}
            </view>
          </wd-card>
        </view>
      </template>

      <!-- 使用示例 -->
      <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        使用示例
      </view>
      <code-content>
        基础用法:
        <template #pre>
          {{ `<wd-icon name="star" size="20px" color="#f59e0b" />` }}
        </template>
      </code-content>
      <code-content>
        自定义样式:
        <template #pre>
          {{ `<wd-icon name="home" size="24px" color="var(--wot-color-theme)" />` }}
        </template>
      </code-content>
    </demo-block>

    <!-- Carbon 图标 -->
    <demo-block title="Carbon 图标集">
      <template #description>
        <wd-notice-bar
          background-color="#1e3a8a33"
          color="#bfdbfe"
          wrapable
          :scrollable="false"
        >
          <view class="mb-1 text-3.5 text-blue-700 font-bold dark:text-blue-300">
            💡 说明
          </view>
          <view class="text-3 text-blue-600 leading-relaxed dark:text-blue-200">
            Iconify 图标集资源异常丰富，这里我们以 Carbon 图标集为例，展示如何使用图标。
            <text class="text-blue-700 underline dark:text-blue-300" @click="handleNavigate('https://icones.js.org/collection/carbon')">
              Carbon 图标集
            </text>
          </view>
        </wd-notice-bar>

        <!-- 图标网格 - 静态渲染 -->
        <view class="grid grid-cols-3 mt-3 gap-3 md:grid-cols-6 sm:grid-cols-4">
          <!-- add -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('add', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:add text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              add
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              添加
            </view>
          </wd-card>

          <!-- close -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('close', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:close text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              close
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              关闭
            </view>
          </wd-card>

          <!-- checkmark -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('checkmark', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:checkmark text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              checkmark
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              确认
            </view>
          </wd-card>

          <!-- arrow-right -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('arrow-right', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:arrow-right text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              arrow-right
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              右箭头
            </view>
          </wd-card>

          <!-- home -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('home', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:home text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              home
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              首页
            </view>
          </wd-card>

          <!-- search -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('search', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:search text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              search
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              搜索
            </view>
          </wd-card>

          <!-- star -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('star', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:star text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              star
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              星级
            </view>
          </wd-card>

          <!-- favorite -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('favorite', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:favorite text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              favorite
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              收藏
            </view>
          </wd-card>

          <!-- settings -->
          <wd-card
            custom-class="text-center transition-all duration-200 !mx-0 !mb-0 active:scale-95 hover:shadow-md"
            custom-content-class="py-4 px-0"
            @click="copyIconCode('settings', true)"
          >
            <view class="mb-2 flex justify-center">
              <view class="i-carbon:settings text-gray-600 dark:text-[var(--wot-dark-color)]" :style="{ fontSize: currentIconSize }" />
            </view>
            <view class="mb-1 text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              settings
            </view>
            <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
              设置
            </view>
          </wd-card>
        </view>
      </template>

      <!-- 使用示例 -->
      <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        使用示例
      </view>

      <code-content>
        UnoCSS 方式:
        <template #pre>
          {{ `<div class="i-carbon:star text-xl text-yellow-500"></div>` }}
        </template>
      </code-content>
      <code-content>
        自定义大小和颜色:
        <template #pre>
          {{ `<div class="i-carbon:home" style="font-size: 24px; color: #3b82f6;"></div>` }}
        </template>
      </code-content>
    </demo-block>

    <!-- 对比演示 -->
    <demo-block title="图标对比">
      <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        相同功能图标对比
      </view>
      <view class="grid grid-cols-2 gap-4">
        <view class="rounded-2 bg-blue-50 p-4 text-center dark:bg-blue-900/20">
          <view class="mb-2 text-3.5 text-blue-700 font-bold dark:text-blue-300">
            WotUI 图标
          </view>
          <view class="mb-3 flex justify-center space-x-4">
            <wd-icon name="home" :size="20" color="#3b82f6" />
            <wd-icon name="search1" :size="20" color="#3b82f6" />
            <wd-icon name="star" :size="20" color="#3b82f6" />
            <wd-icon name="heart" :size="20" color="#3b82f6" />
          </view>
          <view class="text-2.5 text-blue-600 dark:text-blue-200">
            组件化使用，API统一
          </view>
        </view>
        <view class="rounded-2 bg-green-50 p-4 text-center dark:bg-green-900/20">
          <view class="mb-2 text-3.5 text-green-700 font-bold dark:text-green-300">
            Iconify 图标
          </view>
          <view class="mb-3 flex justify-center space-x-4">
            <view class="i-carbon:home text-20px text-green-600" />
            <view class="i-carbon:search text-20px text-green-600" />
            <view class="i-carbon:star text-20px text-green-600" />
            <view class="i-carbon:favorite text-20px text-green-600" />
          </view>
          <view class="text-2.5 text-green-600 dark:text-green-200">
            原子化CSS，更加灵活
          </view>
        </view>
      </view>
    </demo-block>

    <!-- 使用建议 -->
    <demo-block title="使用建议">
      <view class="flex items-center">
        <view class="mr-2 text-6">
          💡
        </view>
        <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          WotUI 图标适用场景
        </view>
      </view>
      <view class="text-3 text-gray-600 leading-relaxed space-y-2 dark:text-[var(--wot-dark-color2)]">
        <view>• 与WotUI组件配合使用时</view>
        <view>• 需要统一的图标API时</view>
        <view>• 快速开发，不需要过多自定义时</view>
        <view>• 移动端应用，需要保证兼容性时</view>
      </view>
      <view class="flex items-center">
        <view class="mr-2 text-6">
          🎨
        </view>
        <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          Iconify 图标适用场景
        </view>
      </view>
      <view class="text-3 text-gray-600 leading-relaxed space-y-2 dark:text-[var(--wot-dark-color2)]">
        <view>• 需要更多图标选择时</view>
        <view>• 使用UnoCSS原子化CSS时</view>
        <view>• 需要灵活自定义样式时</view>
        <view>• 追求更小的包体积时</view>
      </view>
      <view class="flex items-center">
        <view class="mr-2 text-6">
          🤝
        </view>
        <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          结合使用建议
        </view>
      </view>
      <view class="text-3 text-gray-600 leading-relaxed space-y-2 dark:text-[var(--wot-dark-color2)]">
        <view>
          • <text class="text-blue-600 font-bold dark:text-blue-400">
            WotUI图标
          </text>：用于组件内置图标，如按钮、表单等
        </view>
        <view>
          • <text class="text-green-600 font-bold dark:text-green-400">
            Iconify图标
          </text>：用于装饰性图标，如页面图标、状态图标等
        </view>
        <view>• 两者可以在同一个项目中混用，各取所长</view>
        <view>• 建议制定团队规范，明确使用场景</view>
      </view>
    </demo-block>

    <!-- 相关链接 -->
    <demo-block title="相关链接" custom-card-content-class="!p-0">
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell title="📚 WotUI 图标文档" value="组件库文档" is-link @click="handleNavigate('https://wot-ui.cn/component/icon.html')" />
        <wd-cell title="🎯 Carbon 图标集" value="IBM设计系统" is-link @click="handleNavigate('https://icones.js.org/collection/carbon')" />
        <wd-cell title="🔧 Iconify 图标集" value="巨量图标合集" is-link @click="handleNavigate('https://iconify.design/')" />
        <wd-cell title="⚡ UnoCSS 图标" value="原子化CSS图标" is-link @click="handleNavigate('https://unocss.dev/presets/icons')" />
      </wd-cell-group>
    </demo-block>
  </view>
</template>
