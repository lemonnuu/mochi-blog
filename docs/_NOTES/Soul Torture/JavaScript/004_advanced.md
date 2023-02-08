# 进阶练习

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

![Event Loop](../../../images/POSTS/javascript/001_event-loop.svg)

## 什么是宏任务和微任务, 两者有什么区别?

:::tip 答案

宏任务包括 setTimeout、setInterval、Ajax、requestAnimationFrame、DOM 事件等。

微任务包括 Promise.then、Promise.catch、Promise.finally、MutationObserver、queueMicrotask、process.nextTick(Node 独有)。

宏任务是由浏览器规定的, 而微任务是 ES6 语法制定的。宏任务在 DOM 渲染后执行, 微任务在 DOM 渲染前执行。

:::

## 实现跨域的常见方式及原理?

:::tip 答案

- CORS : 服务端设置 Access-Control-Allow-Origin 响应头
- JSONP : script 标签不受同源策略影响, 可动态创建 script 标签再让服务端返回一段调用回调函数的代码即可

但不管是哪种方式, 都需要服务端的允许和配合。[详情见这里](../../../_POSTS/javascript/010_cross-domain.md)

:::

## cookie、localStorage 和 sessionStorage 的区别

:::tip 答案

1. cookie 会随着 HTTP 请求发送到服务端, 而 localStorage 与 sessionStorage 不会
2. cookie 最大容量为 4KB, 而 localStorage 与 sessionStorage 最大容量有 5M
3. sessionStorage 数据只存在于当前会话, 浏览器关闭则清空, 而 localStorage 数据会永久存储, 除非代码或手动删除
4. API 使用不同, JavaScript 操作 cookie 只能通过 document.cookie, 难以使用; 而 localStorage 与 sessionStorage 有较全的 API, 如 setItem()、getItem()、removeItem()、clear() 等

:::

## Ajax、Fetch 和 Axios 有什么区别?

:::tip 答案

三者都用于网络请求, 但是处于不同维度。

- Ajax(Asynchronous JavaScript and XML) 是一种技术统称
- Fetch 是一个原生 API
- Axios 是一个第三方库

:::

## 垃圾回收机制?

:::info 前情提要
什么是垃圾回收?

通过自动内存管理实现内存分配和闲置资源回收。

基本思路: 确定哪个变量不会再使用, 然后释放它占用的内存。
:::

:::tip 答案

- 引用记数 : 循环引用会造成内存泄漏
- **标记清理**

:::

## JS 内存泄漏如何检测?场景有哪些?

:::tip 答案

可使用 Chrome devTools 的 Performance 和 Memory 工具来检测 JS 内存。

场景: (以 Vue 为例)

- 被全局变量、函数引用, 但组件销毁时未清除
- 被全局事件、定时器引用, 但组件销毁时未清除
- 被自定义事件引用, 但组件销毁时未清除

:::

## 闭包是内存泄漏嘛?

:::tip 答案
虽然闭包影响的变量不会被垃圾回收, 但它不是内存泄漏。内存泄漏是非预期的, 而闭包是预期的。
:::
