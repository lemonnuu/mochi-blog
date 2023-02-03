# 手撕代码篇

[[toc]]

## 手写深拷贝

:::info 前情提要

- 简单版 : JSON.parse(JSON.stringify(...))
- 正常版 : 如下

:::

```js
function cloneDeep(target) {
  // 1. 如果是原始类型或函数直接返回
  if (typeof target !== 'object' || target == null) {
    return target
  }
  // 2. 判断是数组还是对象
  const res = Array.isArray(target) ? [] : {}
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      // 3. 递归
      res[key] = cloneDeep(target[key])
    }
  }
  return res
}

// 1. 还可以使用 JSON.parse(JSON.stringify(...))
// 2. 但是不能包含不安全的 JSON 值
// 3. 如 undefined, symbol, function, bigint, Infinity, NaN
```

## 手写 call()、apply()、bind() 函数

:::info 前情提要

1. call、apply、bind 函数都是强制绑定 this 的函数
2. bind 返回的是一个函数, 且可以进行函数柯里化
3. 而 call 与 apply 会立即执行函数, 只不过参数方式不一样
   - apply 的剩余参数是数组
   - call 的剩余参数的一个一个的
4. 原生 call、apply 函数对原始数据类型会 new Object(contextArg), 对于 null 或 undefiend this 会绑定上 window 或 global

:::

:::code-group

```js [apply]
Function.prototype.apply_polyfill_1 = function (contextArg, args) {
  if (contextArg == null) contextArg = globalThis
  if (typeof contextArg !== 'object') contextArg = new Object(contextArg)
  const TEMP = Symbol()
  contextArg[TEMP] = this
  const res = contextArg[TEMP](...args)
  delete contextArg[TEMP]
  return res
}
```

```js [call]
Function.prototype.call_polyfill_1 = function (contextArg, ...args) {
  if (contextArg == null) contextArg = globalThis
  if (typeof contextArg !== 'object') contextArg = new Object(contextArg)
  const TEMP = Symbol()
  contextArg[TEMP] = this
  const res = contextArg[TEMP](...args)
  delete contextArg[TEMP]
  return res
}
```

```js [bind]
Function.prototype.bind_polyfill_1 = function (contextArg, ...bindArgs) {
  const self = this
  return function (...args) {
    return self.call_polyfill_1(contextArg, ...bindArgs, ...args)
  }
}
```

:::

## 手写 instanceof

:::info 前情提要
instanceof 的实现有点指针的味道。
:::

```js
function instanceOf(a, b) {
  let p = a
  while (p.__proto__) {
    p = p.__proto__
    if (p === b.prototype) return true
  }
  return false
}
```

## 手写 Promise

:::tip 答案
[见这里](../../../_POSTS/javascript/007_handwriting-promise.md)
:::
