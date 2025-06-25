import type { ConfigProviderThemeVars } from 'wot-design-uni'

// 定义主题色选项
export interface ThemeColorOption {
  name: string
  value: string
  primary: string
}

// 预定义的主题色选项
export const themeColorOptions: ThemeColorOption[] = [
  { name: '默认蓝', value: 'blue', primary: '#4D7FFF' },
  { name: '活力橙', value: 'orange', primary: '#FF7D00' },
  { name: '薄荷绿', value: 'green', primary: '#07C160' },
  { name: '樱花粉', value: 'pink', primary: '#FF69B4' },
  { name: '紫罗兰', value: 'purple', primary: '#8A2BE2' },
  { name: '朱砂红', value: 'red', primary: '#FF4757' },
]

// 主题状态store
const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light' as 'light' | 'dark',
    currentThemeColor: themeColorOptions[0] as ThemeColorOption,
    showThemeColorSheet: false,
    themeVars: {
      darkBackground: '#0f0f0f',
      darkBackground2: '#1a1a1a',
      darkBackground3: '#242424',
      darkBackground4: '#2f2f2f',
      darkBackground5: '#3d3d3d',
      darkBackground6: '#4a4a4a',
      darkBackground7: '#606060',
      darkColor: '#ffffff',
      darkColor2: '#e0e0e0',
      darkColor3: '#a0a0a0',
      colorTheme: themeColorOptions[0].primary,
    } as ConfigProviderThemeVars,
  }),
  getters: {
    isDark: state => state.theme === 'dark',
  },
  actions: {
    toggleTheme(mode?: 'light' | 'dark') {
      this.theme = mode || (this.theme === 'light' ? 'dark' : 'light')
      this.setNavigationBarColor()
    },
    setNavigationBarColor() {
      uni.setNavigationBarColor({
        frontColor: this.theme === 'light' ? '#000000' : '#ffffff',
        backgroundColor: this.theme === 'light' ? '#ffffff' : '#000000',
      })
    },
    setCurrentThemeColor(color: ThemeColorOption) {
      this.currentThemeColor = color
      this.themeVars.colorTheme = color.primary
    },
  },
})

export function useTheme() {
  const store = useThemeStore()
  const showThemeColorSheet = ref(false)

  /* 切换暗黑模式 */
  function toggleTheme(mode?: 'light' | 'dark') {
    store.theme = mode || (store.theme === 'light' ? 'dark' : 'light')
    store.setNavigationBarColor()
  }

  /* 打开主题色选择 */
  function openThemeColorPicker() {
    showThemeColorSheet.value = true
  }

  /* 关闭主题色选择 */
  function closeThemeColorPicker() {
    showThemeColorSheet.value = false
  }

  /* 选择主题色 */
  function selectThemeColor(option: ThemeColorOption) {
    store.setCurrentThemeColor(option)
    closeThemeColorPicker()
  }

  /* 初始化theme */
  function initTheme() {
    store.setNavigationBarColor()
  }

  onBeforeMount(() => {
    store.setNavigationBarColor()
  })

  uni.onThemeChange((res) => {
    toggleTheme(res.theme)
  })

  onUnmounted(() => {
    uni.offThemeChange((res) => {
      toggleTheme(res.theme)
    })
  })

  return {
    theme: computed(() => store.theme),
    currentThemeColor: computed(() => store.currentThemeColor),
    showThemeColorSheet,
    themeVars: computed(() => store.themeVars),
    themeColorOptions,
    initTheme,
    toggleTheme,
    openThemeColorPicker,
    closeThemeColorPicker,
    selectThemeColor,
  }
}
