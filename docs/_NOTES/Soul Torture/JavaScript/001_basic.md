# 基础知识

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

## window.onload 和 DOMContentLoaded 的区别

```js
window.addEventListener('load', () => {
  // 页面的全部资源加载完才会执行, 包括图片、视频等
})
document.addEventListener('DOMContentLoaded', () => {
  // DOM 渲染完即可, 此时图片、视频还可能没有下载
})
```

## [1, 2, 3].map(parseInt)输出什么?

:::info 前情提要

首先得知道 parseInt 的规则, parseInt(string, radix)接收两个参数:

- 返回一个 **十进制整数** 或 **NaN**
- string：要解析的字符串, 不是字符串会调用 String() 转型函数转化为字符串
  - 特别注意的是极大或极小值转化为字符串是用科学计数法表示的
- radix：基数, 2 ~ 36 的整数, 表示字符串表示的进制数
  - 如果为假值, 比如 0、''、null、undefined 则忽略此参数, 基数根据字符串的值推断
  - 如果不是数字型, 则会调用 Number() 转型函数转化为数字
  - 超过这个范围则返回 NaN, 0 除外, 0 会忽略此参数, 基数根据字符串的值推断
- 如果第二个参数 radix 没有或被忽略, 基数根据字符串的值推断, 规则如下
  - 0x（0X）开头的字符串被推断成十六进制
  - 其它一律表示为十进制
  - 其实, 在 ES5 之前 0 开头的表示八进制, 后面被废除了, 所以只有以上两种情况。但为了兼容老浏览器, 建议每次使用 parseInt() 函数时都要手动指定基数
- parseInt() 能识别 +、-、进制内合规字符。
  - 从字符串的第一个字符开始解析, 如果开头是空格则忽略空格
  - 如果遇见的第一个字符是不合规字符, 则返回 NaN
  - 如果第一个字符是合规字符, 则依次检测每个字符, 直到遇见非合规字符或字符串末尾。截取首部的合规字符串进行解析

:::

:::tip 答案
输出 1, NaN, NaN
:::

```js
;[1, 2, 3].map(parseInt)
// 相当于
;[1, 2, 3].map((item, index, arr) => {
  parseInt(item, index)
})
// 也就是相当于
parseInt(1, 0)
parseInt(2, 1)
parseInt(3, 2)
```

:::info 解析

- parseInt(1, 0)
  - radix 为 0, 此参数被忽略
  - 字符串以十进制字符串进行解析
  - 返回 1
- parseInt(2, 1)
  - radix 为 1, 不在 2~36 范围内
  - 返回 NaN
- parseInt(3, 2)
  - radix 为 2, 此参数被忽略
  - 字符串以二进制字符串进行解析
  - 二进制字符串的合规字符是 0、1。3 是不合规字符
  - 返回 NaN

:::

## 函数声明与函数表达式的区别?

:::info 前情提要
首先得会区分函数声明和函数表达式:

区分函数声明和函数表达式最简单的方法是看 function 关键字在声明中的位置(不仅仅是一行代码, 而是整个声明中的位置)。如果 function 是声明中的第一个词, 那么就是一个函数声明, 否则就是一个函数表达式。

例如:

- 函数声明 : `function foo() {}`
- 函数表达式 : `(function foo {})()`

:::

:::tip 答案

1. 函数声明会函数提升, 而函数表达式不会
2. 函数声明名称标识符绑定在所在作用域中, 而函数表达式名称标识符绑定在自身函数中

> 对于第 2 点, 换句话说, `(function foo {...})()` 作为函数表达式意味着 foo 只能在 ... 所代表的作用域中访问, 外部作用域则不行。

:::

## new Object() 和 Object.create() 区别

:::tip 答案

1. {} 等同于 new Object(), 原型为 Object.prototype
2. Object.create(null) 没有原型
3. Object.create({...}) 可指定原型

:::

## 箭头函数的缺点?什么时候不能用箭头函数?

:::tip 答案

箭头函数的缺点:

- 没有 arguments
- 无法通过 apply、call、bind 改变 this

什么时候不能用箭头函数:(其实就是有关 this 的考量)

- 对象方法
- 对象原型
- 构造函数
- 动态上下文的回调函数
- Vue 生命周期和 method

:::

## for...in 与 for...of 有什么区别

:::info 前情提要

- 可枚举 : 属性具有 enumerable 特性
- 可迭代 : 目标具有 [Symbol.iterator] 属性

:::

:::tip 答案

- for...in 用于可枚举数据, 如对象、数组、字符串, 得到 key, 且可以遍历原型上的属性
- for...of 用于可迭代数据, 如数组、字符串、Map、Set, 得到 value

:::

## for await...of 有什么作用?

:::tip 答案
for await...of 用于遍历多个 Promise, 有点像遍历 Promise.all() 的结果。
:::

:::code-group

```js [举个栗子]
function createPromise(value, time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time)
  })
}

;(async function () {
  const p1 = createPromise(1000, 1000)
  const p2 = createPromise(5000, 5000)
  const p3 = createPromise(3000, 3000)
  const list = [p1, p2, p3]
  for await (const res of list) {
    console.log(res)
  }
})()

// 1 秒后打印 1000
// 5 秒后打印 5000
// 接着立马打印 3000
```

:::

## 类数组转化为数组?

:::info 前情提要
常见的类数组:

- 函数中的 arguments
- HTMLCollection
- NodeList

:::

:::tip 答案

- Array.from(list)
- Array.prototype.slice.call(list)
- [...list]

:::

## JS 严格模式有什么特点?

:::info 前情提要

开启严格模式:

```js
'use strict' // 全局开启

function fn() {
  'use strict' // 某个函数开启
}
```

:::

:::tip 答案

- 全局变量必须先声明 (var)
- 禁止使用 with
- eval 拥有自己独立的作用域
- 禁止 this 指向 window
- 函数参数不能重名

:::

## 遍历一个数组用 for 和 forEach 哪个更快?

:::tip 答案
for 更快, forEach 每次都要创建一个函数来调用, 而 for 不会创建函数, 函数需要独立的作用域, 会有额外的开销。
:::

:::info 提一嘴
越"低级"的代码, 性能往往越好。虽然 for 性能更好, 但是使用 forEach 的可维护性更强。
:::
