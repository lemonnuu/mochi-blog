import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_DEVICE_WIDTH } from '../constants'

/**
 * 判断当前设备是否为移动设备, 根据屏幕宽度是否小于指定宽度判断(1280)
 */
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return PC_DEVICE_WIDTH > width.value
})
