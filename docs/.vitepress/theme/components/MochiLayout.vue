<script setup>
import HomeView from './HomeView.vue'
import DefaultTheme from 'vitepress/theme'
import { ref, watch, computed, nextTick, onMounted } from 'vue'
import { useData } from 'vitepress' // vitepress 暴露的 API
import TimeLine from './TimeLine.vue'
import Classification from './Classification.vue'
import LayoutContainer from './LayoutContainer.vue'
import { categoriesMap, tagsMap } from '../utils/dealwithBlog'
import PlumBossom from './PlumBossom.vue'
import { useWindowSize } from '@vueuse/core'
import GoTop from './GoTop.vue'
import { filterImgClass } from '../constants'

const data = useData()

const { Layout } = DefaultTheme

// 是否处于暗黑模式
const isDark = computed(() => data.isDark.value)

// outline 眼睛图标背景色
const eyeBeforeBgColor = computed(() => (isDark.value ? '#ffffff' : '#242424'))

// outline 眼睛图标字体色
const eyeBeforeColor = computed(() => (isDark.value ? '#242424' : '#ffffff'))

// outline 是否显示状态, 根据这个值来判断要不要渲染眼睛, 只有为 true 时, 才需要渲染
const outlineShowState = computed(() => data.page.value.headers.length > 0)

// 记录 outline 当前初始状态, 默认为 true
const recordOutlineShowState = ref(true)

// 切换 outline 的显示状态
const toggleOutlineShow = () => {
  const outlineEle = document.querySelector('.VPDocAsideOutline')
  const display = recordOutlineShowState.value ? 'none' : 'block'
  outlineEle.style.display = display
  recordOutlineShowState.value = !recordOutlineShowState.value
}

// 监听 outline 是否显示, 以便更改 outline 的行内样式
watch(outlineShowState, (val) => {
  nextTick(() => {
    const outlineEle = document.querySelector('.VPDocAsideOutline')
    if (!outlineEle) return
    if (!val) return (outlineEle.style.display = 'none')
    const display = recordOutlineShowState.value ? 'block' : 'none'
    outlineEle.style.display = display
  })
})

// 记录 menu 当前初始状态, 默认为 true
const recordMenuShowState = ref(true)

// 监听 layout 变化改变 recordMenuShowState, 修复 doc -> home -> doc 时, recordMenuShowState 不准的问题
watch(
  () => data.frontmatter.value.layout,
  () => {
    recordMenuShowState.value = true
  }
)

// 切换 menu 的显示状态
const toggleMenuShow = () => {
  const sidebarEle = document.querySelector('.VPSidebar')
  const display = recordMenuShowState.value ? 'none' : 'block'
  sidebarEle.style.display = display
  recordMenuShowState.value = !recordMenuShowState.value
}

// 只有 layout 为 docs 或 undefined 时才显示菜单控制
const isShowMenuControl = computed(() => {
  const layout = data.page.value.frontmatter.layout
  if (typeof layout === 'undefined' || layout === 'docs') return true
  return false
})

const hasVPSidebar = ref(true)
const judgeHasVPSidebar = () => {
  if (!document.querySelector('.VPSidebar')) hasVPSidebar.value = false
}

watch(
  () => data.page.value.relativePath,
  () => {
    nextTick(() => {
      hasVPSidebar.value = document.querySelector('.VPSidebar') ? true : false
    })
  }
)

onMounted(() => {
  import('../assets/icons/symbol')
  judgeHasVPSidebar()
})

// 是否显示博客主页, 当 layout 为 home 且没有 origin frontmatter 时渲染博客主页
const isShowBlogHome = computed(() => data.frontmatter.value.layout === 'home' && !data.frontmatter.value.origin)
// 是否自定义 Page
const isCustomizePage = computed(() => data.frontmatter.value.page)
// 是否显示时间线
const isShowTimeLine = computed(() => data.frontmatter.value.page === 'timeline')

