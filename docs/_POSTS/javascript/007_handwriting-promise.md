---
date: '2023-02-02 15:22:39'
title: 手写 Promise
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# 手写 Promise

## Promises/A+ 规范

要实现一个 Promise, 首当其冲的肯定得知道人家规范是怎么定义的。

> 注: [Promises/A+](https://promisesaplus.com/) 规范与 JS 实现的 Promise 还是有一点差异, 但大体上一致。

### 术语

- promise : promise 是一个拥有 then 方法的对象或函数, 行为遵从本规范
- thenable : thenable 是一个拥有 then 方法的对象或函数
- value : value 是 promise 状态成功的结果值, 也就是 resolve 的参数, 可以是各种数据类型
- reason : reason 是 promise 状态失败的结果值, 也就是 reject 参数, 表示拒绝的原因
- exception : exception 是一个使用 throw 抛出的异常值

### 规范

#### Promise States

promise 应该有三种状态, 且必须处于以下三种状态之一: pending、fulfilled 或 rejected。

:::info pending

- promise 初始状态(promise 在 resolve 或 reject 之前都处于这个状态)
- 初始态的 promise 可通过 resolve 方法将状态变为 fulfilled
- 初始态的 promise 可通过 reject 方法将状态变为 rejected

:::

:::info fulfilled

- promise 最终形态, 不可变
- 必须拥有一个 value 结果值

:::

:::info rejected

- promise 最终形态, 不可变
- 必须拥有一个 reason 原因

:::

<f>promise 状态改变有且只有两种方式:</f>

- pending -> resolve(value)函数 -> fulfilled
- pending -> reject(reason)函数 -> rejected

#### then

promise 应该提供一个 then 方法来访问其成功的结果值 value 或失败的原因 reason。

then 方法接收两个参数: `promise.then(onFufilled, onRejected)`

:::info 参数要求
onFulfilled 和 onRejected 都是可选参数。如果不是函数, 应该被忽视(使用默认值)
:::

:::info onFufilled 特性

1. 在 promise 状态变为 fulfilled 之后应该调用 onFulfilled 回调函数, value 是其第一个参数
2. 在 promise 状态变为 fulfilled 之前不应该被调用
3. 只能调用一次

:::

:::info onRejected 特性

1. 在 promise 状态变为 rejected 之后应该调用 onRejected 回调函数, reason 是其第一个参数
2. 在 promise 状态变为 rejected 之前不应该被调用
3. 只能调用一次

:::

:::info onFulfilled 与 onRejected 都应该是微任务
:::

:::info then 方法可以被调用多次

1. 在 promise 的状态变为 fulfilled 之后, 所有的 onFulfilled 回调都需要按照 then 的注册顺序执行
2. 在 promise 的状态变为 rejected 之后, 所有的 onRejected 回调都需要按照 then 的注册顺序执行

:::

:::info then 应该返回一个新的 promise, 假定为 promise2

1. 假定 onFulfilled 或 onRejected 的执行结果为 x, 调用 resolvePromise 规则函数来解析
2. 如果 onFulfilled 或 onRejected 执行期间抛出异常, promise2 需要被 reject(exception)
3. 如果 onFulfilled 不是一个函数, promise2 以 promise 的 value 触发 fulfilled
4. 如果 onRejected 不是一个函数, promise2 以 promise 的 reason 触发 rejected

:::

#### resolvePromise

onFulfilled 和 onRejected 返回值 x 的规则解析函数, 以判定 promise2 的状态。

resolvePromise 接收四个参数: `resolvePromise(promise2, x, resolve, reject)`

:::info 如果 promise2 === x, 那么 reject(new TypeError())
:::

:::info 如果 x 是一个 promise

1. 如果 x 处于 pending 状态, 那么 promise2 必须也要处于 pending 状态, 直到 x 的状态变为 fulfilled 或 rejected
2. 如果 x 的状态为 fulfilled, 那么对 x 的结果值继续用 resolvePromise 解析
3. 如果 x 的状态为 rejected, 那么 reject(x 的拒绝原因)

:::

:::info 如果 x 是一个 object 或是一个 function

1. 取 let then = null
2. 如果 then = x.then 这一步报错, 那么 reject(exception)
3. 如果 then 是一个函数, 那么调用 then.call(x, resolvePromiseFn, rejectPromiseFn)
   1. resolvePromiseFn 的入参是 y, 执行 resolvePromise(promise2, y, resolve, reject)
   2. rejectPromiseFn 的入参是 r, 执行 reject(r)
   3. 如果 resolvePromiseFn 和 rejectPromiseFn 都调用了, 那么第一个调用优先, 后面调用的忽略
   4. 如果 then 的调用抛出了异常
      1. 如果 resolvePromiseFn 或 rejectPromise 已经被调用, 那么忽略
      2. 否则, reject(exception)
4. 否则, resolve(x)

:::

:::info 否则, resolve(x)
:::

## 实现 MyPromise

:::code-group

```js [MyPromise]
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = (target) => typeof target === 'function'
const isObject = (target) => typeof target === 'object'

class MyPromise {
  _status = PENDING
  _fulfilledCallbackQueue = []
  _rejectedCallbackQueue = []

  constructor(executor) {
    this.value = undefined
    this.reason = undefined

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  get promiseState() {
    return this._status
  }

  set promiseState(newState) {
    this._status = newState
    switch (newState) {
      case FULFILLED:
        this._fulfilledCallbackQueue.forEach((callback) => callback())
        break
      case REJECTED:
        this._rejectedCallbackQueue.forEach((callback) => callback())
        break
    }
  }

  resolve(value) {
    if (this.promiseState !== PENDING) return
    this.value = value
    this.promiseState = FULFILLED
  }

  reject(reason) {
    if (this.promiseState !== PENDING) return
    this.reason = reason
    this.promiseState = REJECTED
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => {
          return value
        }
    const realOnRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason
        }

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      switch (this.promiseState) {
        case FULFILLED:
          fulfilledMicrotask()
          break
        case REJECTED:
          rejectedMicrotask()
          break
        case PENDING:
          this._fulfilledCallbackQueue.push(fulfilledMicrotask)
          this._rejectedCallbackQueue.push(rejectedMicrotask)
          break
      }
    })
    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('This promise and the value are the same!'))
    }

    if (x instanceof MyPromise) {
      queueMicrotask(() => {
        try {
          x.then((y) => {
            this.resolvePromise(promise2, y, resolve, reject)
          }, reject)
        } catch (error) {
          reject(error)
        }
      })
    } else if (isObject(x) || isFunction(x)) {
      if (x == null) {
        return resolve(x)
      }

      let then = null
      try {
        then = x.then
      } catch (error) {
        return reject(error)
      }

      if (isFunction(then)) {
        let called = false

        try {
          then.call(
            x,
            (y) => {
              if (called) return
              called = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (r) => {
              if (called) return
              called = true
              reject(r)
            }
          )
        } catch (error) {
          if (called) return
          reject(error)
        }
      } else {
        resolve(x)
      }
    } else {
      resolve(x)
    }
  }
}
```

```js {0} [step1]
// promise 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 辅助函数
const isFunction = (target) => typeof target === 'function'
const isObject = (target) => typeof target === 'object'

class MyPromise {
  // 初始状态为 pending
  _status = PENDING
  // 成功回调队列
  _fulfilledCallbackQueue = []
  // 失败回调队列
  _rejectedCallbackQueue = []

  constructor(executor) {
    this.value = undefined
    this.reason = undefined

    try {
      // 同步执行 执行器函数, 参数为 resolve 函数和 reject 函数
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      // 如果函数执行期间抛出错误, 直接 reject
      this.reject(error)
    }
  }

  // 状态获取函数
  get promiseState() {
    return this._status
  }

  // 状态设置函数
  set promiseState(newState) {
    this._status = newState
  }

  // resolve 与 reject 函数的职责就是更改状态与保存 value 或 reason
  resolve(value) {
    // 如果状态不为 pending, 直接 return, 不让修改
    if (this.promiseState !== PENDING) return
    this.value = value
    this.promiseState = FULFILLED
  }

  reject(reason) {
    if (this.promiseState !== PENDING) return
    this.reason = reason
    this.promiseState = REJECTED
  }
}
```

```js {39-47,64-115} [step2]
// promise 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 辅助函数
const isFunction = (target) => typeof target === 'function'
const isObject = (target) => typeof target === 'object'

class MyPromise {
  // 初始状态为 pending
  _status = PENDING
  // 成功回调队列
  _fulfilledCallbackQueue = []
  // 失败回调队列
  _rejectedCallbackQueue = []

  constructor(executor) {
    this.value = undefined
    this.reason = undefined

    try {
      // 同步执行 执行器函数, 参数为 resolve 函数和 reject 函数
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      // 如果函数执行期间抛出错误, 直接 reject
      this.reject(error)
    }
  }

  // 状态获取函数
  get promiseState() {
    return this._status
  }

  // 状态设置函数
  set promiseState(newState) {
    this._status = newState
    // 当状态改变时, 获取存储的回调遍历执行, 如果是同步改变状态, 回调队列为空
    switch (newState) {
      case FULFILLED:
        this._fulfilledCallbackQueue.forEach((callback) => callback())
        break
      case REJECTED:
        this._rejectedCallbackQueue.forEach((callback) => callback())
        break
    }
  }

  // resolve 与 reject 函数的职责就是更改状态与保存 value 或 reason
  resolve(value) {
    // 如果状态不为 pending, 直接 return, 不让修改
    if (this.promiseState !== PENDING) return
    this.value = value
    this.promiseState = FULFILLED
  }

  reject(reason) {
    if (this.promiseState !== PENDING) return
    this.reason = reason
    this.promiseState = REJECTED
  }

  then(onFulfilled, onRejected) {
    // 当 onFulfilled 不是一个函数时, 赋予默认值, 直接透传返回 value
    const realOnFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => {
          return value
        }
    // 当 onRejected 不是一个函数时, 赋予默认值, 直接透传抛出错误 reason
    const realOnRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason
        }
    // then 返回一个新的 promise
    const promise2 = new MyPromise((resolve, reject) => {
      // then 里 onFulfilled 与 onRejected 的执行都是微任务
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            realOnFulfilled(this.value)
          } catch (error) {
            // 回调执行期间抛出错误, 新的 promise 直接 reject
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            realOnRejected(this.reason)
          } catch (error) {
            reject(error)
          }
        })
      }
      switch (this.promiseState) {
        // 如果是同步改变状态, 也就是当前状态为 fulfilled 或 rejected, 直接执行相应回调
        case FULFILLED:
          fulfilledMicrotask()
          break
        case REJECTED:
          rejectedMicrotask()
          break
        // pending 状态先将回调函数存储起来, 待状态改变使用
        case PENDING:
          this._fulfilledCallbackQueue.push(fulfilledMicrotask)
          this._rejectedCallbackQueue.push(rejectedMicrotask)
          break
      }
    })
    return promise2
  }
}
```

```js {122-181} [step3]
// promise 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 辅助函数
const isFunction = (target) => typeof target === 'function'
const isObject = (target) => typeof target === 'object'

class MyPromise {
  // 初始状态为 pending
  _status = PENDING
  // 成功回调队列
  _fulfilledCallbackQueue = []
  // 失败回调队列
  _rejectedCallbackQueue = []

  constructor(executor) {
    this.value = undefined
    this.reason = undefined

    try {
      // 同步执行 执行器函数, 参数为 resolve 函数和 reject 函数
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      // 如果函数执行期间抛出错误, 直接 reject
      this.reject(error)
    }
  }

  // 状态获取函数
  get promiseState() {
    return this._status
  }

  // 状态设置函数
  set promiseState(newState) {
    this._status = newState
    // 当状态改变时, 获取存储的回调遍历执行, 如果是同步改变状态, 回调队列为空
    switch (newState) {
      case FULFILLED:
        this._fulfilledCallbackQueue.forEach((callback) => callback())
        break
      case REJECTED:
        this._rejectedCallbackQueue.forEach((callback) => callback())
        break
    }
  }

  // resolve 与 reject 函数的职责就是更改状态与保存 value 或 reason
  resolve(value) {
    // 如果状态不为 pending, 直接 return, 不让修改
    if (this.promiseState !== PENDING) return
    this.value = value
    this.promiseState = FULFILLED
  }

  reject(reason) {
    if (this.promiseState !== PENDING) return
    this.reason = reason
    this.promiseState = REJECTED
  }

  then(onFulfilled, onRejected) {
    // 当 onFulfilled 不是一个函数时, 赋予默认值, 直接透传返回 value
    const realOnFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => {
          return value
        }
    // 当 onRejected 不是一个函数时, 赋予默认值, 直接透传抛出错误 reason
    const realOnRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason
        }
    // then 返回一个新的 promise
    const promise2 = new MyPromise((resolve, reject) => {
      // then 里 onFulfilled 与 onRejected 的执行都是微任务
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            realOnFulfilled(this.value) // [!code --]
            const x = realOnFulfilled(this.value) // [!code ++]
            this.resolvePromise(promise2, x, resolve, reject) // [!code ++]
          } catch (error) {
            // 回调执行期间抛出错误, 新的 promise 直接 reject
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            realOnRejected(this.reason) // [!code --]
            const x = realOnRejected(this.reason) // [!code ++]
            // 回调函数的结果值交给 resolvePromise 函数解析, 注意 onFulfilled 和 onRejected 都一样
            this.resolvePromise(promise2, x, resolve, reject) // [!code ++]
          } catch (error) {
            reject(error)
          }
        })
      }
      switch (this.promiseState) {
        // 如果是同步改变状态, 也就是当前状态为 fulfilled 或 rejected, 直接执行相应回调
        case FULFILLED:
          fulfilledMicrotask()
          break
        case REJECTED:
          rejectedMicrotask()
          break
        // pending 状态先将回调函数存储起来, 待状态改变使用
        case PENDING:
          this._fulfilledCallbackQueue.push(fulfilledMicrotask)
          this._rejectedCallbackQueue.push(rejectedMicrotask)
          break
      }
    })
    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    // 如果 promise2 和返回值 x 相等, 直接 reject 一个 TypeError 错误
    if (promise2 === x) {
      return reject(new TypeError('This promise and the value are the same!'))
    }
    // 如果返回值 x 是 Promise 实例, 则调用 then 方法继续解析
    if (x instanceof MyPromise) {
      // 这里注意就好, 又是一个微任务
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject)
        }, reject)
      })
    } else if (isObject(x) || isFunction(x)) {
      // 如果返回值 x 是一个对象或者函数
      // 如果 x 为 null 直接 resolve x
      if (x == null) {
        return resolve(x)
      }
      // 取 x 上的 then 属性
      let then = null
      try {
        then = x.then
      } catch (error) {
        // 如果取得过程中抛出错误, 直接 reject 错误
        return reject(error)
      }
      // 判断 then 是否是函数, 如果不是直接 resolve x
      if (isFunction(then)) {
        let called = false
        try {
          then.call(
            x,
            (y) => {
              // 如果回调函数被调用, 直接 return, 否则, 继续解析
              if (called) return
              called = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (r) => {
              // 如果回调函数被调用, 直接 return, 否则, 直接 reject reason
              if (called) return
              called = true
              reject(r)
            }
          )
        } catch (error) {
          // 如果回调函数被调用, 直接 return, 否则, reject 错误
          if (called) return
          reject(error)
        }
      } else {
        // 否则, resolve 返回值 x
        resolve(x)
      }
    } else {
      // 否则, resolve 返回值 x
      resolve(x)
    }
  }
}
```

:::

### promises-aplus-tests 检验

到此, Promises/A+规范的 Promise 就完成了, 接下来用 promises-aplus-tests 测试工具来检验一下。

```shell
npm init -y
```

安装 promises-aplus-tests 包:

```shell
npm install promises-aplus-tests -D
```

将这段代码复制到 MyPromise 文件末尾:

```js
MyPromise.deferred = function () {
  let result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise
```

将 package.json 文件的 scripts 替换成如下, MyPromise 是实现 Promise 的文件名:

```json
"scripts": {
  "test": "promises-aplus-tests MyPromise"
},
```

如果一切正常, 将通过 872 条测试用例。

## 补充 MyPromise

### catch

catch 方法实际上就是 `then(null, onRejected)` 的语法糖, 实现非常简单:

```js
class MyPromise {
  // ...
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}
```

### finally

finally 方法返回一个 Promise, promise 结束后, 无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。

但需要注意的是, 新 promise 的 value 或 reason 是上一个 promise 的 value 或 reason(透传)。

<f>也就是说, 新 promise 的 value 或 reason 和 finally 回调函数的返回值无关, 不会用 resolvePromise 解析。</f>

```js
class MyPromise {
  // ...
  finally(callBack) {
    return this.then(
      (value) => MyPromise.resolve(callBack()).then(() => value),
      (reason) =>
        MyPromise.reject(callBack()).then(() => {
          throw reason
        })
    )
  }
}
```

### resolve 和 reject 静态方法

首先, 静态方法 resolve 和 reject 是直接挂载至 Promise 上的。实现也非常简单:

```js
class MyPromise {
  // ...
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }
}
```

### all 静态方法

首先, 得明确静态方法 all 是直接挂载至 Promise 上的, 实现如下:

```js
class MyPromise {
  // ...
  static all(promiseArray) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promiseArray)) {
        return reject(new TypeError('The params must be an array!'))
      }
      const promiseArrayLength = promiseArray.length
      if (promiseArrayLength === 0) {
        return resolve([])
      }
      const res = []
      let count = 0
      for (let i = 0; i < promiseArrayLength; i++) {
        MyPromise.resolve(promiseArray[i])
          .then((value) => {
            count++
            res[i] = value
            if (count === promiseArrayLength) {
              resolve(res)
            }
          })
          .catch((reason) => {
            reject(reason)
          })
      }
    })
  }
}
```

不过, 需要注意以下几点:

- 传入的 promiseArray 的每一项不一定是 promise
- 结果值的每一项需要与传入的 promiseArray 一一对应
