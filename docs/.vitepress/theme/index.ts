/*
 * @Author: weisheng
 * @Date: 2024-10-12 22:09:33
 * @LastEditTime: 2025-12-11 19:07:41
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-starter/docs/.vitepress/theme/index.ts
 * 记得注释
 */
import ElementPlus, { ElMessageBox } from 'element-plus'
import Theme from 'vitepress/theme'
import { h } from 'vue'
import Banner from './components/Banner.vue'
// import HomeStar from './components/HomeStar.vue'
// 导入组件
import SvgImage from './components/SvgImage.vue'
import VPIframe from './components/VPIframe.vue'
import WwAds from './components/WwAds.vue'
import 'uno.css'
import './styles/vars.css'
import './styles/custom.css'
import './styles/scrollbar.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 在首页 hero 部分信息后添加 star 徽章
      // 'home-hero-info-after': () => h(HomeStar),
      'layout-top': () => h(Banner),
      'aside-outline-after': () => h(WwAds),
    })
  },
  enhanceApp({ app }: { app: any }) {
    // 注册全局组件
    app.component('SvgImage', SvgImage)
    app.component('VPIframe', VPIframe)
    app.use(ElementPlus)

    if (typeof window !== 'undefined') {
      // Gitee 2025 投票弹窗
      const showVotingNotification = () => {
        const key = 'gitee-vote-2025'
        if (localStorage.getItem(key))
          return

        ElMessageBox.confirm(
          '朋友们，我正在参加 Gitee 2025 最受欢迎的开源软件投票活动，马上跌出前 3 了😂，不得已加了这个弹框，快来给我投票吧！ <a href="https://gitee.com/activity/2025opensource?ident=IEVXGS" target="_blank" style="color: var(--vp-c-brand);">https://gitee.com/activity/2025opensource?ident=IEVXGS</a>',
          '我们急需你的投票',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            customClass: 'gitee-vote-message-box',
            confirmButtonText: '去投票',
            cancelButtonText: '已投票',
          },
        ).then(() => {
          localStorage.setItem(key, 'true')
          window.open('https://gitee.com/activity/2025opensource?ident=IEVXGS', '_blank')
        }).catch(() => {
          localStorage.setItem(key, 'true')
          window.open('https://gitee.com/activity/2025opensource?ident=IEVXGS', '_blank')
        })
      }

      // 页面加载完成后显示
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showVotingNotification)
      }
      else {
        showVotingNotification()
      }
    }
  },
}
