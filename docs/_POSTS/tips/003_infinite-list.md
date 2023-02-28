---
date: '2023-02-28 08:54:32'
title: 无限列表
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - tip
---

# 无限列表

在网页开发中, 无限列表是很常见的需求场景, 比如图片网站, 下拉至底部再请求下一页图片资源。

## 分析

无限列表的实现逻辑非常简单, 只需要做成以下两件事:

- 判断是否下拉至底部
- 条件满足请求接口

在判断是否下拉至底部时, 可以使用 scroll 相关属性, 但是也可以借助 VueUse 的 [useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/) 方法进行更简单的实现。

## useIntersectionObserver

VueUse 的 [useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/) 方法可以判断一个元素是否出现在可视区域, 也就是荧屏上。

:::code-group

```js [JS]
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  setup() {
    const target = ref(null)
    const targetIsVisible = ref(false)

    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
      targetIsVisible.value = isIntersecting
    })

    return {
      target,
      targetIsVisible,
    }
  },
}
```

```html [HTML]
<div ref="target">
  <h1>Hello world</h1>
</div>
```

:::

useIntersectionObserver 方法接收两个参数:

- 第一个参数是需要监听的 DOM 元素
- 第二个参数是回调函数, 其中的 isIntersecting 就是代表是否出现在可视区域的布尔值

它可解构返回一个用于停止监听的 stop 方法。

## 封装 InfiniteList 组件

我们只需要将一个看不见的元素始终放置在页面的底部, 再配合 useIntersectionObserver 方法即可实现判断是否下拉至底部。

对此, 我们可以将无限列表封装成一个组件, 以便在不同场景实现复用。

```vue
<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import SvgIcon from './SvgIcon.vue'
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true,
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props, 'modelValue', emit)

// 滚动的元素
const loadingTarget = ref(null)
// 记录当前是否在底部
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

/**
 * 触发 load 事件
 */
const emitLoad = () => {
  setTimeout(() => {
    // 当加载更多视图可见时、且 loading 为 false、且数据尚未全部加载完成时, 处理加载更多的逻辑
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      // 修改加载数据标记
      loading.value = true
      // 触发加载更多的行为
      emit('onLoad')
    }
  }, 100)
}

/**
 * 监听 loading 变化, 解决数据加载完成之后, 首屏未铺满的问题
 */
watch(loading, emitLoad)
</script>

<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <SvgIcon v-show="loading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load"></SvgIcon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">已经没有更多数据了</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
```
