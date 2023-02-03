# 进阶篇

[[toc]]

## event loop (事件循环/事件轮询)的机制是怎样的?

:::tip 答案

1. 清空函数调用堆栈
   - 遇到微任务回调推入微任务队列
   - 遇到宏任务回调挂起, 等待时机, 时机成熟推入宏任务队列
2. 清空微任务队列
3. 渲染 DOM
4. 不停轮询宏任务队列, 直至宏任务队列含有队头, 单个将队头推入函数调用堆栈
5. 回到第一步, 不断重复整个流程

:::

## 什么是宏任务和微任务, 两者有什么区别?

:::tip 答案

宏任务包括 setTimeout、setInterval、Ajax、requestAnimationFrame、DOM 事件等。

微任务包括 Promise.then、Promise.catch、Promise.finally、MutationObserver、queueMicrotask、process.nextTick(Node 独有)。

宏任务是由浏览器规定的, 而微任务是 ES6 语法制定的。宏任务在 DOM 渲染后执行, 微任务在 DOM 渲染前执行。

:::
