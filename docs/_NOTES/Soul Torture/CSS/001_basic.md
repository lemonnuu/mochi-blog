# CSS 基础

[[toc]]

## px、%、em、rem、vw/vh 有什么区别?

:::tip 答案

- px : 基本单位, 绝对单位
- % : 相对父元素的宽度比例
- em : 相对于当前元素的 font-size
- rem : 相对于根节点的 font-size
- vw : 屏幕宽度的 1%
- vh : 屏幕高度的 1% (vmin : vw 和 vh 的最小值, vmax : vw 和 vh 的最大值)

:::

## 什么是 BFC?

:::tip 答案

[BFC](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts)(Block Formatting Contexts) 块级格式化上下文。它是一块独立的渲染区域, 内部元素的渲染不会影响边界以外的元素。

BFC 一般用于清除浮动, 但有一点需要注意的是, 属于同一个 BFC 的两个相邻 Box 的才存在 margin 塌陷问题。

:::

## 如何创建一个 BFC?

:::tip 答案

首先, 根节点 &lt;html&gt; 就是一个 BFC, [创建 BFC 的方法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E5%9D%97%E6%A0%BC%E5%BC%8F%E4%B8%8A%E4%B8%8B%E6%96%87)有(常见):

- 使用 float 使其浮动的元素
- 块级元素的 overflow 属性不为 visible
- display 为 inline-block
- 绝对定位的元素(包含 fixed 和 sticky)
- flex items

其中, 设置 `overflow: hidden;` 是惯用手法。

:::
