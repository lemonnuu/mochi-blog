<script setup>
import { blogList as timelineList } from '../utils/dealwithBlog'
import TimeComponent from './TimeComponent.vue'

const initTimeLineList = () => {
  if (timelineList[0]) {
    const date_0 = new Date(timelineList[0].timestamp)
    timelineList[0].year = date_0.getFullYear()
    timelineList[0].time = `${date_0.getMonth() + 1}/${date_0.getDate()}`
  }
  timelineList.reduce((prev, current) => {
    const lastDate = new Date(prev.timestamp)
    const currentDate = new Date(current.timestamp)
    if (lastDate.getFullYear() !== currentDate.getFullYear()) {
      current.year = currentDate.getFullYear()
    }
    current.time = `${currentDate.getMonth() + 1}/${currentDate.getDate()}`
    return current
  })
}
initTimeLineList()
</script>

<template>
  <div class="flex flex-col mx-[14%] md:mx-[20%] mt-8">
    <!-- 头部 -->
    <div class="w-full h-16 relative border-l-4 border-red-200 dark:border-red-400">
      <div class="flex items-center relative left-[-8px] top-[-0.75rem]">
        <div
          class="w-3 h-3 rounded-full mr-4 bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600"
        ></div>
        <span>Timeline</span>
      </div>
    </div>
    <!-- 遍历博客 -->
    <TimeComponent v-for="item in timelineList" :key="item.link" :data="item"></TimeComponent>
  </div>
</template>

<style scoped lang="scss"></style>
