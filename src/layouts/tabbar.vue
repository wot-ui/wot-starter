<script lang="ts" setup>
const router = useRouter()

const route = useRoute()

const { themeVars, theme } = useManualTheme()

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } = useTabbar()

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value)
  router.pushTab({ name: value })
}

onMounted(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name)
    }
  })
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
  <wd-config-provider :theme-vars="themeVars" :custom-class="`page-wraper ${theme}`" :theme="theme">
    <slot />
    <wd-tabbar
      :model-value="activeTabbar.name" bordered safe-area-inset-bottom placeholder fixed
      @change="handleTabbarChange"
    >
      <wd-tabbar-item
        v-for="(item, index) in tabbarList" :key="index" :name="item.name"
        :value="getTabbarItemValue(item.name)" :title="item.title" :icon="item.icon"
      />
    </wd-tabbar>
    <!-- #ifdef MP-WEIXIN -->
    <privacy-popup />
    <!-- #endif -->
    <wd-notify />
    <wd-message-box />
    <wd-toast />
    <global-loading />
    <global-toast />
    <global-message />
  </wd-config-provider>
</template>

<style lang="scss">
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
}

.wot-theme-dark.page-wraper {
  background: #222;
}
</style>
