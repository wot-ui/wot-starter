<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars = reactive<ConfigProviderThemeVars>({
  colorTheme: '#FF5454',
  tabsNavLineBgColor: 'red',
  navbarColor: '#ffffff',
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
  <wd-config-provider :theme-vars="themeVars" custom-style="background-color: #f5f5f5;min-height: 100vh">
    <slot />
    <wd-notify />
    <wd-toast />
    <wd-message-box />
    <privacy-popup />
  </wd-config-provider>
</template>
