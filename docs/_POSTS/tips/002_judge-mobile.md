---
date: '2023-01-25 09:25:54'
title: 判断当前设备是否为移动设备
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - tip
---

# 判断当前设备是否为移动设备

在做需要兼容 PC 端和移动端项目时, 往往需要判断用户当前设备是何种形态, 而页面构建顺序一般是移动优先。

> [tailwindcss](https://tailwindcss.com/docs/responsive-design#working-mobile-first) 就是移动优先。

## 根据宽度判断

在开发过程中, 依据宽度判断是否是移动设备更便于调试, 而且也不会有什么问题。

```js
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const PC_DEVICE_WIDTH = 1280
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return PC_DEVICE_WIDTH > width.value
})
```

## 根据 userAgent 判断

事实上, 应该根据 [navigator.userAgent](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent) 判断是否移动设备更为合理准确。

```js
export const realIsMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})
```