// 如果展示 分类 和 tag, 跳转的 url
const classificationTargetUrl = computed(() => {
  switch (data.frontmatter.value.page) {
    case 'category':
      return '/category'
    case 'tag':
      return '/tag'
    default:
      return false
  }
})

const classificationMap = computed(() => {
  switch (data.frontmatter.value.page) {
    case 'category':
      return categoriesMap
    case 'tag':
      return tagsMap
    default:
      return {}
  }
})

const { width: windowWidth, height: windowHeight } = useWindowSize()

// v-viewer 过滤掉 logo 等图片, 方法依据有无指定类名
const vViewerFilterImg = (img) => {
  for (const item of filterImgClass) {
    if (img.className.includes(item)) return false
  }
  img.style.cursor = 'zoom-in'
  img.classList.add('rounded', 'md:rounded-md')
  return true
}
// v-viewer 的标题展示 alt 属性
const vViewerTitle = (img) => img.alt
</script>

<template>
  <!-- 控制菜单的显示与隐藏 -->
  <div v-if="isShowMenuControl && hasVPSidebar" class="sidebar-nav-toggle" @click="toggleMenuShow">
    <svg class="icon-font icon-arrow" aria-hidden="true">
      <use :xlink:href="recordMenuShowState ? '#icon-left-arrow' : '#icon-right-arrow'"></use>
    </svg>
  </div>

  <!-- 添加 v-viewer 放大图片 -->
  <Layout v-viewer="{ title: vViewerTitle, filter: vViewerFilterImg }">
    <!-- 博客主页 -->
    <template #home-hero-before>
      <home-view v-if="isShowBlogHome"></home-view>
    </template>

    <!-- 自定义 page, timeline、categories、tags -->
    <template v-if="isCustomizePage" #layout-top>
      <LayoutContainer>
        <TimeLine v-if="isShowTimeLine"></TimeLine>
        <Classification
          v-if="classificationTargetUrl"
          :target-url="classificationTargetUrl"
          :classification-map="classificationMap"
        ></Classification>
      </LayoutContainer>
    </template>

    <!-- 梅花特效与悬挂喵 -->
    <template #layout-bottom>
      <div class="fixed top-0 left-0 z-[-1] opacity-10">
        <PlumBossom
          :width="windowWidth"
          :height="windowHeight"
          :line-length="3"
          around
          :generator-random="0.494"
        ></PlumBossom>
      </div>
      <GoTop></GoTop>
    </template>

    <!-- 大纲显示隐藏 -->
    <template #aside-top v-if="outlineShowState">
      <div class="aside-top" @click="toggleOutlineShow" :class="[recordOutlineShowState ? 'show-eyes' : 'hidden-eyes']">
        <svg class="icon-font icon-eye" aria-hidden="true">
          <use :xlink:href="recordOutlineShowState ? '#icon-close-eyes' : '#icon-open-eyes'"></use>
        </svg>
      </div>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
@media (min-width: 960px) {
  .sidebar-nav-toggle {
    visibility: visible !important;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
}
.sidebar-nav-toggle {
  transition: opacity 0.5s;
  visibility: hidden;
  position: fixed;
  cursor: pointer;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  background-color: var(--vp-c-bg-alt);
  .icon-arrow {
    font-size: 28px;
    fill: var(--vp-c-text-1);
  }
}

.aside-top {
  position: absolute;
  left: 52px;
  cursor: pointer;
  z-index: 2;

  &:hover::before {
    display: block;
    width: 64px;
    top: -32px;
    left: -18px;
    font-size: 12px;
    text-align: center;
    background-color: v-bind(eyeBeforeBgColor);
    color: v-bind(eyeBeforeColor);
    padding: 4px;
    border-radius: 6px;
    position: absolute;
  }

  &.show-eyes:hover::before {
    content: '隐藏大纲';
  }

  &.hidden-eyes:hover::before {
    content: '显示大纲';
  }

  .icon-eye {
    font-size: 28px;
    fill: var(--vp-c-text-1);
  }
}
</style>
