import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // 快捷方式（移除响应式相关的快捷方式）
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['btn-primary', 'bg-blue-500 hover:bg-blue-600 text-white'],
    ['btn-secondary', 'bg-gray-500 hover:bg-gray-600 text-white'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['card', 'bg-white rounded-lg shadow-md p-6 border border-gray-200'],
    ['card-dark', 'bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700'],
    ['grid-simple', 'grid grid-cols-3 gap-6'],
    ['feature-card', 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'],
    ['custom-container', 'max-w-screen-xl mx-auto px-4'],
    ['custom-container-sm', 'max-w-screen-md mx-auto px-4'],
  ],
  presets: [
    presetUno({
      // 禁用响应式断点
      dark: 'media', // 保留暗色模式
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  // 排除响应式相关的规则
  blocklist: [
    // 屏蔽响应式断点相关的类
    /^(sm|md|lg|xl|2xl):/,
    // 屏蔽网格布局相关的类
    /^col-span-/,
    /^col-start-/,
    /^col-end-/,
    // 屏蔽 flexbox 响应式类
    /^(sm|md|lg|xl|2xl):flex/,
    /^(sm|md|lg|xl|2xl):grid/,
    // 屏蔽响应式间距类
    /^(sm|md|lg|xl|2xl):(m|p)[xytrbl]?-/,
    // 屏蔽响应式宽高类
    /^(sm|md|lg|xl|2xl):(w|h)-/,
    // 屏蔽容器类，避免与 VitePress 冲突
    'container',
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
    },
  },
})
