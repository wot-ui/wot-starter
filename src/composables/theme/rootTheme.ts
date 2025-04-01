import type { ConfigProviderThemeVars } from 'wot-design-uni'
/* 默认的主题list */
export const colorColumns = [
  {
    value: '#0055FE',
    label: '蓝色',
  },
  {
    value: '#CD5C5C',
    label: '红色',
  },
  {
    value: '#228B22',
    label: '绿色',
  },
]
/* 默认的主题 */
export const initThemState = 'light'
/* 默认的主题 */
export const initThemeVars: ConfigProviderThemeVars = {
  colorTheme: colorColumns[0].value,
}
