<script lang="ts" setup>
const { loadingOptions, currentPage } = storeToRefs(useGlobalLoading())

const { close: closeGlobalLoading } = useGlobalLoading()

const loading = useToast('globalLoading')
const currentPath = getCurrentPath()

watch(() => loadingOptions.value, (newVal) => {
  if (newVal && newVal.show) {
    if (currentPage.value === currentPath) {
      loading.loading(loadingOptions.value)
    }
  }
  else {
    loading.close()
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
  <wd-toast selector="globalLoading" :closed="closeGlobalLoading" />
</template>
