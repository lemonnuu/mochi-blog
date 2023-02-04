---
date: '2023-02-04 08:43:12'
title: Ajax
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# Ajax

[Ajax](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX/Getting_Started) 是异步的 JavaScript 和 XML(Asynchronous JavaScript And XML)。

## 什么是 Ajax

简单点说, 就是使用 XMLHttpRequest 对象与服务器通信。它可以使用 JSON、XML、HTML 和 text 文本格式发送和接收数据。

Ajax 最吸引人的就是它的"异步"特性, 它可以<f>在不重新刷新页面的情况下和服务器通信</f>, 交换数据, 或更新页面。

## XMLHttpRequest

:::code-group

```js [异步 xhr]
const xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      alert(`success : ${xhr.responseText}`)
    } else {
      alert(`error : ${xhr.status}`)
    }
  }
}
xhr.open('get', 'test.json', true)
xhr.send(null)
```

```js [同步 xhr]
const xhr = new XMLHttpRequest()
xhr.open('get', 'test.json', false)
xhr.send(null)
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  alert(xhr.responseText)
} else {
  alert(xhr.status)
}
```

```js [onload 改写异步 xhr]
const xhr = new XMLHttpRequest()
xhr.onload = () => {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    alert(xhr.responseText)
  } else {
    alert(xhr.status)
  }
}
xhr.open('get', 'test.json', false)
xhr.send(null)
```

:::

所有现代浏览器都通过 XMLHttpRequest 构造函数创建 XHR 对象:

```js
const xhr = new XMLHttpRequest()
```

### xhr.open

使用 XHR 对象首先要调用 open() 方法, 这个方法接收三个参数:

- 请求类型(get、post 等)
- 请求 URL(相对、绝对路径)
- 请求是否异步(true 代表异步)

```js
xhr.open('get', 'test.json', true)
```

<f>调用 open() 不会实际发送请求, 只是为发送请求做好准备。</f>

:::warning 注意
只能访问同源 URL, 也就是域名、端口、协议都相同。如果请求 URL 与发送请求页面在任何方面有所不同, 则会抛出安全错误。
:::

### xhr.send

要发送定义好的请求, 必须调用 send() 方法。

```js
xhr.send(null)
```

send() 方法接收一个参数, 是作为请求体发送的数据。如果不需要发送请求体, 则 **必须** 传 null, 因为这个参数在某些浏览器中是必需的。

### xhr.readyState

如果是同步请求, 一般不需要用到它。但大多数下最好使用异步请求, 这样可以不阻塞 JavaScript 代码继续执行。

XHR 对象有一个 readyState 属性, 表示当前处在请求/响应过程中的哪个阶段:

- 0 : 未初始化。尚未调用 open() 方法
- 1 : 已打开(Open)。已调用 open() 方法, 尚未调用 send() 方法
- 2 : 已发送(Sent)。已调用 send() 方法, 尚未收到响应
- 3 : 接收中(Receiving)。已收到部分响应
- <f>4 : 完成(Complete)。已收到所有响应, 可以使用了</f>

### xhr.onreadystatechange

每次 readyState 从一个值变为另一个值, 都会触发 readystatechange 事件。可以借此机会检查 readyState 的值。

```js
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    // ...
  }
}
```

### xhr.status

收到响应后, XHR 对象的以下属性会被填充上数据

- <f>responseText : 作为响应体返回的文本</f>
- responseXML : 如果响应的内容类型是 "text/xml" 或 "application/xml", 那就是包含响应数据的 XML DOM 文档
- <f>status : 响应的 HTTP 状态</f>
- statusText : 响应的 HTTP 状态描述

收到响应后, 第一步要检查 status 属性以确保响应成功返回。

一般来说, <f>HTTP 状态码为 2xx 表示成功</f>。此时, responseText 或 responseXML（如果内容类型正确）属性中会有内容。如果 <f>HTTP
状态码是 304, 则表示资源未修改过</f>, 是从浏览器缓存中直接拿取的, 当然这也意味着响应有效。

为确保收到正确的响应，应该检查这些状态:

```js
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  alert(`success : ${xhr.responseText}`)
} else {
  alert(`error : ${xhr.status}`)
}
```

### xhr.abort(取消请求)

在收到响应之前如果想要取消异步请求, 可以调用 abort() 方法。

```js
xhr.abort()
```

调用这个方法后, XHR 对象会停止触发事件, 并阻止访问这个对象上任何与响应相关的属性。

