# 基础篇

[[toc]]

## JavaScript 值类型和引用类型的区别?

:::info 前情提要

首先需要明确的是 JavaScript 的原始类型和引用类型分别有哪些?

- 原始类型 : string、boolean、number、undefined、null、symbol、bigint (7 种)
- 引用类型 : object、function、array...

:::

:::tip 答案

1. 值类型实际存储在栈内存中, 引用类型实际存储在堆内存中
2. 对于值类型, 变量存储的是实际的值。而对于引用类型, 变量存储的是引用地址, 统一放入<un>栈内存</un>, 其引用地址可映射到实际存储的堆内存中
3. 涉及拷贝时, 原始类型拷贝的是另外一个实例, 而引用类型只是拷贝了一个副本

<div class="text-center border-2 mb-4 rounded-lg">
  <div class="border-b-2">栈内存</div>
  <div class="flex border-b-2">
    <div class="flex-1 border-r-2">key</div>
    <div class="flex-1">value</div>
  </div>
  <div class="flex border-b-2">
    <div class="flex-1 border-r-2">a</div>
    <div class="flex-1">10</div>
  </div>
  <div class="flex border-b-2">
    <div class="flex-1 border-r-2">b</div>
    <div class="flex-1">引用地址1</div>
  </div>
  <div class="flex">
    <div class="flex-1 border-r-2">...</div>
    <div class="flex-1">...</div>
  </div>
</div>

<div class="text-center border-2 rounded-lg">
  <div class="flex border-b-2">
    <div class="flex-1 border-r-2">...</div>
    <div class="flex-1">...</div>
  </div>
  <div class="flex border-b-2">
    <div class="flex-1 border-r-2">引用地址1</div>
    <div class="flex-1">{age: 10}</div>
  </div>
  <div class="flex border-b-2">
    <div class="flex-1 border-r-2">key</div>
    <div class="flex-1">value</div>
  </div>
  <div>堆内存</div>
</div>

:::

## typeof 能判断的类型?

:::info 前情提要
typeof 可以判断出 string、boolean、number、undefined、symbol、bigint、object、function。
:::

:::tip 答案
typeof 可以用于判断除 null 以外的原始类型以及函数, 特别注意的是, `typeof null === 'object'`
:::

## 哪些值是假值, 哪些值是真值?

:::tip 答案

1. 除了 6 个假值以外的值都为真值
2. 假值: false、''(空字符串)、0、NaN、null、undefined

:::

## 何时使用 === 何时使用 ==

:::tip 答案

1. 除了 == null 之外, 其它都一律用全等操作符（===）
2. a == null 相当于 a === null || a === undefined

:::

## 什么是作用域？什么是自由变量?

:::tip 答案
变量的查找规则就是作用域, 当前词法作用域没有定义却使用的变量就是自由变量。
:::

:::info 拓展

- 作用域分为词法作用域和动态作用域(this)
- 词法作用域又分为全局作用域、函数作用域和块级作用域
- var 定义的变量含有全局作用域、函数作用域
- let 或 const 定义的变量含有全局作用域、函数作用域和块级作用域

:::

## 什么是闭包？闭包的场景?

:::tip 答案

1. 无论以哪种方式对函数类型的值进行传递, 就会产生闭包。
2. 闭包的表现形式是函数定义时所在的作用域和执行时所在的作用域不一致。
3. 场景：
   - 只要使用了回调函数就是闭包, 比如定时器、事件监听器、Ajax 等
   - 模块导出函数类型的值

:::

## 如何准确获取数据类型?

:::tip 答案
使用 Object.prototype.toString.call() 获取。
:::

```js
function getType(target) {
  // 注意：不要弄成了 Object.toString.call()
  // 只能使用 Object.prototype.toString.call()
  const originType = Object.prototype.toString.call(target)
  const spaceIndex = originType.indexOf(' ')
  return originType.slice(spaceIndex + 1, -1).toLowerCase()
}
```

## this 有几种赋值情况?

欠一篇文章, 写一篇这个
