---
date: '2023-02-01 14:00:00'
title: JavaScript の循环与遍历
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# JavaScript の循环与遍历

JavaScript 有关遍历的方法那真的是太多了, 诸如 while、for、for..in、for...of、forEach 等等, 但是每个方法都有自己的适用场景。

## while 语句

while 语句是一种先测试循环语句, 即先检测退出条件, 再执行循环体内的代码。因此, while 循环体内的代码可能不会执行。下面是 while 循环的语法:

```js
while (expression) statement
```

这是一个例子:

```js
let i = 0
while (i < 10) {
  i += 2
}
```

在这个例子中, 变量 i 从 0 开始, 每次循环递增 2。只要 i 小于 10, 循环就会继续。

## do...while

do...while 语句是一种后测试循环语句, 即循环体中的代码执行后才会对退出条件进行求值。换句话说, 循环体内的代码至少执行一次。do...while 的语法如下:

```js
do {
  statement
} while (expression)
```

下面是一个例子:

```js
let i = 0
do {
  i += 2
} while (i < 10)
```

在这个例子中, 只要 i 小于 10, 循环就会重复执行。i 从 0 开始, 每次循环递增 2。

:::tip
do...while 语法规定循环后必须带分号, 平常不用写是因为 ASI(自动分号) 的原因。
:::

## for 语句

for 语句也是先测试语句, 只不过增加了进入循环之前的初始化代码, 以及循环执行后要执行的表达式:

```js
for (initialization; expression; post - loop - expression) statement
```

下面是一个用例:

```js
for (let i = 0; i < 10; i++) {
  // ...执行一些操作
}
```

以上代码在循环开始前定义了变量 i 的初始值 0。然后求值条件表达式, 如果求值结果为 true（i < 10）, 则执行循环体。因此循环体也可能不会执行。如果循环体被执行了, 则循环后表达式也会执行, 以便递增变量 i。for 循环跟下面的 while 循环是一样的:

```js
let i = 0
while (i < 10) {
  // ...执行一些操作
  i++
}
```

:::tip
for 语句其实就是 while 语句的语法糖。无法通过 while 循环实现的逻辑, 同样无法使用 for 循环实现。
:::

<f>for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中, 事实上它将其重新绑定到了循环的每一个迭代中, 确保使用上一个循环迭代结束时的值重新进行赋值。</f>

相当于：

```js
{
  let j
  for (j = 0; j < 10; j++) {
    let i = j // 每个迭代重新绑定
    console.log(i)
  }
}
```

初始化、条件表达式和循环后表达式都不是必需的。如果只包含条件表达式, 那么 for 循环实际上就变成了 while 循环:

```js
let i = 0
for (; i < 10; ) {
  // ...执行一些操作
  i++
}
```

如果条件表达式被忽略, 那么就被认为永远为真, 需要使用 break 手动跳出循环。

```js
for (let i = 0; ; i++) {
  if (i > 9) {
    break
  }
  console.log(i)
}
```

## for...in 语句

<f>for...in 语句是为遍历对象属性而构建的, 它以任意顺序迭代一个对象的除 Symbol 以外的可枚举属性, 包括继承的可枚举属性。</f>

```js
for (const variable in object) {
  statement
}
```

- variable：在每次迭代时, variable 会被赋值为不同的属性名
- object：非 Symbol 类型的可枚举属性被迭代的对象

与 for 循环一样, 这里控制语句中的 const 也不是必需的。但为了确保这个局部变量不会被修改, 推荐使用 const。

:::warning
ECMAScript 中的对象属性是无序的, 因此 for...in 语句不能保证返回对象属性的顺序。且 for...in 是为遍历对象属性而构建的, 不建议与数组一起使用。
:::

如果仅需迭代对象自身的属性, 而不用考虑原型, 可以使用 getOwnPropertyNames() 或执行 hasOwnProperty 来确定某属性是否是对象本身的属性。

```js
const b = Symbol('b')
const obj = {
  a: 1,
  [b]: 2,
}
obj.__proto__.c = 3

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key) // a
  }
}
```

:::tip
for...in 也支持 continue 与 break。
:::

## for...of 语句

for...of 语句用于遍历可迭代对象, 包括 Array、Map、Set、TypedArray、String、arguments、NodeList 对象或是自定义迭代对象。

```js
for (const variable of iterable) {
  statement
}
```

与 for 循环一样, 这里控制语句中的 const 也不是必需的。但为了确保这个局部变量不会被修改, 推荐使用 const。

for...of 循环会按照可迭代对象的 next() 方法产生值的顺序迭代对象。

:::tip
for...of 也支持 continue 与 break。
:::

## for await...of 语句

[for await...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for-await...of) 语句用于遍历异步可迭代对象。

> [async-pool es9 源码](https://github.com/rxaviers/async-pool/blob/master/lib/es9.js)

## Array.prototype.forEach()

forEach() 方法对**数组**的每个元素执行一次给定的函数。但需要注意的是:

- <f>已删除或者未初始化的项将被跳过</f>, 例如 `new Array(7) -> [empty × 7]`
- <f>除了抛出异常以外, 没有办法中止或跳出 forEach() 循环</f>
