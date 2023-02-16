---
date: '2023-02-16 10:31:34'
title: Vue3 响应性原理
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - vue
---

# Vue3 响应性原理

所谓的响应性其实指的就是: 当响应式数据触发 setter 时执行 fn 函数

想要达到这样一个目的, 就必须: getter 时能够收集当前的 fn 函数, 以便在 setter 时执行相应的 fn 函数

但是对于收集而言, 如果仅仅是吧 fn 存起来是不够的, 我们还需要知道, 当前的这个 fn 是哪个响应式数据对象的哪个属性对应的, 只有这样, 才可以在该属性触发 setter 时, 准确的执行响应性

1. 调用 reactive 方法

:::code-group

```js [reactive]
export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}
```

```js [createReactiveObject]
function createReactiveObject(target: object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
  // 如果该实例已经被代理，则直接读取即可
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 未被代理则生成 proxy 实例
  const proxy = new Proxy(target, baseHandlers)
  // 为 Reactive 增加标记
  proxy[ReactiveFlags.IS_REACTIVE] = true

  // 缓存代理对象
  proxyMap.set(target, proxy)
  return proxy
}
```

:::

WeakMap:

1. key: 响应式对象
2. value : Map 对象
   1. key : 响应式对象的指定属性
   2. value : 指定对象的指定属性的 执行函数 fn

## 笔记

对于 reactive 的响应性函数而言, 我们知道它:

1. 是通过 proxy 的 setter 和 getter 来实现数据监听
2. 需要配合 effect 函数进行使用
3. 基于 WeakMap 完成的依赖收集和触发
4. 可以存在一对多的依赖关系

不足之处:

1. reactive 只能对复杂数据类型进行使用
2. reactive 的响应性数据, 不可以进行解构

因为 reactive 的不足, 所以 vue3 又为我们提供了 ref 函数构建响应性

## ref

1. 对于 ref 函数, 会返回 RefImpl 类型实例
2. 在该实例中, 会根据传入的数据类型进行分开处理
   1. 复杂数据类型: 转化为 reactive 返回的 proxy 实例
   2. 简单数据类型: 不做处理
3. 无论我们执行 obj.value.name 还是 obj.value.name = xxx 本质上都是触发了 get value
4. 之所以会进行响应性是因为 obj.value 是一个 reactive 函数生成的 proxy

5. ref 函数本质上是生成了一个 RefImpl 类型的实例对象, 通过 get 和 set 标记处理了 value 函数
6. 为什么 ref 类型的数据, 必须通过 .value 访问值呢?
   1. 因为 ref 需要处理简单数据类型的响应性, 但是对于简单数据类型而言, 它无法通过 proxy 建立代理
   2. 所以 vue 通过 get value() 和 set value() 定义了两个属性函数, 通过主动触发这两个函数的形式进行依赖收集和依赖触发
   3. 所以必须通过 .value 来确保响应性
