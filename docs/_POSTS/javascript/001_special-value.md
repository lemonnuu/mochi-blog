---
date: '2023-02-01 09:02:17'
title: 盘点 JavaScript 特殊值
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# 盘点 JavaScript 特殊值

JavaScript 中有几个特殊的值需要特别注意和小心使用！分别是：

- `undefined` 与 `null`
- `NaN`
- `+0` 和 `-0`

## 前情提要

官老爷们请看题！下列表达式的结果值分别是什么？

:::code-group

```js [question]
typeof null
typeof undefined
undefined = 123
null = 123
null == undefined
null == false
undefined == false
```

```js [answer]
typeof null // 'object'
typeof undefined // 'undefined'
undefined = 123 // 123 (非严格模式, 严格模式抛错)
null = 123 // SyntaxError: Invalid left-hand side in assignment
null == undefined // true
null == false // false
undefined == false // false
```

:::

:::code-group

```js [question]
0 / 0
Infinity / Infinity
NaN === NaN
0 >= NaN
0 <= NaN
isNaN(NaN)
isNaN(undefined)
isNaN(null)
isNaN('')
Number.isNaN(NaN)
Number.isNaN(undefined)
Number.isNaN(null)
Number.isNaN('')
```

```js [answer]
0 / 0 // NaN
Infinity / Infinity // NaN
NaN === NaN // false
0 >= NaN // false
0 <= NaN // false
isNaN(NaN) // true
isNaN(undefined) // true
isNaN(null) // false
isNaN('') // false
Number.isNaN(NaN) // true
Number.isNaN(undefined) // false
Number.isNaN(null) // false
Number.isNaN('') // false
```

:::

:::code-group

```js [question]
;+0 === -0
;-0 + ''
;+'-0'
```

```js [answer]
;+0 === -0 // true
;-0 + '' // 0
;+'-0' // -0
```

:::

如果都能正确解答出来，对不起，到目前为止，已浪费您两分钟 🙊 请关闭当前网页。

## undefined 与 null

众所周知，undefined 与 null 是两个原始类型。但是：

```js
typeof null // 'object'
typeof undefined // 'undefined'
```

由于历史遗留 bug，**`typeof null` 的值并不是 'null'，而是 'object'。** 所以 `typeof` 操作符并不能判断出 null 类型，而是需要使用复合条件：

```js
let target = null(!target && typeof target === 'object') // true

// 当然，最简单的还是使用全等操作符即可
// target === null // true
```

undefined 类型只有一个值，即 `undefiend`。null 类型也只有一个值，即 `null`。这两兄弟的名称即是类型也是值，然而二者还是有一丢丢差别的。

- undefined 表示没有赋值 （即使显式赋值了 `undefined` 也和没赋一样）
- null 表示赋值过，只不过是空值而已

**null 是一个关键字，不能被当作标识符。而骚包的 undefined 既不是关键字也不是保留字，可以被赋值！**

```js
undefined = 123 // 123
null = 123 // SyntaxError: Invalid left-hand side in assignment
```

**不过，严格模式下直接修改 undefined 的值会抛错。但却可以声明一个 undefined 的局部变量。**

```js
'use strict'
undefined = 123 // Uncaught TypeError: Cannot assign to read only property 'undefined' of object '#<Window>'
```

```js
'use strict'
;(function () {
  const undefined = 123 // 123
})()
```

**永远都不要改变 undefined 的值！** 借助 void 可获取安全的 undefined：

```js
void 0 === undefined // true
```

**在相等操作符（==）的处理规则中，null 与 undefined 都不能转换为其它类型的值再进行比较，但 null 与 undefined 相等。**

```js
null == undefined // true
null == false // false
undefined == false // false
```

### 相等操作符小技巧

在项目相等操作符（==）与全等操作符（===）的选择上，可遵循以下技巧：

**除了 `== null` 之外，其它都一律用全等操作符（===），`a == null` 相当于 `a === null || a === undefined`。**

## 特立独行的 NaN

如果数学运算的操作数通过转型函数 `Number()` 无法解析为数字类型，就无法返回一个有效的数字，这种情况下返回值为 `NaN`（not a number）。这个名字容易引起误会，将它理解为 “无效数值” 可能更稳妥些。

**`NaN` 是一个特殊值，它是唯一一个和自身不相等的值。**

```js
0 / 0 // NaN
Infinity / Infinity // NaN
NaN !== NaN // true
NaN === NaN // false
0 >= NaN // false
0 <= NaN // false
```

所以与 JavaScript 其它值不同，`NaN` 不能通过相等操作符（== 和 ===）来判断。

