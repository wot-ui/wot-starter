/*
 * @Author: weisheng
 * @Date: 2024-10-29 22:12:54
 * @LastEditTime: 2025-01-13 16:45:28
 * @LastEditors: 810505339
 * @Description:
 * @FilePath: \wot-demo\src\composables\useTabbar.ts
 * 记得注释
 */
export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
  title: string
  icon: string
}

const tabbarItems = ref<TabbarItem[]>([
  { name: 'home', value: null, active: true, title: 'home', icon: 'home' },
  { name: 'hi', value: null, active: false, title: 'hi', icon: 'app' },
  { name: 'setting', value: null, active: false, title: 'setting', icon: 'setting' },
])

export function useTabbar() {
  const tabbarList = computed(() => tabbarItems.value)

  const activeTabbar = computed(() => {
    const item = tabbarItems.value.find(item => item.active)
    return item || tabbarItems.value[0]
  })

  const getTabbarItemValue = (name: string) => {
    const item = tabbarItems.value.find(item => item.name === name)
    return item && item.value ? item.value : null
  }

  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name)
    if (tabbarItem) {
      tabbarItem.value = value
    }
  }

  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true
      }
      else {
        item.active = false
      }
    })
  }

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
  }
}
