<script lang="ts" setup>
const { themeVars, theme } = useTheme()
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
  <wd-config-provider :theme-vars="themeVars" :theme="theme" :custom-class="`page-wraper ${theme}`">
    <slot />
    <wd-notify />
    <wd-message-box />
    <wd-toast />
    <global-loading />
    <global-toast />
    <global-message />
    <!-- #ifdef MP-WEIXIN -->
    <privacy-popup />
    <!-- #endif -->
  </wd-config-provider>
</template>

<style lang="scss" scoped>
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
}

.wot-theme-dark {
  .page-wraper {
    background: #222;
  }
}
</style>
