<!--
 * @Author: weisheng
 * @Date: 2024-11-01 11:44:38
 * @LastEditTime: 2025-01-13 16:49:17
 * @LastEditors: 810505339
 * @Description:
 * @FilePath: \wot-demo\src\pages\setting.vue
 * 记得注释
-->
<script lang="ts" setup>
import { useTheme } from '@/composables/theme/theme'

const isDark = ref(false)
const { toggleTheme, themeVars, colorColumns } = useTheme()
function change() {
  toggleTheme()
}
</script>

<template>
  <view>
    <wd-cell title="暗黑模式">
      <wd-switch v-model="isDark" @change="change" />
    </wd-cell>
    <wd-select-picker
      v-if="themeVars.colorTheme"
      v-model="themeVars.colorTheme" :show-confirm="false" label="切换颜色"
      :columns="colorColumns" type="radio" :z-index="100"
    />
  </view>
</template>

<route lang="json">
{
  "layout": "tabbar",
  "name": "setting",
  "style": {
    "navigationBarTitleText": "setting"
  }
}
</route>
