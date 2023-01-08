<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  // 页数
  pagesNumber: {
    type: Number,
    required: true,
  },
  // 当前页码
  currentPage: {
    type: Number,
    required: true,
  },
  // 最大页码按钮数
  pagerCount: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(['click'])

const prev = {
  text: 'Prev',
  value: 'Prev',
}
const next = {
  text: 'Next',
  value: 'Next',
}
const leftDot = {
  text: '...',
  value: 'leftDot',
}
const rightDot = {
  text: '...',
  value: 'rightDot',
}
const pagesList = ref([])

watch(
  () => props.currentPage,
  () => {
    pagesList.value = []
    if (props.currentPage !== 1) pagesList.value.push(prev)
    if (props.pagesNumber <= props.pagerCount) {
      for (let i = 1; i <= props.pagesNumber; i++) {
        pagesList.value.push({ text: i, value: i })
      }
    } else {
      // 头 和 末尾 肯定是有的
      pagesList.value.push({ text: 1, value: 1 })
      const leftCount = Math.floor((props.pagerCount - 3) / 2)
      const rightCount = props.pagerCount - 3 - leftCount
      const leftDotIndex = leftCount + 3
      const rightDotIndex = props.pagesNumber - 2 - rightCount
      // [leftDotIndex, rightDotIndex] 区间出现...
      // 没有左边 ...
      if (props.currentPage < leftDotIndex) {
        for (let i = 2; i <= props.pagerCount - 1; i++) {
          pagesList.value.push({ text: i, value: i })
        }
        pagesList.value.push(rightDot) // push 右边...
        pagesList.value.push({ text: props.pagesNumber, value: props.pagesNumber })
      } else if (props.currentPage > rightDotIndex) {
        pagesList.value.push(leftDot)
        for (let i = props.pagesNumber - props.pagerCount + 2; i <= props.pagesNumber; i++) {
          pagesList.value.push({ text: i, value: i })
        }
      } else {
        pagesList.value.push(leftDot)
        for (let i = props.currentPage - leftCount; i <= props.currentPage + rightCount; i++) {
          pagesList.value.push({ text: i, value: i })
        }
        pagesList.value.push(rightDot)
        pagesList.value.push({ text: props.pagesNumber, value: props.pagesNumber })
      }
    }
    if (props.currentPage !== props.pagesNumber) pagesList.value.push(next)
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li
      v-for="item in pagesList"
      :key="item.value"
      @click="emit('click', item.value)"
      class="inline-block text-sm font-bold h-8 leading-8 text-center px-2 rounded bg-white dark:bg-zinc-900 shadow-md dark:shadow-sm dark:shadow-slate-700 border border-zinc-100 dark:border-zinc-800 mr-3 duration-200 mb-2 cursor-pointer"
      :class="[currentPage === item.value ? 'bg-green-500 shadow-green-200 dark:bg-emerald-700' : '']"
    >
      {{ item.text }}
    </li>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.list-move .list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
