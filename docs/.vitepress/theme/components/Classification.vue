<script setup>
import BlogCard from './BlogCard.vue'
import { useRouter, withBase } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  classificationMap: {
    type: Object,
    default() {
      return {}
    },
  },
  targetUrl: {
    type: String,
    default: '/',
  },
})

const { site } = useData()

const router = useRouter()

const classifications = computed(() => Object.keys(props.classificationMap))

// 当前选中的 category
const currentClassification = ref('')
watch(classifications, (val) => (currentClassification.value = val[0] ? val[0] : ''), { immediate: true })

// 根据选中的 category 渲染列表
const classificationList = computed(() => {
  return props.classificationMap[currentClassification.value]
    ? props.classificationMap[currentClassification.value]
    : []
})

const changeCurrentFromUrl = () => {
  const url = new URL(location.href)
  if (url.searchParams.has('origin')) {
    currentClassification.value = url.searchParams.get('origin')
  }
}

const popstateChange = () => {
  const url = new URL(location.href)
  if (url.searchParams.has('origin')) {
    currentClassification.value = url.searchParams.get('origin')
  } else {
    currentClassification.value = classifications.value[0] ? classifications.value[0] : ''
  }
}

onMounted(() => {
  changeCurrentFromUrl()
  // 监听浏览器前进后退按钮事件
  useEventListener(window, 'popstate', () => {
    popstateChange()
  })
})

const onHandleClickCategoryItem = (target) => {
  currentClassification.value = target
  history.pushState(null, null, withBase(`${props.targetUrl}?origin=${target}`))
}

const toJumpLink = (target) => {
  router.go(withBase(target))
}
</script>

<template>
  <div v-if="classifications.length" class="px-[5%] md:px-[20%]">
    <ul class="mt-4 mb-2 flex flex-wrap items-center justify-center">
      <li
        @click="onHandleClickCategoryItem(item)"
        v-for="item in classifications"
        :key="item"
        :class="[currentClassification === item ? 'bg-red-200 dark:bg-red-400' : '']"
        class="mr-3 mb-3 bg-white border border-zinc-200 shadow shadow-zinc-200 rounded-md cursor-pointer text-sm md:text-base font-semibold px-2 py-1 hover:scale-110 duration-200 hover:shadow-md dark:bg-zinc-800 dark:shadow-slate-700 dark:border-zinc-700"
      >
        {{ item }}
      </li>
    </ul>
    <BlogCard
      v-for="item in classificationList"
      :key="item.link"
      :data="item"
      @click="toJumpLink(item.link)"
    ></BlogCard>
  </div>
  <div v-else class="NotFound">
    <p class="code">sorry</p>
    <h1 class="title">CATEGORY LIST IS EMPTY</h1>
    <div class="divider" />
    <blockquote class="quote">You can add classifications to list by adding classifications frontmatter.</blockquote>

    <div class="action">
      <a class="link" :href="site.base" aria-label="go to home"> Take me home </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: border-color 0.25s, color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-dark);
  color: var(--vp-c-brand-dark);
}
</style>
