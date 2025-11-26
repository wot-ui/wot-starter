<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  /** 是否展开状态 */
  expanded?: boolean
  /** 链接 */
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  expanded: true,
})

const emit = defineEmits<{
  'update:expanded': [boolean] // 更新展开状态
  'state-change': [boolean] // 状态变化通知
}>()
const iframe = ref<HTMLIFrameElement | null>(null)
const transitionEnd = ref(true)

// 监听 props.expanded 变化
watch(
  () => props.expanded,
  (newVal) => {
    if (newVal) {
      transitionEnd.value = false
    }
  },
)

// 展开/收起控制
function toggleExpand() {
  // 触发事件通知父组件
  emit('update:expanded', !props.expanded)
  emit('state-change', !props.expanded)
  transitionEnd.value = false
}

function openUrl() {
  window.open(props.url, '_blank')
}

// 过渡结束处理
function onTransitionEnd() {
  transitionEnd.value = true
}
</script>

<template>
  <!-- 主容器：根据展开状态和过渡状态添加对应类名 -->
  <div
    v-if="url" class="demo-model" :class="{
      'collapsed': !expanded,
      'transition-end': transitionEnd,
    }" @transitionend="onTransitionEnd"
  >
    <!-- 头部控制栏 -->
    <div class="demo-header">
      <i class="i-carbon-launch demo-link text-2xl" :style="`${expanded ? '' : 'height:0;width:0;opacity:0'}`" @click="openUrl" />
      <div class="expand-icon" style="cursor: pointer;" @click="toggleExpand">
        <i :class="expanded ? 'i-ep-fold' : 'i-ep-expand'" class="text-2xl" />
      </div>
    </div>
    <!-- iframe 容器 -->
    <div class="iframe-container">
      <iframe v-if="expanded && transitionEnd" id="demo" ref="iframe" class="iframe" scrolling="auto" frameborder="0" :src="url" />
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.demo-model {
  position: fixed;
  z-index: 10;
  right: 32px;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px);
  width: 330px;
  font-size: 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-4);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.iframe-container {
  height: calc(100% - 56px);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.collapsed .iframe-container {
  height: 0;
}

.fade-enter-active,
.fade-leave-active,
.fade-enter,
.fade-leave-to {
  display: none;
}

.dark .demo-model {
  background: #1b1b1b;
}

.iframe {
  height: 100%;
  width: 100%;
}

.demo-header {
  position: relative;
  height: 48px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px 6px 0px 0px;
  box-sizing: border-box;
  background: var(--vp-sidebar-bg-color);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 28px;
  cursor: pointer;
}

.demo-link {
  /* font-size: 28px !important;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none; */
}

.demo-link:hover {
  color: var(--vp-c-brand-1);
}

.demo-qrcode{
  font-size: 28px !important;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: calc(50% - 14px);
  --color: inherit;
  fill: currentColor;
  color: var(--color);
}

.expand-icon {
  position: absolute;
  right: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapsed {
  width: 48px !important;
  height: 48px;
  border-radius: 12px;
}

.collapsed.transition-end .demo-header {
  justify-content: center;
  /* 动画结束后居中对齐 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

@media screen and (min-width: 1440px) {
  .demo-model {
    width: 280px;
    height: calc(320px * 143.6 / 70.9);
    right: 12px;
  }

  .collapsed {
    height: 48px;
  }
}

@media screen and (min-width: 1600px) {
  .demo-model {
    width: 340px;
    height: calc(340px * 143.6 / 70.9);
    right: 24px;
  }

  .collapsed {
    height: 48px;
  }
}

@media (max-width: 1439px) {
  .demo-model {
    display: none;
  }
}
</style>