中断请求后, 应该取消对 XHR 对象的引用。由于内存问题, 不推荐重用 XHR 对象。

### FormData 类型

FormData 类型便于表单序列化, 也便于创建与表单类似格式的数据然后通过 XHR 发送。

```js
const formData = new FormData()
formData.append('name', 'Judy')
```

append() 方法接收两个参数: 键 和 值。相当于表单字段名称和值。

此外, 可以直接给 FormData 构造函数传入一个表单元素。

```js
const form = document.getElementById('user-info')
const formData = new FormData(form)
```

有了 FormData 实例后, 可以直接传给 XHR 对象的 send()方法。

```js
xhr.send(formData)
```

使用 FormData 的另一个方便之处是不再需要给 XHR 对象显式设置任何请求头部了。 XHR 对象能够识别作为 FormData 实例传入的数据类型并自动配置相应的头部。

### xhr.timeout(超时)

xhr.timeout 表示发送请求后等待多少毫秒, 如果响应不成功就中断请求。

在给 timeout 属性设置了一个时间且在该时间过后没有收到响应时, XHR 对象就会触发 timeout 事件, 调用 ontimeout 事件处理程序。

```js
xhr.timeout = 10000
xhr.ontimeout = () => {
  // ...
}
```

### xhr.overrideMimeType

overrideMimeType()方法用于重写 XHR 响应的 MIME 类型。响应的 MIME 类型决定了 XHR 对象如何处理响应,如果有办法覆盖服务器返回的类型, 是很有用的。

假设服务器实际发送了 XML 数据, 但响应头设置的 MIME 类型是 text/plain。结果就会导致虽然数据是 XML, 但 responseXML 属性值是 null。此时调用 overrideMimeType()可以保证将响应当成 XML 而不是纯文本来处理:

```js
xhr.overrideMimeType('text/xml')
xhr.send(null)
```

为了正确覆盖响应的 MIME 类型, 必须在调用 send()之前调用 overrideMimeType()。

## 进度事件

Progress Events 是 W3C 的工作草案, 定义了客户端 - 服务器端通信。这些事件最初只针对 XHR, 现在也推广到了其他类似的 API。有以下 6 个进度相关的事件:

- loadstart : 在接收到响应的第一个字节时触发
- progress : 在接收响应期间反复触发
- error : 在请求出错时触发
- abort : 在调用 abort()终止连接时触发
- load : 在成功接收完响应时触发
- loadend : 在通信完成时，且在 error、 abort 或 load 之后触发

每次请求都会首先触发 loadstart 事件, 之后是一个或多个 progress 事件, 接着是 error、abort 或 load 中的一个, 最后以 loadend 事件结束。

### xhr.onload(可代替 onreadystatechange)

Firefox 最初在实现 XHR 的时候, 曾致力于简化交互模式。最终，增加了一个 load 事件用于替代 readystatechange 事件。

load 事件在响应接收完成后立即触发, 这样就不用检查 readyState 属性了。onload 事件处理程序会收到一个 event 对象, 其 target 属性设置为 XHR 实例, 在这个实例上可以访问所有 XHR 对象属性和方法。不过，并不是所有浏览器都实现了这个事件的 event 对象。考虑到跨浏览器兼容, 还是需要像下面这样使用 XHR 对象变量:

```js
const xhr = new XMLHttpRequest()
xhr.onload = () => {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText)
  } else {
    alert(xhr.status)
  }
}
xhr.open('get', 'test.json', true)
xhr.send(null)
```

### xhr.onprogress(响应进度)

progress 事件会反复触发, 每次触发时, onprogress 事件处理程序都会收到 event 对象, 其 target 属性是 XHR 对象, 且包含 3 个额外属性:

- lengthComputable : 布尔值, 表示进度信息是否可用
- position : 接收到的字节数
- totalSize : 响应的 ContentLength 头部定义的总字节数

利用这些信息, 可以给用户提供进度条:

```js
xhr.onprogress = (event) => {
  const progress = ((event.position / event.totalSize) * 100).toFixed(2)
}
```

### xhr.upload(上传进度)

xhr.upload 用来表示上传的进度, 它是不透明的。但是可以通过对其绑定事件来追踪它的进度:

- onloadstart : 获取开始
- onprogress : 数据传输进行中
- onabort : 获取操作终止
- onerror : 获取失败
- onload : 获取成功
- ontimeout : 获取操作在用户规定的时间内未完成
- onloadend : 获取完成（不论成功与否）

```js
xhr.upload.onprogress = () => {
  // ...
}
```
