---
date: '2023-02-28 10:23:53'
title: 图片懒加载
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - tip
---

# 图片懒加载

在实现图片懒加载时, 除了可以某一条件触发后再请求图片接口外, 图片本身的渲染也可以进行懒加载。

## 分析

例如这样一个场景, 网页下拉至底部请求回来十个图片 URL 路径, 甚至更多。如果未作任何处理, 那么用户在页面上暂时看不到的一些图片也会进行资源请求, 对于视口上的图片来说无疑是抢占了他们一些资源, 导致加载速度慢。

我们可以尝试做这样的一层优化, 处于视口的图片才进行资源请求, 否则, 以一些颜色背景替代。

不过这样有一个前提, 就是除了返回图片 URL 外, 还必须知晓渲染图片的宽高。

想要实现它的逻辑也非常简单, 只需判断图片是否可见:

- 不可见 src 为空, 填充颜色
- 可见 src 赋值为图片 URL 路径

## 自定义指令形式实现

对于这样的一个场景, 最好的实现方式是通过自定义指令的形式, 例如 `v-lazy`。这样可以方便的控制哪些图片需要懒加载, 哪些提前渲染好一些。

:::code-group

```js [lazy.js]
import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载：在用户无法看到图片时，不加载图片，在用户可以看到图片后加载图片
  // 如何做到不加载图片（网络）：img 标签渲染图片，指的是 img 的 src 属性，src 属性是网络地址时，则会从网络中获取该图片资源。
  // 那么如果 img 标签不是网络地址呢？把该网络地址默认替换为非网络地址，然后当用户可见时，在替换成网络地址。

  mounted(el, binding) {
    // 但是有一个前提, 必须要含有宽高才能懒加载, 也就是不能人为计算宽高
    // 这里可进一步控制 v-lazy="" 的值为什么时候才需懒加载
    if (binding.value) return
    // 1. 拿到当前 img 标签的 src
    const imgSrc = el.src
    // 2. 把 img 标签的 src 替换为本地地址
    el.src = ''
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 3. 替换地址
        el.src = imgSrc
        // 4. 停止监听
        stop()
      }
    })
  },
}
```

:::

## 插件形式安装

在实现了 v-lazy 自定义指令后, 由于实际项目中的自定义插件可能并不止这一个, 可以通过插件的形式进行安装。

:::code-group

```js [index.js]
export default {
  install(app) {
    // import.meta.globEager 为同步导入
    // const directives = import.meta.globEager('./*.js') // globEager 已弃用
    const directives = import.meta.glob('./*.js', { eager: true })
    console.log('directives', directives)
    for (const [key, value] of Object.entries(directives)) {
      // 拼接组件注册的 name
      console.log(key, value)
      const arr = key.split('/')
      const directiveName = arr[arr.length - 1].replace('.js', '')
      // 完成注册
      app.directive(directiveName, value.default)
    }
  },
}
```

:::
