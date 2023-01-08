<script setup>
import { withBase } from 'vitepress'
import { onMounted, ref, computed } from 'vue'
import { randomRGB } from '../utils/color'
import { isMobileTerminal } from '../utils/flexible'

const props = defineProps({
  articleCount: {
    type: Number,
    default: 0,
  },
  frontmatter: {
    type: Object,
  },
  categoryList: {
    type: Array,
  },
  tagsList: {
    type: Array,
  },
})

const emit = defineEmits(['clickCategories', 'clickTags'])

const avatarImg = computed(() =>
  props.frontmatter.avatar.startsWith('http') ? props.frontmatter.avatar : withBase(props.frontmatter.avatar)
)

const gradientBackground = () => `-webkit-linear-gradient(90deg, ${randomRGB()}, ${randomRGB()})`

// PC 时计算信息栏目各块高度
const computedPCStickyHeight = () => {
  const eleArr = document.querySelectorAll('.computed-pc-sticky-height')
  let height = 0
  for (const item of eleArr) {
    height += item.getBoundingClientRect().height
  }
  return height + 60
}
const pcStickyHeight = ref(720)
onMounted(() => {
  pcStickyHeight.value = computedPCStickyHeight()
})
</script>

<template>
  <div
    :style="[isMobileTerminal ? '' : { height: pcStickyHeight + 'px' }]"
    class="bg-white w-full pb-7 border border-zinc-100 rounded-md shadow md:w-[40%] md:ml-8 md:sticky md:pb-0 md:top-[72px] hover:shadow-lg px-3 text-sm dark:bg-zinc-800 dark:shadow-slate-600 dark:border-zinc-700 dark:shadow"
  >
    <!-- 头像 -->
    <div class="computed-pc-sticky-height flex flex-col items-center justify-center">
      <img
        :src="avatarImg"
        class="filter-img rounded-full w-[128px] h-[128px] mt-10 hover:rotate-360 hover:scale-110 duration-700"
        alt=""
      />
      <span class="mt-3 font-bold text-lg">{{ frontmatter.name }}</span>
      <div class="flex w-full justify-center items-center mt-1">
        <p class="w-[30%] flex flex-col items-center justify-center">
          <span class="text-xl font-medium">{{ articleCount }}</span>
          <span class="text-xs font-medium">Articles</span>
        </p>
        <p class="h-[2.75rem] border-r border-zinc-600 mx-4"></p>
        <p class="w-[30%] flex flex-col items-center justify-center">
          <span class="text-xl font-medium">{{ tagsList.length }}</span>
          <span class="text-xs font-medium">Tags</span>
        </p>
      </div>
      <ul class="flex items-center justify-center mt-4 mb-1">
        <li v-for="item in frontmatter.links" :key="item.icon" class="mx-2 cursor-pointer hover:scale-125 duration-150">
          <a :href="item.link" target="_blank">
            <svg class="icon-font text-2xl" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`" :style="{ fill: randomRGB() }"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <!-- 分类 -->
    <div v-if="categoryList.length" class="computed-pc-sticky-height mt-2 bottom-line">
      <div class="flex items-center mb-4">
        <svg class="icon-font mr-1" aria-hidden="true">
          <use xlink:href="#icon-category" class="fill-zinc-500"></use>
        </svg>
        <span class="font-bold">Categories</span>
      </div>

      <ul>
        <li
          v-for="item in categoryList"
          :key="item.categoryName"
          @click="emit('clickCategories', item)"
          class="category flex items-center justify-between p-3 bg-white border border-zinc-100 rounded-lg shadow mb-2 font-medium dark:bg-zinc-900/30 dark:shadow-slate-700 dark:border-zinc-800 hover:scale-105 cursor-pointer duration-150"
        >
          <span>{{ item.categoryName }}</span>
          <div
            class="py-1 px-2 rounded text-white"
            :style="{
              backgroundColor: randomRGB(),
            }"
          >
            {{ item.categoryCount }}
          </div>
        </li>
      </ul>
    </div>
    <!-- 标签 -->
    <div v-if="tagsList.length" class="computed-pc-sticky-height mt-2">
      <div class="flex items-center mb-4">
        <svg class="icon-font mr-1" aria-hidden="true">
          <use xlink:href="#icon-tag" class="fill-zinc-500"></use>
        </svg>
        <span class="font-bold">Tags</span>
      </div>
      <ul class="flex flex-wrap items-center justify-center">
        <li
          v-for="item in tagsList"
          :key="item.tagName"
          @click="emit('clickTags', item)"
          class="py-1 px-2 rounded text-white mr-2 mb-2 text-xs font-normal cursor-pointer hover:scale-110 duration-150"
          :style="{
            backgroundColor: randomRGB(),
          }"
        >
          {{ item.tagName }}
        </li>
      </ul>
    </div>
    <!-- 友链 -->
  </div>
</template>

<style scoped lang="scss">
.bottom-line {
  &::after {
    content: '';
    display: block;
    display: flex;
    width: 100%;
    border-bottom: 1px solid var(--vp-c-divider-light);
    margin-top: 1.5rem;
  }
}
.category {
  &:hover {
    background: v-bind(gradientBackground());
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>
