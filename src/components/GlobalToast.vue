<!--
 * @Author: weisheng
 * @Date: 2024-12-01 14:47:44
 * @LastEditTime: 2025-04-18 16:27:19
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /lsym-cx-mini/src/components/GlobalToast.vue
 * 记得注释
-->
<script lang="ts" setup>
const { toastOptions, currentPage } = storeToRefs(useGlobalToast())

const { close: closeGlobalToast } = useGlobalToast()

const toast = useToast('globalToast')
const currentPath = getCurrentPath()

watch(() => toastOptions.value, (newVal) => {
  if (newVal && newVal.show) {
    if (currentPage.value === currentPath) {
      toast.show(toastOptions.value)
    }
  }
  else {
    toast.close()
  }
})
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-toast selector="globalToast" :closed="closeGlobalToast" />
</template>
