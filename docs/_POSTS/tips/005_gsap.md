---
date: '2023-02-28 15:05:20'
title: GSAP 实现路由跳转动画
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - tip
---

# GSAP 实现路由跳转动画

Vue Router 的[过渡动效](https://router.vuejs.org/zh/guide/advanced/transitions.html)只能处理 RouterView 下的动画效果, 如果存在嵌套路由, 当子路由改变时想做出替换整个页面的动画可能就不太合适。

## GSAP

这种情况可以手动的更改 URL, 渲染组件, 模拟路由跳转的过程。然后利用 Transition 的 JavaScript 钩子搭配 [GSAP](https://github.com/greensock/GSAP) 库实现路由跳转动画。

动画的处理我们依赖于 GSAP 实现。对于 GSAP 而言, 主要依赖于两个方法:

- `gsap.set()` : 这个方法通常使用在动画开始之前, 表示设置动画开始的元素属性
- `gsap.to()` : 这个方法表示元素的最终展示状态

GSAP 会基于 set 和 to 的状态, 来自动执行中间的补间动画。我们只需:

- 创建一个对应的组件, 使用 &lt;Transition&gt; 进行包裹
- 计算出 set 时, 组件元素对应的样式属性
- 计算出 to 时, 组件元素对应的样式属性

然后就可以由 GSAP 自动实现对应的补间动画了。

## 示例

比如实现一个图片点击时, 从图片中心位置放开展示详情页的动画, 关闭时收缩至中心点的动画。

### 实现动画

在父组件, 用 &lt;Transition&gt; 包裹详情组件, 采用 JavaScript 钩子的方式实现动画。

:::code-group

```html [ParentComponent]
<!-- 详情内容展示 -->
<Transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
  <PinsComponent v-if="isVisiblePins" :data="currentPins.data"></PinsComponent>
</Transition>
```

```vue [PinsComponent]
<script setup>
import NavBar from '../../../libs/NavBar.vue'
import SvgIcon from '../../../libs/SvgIcon.vue'
import { isMobileTerminal } from '../../../utils/flexible'
import { useRouter } from 'vue-router'
import ComBtn from '../../../libs/ComBtn.vue'

const router = useRouter()

defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// 关闭
const onPop = () => {
  router.back()
}
</script>

<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-white dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2 xl:bg-transparent"
  >
    <!-- 移动端下展示 navbar -->
    <NavBar v-if="isMobileTerminal" sticky>
      {{ data.author }}
      <template #right>
        <SvgIcon name="share" class="w-3 h-3" fillClass="fill-zinc-900 dark:fill-zinc-200"></SvgIcon>
      </template>
    </NavBar>

    <!-- pc 端下展示关闭图标 -->
    <SvgIcon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></SvgIcon>

    <!-- 内容区域 -->

    <div class="xl:max-w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex xl:justify-center">
      <img
        class="w-screen mb-2 xl:w-auto xl:max-w-[80%] xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="data.photo"
      />

      <div class="xl:min-w-[20%] xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <SvgIcon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></SvgIcon>

          <ComBtn class="" type="info" icon="heart" iconClass="fill-zinc-900 dark:fill-zinc-200"></ComBtn>
        </div>
        <!-- 标题 -->
        <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
          {{ data.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="h-3 w-3 rounded-full" :src="data.avatar" alt="" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ data.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
```

:::

然后采用 GSAP 实现动画。

```js
import gsap from 'gsap'
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0,
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.3,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done,
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    duration: 0.3,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 1,
    onComplete: done,
  })
}
```

### 切换路由

对于路由的切换利用 `history.pushState()` 方法手动更换路由就好了。在点击图片时, 切换路由, 并监听 popstate 浏览器后退按钮事件。

```js
/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

/**
 * 点击图片项, 进入详情
 */
const onToPins = (item) => {
  detailStore.changeLastDetail(item.data)
  // 修改浏览器的 URL
  const virtualID = item.data.id.replaceAll('https://', '').replaceAll('/', '-').replaceAll('.', '_')
  let baseUrl = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL
  history.pushState(null, null, `${baseUrl}/pins/${virtualID}`)
  isVisiblePins.value = true
  currentPins.value = item

  console.log(currentPins.value.location?.translateX, currentPins.value.location?.translateY)
}
```
