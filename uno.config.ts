import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetUni } from '@uni-helper/unocss-preset-uni'

export default defineConfig({
  presets: [
    presetUni({
      attributify: {
        prefixedOnly: true,
      },
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // HBuilderX 必须针对要使用的 Collections 做异步导入
      // collections: {
      //   carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      // },
    }),
  ],
  variants: [
    // 匹配dark，替换为wot-theme-dark
    (matcher) => {
      if (matcher.startsWith('dark')) {
        console.log(matcher, '23')
        return {
          matcher: matcher.slice(5), // 移除 'dark:' 前缀
          selector: (s) => {
            console.log(s, '23')
            return `.wot-theme-dark ${s}`
          },
        }
      }
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
