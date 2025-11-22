<script setup lang="ts">
defineOptions({ name: 'CodeContent', inheritAttrs: true })

const props = withDefaults(defineProps<Props>(), { showIcon: true })
interface Props {
  /** 是否显示图标 */
  showIcon: boolean
  /** 代码内容 */
  code?: string
  /** 代码备注 */
  codeRemark?: string
  /** 自定义样式 */
  customClass?: string
  /** 自定义代码样式 */
  customCodeClass?: string
}

// interface Slots {
//   /** 代码内容 */
//   default: () => VNode[]
//   /** 代码备注 */
//   pre: () => VNode[]
// }
// const slots = defineSlots<Slots>()

const { success, warning } = useGlobalToast()

// 复制代码到剪贴板
function copy() {
  // const defaultSlots = slots.default?.() || []
  // const preSlots = slots.pre?.() || []
  // const data = preSlots.length ? preSlots.map(slot => slot.children).join('') : defaultSlots.map(slot => slot.children).join('')
  const data = props.codeRemark || props.code
  if (!data) {
    warning({ msg: '没有找到代码内容' })
    return
  }
  uni.setClipboardData({
    data,
    showToast: false,
    success: () => {
      uni.hideToast()
      success({ msg: '代码已复制到剪贴板' })
    },
  })
}
</script>

<template>
  <view
    class="border border-gray-200 rounded-2 bg-gray-100 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]"
    :class="customClass"
    @click="copy"
  >
    <view class="flex items-center justify-between">
      <text class="text-3 text-gray-700 dark:text-[var(--wot-dark-color)]" :class="[{ 'font-bold': Boolean(codeRemark?.trim()) }, customCodeClass]">
        {{ code }}
      </text>
      <wd-icon v-if="showIcon" name="file-copy" size="16px" color="#666" />
    </view>
    <view v-if="codeRemark?.trim()" class="mt-2 max-h-60 overflow-y-auto">
      <pre class="whitespace-pre-wrap text-2.5 text-gray-600 leading-relaxed font-mono dark:text-[var(--wot-dark-color2)]">{{ codeRemark?.trim() }}</pre>
    </view>
  </view>
</template>
