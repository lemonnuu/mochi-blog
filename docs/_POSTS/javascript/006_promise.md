1. 三种状态
2. then、catch 只要不遇到报错, 返回的都是 resolved promise

8.8 有题目

await 下行开始都可以看作是 callback 里面的内容, 即异步

### async/await 与 Promise 的关系

- 执行 async 函数, 返回的是 Promise 对象
- await 相当于 Promise 的 then
- try..catch 可捕获异常, 代替了 Promise 的 catch

### 题目一

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```

```text
promise1 Promise {<pending>}
promise2 Promise {<pending>}

Uncaught (in promise) Error: error!
  at <anonymous>:7:9

promise1 Promise {<fulfilled>: 'success'}
promise2 Promise {<rejected>: Error: error!}
```
