import { colorColumns, initThemState, initThemeVars } from './rootTheme'
/* 暗黑模式切换 */
const theme = ref<'light' | 'dark'>(initThemState)
/* 组件库的主题色 */
const themeVars = ref({ ...initThemeVars })

export function useTheme() {
  /* 切换暗黑模式 */
  function toggleTheme(mode?: 'light' | 'dark') {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
    setNavigationBarColor()
  }
  /* 初始化theme */
  function initTheme() {
    setNavigationBarColor()
  }

  function setNavigationBarColor() {
    uni.setNavigationBarColor({
      frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
      backgroundColor: theme.value === 'light' ? '#ffffff' : '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn',
      },
    })
  }
  return {
    theme,
    themeVars,
    initTheme,
    colorColumns,
    toggleTheme,
  }
}
