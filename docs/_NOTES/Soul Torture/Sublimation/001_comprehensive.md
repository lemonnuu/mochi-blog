# 综合强化

[[toc]]

## 从输入 URL 到渲染出页面的整个过程?

:::tip 答案

加载资源:

1. 浏览器判断 URL 是否符合规范, 再进行 URL 编码
2. DNS 解析 : 域名 -> IP 地址
3. 浏览器根据 IP 地址向服务器发起 HTTP 请求
4. 服务器处理 HTTP 请求, 并返回给浏览器

渲染过程:

1. 根据 HTML 代码生成 DOM Tree
2. 根据 CSS 代码生成 CSSOM (具体看 CSS 书写位置, 建议放上面先渲染 CSSOM)
3. 将 DOM Tree 和 CSSOM 整合形成 Render Tree
4. 根据 Render Tree 渲染页面
5. 遇到 &lt;script&gt; 则暂停渲染, 优先加载并执行 JS 代码, 完成再继续
6. 直至把 Render Tree 渲染完成

:::

## 性能优化方案?

:::info 前情提要

性能优化原则: (适用于所有编程的性能优化 —— 空间换时间)

- 多使用内存、缓存或其它方法
- 减少 CPU 计算量, 减少网络加载耗时

:::

:::tip 答案

- 让加载更快
  - 减少资源体积: 压缩代码、Tree Shaking
  - 升级 HTTP/2.0, 合并代码并进行合理的 Code Spliting
  - 一些小图片可以 base64 直接嵌入, 减少请求
  - 使用 CDN 加速
- 让渲染更快
  - CSS 放在 head 里, JS 放 body 最下面(先执行 CSS, 最后执行 JS)
  - 对静态资源进行缓存
  - 图片懒加载, 上滑加载更多
  - 对 DOM 查询进行缓存
  - 需要频繁操作 DOM 时, 合并到一起插入 DOM 结构
  - 节流 throttle 防抖 debounce

:::

## 请描述一下 TCP 的三次握手和四次挥手?

:::info 前情提要
为什么 TCP 需要进行三次握手? 确保双方都有收发消息的能力。
:::

![](../../../images/NOTES/Soul%20Torture/Sublimation/001_tcp.svg)

:::tip 答案

TCP 三次握手:

- Client 发包, Server 接收 (Server: 有 Client 找我)
- Server 发包, Client 接收 (Client: Server 已经收到信息了)
- Client 发包, Server 接收 (Server: Client 要准备发送了)

TCP 四次挥手:

- Client 发包, Server 接收 (Server: Client 已请求结束)
- Server 发包, Client 接收 (Client: Server 已收到, 我等待它关闭)
- Server 发包, Client 接收 (Client: Server 此时可以关闭连接了)
- Client 发包, Server 接收 (Server: 可以关闭了)

:::

## HTTP 跨域请求时为何发送 options 请求

:::tip 答案

- options 请求, 是跨域请求之前的预检查, 旨在查询 server 端支持哪些请求方法等
- 它是浏览器自行发起的, 无需我们干预, 不会影响实际的功能

:::
