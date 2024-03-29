import DefaultTheme from 'vitepress/theme'
import MochiLayout from './components/MochiLayout.vue'
import './css/index.css'
import './assets/fonts/source-code-pro/source-code-pro.css'
import './assets/fonts/source-code-pro/source-code-variable.css'
import './css/custom.css'
import './css/tailwind.css'
import 'viewerjs/dist/viewer.css'
// v-viewer 不支持 SSR, 所以改了一份放在 utils 下面
import VueViewer from './utils/v-viewer-ssr'
import F from './components/markdown/F.vue'
import Un from './components/markdown/Un.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    ctx.app.use(VueViewer)
    ctx.app.component('F', F)
    ctx.app.component('Un', Un)
    DefaultTheme.enhanceApp(ctx)
  },
  Layout: MochiLayout,
}
