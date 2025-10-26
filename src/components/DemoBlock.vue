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
  customCardClass: {
    type: String,
    default: '',
  },
  // 自定义类名
  customCardContentClass: {
    type: String,
    default: '',
  },
})

const slots = useSlots()
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
  <view :class="[customClass.split(' ')]" class="flex flex-col gap-3">
    <wd-text v-if="title" class="mx-4 pt-2 text-26rpx" :text="title" />
    <view v-if="slots.description" class="mx-4">
      <slot name="description" />
    </view>
    <wd-card v-if="slots.default" :custom-class="`!px-0 overflow-hidden !mb-0 ${customCardClass}`" :custom-content-class="customCardContentClass">
      <slot />
    </wd-card>
  </view>
</template>
