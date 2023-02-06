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
