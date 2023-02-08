# 手撕代码

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

## 实现一个简单的 Ajax

:::info 前情提要
首先得熟悉 XMLHttpRequest 的 API, 可查看[这个帖子](../../../_POSTS/javascript/008_ajax.md)。
:::

```js
const ajax = (url, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('404 Not Found'))
        } else {
          reject(new Error(xhr.status))
        }
      }
    }
    xhr.open(method, url, true)
    xhr.send(data)
  })
}
```

## 手写防抖、节流

:::info 前情提要

- 防抖 : 防止抖动, "你先抖动着, 啥时候停了, 再执行下一步"。例如, 一个搜索框, 等输入停止后, 再触发搜索
- 节流 : 节省交流沟通, "别急, 一个一个来, 按时间节奏来, 插队者无效"。例如, drag 或 scroll 期间触发某个回调, 要设置一个时间间隔

:::

```js
// 防抖
function debounce(fn, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
// 节流
function throttle(fn, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
```

## 手写深度比较, 模拟 lodash 的 isEqual

:::info 前情提要
主要在于 {a: 1} 与 {a: 1} 要返回 true。
:::

```js
const isObject = (target) => typeof target === 'object' && target !== null
const isEqual = (obj1, obj2) => {
  // 只要有一个不是对象, 直接全等判断即可
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  // 1. 如果都是对象且引用也一样, 就肯定相等
  if (obj1 === obj2) {
    return true
  }
  // 2. 否则, 判断属性个数是否一样
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }
  // 3. 属性个数一样就进行递归
  for (key of keys1) {
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }
  return true
}
```

## 手写 flat 函数扁平化数组

:::info 前情提要
实现的方法有很多种, 这里讲 concat 方法拍平数组, 如 `[].concat([1, 2])` 会自动"消融"一层。
:::

```js
// 常规版
function flat(arr) {
  // 1. 验证 arr 中还有没有深层数组
  const isDeep = arr.some((item) => item instanceof Array)
  // 2. 没有直接返回
  if (!isDeep) {
    return arr
  }
  const res = Array.prototype.concat.apply([], arr)
  // 3. 递归
  return flat(res)
}

// 简洁版
function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}
```

## 实现数组去重函数 unique

```js
function unique(arr) {
  return [...new Set(arr)]
}
```
