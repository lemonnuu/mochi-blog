<script setup>
import { ref } from 'vue'
import { message } from '../lib/message'
const props = defineProps({
  btnText: {
    type: String,
    default: 'Go',
  },
})
const emit = defineEmits(['click'])

const inputValue = ref('')

const onHandleClick = () => {
  if (!inputValue.value && inputValue.value !== 0) {
    return message('warn', '请输入跳转的页码!', 2000)
  }
  emit('click', inputValue.value)
  inputValue.value = ''
}
</script>

<template>
  <div class="flex justify-center items-center mt-3 md:mt-0 mb-2">
    <span class="font-bold mr-3 inline-block h-8 leading-8">Jump To</span>
    <input
      class="inline-block w-24 text-sm font-bold h-8 leading-8 text-center px-2 rounded bg-white dark:bg-zinc-800 shadow-md dark:shadow dark:shadow-slate-600 border border-solid border-zinc-100 dark:border-zinc-700 mr-3 duration-200"
      type="number"
      @keyup.enter="onHandleClick"
      v-model.trim="inputValue"
    />
    <button
      @click="onHandleClick"
      class="inline-block text-sm font-bold h-8 leading-8 text-center px-2 rounded bg-white dark:bg-zinc-800 shadow-md dark:shadow dark:shadow-slate-600 border border-solid border-zinc-100 dark:border-zinc-700 duration-200"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
