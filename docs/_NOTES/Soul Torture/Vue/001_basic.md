# Vue 基础

[[toc]]

:::danger Vue 面试题文章

- https://juejin.cn/post/7097067108663558151
- https://juejin.cn/post/6961222829979697165

:::

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

## keep-alive 组件有什么作用?

:::info 前置知识
一般情况下, 组件进行切换的时候, 默认是会进行销毁的, 如果我们有需求, 在某个组件切换后不进行销毁, 而是保存之前的状态, 那么就可以利用 keep-alive 来实现。

在 keep-alive 上有两个属性, 可以对字符串或正则表达式进行匹配, 匹配到的组件会被缓存。

- include 值为字符串或者正则表达式匹配的组件 name 会被缓存 (缓存匹配到的组件)
- exclude 值为字符串或正则表达式匹配的组件 name 不会被缓存 (排除匹配到的组件)

其拥有两个独立的生命周期钩子函数 actived 和 deactived, 使用 keep-alive 包裹的组件在切换时不会被销毁, 而是缓存到内存中并执行 deactived 钩子函数, 命中缓存渲染后会执行 actived 钩子函数。
:::

:::tip 答案
keep-alive 是 vue 的内置组件, 而这个组件的作用就是能够缓存不活动的组件。
:::

## 为何 ref 需要 value 属性?

:::tip 答案
ref 需要借助 value 属性实现原始数据类型的响应性。
:::

:::info 解析

- 首先 Vue3 实现响应式数据的核心 API 是 Proxy, 故而有了 reactive 函数用于创建响应式对象
- 但是 Proxy 只能代理对象, 诸如 string、number 等原始类型处理不了
- 所以 Vue3 有了 ref 函数用于创建原始类型的响应式数据
- 它的本质是生成了一个 RefImpl 实例, 通过 value 属性的 getter 和 setter 实现响应性
- 当 ref 参数为对象时, 其 value 值还是基于 reactive 函数进行处理
- 当 ref 参数为原始数据类型时, value 的 getter 收集依赖, setter 主动触发依赖
- 所以 ref 需要借助 value 属性实现原始数据类型的响应性

:::
