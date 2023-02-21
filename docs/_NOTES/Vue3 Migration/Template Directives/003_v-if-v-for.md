---
outline: [1, 2]
---

# v-if 与 v-for 的优先级对比

## 概览

- **非兼容** : 两者作用于同一个元素上时, `v-if` 会拥有比 `v-for` 更高的优先级 (Vue2 是 `v-for` 优先级高)

## 介绍

Vue 使用最多的两个指令就是 `v-if` 和 `v-for`, 因此有时可能会想要同时使用它们。但是**不建议**这样做, 可以使用 `<template>` 标签嵌套一层。

## 2.x 语法

2.x 版本中在一个元素上同时使用 `v-if` 和 `v-for` 时, `v-for` 会优先作用。

## 3.x 语法

3.x 版本中 `v-if` 总是优先于 `v-for` 生效。

## 迁移策略

由于语法上存在歧义, 建议避免在同一元素上同时使用两者。

比起在模板层面管理相关逻辑，更好的办法是通过创建计算属性筛选出列表，并以此创建可见元素。

## 参考

- [列表渲染 - #显示过滤-排序后的结果](https://cn.vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results)
- [列表渲染 - v-for 与 v-if 一同使用](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-v-if)
