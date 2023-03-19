---
title: TypeScript
titleTemplate: 函数
---

# 函数

正在拼命归档整理中...

## 复杂函数的定义

一般函数定义类型很简单。

```ts
function add(x: number, y: number): number {
  return x + y
}

let myAdd = function (x: number, y: number): number {
  return x + y
}
```

但相对复杂一点的函数怎么定义呢? 首先得知道用接口定义函数。

### 有属性的函数

```ts
interface FunctionWithAttributes {
  (str: string): number
  attr: string
}

const test: FunctionWithAttributes = (str) => {
  return str.length
}
test.attr = 'hello'
```

### 构造函数

```ts
interface classWithConstructor {
  new (str: string): void
}
```

如何写 Date() 函数

## 可选参数和默认参数

## 剩余参数

## this 参数

- TS 在开启编译选项 `noImplicitThis` 的情况下, 必须去声明 this 的类型, 才能在函数或者对象中使用 this。
- TS 中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的。

修改的方法是, 提供一个显式的 this 参数。this 参数是个假的参数, 它出现在参数列表的最前面:

```ts
interface User {
  name: string
}

function CreateUser(this: User, name: string) {
  this.name = name
}
```

## 函数重载