那应该如何判断它呢？🤦‍♂️

### isNaN()

💡 很简单，可以使用内建的全局工具函数 `isNaN()` 来判断：

```js
isNaN(NaN) // true
isNaN(undefined) // true
isNaN(null) // false
isNaN('') // false
```

离离原上谱。`isNaN(null)` 和 `isNaN('')` 的结果为什么都为 `false`😮

其实，**`isNaN()` 会先用 `Number()` 转型函数将目标值转换为数字类型再判断是否是 `NaN`。**

```js
Number(NaN) // NaN
Number(undefined) // NaN
Number(null) // 0
Number('') // 0
```

这样一来，离谱的结果也就不离谱了。

### Number.isNaN()

所幸，ES6 开始我们可以使用工具函数 `Number.isNaN()` 来判断 `NaN` 了。

```js
Number.isNaN(NaN) // true
Number.isNaN(undefined) // false
Number.isNaN(null) // false
Number.isNaN('') // false
```

咱就是说，非常的 nice😏

### Number.isNaN() polyfill

不过，emm，ES6 之前的浏览器怎么办？

~~💢 当然是把电脑砸了，都什么年代了~~

当然是开开心心快快乐乐的 polyfill 啦，哈哈。。哈。

polyfill `Number.isNaN()` 的思路有两个：

- 一个是先判断是不是数字类型，再利用一下 `isNaN()`
- 另一个是利用 `NaN` 是唯一一个不等于自身的值（推荐）

```js
;(function () {
  // 方法一：先判断是不是数字类型再利用 isNaN()
  if (!Number.isNaN_polyfill_1) {
    Number.isNaN_polyfill_1 = function (target) {
      return typeof target === 'number' && isNaN(target)
    }
  }
})()
;(function () {
  // 方法二：利用 NaN 是唯一一个不等于自身的值
  if (!Number.isNaN_polyfill_2) {
    Number.isNaN_polyfill_2 = function (target) {
      return target !== target
    }
  }
})()
```

大功告成！

## 硬币的两面：+0、-0

在 JavaScript 中，0 除了 +0 外，还有一个 -0。

-0 除了可以作为常量以外，也可以是某些数学运算的返回值：

```js
const a = 0 / -3 // -0
const b = 0 * -3 // -0
```

加法和减法运算不会得到 -0。

根据规范：

- `+0 === -0` 为 `true`
- 对 -0 字符串化会返回 '0'
- 将 '-0' 转为数字会返回 -0

```js
;+0 === -0 // true
;-0 + '' // '0'
;+'-0' // -0
JSON.stringify(-0) // '0'
JSON.parse('-0') // -0
```

那如何判断是不是 -0 呢？可以自己手撸一个工具函数：

```js
function isNegZero(target) {
  return target === 0 && 1 / target === -Infinity
}
```

## 特殊值终结者：Object.is()

讲了这么多，是时候表演真正的技术了 😈

**ES6 新加入了一个工具方法 `Object.is()` 来判断两个值是否绝对相等，可以用来处理所有特殊情况。**

```js
const a = undefined,
  b = null,
  c = NaN,
  d = +0,
  e = -0
Object.is(a, undefined) // true
Object.is(b, null) // true
Object.is(c, NaN) // true
Object.is(d, +0) // true
Object.is(e, -0) // true
```

劲酒虽好，可不要贪杯噢！

能使用 == 或 === 时就尽量不要使用 `Object.is()`，因为前者效率更高，更为通用。而 `Object.is()` 主要用来处理那些特殊值的相等比较。

### Object.is() polyfill

如何实现 `Object.is()` 的 polyfill 呢？

其实很简单，全等（===）操作符可以正确判定绝大部分的值，唯有两个变数：

- +0 与 -0
- NaN

当遇见 +0 与 -0 时，我们希望返回 `false`，但全等操作符返回 `true`。

当遇见两个 NaN 时，我们希望返回 `true`，但全等操作符返回 `false`。

```js
;(function () {
  if (!Object.is_polyfill) {
    Object.is_polyfill = function (a, b) {
      if (a === b) {
        // 1. 相等情况下，搞事的是 +0 与 -0
        // 2. 如果 a 不是 0，返回 true
        // 3. 如果 a 是 0，还得判断 a，b 的符号一致不一致
        return a !== 0 || 1 / a === 1 / b
      } else {
        // 1. 不相等的情况下，搞事的是 NaN
        // 2. 当 a 与 b 都是 NaN 时，返回 true
        return a !== a && b !== b
      }
    }
  }
})()
```
