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
    followSystem: true, // 是否跟随系统主题
    hasUserSet: false, // 用户是否手动设置过主题
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
    /* 手动切换主题 */
    toggleTheme(mode?: 'light' | 'dark') {
      this.theme = mode || (this.theme === 'light' ? 'dark' : 'light')
      this.hasUserSet = true // 标记用户已手动设置
      this.followSystem = false // 不再跟随系统
      this.setNavigationBarColor()
    },

    /* 设置是否跟随系统主题 */
    setFollowSystem(follow: boolean) {
      this.followSystem = follow
      if (follow) {
        this.hasUserSet = false
        this.initTheme() // 重新获取系统主题
      }
    },

    /* 设置导航栏颜色 */
    setNavigationBarColor() {
      uni.setNavigationBarColor({
        frontColor: this.theme === 'light' ? '#000000' : '#ffffff',
        backgroundColor: this.theme === 'light' ? '#ffffff' : '#000000',
      })
    },

    /* 设置主题色 */
    setCurrentThemeColor(color: ThemeColorOption) {
      this.currentThemeColor = color
      this.themeVars.colorTheme = color.primary
    },

    /* 获取系统主题 */
    getSystemTheme(): 'light' | 'dark' {
      try {
        // #ifdef MP-WEIXIN
        // 微信小程序使用 getAppBaseInfo
        const appBaseInfo = uni.getAppBaseInfo()
        if (appBaseInfo && appBaseInfo.theme) {
          return appBaseInfo.theme as 'light' | 'dark'
        }
        // #endif

        // #ifndef MP-WEIXIN
        // 其他平台使用 getSystemInfoSync
        const systemInfo = uni.getSystemInfoSync()
        if (systemInfo && systemInfo.theme) {
          return systemInfo.theme as 'light' | 'dark'
        }
        // #endif
      }
      catch (error) {
        console.warn('获取系统主题失败:', error)
      }
      return 'light' // 默认返回 light
    },

    /* 初始化主题 */
    initTheme() {
      // 如果用户已手动设置且不跟随系统，保持当前主题
      if (this.hasUserSet && !this.followSystem) {
        console.log('使用用户设置的主题:', this.theme)
        this.setNavigationBarColor()
        return
      }

      // 获取系统主题
      const systemTheme = this.getSystemTheme()

      // 如果是首次启动或跟随系统，使用系统主题
      if (!this.hasUserSet || this.followSystem) {
        this.theme = systemTheme
        if (!this.hasUserSet) {
          this.followSystem = true
          console.log('首次启动，使用系统主题:', this.theme)
        }
        else {
          console.log('跟随系统主题:', this.theme)
        }
      }

      this.setNavigationBarColor()
    },
  },
})

export function useTheme() {
  const store = useThemeStore()
  const showThemeColorSheet = ref(false)

  /* 切换暗黑模式 */
  function toggleTheme(mode?: 'light' | 'dark') {
    store.toggleTheme(mode)
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
    store.initTheme()
  }

  onBeforeMount(() => {
    initTheme()
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
    followSystem: computed(() => store.followSystem),
    hasUserSet: computed(() => store.hasUserSet),
    currentThemeColor: computed(() => store.currentThemeColor),
    showThemeColorSheet,
    themeVars: computed(() => store.themeVars),
    themeColorOptions,
    initTheme,
    toggleTheme,
    setFollowSystem: store.setFollowSystem,
    openThemeColorPicker,
    closeThemeColorPicker,
    selectThemeColor,
  }
}
