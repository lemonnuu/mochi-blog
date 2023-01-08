<script setup>
import { onMounted, ref, computed, watch } from 'vue'

const props = defineProps({
  // canvas 线条颜色
  color: {
    type: String,
    default: '#000',
  },
  // canvas 宽度
  width: {
    type: Number,
    default: 400,
  },
  // canvas 高度
  height: {
    type: Number,
    default: 400,
  },
  // 线条渲染的长度
  lineLength: {
    type: Number,
    default: 12,
  },
  startOrigin: {
    type: Object,
  },
  thetaOrigin: {
    type: Number,
    default: -Math.PI / 2,
  },
  // 左侧线条最少渲染深度
  leftDepth: {
    type: Number,
    default: 4,
  },
  // 左侧线条最少渲染深度
  rightDepth: {
    type: Number,
    default: 4,
  },
  generatorRandom: {
    type: Number,
    default: 0.5,
  },
  // 四周渲染
  around: {
    type: Boolean,
    default: false,
  },
})

let timer = null

watch(props, () => {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    timer = null
    init()
  }, 200)
})

const canvasEle = ref(null)
const ctx = computed(() => canvasEle.value?.getContext('2d'))

const canvasWidth = computed(() => props.width)
const canvasHeight = computed(() => props.height)
const canvasColor = computed(() => props.color)
const lineLength = computed(() => props.lineLength)
const startOrigin = computed(() => {
  if (props.startOrigin && typeof props.startOrigin.x === 'number' && typeof props.startOrigin.y === 'number') {
    return props.startOrigin
  } else {
    return {
      x: canvasWidth.value / 2,
      y: canvasHeight.value,
    }
  }
})
const thetaOrigin = computed(() => props.thetaOrigin)
const leftDepth = computed(() => props.leftDepth)
const rightDepth = computed(() => props.rightDepth)
const generatorRandom = computed(() => props.generatorRandom)
const isAround = computed(() => props.around)

function lineTo(start, end) {
  ctx.value.strokeStyle = canvasColor.value
  ctx.value.beginPath()
  ctx.value.moveTo(start.x, start.y)
  ctx.value.lineTo(end.x, end.y)
  ctx.value.stroke()
}

function getEndPoint(branch) {
  return {
    x: branch.start.x + branch.length * Math.cos(branch.theta),
    y: branch.start.y + branch.length * Math.sin(branch.theta),
  }
}

function drawBranch(branch) {
  const end = getEndPoint(branch)
  lineTo(branch.start, end)
}

const renderAround = () => {
  const branchArr = [
    // left
    {
      start: {
        x: 0,
        y: Math.random() * canvasHeight.value,
      },
      length: lineLength.value,
      theta: 0,
    },
    // top
    {
      start: {
        x: Math.random() * canvasWidth.value,
        y: 0,
      },
      length: lineLength.value,
      theta: Math.PI / 2,
    },
    // right
    {
      start: {
        x: canvasWidth.value,
        y: Math.random() * canvasHeight.value,
      },
      length: lineLength.value,
      theta: -Math.PI,
    },
    // bottom
    {
      start: {
        x: Math.random() * canvasWidth.value,
        y: canvasHeight.value,
      },
      length: lineLength.value,
      theta: -Math.PI / 2,
    },
  ]
  branchArr.forEach((item) => step(item))
}

const init = () => {
  const branch = {
    start: startOrigin.value,
    length: lineLength.value,
    theta: thetaOrigin.value,
  }
  if (isAround.value) return renderAround()
  step(branch)
}

const pendingTasks = []

function step(branch, depth = 0) {
  const end = getEndPoint(branch)
  drawBranch(branch)
  if (depth < leftDepth.value || Math.random() < generatorRandom.value) {
    pendingTasks.push(() =>
      step(
        {
          start: end,
          length: branch.length + (Math.random() * 2 - 1),
          theta: branch.theta - 0.4 * Math.random(),
        },
        depth + 1
      )
    )
  }
  if (depth < rightDepth.value || Math.random() < generatorRandom.value) {
    pendingTasks.push(() =>
      step(
        {
          start: end,
          length: branch.length + (Math.random() * 2 - 1),
          theta: branch.theta + 0.4 * Math.random(),
        },
        depth + 1
      )
    )
  }
}

function frame() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach((fn) => fn())
}

let frameCount = 0
function startFrame() {
  window.requestAnimationFrame(() => {
    frameCount += 1
    frameCount % 4 === 0 && frame()
    startFrame()
  })
}

startFrame()

onMounted(() => {
  init()
})
</script>

<template>
  <canvas ref="canvasEle" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<style scoped lang="scss"></style>
