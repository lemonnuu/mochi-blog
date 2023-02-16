---
date: '2023-02-16 09:40:10'
title: 初探 Vue 响应性原理
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - vue
---

# 初探 Vue 响应性原理

1. 创建 proxy
2. 收集 effect 的依赖
3. 触发收集的依赖

setter 主要做了两件事情 ：

1. 修改 obj 的值
2. 触发 targetMap 下保存的 fn 函数

effect 做了三件事情:

1. 生成 ReactiveEffect 实例
2. 触发 fn 方法, 从而激活 getter
3. 建立了 taretMap 和 activeEffect 之间的练习

reactive() -> proxy
