<!--
 * @Author: weisheng
 * @Date: 2024-11-01 12:31:47
 * @LastEditTime: 2024-11-14 19:02:06
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-demo\src\layouts\tabbar.vue
 * 记得注释
-->
<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useTabbar } from '@/composables/useTabbar'

const router = useRouter()

const route = useRoute()

const themeVars = reactive<ConfigProviderThemeVars>({
})

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } = useTabbar()

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value)
  router.pushTab({ name: value })
}

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name)
    }
  })
})

onShow(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
})
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars" custom-style="min-height: 100vh">
    <wd-navbar :title="activeTabbar.title" safe-area-inset-top placeholder fixed :bordered="false" />

    <slot />
    <wd-tabbar :model-value="activeTabbar.name" placeholder bordered safe-area-inset-bottom fixed @change="handleTabbarChange">
      <wd-tabbar-item v-for="(item, index) in tabbarList" :key="index" :name="item.name" :value="getTabbarItemValue(item.name)" :title="item.title" :icon="item.icon" />
    </wd-tabbar>
    <wd-notify />
    <wd-toast />
    <wd-message-box />
    <privacy-popup />
  </wd-config-provider>
</template>
