---
title: TypeScript
titleTemplate: 函数
---

# 函数

正在拼命归档整理中...

## 复杂函数定义类型

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

## 函数重载
