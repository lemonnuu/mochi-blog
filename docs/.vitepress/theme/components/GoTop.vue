<script setup>
import { computed, onMounted, ref } from 'vue'
import { randomRGB } from '../utils/color'

const props = defineProps({
  zIndex: {
    type: Number,
    default: 0,
  },
})

const zIndex = computed(() => props.zIndex)

const visibilityHeight = ref(500)
const catStyle = ref('hide-cat')

function handleScroll() {
  catStyle.value = getScrollTop() > visibilityHeight.value ? 'show-cat' : 'hide-cat'
}
function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}
function goTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div id="goTop" :class="catStyle" @click="goTop"></div>
</template>

<style scoped lang="scss">
$MQWide: 1440px;
// 原来的 -> $MQMobile: 768px;
$MQMobile: 959.5px;
@keyframes offsets {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(0.5px);
  }
  20% {
    transform: translateY(1.5px);
  }
  30% {
    transform: translateY(3px);
  }
  40% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(7.5px);
  }
  60% {
    transform: translateY(5px);
  }
  70% {
    transform: translateY(3px);
  }
  80% {
    transform: translateY(1.5px);
  }
  90% {
    transform: translateY(0.5px);
  }
  100% {
    transform: translateY(0px);
  }
}
@-webkit-keyframes offsets {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(0.5px);
  }
  20% {
    transform: translateY(1.5px);
  }
  30% {
    transform: translateY(3px);
  }
  40% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(7.5px);
  }
  60% {
    transform: translateY(5px);
  }
  70% {
    transform: translateY(3px);
  }
  80% {
    transform: translateY(1.5px);
  }
  90% {
    transform: translateY(0.5px);
  }
  100% {
    transform: translateY(0px);
  }
}
.show-cat {
  cursor: pointer;
  position: fixed;
  right: 80px;
  top: -200px;
  z-index: v-bind(zIndex);
  width: 70px;
  height: 900px;
  background: url(../assets/images/go_top.png);
  opacity: 1;
  transition: top 0.5s ease-in-out;
  animation-name: offsets;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-name: offsets;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}
.hide-cat {
  cursor: pointer;
  position: fixed;
  right: 80px;
  top: -900px;
  z-index: v-bind(zIndex);
  width: 70px;
  height: 900px;
  background: url(../assets/images/go_top.png);
  opacity: 1;
  transition: top 0.5s ease-in-out;
}
@media screen and (max-width: $MQWide) {
  .show-cat {
    all: unset;
    cursor: pointer;
    position: fixed;
    right: 50px;
    bottom: 20px;
    z-index: v-bind(zIndex);
    width: 50px;
    height: 50px;
    mask: url(../assets/images/claw.svg) no-repeat 100% 100%;
    -webkit-mask: url(../assets/images/claw.svg) no-repeat 100% 100%;
    mask-size: cover;
    -webkit-mask-size: cover;
    background-color: v-bind(randomRGB());
    opacity: 0.5;
    transition: bottom 0.3s ease-in-out;
  }
  .hide-cat {
    all: unset;
    cursor: pointer;
    position: fixed;
    right: 50px;
    bottom: -50px;
    z-index: v-bind(zIndex);
    width: 50px;
    height: 50px;
    mask: url(../assets/images/claw.svg) no-repeat 100% 100%;
    -webkit-mask: url(../assets/images/claw.svg) no-repeat 100% 100%;
    mask-size: cover;
    -webkit-mask-size: cover;
    background-color: #fff;
    opacity: 0.5;
    transition: bottom 0.3s ease-in-out;
  }
}
@media screen and (max-width: $MQMobile) {
  .show-cat {
    display: none;
  }
  .hide-cat {
    display: none;
  }
}
</style>
