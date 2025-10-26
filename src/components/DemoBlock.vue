<script lang="ts" setup>
defineOptions({
  name: 'DemoBlock',
})

defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 自定义类名
  customClass: {
    type: String,
    default: '',
  },
  // 自定义类名
  cardCustomClass: {
    type: String,
    default: '',
  },
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
  <view :class="[customClass.split(' ')]" class="flex flex-col">
    <wd-text v-if="title" class="mx-4 py-3 text-26rpx" :text="title" />
    <wd-card :custom-class="`!px-0 overflow-hidden !mb-0 ${cardCustomClass}`">
      <slot />
    </wd-card>
  </view>
</template>
