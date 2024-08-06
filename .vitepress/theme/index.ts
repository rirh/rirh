import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import { siteIds, registerAnalytics, trackPageview } from './plugins/analytics'
// import { isInvalidRoute, redirect } from './plugins/redirect'
import GitalkComment from './components/GittalkComment.vue'
import './styles/custom.css'
import type { Theme } from 'vitepress'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('GitalkComment', GitalkComment)
  },
}

export default theme
