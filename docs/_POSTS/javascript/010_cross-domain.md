---
date: '2023-02-04 16:56:30'
title: 跨域资源共享
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# 跨域资源共享

接口请求的一个主要限制是跨源安全策略。默认情况下, 只能访问与发起请求的页面在同一个域内的资源。

## 同源策略

同源策略是一个重要的安全策略, 它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档, 减少可能被攻击的媒介。

同源指的是<f>同域名、同端口、同协议</f>。如果请求 URL 与发送请求页面在任何方面有所不同, 则会抛出安全错误。

:::tip

1. 只有浏览器存在同源策略, Node 环境是没有的。
2. 图片、CSS 及 JS 加载可无视同源策略
   - `<img src="xxx" alt="">`
   - `<link rel="stylesheet" href="xxx">`
   - `<script src="xxx"></script>`

:::

这个安全限制可以防止某些恶意行为。不过, 浏览器也需要支持合法跨源访问的能力。

## 跨域解决方案

<f>所有跨域解决方案都需要服务端允许和配合。</f>

:::tip
在使用一些打包工具诸如 Webpack 时, 开发过程中可以使用代理([devServer.proxy](https://webpack.docschina.org/configuration/dev-server/#devserverproxy))。
:::

### CORS

跨域资源共享(CORS, Cross-Origin Resource Sharing) 定义了浏览器与服务器如何实现跨域通信。CORS 背后得基本思路就是使用自定义的 HTTP 头部允许浏览器和服务器相互了解, 以确实请求或响应应该是成功还是失败。

简单点说, 就是浏览器自动携带 Origin 请求头:

```text
Origin: https://moyo.love
```

服务器配置 Access-Control-Allow-Origin 响应头, 用于暴露公开的源:

:::code-group

```js [Access-Control-Allow-Origin]
response.setHeader('Access-Control-Allow-Origin', 'https://moyo.love')
```

```js [其它示例]
response.setHeader('Access-Control-Allow-Origin', 'https://moyo.love')
response.setHeader('Access-Control-Allow-Headers', 'X-Request-With')
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

// 接收跨域的 cookie
response.setHeader('Access-Control-Allow-Credentials', 'true')
```

:::

#### 预检请求(OPTIONS)

CORS 允许使用自定义头部、除 GET 和 POST 之外的方法, 以及不同请求体数据类型。

但要发送涉及上述高级选项的请求时, 会先向服务器发送一个"预检"请求(OPTIONS), 以向服务器验证是否可行:

```text
Origin: https://moyo.love
Access-Control-Request-Method: 请求希望使用的方法
Access-Control-Request-Headers: (可选) 逗号分隔的自定义头部列表
```

服务器可以确定是否允许这种类型的请求, 服务器会通过在响应中发送如下头部与浏览器沟通这些信息:

```text
Access-Control-Allow-Origin: https://moyo.love
Access-Control-Allow-Methods: 允许的方法(逗号分隔的列表)
Access-Control-Allow-Headers: 服务器允许的头部(逗号分隔的列表)
Access-Control-Max-Age: 缓存预检请求的秒数
```

<f>预检请求返回后, 结果会按响应指定的时间缓存一段时间。换句话说, 只有第一次发送这种类型的请求时才会多发送一次额外的 HTTP 请求。</f>

#### 凭据请求

默认情况下, 跨域请求**不**提供凭据(cookie、HTTP 认证和客户端 SSL 证书)。可以通过将 withCredentials 属性设置为 true 来表明请求会发送凭据。

如果服务器允许带凭据的请求, 那么响应中会包含如下 HTTP 头部:

```text
Access-Control-Allow-Credentials: true
```

如果发送了凭据请求而服务器返回的响应中没有这个头部, 则浏览器不会把响应交给 JavaScript(responseText 是空字符串, status 是 0, onerror() 被调用)。注意, 服务器也可以在预检请求的响应中发送这个 HTTP 头部, 以表明这个源允许发送凭据请求。

### JSONP

JSONP 实现原理:

- &lt;script&gt; 可绕过跨域限制
- 服务器可随意动态拼接数据返回

JSONP 格式包含两个部分：回调和数据。回调是在页面接收到响应之后应该调用的函数, 通常回调函数的名称是通过请求来动态指定的。而数据就是作为参数传给回调函数的 JSON 数据。

:::code-group

```html [浏览器]
<script>
  window.callbackFunc = function (data) {
    // 跨域得到的信息
    console.log(data)
  }
  const script = document.createElement('script')
  script.src = 'https://moyo.love/getData.js?cb=callbackFunc&user=judy'
  document.body.insertBefore(script, document.body.firstChild)
</script>
```

```js [服务器]
// 服务器根据浏览器传入的 cb 字段调用 callbackFunc 函数, 数据 user 查询 judy 的年龄
callbackFunc({
  age: 18,
})
// 拼接的 JS 返回给浏览器执行
```

:::

### 图片探测

图片探测是利用 &lt;img/&gt; 标签实现跨域通信的最早的一种技术。浏览器通过图片探测拿不到任何数据, 但可以通过监听 onload 和 onerror 事件知道什么时候能接收到响应。

图片探测技术可用于统计打点, 可使用第三方统计服务。
