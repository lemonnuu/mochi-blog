---
date: '2023-01-06 13:54:22'
title: vitepress-theme-mochi
titleTemplate: false
outline: [2, 4]
author: Mochi
categories:
  - post
tags:
  - vitepress
---

# vitepress-theme-mochi

为自己量身打造一个 VitePress 主题。

## 序章

### 梦想开始的地方

相信很多人和我一样, 一直以来都想弄一个自己的专属博客。然后可以整理 note 亦或是随手记录一些 inspiration, 看见别人好看的博客总会眼馋:heart_eyes:。

在没有接触这方面的相关知识之前, 我认为这是一件很复杂的事情。就一直没有开搞, 咳咳, 也就拖了四五年吧...

> 吐槽一句 : 以前的行动力可真弱, 说的现在就很强一样:sweat_smile:

直到...我遇见了 [VuePress](https://v2.vuepress.vuejs.org/zh/)、[VitePress](https://vitepress.vuejs.org/)、[Hexo](https://hexo.bootcss.com/) 等框架。

### 心路历程

最开始我的博客是基于 VuePress 搭建的, 使用了 [vuepress-reco](https://vuepress-theme-reco.recoluan.com/) 主题, 这是一个非常优秀且好看的主题。

用了一段时间以后, 可能自身确实是带有点"渣男体质":upside_down_face:, 我又爱上了 VitePress 的毛玻璃。Emm, 然后怎么看自己的博客都有点不顺眼。

再接着, 我寻找了很多主题, 诸如 [vuepress-theme-vdoing](https://doc.xugaoyi.com/)、[vuepress-theme-hope](https://vuepress-theme-hope.github.io/) 等。它们都很强大, 功能齐全, 但是样式"东叔"有点不喜欢。

### 自己动手, 丰衣足食

没办法, 没找到现成的就只能自己动手, 就先基于 VitePress 仿着 vuepress-reco 试试看吧, 说干就干!

## 开发脉络

### 样式

首先摆在面前的就是样式问题, 由于还得兼容移动端和适配黑暗模式, 感觉靠自己写样式有点啰嗦, 就采用了 [tailwindcss](https://tailwindcss.com/)。

> 本来还想用偶像 [atufu](https://github.com/antfu) 的 [UnoCss](https://github.com/unocss/unocss), 但是又不太熟, 想想还是蒜了...

这里贴出 `tailwind.config.js` 的部分配置:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./docs/.vitepress/**/*.vue', './docs/**/*.{vue,md}'],
}
```

#### 意外之喜

在没有使用 tailwindcss 前, 一直在苦恼个事儿。文本的高亮、字体颜色改变得自己写行内样式或是提前预设 CSS, 总感觉有点啰哩吧嗦的。

使用了 tailwindcss 后, 虽然要写的东西一点没变, 但是它提前预设了很多 CSS, GOOD! 可以写的非常爽了。

### 数据

解决了样式问题后, 有一个严峻的问题摆在眼前, 没有数据!!!

不同于 VuePress, VitePress 压根没有 pages 的数据, emm...

那就只能自己通过 Node 读取文件了, 再正则获取 frontmatter 并解析出来, 组装好存入 json 文件, 最后交由主题进行读取。

其中使用了两个库：[js-yaml](https://www.npmjs.com/package/js-yaml) 和 [fs-extra](https://www.npmjs.com/package/fs-extra)。

### 组件

接下来的事情就是开发主题组件了, 这里不进行赘述, 但有几个好玩的东西。

#### 打字机

在看一些文档时, 可能会发现打字机的特效, [TypeIt](https://www.typeitjs.com/) 可帮助我们简单的实现它, 诸如这样：

```js
new TypeIt('.multipleStrings', {
  strings: ['This is a great string.', 'But here is a better one.'],
  speed: 50,
  waitUntilVisible: true,
}).go()
```

#### 梅花特效

梅花特效是用 canvas 画出来的, 其实现原理就是在一条线的终点生成随机角度随机长度的左子树与右子树, 然后递归。

只不过要产生画的动画得用到 [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 方法, 并且要广度优先的画, 利用函数堆栈即可。

下面是相关部分代码：

```js
const pendingTasks = []
function frame() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach((fn) => fn())
}

let frameCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    frameCount += 1
    frameCount % 4 === 0 && frame()
    startFrame()
  })
}
```

## 总结

基本的实现思路就是这样, 但是还是有很多不足的地方：

- 组件封装的不是很好
- 没有暴露一些配置

但是转身一想, 反正是写给自己用的, 普适性就不要求那么高了, 应该也没其它人用, 顿时就舒坦多了:smile:

不过, 未来如果有可能, 未来如果有时间, 还会有未来的。
