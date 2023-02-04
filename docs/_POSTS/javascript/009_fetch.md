---
date: '2023-02-04 10:44:22'
title: Fetch
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# Fetch

Fetch 能够执行 XMLHttpRequest 对象中的所有任务, XMLHttpRequest 可以选择异步, 而 Fetch 则必须异步。

## 使用

fetch() 方法暴露在全局作用域中, 它返回一个 promise, 这个 promise 会在请求被响应后 resolve, 并传回 [Response](./009_fetch.md#response-对象) 对象。

```js
fetch(input[, init])
```

<f>只有当遇到网络错误时, fetch() 返回的 promise 才会被 reject, 并传回 TypeError。</f>

:::danger 注意
HTTP 响应状态码为 400、404、500 等并不是网络错误, fetch() 返回的 promise 仍被 resolve, 需要进行进一步判断。
:::

### input

fetch() 只有一个必需的参数 input, 表示获取资源的 URL。

```js
fetch('test.json')
```

只使用 URL 时, fetch() 会发送 GET 请求, 且只包含最低限度的请求头。要进一步配置如何发送请求, 需要传入可选的第二个参数 init 对象。

### init

init 对象要按照以下键/值进行填充。

:::details body : 请求体内容
必须是 Blob、 BufferSource、 FormData、 URLSearchParams、 ReadableStream 或 String 的实例。
:::

:::details cache : 用于控制浏览器与 HTTP 缓存的交互

要跟踪缓存的重定向, 请求的 redirect 属性值必须是"follow", 而且必须符合同源策略限制。默认为 default。

- Default
  1. fetch() 返回命中的有效缓存。不发送请求
  2. 命中无效(stale)缓存会发送条件式请求。如果响应已经改变, 则更新缓存的值。然后 fetch()返回缓存的值
  3. 未命中缓存会发送请求, 并缓存响应。然后 fetch() 返回响应
- no-store
  1. 浏览器不检查缓存, 直接发送请求
  2. 不缓存响应, 直接通过 fetch() 返回
- reload
  1. 浏览器不检查缓存, 直接发送请求
  2. 缓存响应, 再通过 fetch() 返回
- no-cache
  1. 无论命中有效缓存还是无效缓存都会发送条件式请求。如果响应已经改变, 则更新缓存的值。然后 fetch() 返回缓存的值
  2. 未命中缓存会发送请求, 并缓存响应。然后 fetch() 返回响应
- force-cache
  1. 无论命中有效缓存还是无效缓存都通过 fetch() 返回。不发送请求
  2. 未命中缓存会发送请求, 并缓存响应。然后 fetch() 返回响应
- only-if-cached
  1. 只在请求模式为 same-origin 时使用缓存
  2. 无论命中有效缓存还是无效缓存都通过 fetch() 返回。不发送请求
  3. 未命中缓存返回状态码为 504(网关超时)的响应

:::

:::details credentials 在外发请求中如何包含 cookie

与 XMLHttpRequest 的 WithCredentials 标签类似, 默认为 same-origin。

- omit : 不发送 cookie
- same-origin : 只在请求 URL 与发送 fetch() 请求的页面同源时发送 cookie
- include : 无论同源还是跨域都包含 cookie

:::

:::details headers 请求头部
默认值为不包含键/值对的 Headers 对象。这不意味着请求不包含任何头部, 浏览器仍然会随请求发送一些头部。
:::

:::details integrity 用于强制子资源完整性
必须是包含子资源完整性标识符的字符串, 默认为空字符串。
:::

:::details keepalive 用于指示浏览器允许请求存在时间超出页面生命周期
适合报告事件或分析, 比如页面在 fetch() 请求后很快卸载。设置 keepalive 标志的 fetch() 请求可用于替代 Navigator.sendBeacon()。必须是布尔值, 默认为 false。
:::

:::details method HTTP 请求方法

默认为 GET。

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS
- CONNECT
- TARCE

:::

:::details mode 请求模式
这个模式决定来自跨源请求的响应是否有效, 以及客户端可以读取多少响应。违反这里指定模式的请求会抛出错误。

在通过构造函数手动创建 Request 实例时, 默认为 cors; 否则, 默认为 no-cors。

- cors : 允许遵守 CORS 协议的跨源请求。响应是"CORS 过滤的响应", 意思是响应中可以访问的浏览器头部是经过浏览器强制白名单过滤的
- no-cors : 允许不需要发送预检请求的跨源请求(HEAD、GET 和只带有满足 CORS 请求头部的 POST)。响应类型是 opaque, 意思是不能读取响应内容
- same-origin : 任何跨源请求都不允许发送
- navigate：用于支持 HTML 导航, 只在文档间导航时使用。基本用不到

:::

:::details redirect 用于指定如何处理重定向响应(状态码为 301、 302、 303、 307 或 308)
默认为 follow。

- follow : 跟踪重定向请求, 以最终非重定向 URL 的响应作为最终响应
- error : 重定向请求会抛出错误
- manual : 不跟踪重定向请求, 而是返回 opaqueredirect 类型的响应, 同时仍然暴露期望的重定向 URL。允许以手动方式跟踪重定向

:::

:::details referrer 用于指定 HTTP 的 Referer 头部的内容
默认为 client/about:client

- no-referrer : 以 no-referrer 作为值
- client/about:client : 以当前 URL 或 no-referrer(取决于来源策略 referrerPolicy)作为值
- &lt;URL> : 以伪造 URL 作为值。伪造 URL 的源必须与执行脚本的源匹配

:::

:::details referrerPolicy 用于指定 HTTP 的 Referer 头部
默认为 no-referrer-when-downgrade。

- no-referrer : 请求中不包含 Referer 头部
- no-referrer-when-downgrade
  1. 对于从安全 HTTPS 上下文发送到 HTTP URL 的请求, 不包含 Referer 头部
  2. 对于所有其他请求, 将 Referer 设置为完整 URL
- origin : 对于所有请求, 将 Referer 设置为只包含源
- same-origin
  1. 对于跨源请求, 不包含 Referer 头部
  2. 对于同源请求, 将 Referer 设置为完整 URL
- strict-origin
  1. 对于从安全 HTTPS 上下文发送到 HTTP URL 的请求, 不包含 Referer 头部
  2. 对于所有其他请求, 将 Referer 设置为只包含源
- origin-when-cross-origin
  1. 对于跨源请求, 将 Referer 设置为只包含源
  2. 对于同源请求, 将 Referer 设置为完整 URL
- strict-origin-when-cross-origin
  1. 对于从安全 HTTPS 上下文发送到 HTTP URL 的请求, 不包含 Referer 头部
  2. 对于所有其他跨源请求, 将 Referer 设置为只包含源
  3. 对于同源请求, 将 Referer 设置为完整 URL
- unsafe-url : 对于所有请求, 将 Referer 设置为完整 URL

:::

:::details details 用于支持通过 AbortController 中断进行中的 fetch()请求
必须是 AbortSignal 的实例, 默认为未关联控制器的 AbortSignal 实例。
:::

### 中断

Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController.abort()会中断所有网络传输, 特别适合希望停止传输大型负载的情况。

中断进行中的 fetch()请求会导致包含错误的拒绝。

```js
const abortController = new AbortController()
fetch('wiki.zip', { signal: abortController.signal }).catch(console.log)
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10)
```

## Response 对象

Fetch API 的 Response 接口呈现了对一次请求的响应数据。

### [body](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/body)

一个简单的 getter, 用于暴露一个 [ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 类型的 body 内容。

### [bodyUsed](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/bodyUsed)

一个布尔值, 用来标示该 Response 是否读取过 body。

### headers

包含此 Response 所关联的 Headers 对象

### ok

一个布尔值, 用来标示该 Response 成功(HTTP 状态码的范围在 200-299)。

```js
fetch('test.json').then((response) => {
  if (response.ok) {
    // ... 一些操作
  }
})
```

### redirected

表示该 Response 是否来自一个重定向, 如果是的话, 它的 URL 列表将会有多个条目。

### status

包含 Response 的状态码(例如 200 表示成功)。

### statusText

包含了与该 Response 状态码一致的状态信息(例如, OK 对应 200)。

### type

包含 Response 的类型(例如, basic、cors)。

### url

包含 Response 的 URL。

### text()

返回一个 promise 对象, 结果值是文本格式的响应数据。

```js
fetch('test.json')
  .then((response) => {
    if (response.ok) {
      return response.text()
    }
  })
  .then((text) => {
    // ...
  })
```

### json()

返回一个 promise 对象, 结果值是 JSON 格式的响应数据。

```js
fetch('test.json')
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((json) => {
    // ...
  })
```

### formData()

返回一个 promise 对象, 结果值是 FormData 格式的响应数据。

```js
fetch('test.json')
  .then((response) => {
    if (response.ok) {
      return response.formData()
    }
  })
  .then((formData) => {
    // ...
  })
```

### blob()

返回一个 promise 对象, 结果值是 Blob 格式的响应数据。

```js
const imageElement = document.querySelector('img')
fetch('myImage.png')
  .then((response) => response.blob())
  .then((blob) => {
    imageElement.src = URL.createObjectURL(blob)
  })
```

### arrayBuffer()

返回一个 promise 对象, 结果值是 ArrayBuffer 格式的响应数据。
