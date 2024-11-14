<!--
 * @Author: weisheng
 * @Date: 2024-11-01 11:44:38
 * @LastEditTime: 2024-11-14 19:02:48
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-demo\src\pages\hi.vue
 * 记得注释
-->
<script lang="ts" setup>
</script>

<template>
  <view class="px-3 py-20 text-center">
    <view class="text-2xl text-gray-9!">
      <wd-text custom-class="text-gray-9!" text="欢迎使用 Wot Design Uni！" />
    </view>
  </view>
</template>

<route lang="json">
{
  "layout": "tabbar",
  "name": "hi",
  "style": {
    "navigationBarTitleText": "hi"
  }
}
</route>
