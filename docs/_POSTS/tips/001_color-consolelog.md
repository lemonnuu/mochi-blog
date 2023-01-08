---
date: '2023-01-08 09:21:03'
title: 你不知道的 console
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - tip
---

# 你不知道的 console

众所周知, `console.log()` 会打印传入到控制台的字符串, 且可以接收多个参数。

但, 好像对 console 的了解, 好像也就局限于此了...

Node.js 提供了 console 模块, 它基本上与浏览器中的 console 对象相同, 含有大量非常有用的与命令行交互的方法。

## 为 log 抹上亿点点色彩

可以使用[转义序列](https://gist.github.com/iamnewton/8754917)在控制台中为文本的输出着色, 转义序列是一组标识颜色的字符。例如：

```js
console.log('\x1b[30m%s\x1b[0m', '你好...黑')
console.log('\x1b[31m%s\x1b[0m', '你好...红')
console.log('\x1b[32m%s\x1b[0m', '你好...绿')
console.log('\x1b[33m%s\x1b[0m', '你好...黄')
console.log('\x1b[34m%s\x1b[0m', '你好...蓝')
console.log('\x1b[35m%s\x1b[0m', '你好...紫')
console.log('\x1b[36m%s\x1b[0m', '你好...青')
console.log('\x1b[37m%s\x1b[0m', '你好...白')
```

> 可以对着转义序列去玩一下, 只要更改诸如 `[32m%s` 的子串即可。

当然, 这是执行操作的底层方法。为控制台输出着色最简单的方法还是使用库, [chalk](https://github.com/chalk/chalk) 就是一个这样的库。

## 打印错误日志

`console.error` 可打印错误日志, 它会打印到 stderr 流。

## 计算耗时

可以使用 `console.time()` 和 `console.timeEnd()` 轻松的计算中间代码运行所需的时间。

```js
const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
  console.time('doSomething()')
  //做点事，并测量所需的时间。
  doSomething()
  console.timeEnd('doSomething()')
}
measureDoingSomething()
// 测试
// doSomething(): 0.619ms
```

## 元素计数

`console.count()` 不仅打印日志, 还打印日志的执行次数。

```js
const oranges = ['橙子', '橙子']
const apples = ['苹果']
oranges.forEach((fruit) => {
  console.count(fruit)
})
apples.forEach((fruit) => {
  console.count(fruit)
})
// 橙子: 1
// 橙子: 2
// 苹果: 1
```

## 漂亮的输出对象

```js
console.log(JSON.stringify(obj, null, 2))
```
