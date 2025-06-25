<script lang="ts" setup>
import { deepClone, isFunction } from 'wot-design-uni/components/common/util'

const { messageOptions, currentPage } = storeToRefs(useGlobalMessage())

const messageBox = useMessage('globalMessage')
const currentPath = getCurrentPath()

watch(() => messageOptions.value, (newVal) => {
  if (newVal) {
    if (currentPage.value === currentPath) {
      const option = deepClone(newVal)
      messageBox.show(option).then((res) => {
        if (isFunction(option.success)) {
          option.success(res)
        }
      }).catch((err) => {
        if (isFunction(option.fail)) {
          option.fail(err)
        }
      })
    }
  }
  else {
    messageBox.close()
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
  <wd-message-box selector="globalMessage" />
</template>
