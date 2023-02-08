# Vue 基础

[[toc]]

## watch 和 computed 的区别?

:::info 吐槽
不能说一模一样, 只能说毫不相关。
:::

:::tip 答案

- computed 用于计算产出新的数据, 有缓存
- watch 用于监听现有数据执行某些副作用

:::

## Vue 组件通讯有几种方式?

:::tip 答案

- props 和 emit
- 自定义事件 (事件总线)
- $attrs
- $parent
- $refs
- provide / inject
- Vuex

:::

## Vuex mutation 与 action 的区别

:::tip 答案

- mutaion : 原子操作, 必须同步代码
- action : 可包含多个 mutation, 可包含异步代码

:::

## 虚拟 DOM (VDOM) 真的很快嘛?

:::info 前情提要
VDOM : 用 JS 对象模拟的 DOM 节点数据
:::

:::tip 答案

- VDOM 并不快, JS 直接操作 DOM 才是最快的
- 但 "数据驱动视图" 要有合适的技术方案, 不能全部 DOM 重建
- VDOM 就是目前最合适的技术方案(并不是因为它快, 而是合适)

:::
