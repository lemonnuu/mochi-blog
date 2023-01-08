<script>
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  /**
   * message 的消息类型
   */
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
      }
      return result
    },
  },
  // 描述文本
  content: {
    type: String,
    required: true,
  },
  // 展示时长
  duration: {
    type: Number,
  },
  destory: {
    type: Function,
  },
})

/**
 * 样式表数据
 */
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass: 'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100',
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass: 'bg-error-100 border-error-300 hover:shadow-lg hover:shadow-error-100',
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass: 'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100',
  },
}

// 控制展示
const isVisable = ref(false)

// 关闭动画执行时长
const animDuration = '0.5s'

/**
 * 为了保证动画展示, 需要在 mounted 之后进行展示
 */
onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
    setTimeout(() => {
      props.destory && props.destory()
    }, parseInt(animDuration.replace('0.', '').replace('s', '') * 100))
  }, props.duration)
})
</script>

<template>
  <Transition name="down">
    <div
      v-show="isVisable"
      class="min-w-[80%] md:min-w-[420px] fixed top-[8%] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-md border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <svg class="icon-font text-sm mr-4" aria-hidden="true">
        <use :xlink:href="`#icon-${styles[type].icon}`" :class="styles[type].fillClass"></use>
      </svg>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
