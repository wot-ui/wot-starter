<!--
 * @Author: weisheng
 * @Date: 2024-11-01 11:44:38
 * @LastEditTime: 2025-01-13 16:52:01
 * @LastEditors: 810505339
 * @Description:
 * @FilePath: \wot-demo\src\pages\index.vue
 * 记得注释
-->
<script setup lang="ts">
import { useTheme } from '@/composables/theme/theme'

const { themeVars, theme } = useTheme()
</script>

<template>
  <view>
    <wd-cell title="当前暗黑模式">
      <view>{{ theme }}</view>
    </wd-cell>
    <wd-cell title="当前主题色">
      <view class="inline-block h-4 w-4 rounded" :style="{ 'background-color': themeVars.colorTheme }" />
    </wd-cell>
  </view>
</template>

<style></style>

<route type="home" lang="json">
{
  "layout": "tabbar",
  "name": "home",
  "style": {
    "navigationBarTitleText": "home"
  }
}
</route>
