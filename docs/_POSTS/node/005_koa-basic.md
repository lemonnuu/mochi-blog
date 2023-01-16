---
date: '2023-01-16 08:20:10'
title: Koa 基础使用
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - node
  - koa
---

# Koa 基础使用

[koa](https://koa.bootcss.com/) -- 基于 Node.js 平台下一代 web 开发框架

## Koa 简介

Koa 是一个新的 web 框架, 由 Express 幕后的原班人马打造。

通过利用 async 函数, Koa 丢弃了回调函数, 并有力地增强错误处理。Koa 并**没有**捆绑任何中间件, 而是提供了一套更优雅的方法编写服务端应用程序。

## 安装

Koa 依赖 node v7.6.0 或 ES2015 及更高版本和 async 方法支持。

```shell
npm install koa
```

## 核心概念

### 应用

Koa 应用程序是一个包含一组中间件函数的对象, 它是按照类似堆栈的方式组织执行的。

:::code-group

```js [Hello World]
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

:::

:::details App API

- <f>app.listen(...)</f> : 将 koa 应用程序绑定端口
- <f>app.use(function)</f> : 将中间件方法添加到应用程序, app.use() 返回 this, 可以链式调用
- <f>app.context</f> : 获取上下文
- app.callback() : 返回适用于 http.createServer() 方法的回调函数来处理请求
- app.keys= : 设置签名的 Cookie 密钥
- <f>app.on('error', cb)</f> : 错误处理

:::

#### 中间件函数

中间件函数能够访问<un>上下文(ctx)</un>以及应用程序请求/响应循环中的<un>下一个中间件函数(next)</un>。

```js
const middleware = async (ctx, next) => {
  // ...
  next()
  //...
}
```

中间件函数可以执行以下任务：

- 执行任何代码
- 对上下文进行修改
- 结束请求/响应循环
- 调用堆栈中的下一个中间件

如果当前中间件函数没有结束请求/响应循环, 那么它必须调用 next(), 以将控制权传递给下一个中间件函数。否则, 请求将保持**挂起**状态。

#### 级联

![洋葱模型](../../images/POSTS/node/001_koa-onion-model.png)

:::info 多个中间件会形成一个栈结构, 以"先进后出"的顺序执行:

1. 最外层的中间件首先执行
2. 调用 next 函数, 把执行权交给下一个中间件
3. ...
4. 最内层的中间件最后执行
5. 执行结束后, 把执行权交回上一层的中间件
6. ...
7. 最外层的中间件收回执行权后, 执行 next 函数后面的代码

:::

### 上下文

Koa Context 将 node 的 request 和 response 对象封装到单个对象中, 为编写 Web 应用程序和 API 提供了许多有用的方法。

:::code-group

```js [koa context]
app.use(async (ctx) => {
  ctx // context
  ctx.request // koa request
  ctx.response // koa response
  ctx.req // node request
  ctx.res // node response
})
```

:::

:::details Context API

- ctx.req : Node 的 request 对象
- ctx.res : Node 的 response 对象, 绕过 Koa 的 resopnse 处理是不被支持的
- <f>ctx.request</f> : koa 的 Request 对象
- <f>ctx.response</f> : koa 的 Response 对象
- <f>ctx.params</f> : 路由参数获取, 如 /:id
- ctx.state : 推荐的命名空间，用于通过中间件传递信息和前端视图
- ctx.app : 应用实例
- ctx.app.emit : 发送事件
- ctx.cookies.get(name, \[options]) : 通过 options 获取 cookie name
- ctx.cookies.set(name, value, \[options]) : 通过 options 设置 cookie name 的 value
- <f>ctx.throw(\[status], \[msg], \[properties])</f> : 抛出一个包含 status 属性错误的方法, status 默认值为 500
- ctx.assert(value, \[status], \[msg], \[properties]) : 当 !value 时抛出一个类似 throw 错误的帮助方法
- ctx.respond : 如果需要绕过 Koa 的内置 response 处理, 可以显式设置 ctx.respond = false

:::

绕过 Koa 的 resopnse 处理是不被支持的。应 **避免使用** 以下 node 属性：

- ctx.res.statusCode
- ctx.res.writeHead()
- ctx.res.write()
- ctx.res.end()

:::details Context 别名

1. Request 别名

   - ctx.header
   - <f>ctx.headers</f>
   - ctx.method
   - ctx.method=
   - ctx.url
   - ctx.url=
   - ctx.originalUrl
   - ctx.origin
   - ctx.href
   - ctx.path
   - ctx.path=
   - <f>ctx.query</f>
   - ctx.query=
   - ctx.querystring
   - ctx.querystring=
   - ctx.host
   - ctx.hostname
   - ctx.fresh
   - ctx.stale
   - ctx.socket
   - ctx.protocol
   - ctx.secure
   - ctx.ip
   - ctx.ips
   - ctx.subdomains
   - ctx\.is()
   - ctx.accepts()
   - ctx.acceptsEncodings()
   - ctx.acceptsCharsets()
   - ctx.acceptsLanguages()
   - ctx.get()

2. Response 别名

   - ctx.body
   - <f>ctx.body=</f>
   - ctx.status
   - <f>ctx.status=</f>
   - ctx.message
   - <f>ctx.message=</f>
   - ctx.length=
   - ctx.length
   - ctx.type=
   - ctx.type
   - ctx.headerSent
   - ctx.redirect()
   - ctx.attachment()
   - <f>ctx.set()</f>
   - ctx.append()
   - ctx.remove()
   - ctx.lastModified=
   - ctx.etag=

:::

Request 和 Response 上属性或方法 ctx 大多都可 **直接** 访问, 如 ctx.body。

但需要注意的是, 有关获取消息头的一般是请求头, 设置消息头的一般是响应头。如

- ctx.headers 指的是 request.headers
- ctx.set() 指的是 response.set()

### 请求

Koa Request 对象是 node 原生请求对象之上的抽象, 提供了诸多对 HTTP 服务器开发有用的功能。

:::details Request API

- <f>request.headers</f> : 请求头对象
- request.header : 请求头对象, request.headers 的别名
- <f>request.query</f> : ?分隔的查询字符串或空对象
- request.method : 请求方法
- request.length : 请求的 Content-Length 或 undefined
- request.url : 请求 URL
- request.originalUrl : 请求原始 URL
- request.origin : URL 来源, 包括 protocol 和 host
- request.href : 完整的请求 URL, 包括 protocol、host 和 url
- request.path : 请求路径名
- request.querystring : 根据 "?" 获取的原始查询字符串
- request.search : 同 request.querystring
- request.host : 主机 (hostname:port)
- request.hostname : 主机名
- request.URL : WHATWG 解析的 URL 对象
- request.type : 响应 Content-Type 的 mime-type, 如 image/png
- request.charset : 请求字符集或 undefined
- request.fresh : 检查请求缓存是否"新鲜", 用于协商缓存
- request.stale : 与 request.fresh 相反
- request.protocol : 请求协议
- request.secure : 通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出
- request.ip : 请求远程地址
- request.subdomains : 子域 (数组形式)
- request.is(types...) : 检查传入请求是否包含 Content-Type 消息头字段
- request.accepts(types) : 检查给定的 type(s) 是否可以接受
- request.acceptsEncodings(encodings) : 检查 encodings 是否可以接受
- request.acceptsCharsets(charsets) : 检查 charsets 是否可以接受
- request.acceptsLanguages(langs) : 检查 langs 是否可以接受
- request.idempotent : 检查请求是否是幂等的
- request.socket : 请求套接字
- request.get(field) : 返回请求头 (header), field 不区分大小写

:::

### 响应

Koa Response 对象是 node 原生响应对象之上的抽象, 提供了诸多对 HTTP 服务器开发有用的功能。

:::details Response API

- <f>response.headers</f> : 响应头对象
- response.header : response.headers 的别名
- <f>response.status</f> : 响应状态, 没发送 body 默认 404
- response.message : 响应状态信息
- response.length : 响应的 Content-Length 或 undefined
- <f>response.body</f> : 响应主体, 包含响应主体 response.status 默认 200
  - String : Content-Type 默认为 text/html 或 text/plain, 同时默认字符集是 utf-8
  - Buffer : Content-Type 默认为 application/octet-stream
  - Stream : Content-Type 默认为 application/octet-stream
  - Object : Content-Type 默认为 application/json
- response.get(field) : 不区分大小写获取响应头字段值 field
- response.has(field) : 判断响应头是否含有字段值 field
- response.set(field, value) : 设置响应头
- response.append(field, value) : 追加响应头
- <f>response.set(fields)</f> : 用一个对象设置多个响应头 fields
- response.remove(field) : 移除响应头
- response.type : 响应 Content-Type 的 mime-type, 如 image/png
- response\.is(types...) : 检查响应类型是否是所提供的类型
- response.redirect(url, \[alt]) : 执行 \[302] 重定向到 url
- response.attachment(\[filename], \[options]) : 将 Content-Disposition 设置为 "附件" 以指示客户端提示下载
- response.headerSent : 检查是否已经发送了一个响应头, 用于查看客户端是否可能会收到错误通知
- response.lastModified : Last-Modified 消息头
- response.etag= : 设置 ETag
- response.socket : 响应套接字
- response.vary(field) : 设置 field 的 vary
- response.flushHeaders() : 刷新任何设置的消息头，然后是主体(body)

:::

## 路由

通过 ctx.request.path 可以获取用户请求的路径, 从而实现简单的路由。但是, 推荐使用 [@koa/router](https://www.npmjs.com/package/@koa/router) 中间件。

## 错误处理

全局错误处理可以通过 app.on('error', cb) 捕获, 如果是客户端错误可以使用 app.throw() 方法。
