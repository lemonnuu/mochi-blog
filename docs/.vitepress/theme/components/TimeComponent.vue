<script setup>
import { useRouter, withBase } from 'vitepress'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const toLink = () => {
  router.go(withBase(props.data.link))
}
</script>

<template>
  <div v-if="data.year" class="w-full h-16 relative border-l-4 border-red-200 dark:border-red-400 flex items-center">
    <div class="flex items-center relative left-[-10px] w-full">
      <div class="w-4 h-4 rounded-full bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600"></div>
      <div class="flex-1 ml-4">
        <p class="text-xl font-bold">{{ data.year }}</p>
      </div>
    </div>
  </div>
  <div class="w-full h-16 relative border-l-4 border-red-200 dark:border-red-400 flex items-center">
    <div class="flex items-center relative left-[-8px] w-full">
      <div class="w-3 h-3 bg-white rounded-full border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600"></div>
      <div class="flex-1 ml-4">
        <p
          @click="toLink"
          class="text-zinc-400 flex items-center border-b-2 border-zinc-200 dark:border-zinc-500 border-dotted h-[3rem] cursor-pointer hover:text-red-400"
        >
          <span class="mr-4 text-sm">{{ data.time }}</span>
          <span class="text-base">{{ data.title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
