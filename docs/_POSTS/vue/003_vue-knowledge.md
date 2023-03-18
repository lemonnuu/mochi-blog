---
date: '2023-02-26 09:26:20'
title: Vue知识串记
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - vue
---

# Vue 知识串记

1. Vue 的核心

- 声明式渲染
- 响应性

2. API 风格: 选项式、组合式
3. 初始化 Vue3 项目: `npm init vue@latest`, 会执行 create-vue
4. Vue 相关性能优化
   - [web.dev 指南](https://web.dev/fast/)(无关框架的优化)
   - 页面加载优化
     - 正确的架构: SPA、SSG、SSR
     - tree shaking
     - code-spliting 懒加载
   - 更新优化
     - 保持 prop 的稳定性
     - v-once
     - v-memo
   - 通用优化
     - 虚拟列表
     - 减少大型不可变数据的响应性开销
     - 避免不必要的组件抽象
5. DOM 的更新并不是同步的
6. ref 的自动解包
   - 模板中作为顶层属性被访问时
   - reactive 对象的属性被访问时, 但 reactive 数组或 Map 的项不会
7. computed 返回一个 computedRefImpl 实例, 会有缓存, 不应有任何副作用
8. Vue 3 的 &lt;template&gt; 如果上面没有 v-if、v-for 会真实渲染成 &lt;template&gt; 标签, Vue2 不会
9. v-if 和 v-show 的区别就是 v-if 是真正的移除增加 DOM, 而 v-show 是通过 CSS 的 display 来控制显示与隐藏的
10. 不推荐同一元素上使用 v-if 和 v-for, 但是如果用了, Vue3 的 v-if 优先级更高, Vue2 的 v-for 优先级高
11. key 管理状态, 要合理使用 key 属性
12. 生命周期
    - setup
    - beforeCreate
    - created
    - beforeMount
    - mounted
    - beforeUpdate
    - updated
    - beforeUnmount(Vue2: beforeDestroy)
    - unmounted (Vue2: destroyed)
13. 模板引用: 同名的 ref, 也可以是一个函数, v-for 的时候还可以是一个数组
14. SFC 单文件组件规范组件建议使用 PascalCase 名称
15. 常用:
    - `setup(props, {attrs, slots, emit, expose})`
    - `const props = defineProps()`
    - `const emit = defineEmits()`
    - `const attrs = useAttrs()`
16. Vue 遵从单向数据流
17. 事件的校验可传入一个对象, 事件可以被赋值为一个函数
18. `$attrs` 保留原始名, 然后事件前面加 `on`, 如 `onClick`
19. 插件本质上就是一个拥有 install 方法的对象或函数, install 方法的第一个参数是 app, 第二个参数是传递给 app.use() 方法的额外参数 options
20. 自定义指令: `const vFocus = {...}`

## Vue Router

1. 模式: History、Hash、Memory (手写一下原理)
2. 和 keep-alive 结合
3. 路由守卫、结合 元数据, 比如做一些鉴权
4. VueRouter4 新增的动态路由, 也就是可以增加或者是删除一些路由

https://segmentfault.com/a/1190000037540533

## 路线

VueRouter -> Vuex -> Pinia -> Vue
TypeScript -> 算法
CSS -> HTTP -> JS
