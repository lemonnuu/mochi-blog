import{_ as l,c as e,e as n,w as o,a as s,r as p,o as t,d as r}from"./app.fd3cb011.js";const m=JSON.parse('{"title":"Fetch","titleTemplate":false,"description":"","frontmatter":{"date":"2023-02-04 10:44:22","title":"Fetch","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["javascript"]},"headers":[{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"input","slug":"input","link":"#input","children":[]},{"level":3,"title":"init","slug":"init","link":"#init","children":[]},{"level":3,"title":"中断","slug":"中断","link":"#中断","children":[]}]},{"level":2,"title":"Response 对象","slug":"response-对象","link":"#response-对象","children":[{"level":3,"title":"body","slug":"body","link":"#body","children":[]},{"level":3,"title":"bodyUsed","slug":"bodyused","link":"#bodyused","children":[]},{"level":3,"title":"headers","slug":"headers","link":"#headers","children":[]},{"level":3,"title":"ok","slug":"ok","link":"#ok","children":[]},{"level":3,"title":"redirected","slug":"redirected","link":"#redirected","children":[]},{"level":3,"title":"status","slug":"status","link":"#status","children":[]},{"level":3,"title":"statusText","slug":"statustext","link":"#statustext","children":[]},{"level":3,"title":"type","slug":"type","link":"#type","children":[]},{"level":3,"title":"url","slug":"url","link":"#url","children":[]},{"level":3,"title":"text()","slug":"text","link":"#text","children":[]},{"level":3,"title":"json()","slug":"json","link":"#json","children":[]},{"level":3,"title":"formData()","slug":"formdata","link":"#formdata","children":[]},{"level":3,"title":"blob()","slug":"blob","link":"#blob","children":[]},{"level":3,"title":"arrayBuffer()","slug":"arraybuffer","link":"#arraybuffer","children":[]}]}],"relativePath":"_POSTS/javascript/009_fetch.md","lastUpdated":1675497441000}'),c={name:"_POSTS/javascript/009_fetch.md"},i=s(`<h1 id="fetch" tabindex="-1">Fetch <a class="header-anchor" href="#fetch" aria-hidden="true">#</a></h1><p>Fetch 能够执行 XMLHttpRequest 对象中的所有任务, XMLHttpRequest 可以选择异步, 而 Fetch 则必须异步。</p><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h2><p>fetch() 方法暴露在全局作用域中, 它返回一个 promise, 这个 promise 会在请求被响应后 resolve, 并传回 <a href="./009_fetch.html#response-对象">Response</a> 对象。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(input[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> init])</span></span>
<span class="line"></span></code></pre></div>`,5),y=s(`<div class="danger custom-block"><p class="custom-block-title">注意</p><p>HTTP 响应状态码为 400、404、500 等并不是网络错误, fetch() 返回的 promise 仍被 resolve, 需要进行进一步判断。</p></div><h3 id="input" tabindex="-1">input <a class="header-anchor" href="#input" aria-hidden="true">#</a></h3><p>fetch() 只有一个必需的参数 input, 表示获取资源的 URL。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>只使用 URL 时, fetch() 会发送 GET 请求, 且只包含最低限度的请求头。要进一步配置如何发送请求, 需要传入可选的第二个参数 init 对象。</p><h3 id="init" tabindex="-1">init <a class="header-anchor" href="#init" aria-hidden="true">#</a></h3><p>init 对象要按照以下键/值进行填充。</p><details class="details custom-block"><summary>body : 请求体内容</summary><p>必须是 Blob、 BufferSource、 FormData、 URLSearchParams、 ReadableStream 或 String 的实例。</p></details><details class="details custom-block"><summary>cache : 用于控制浏览器与 HTTP 缓存的交互</summary><p>要跟踪缓存的重定向, 请求的 redirect 属性值必须是&quot;follow&quot;, 而且必须符合同源策略限制。默认为 default。</p><ul><li>Default <ol><li>fetch() 返回命中的有效缓存。不发送请求</li><li>命中无效(stale)缓存会发送条件式请求。如果响应已经改变, 则更新缓存的值。然后 fetch()返回缓存的值</li><li>未命中缓存会发送请求, 并缓存响应。然后 fetch() 返回响应</li></ol></li><li>no-store <ol><li>浏览器不检查缓存, 直接发送请求</li><li>不缓存响应, 直接通过 fetch() 返回</li></ol></li><li>reload <ol><li>浏览器不检查缓存, 直接发送请求</li><li>缓存响应, 再通过 fetch() 返回</li></ol></li><li>no-cache <ol><li>无论命中有效缓存还是无效缓存都会发送条件式请求。如果响应已经改变, 则更新缓存的值。然后 fetch() 返回缓存的值</li><li>未命中缓存会发送请求, 并缓存响应。然后 fetch() 返回响应</li></ol></li><li>force-cache <ol><li>无论命中有效缓存还是无效缓存都通过 fetch() 返回。不发送请求</li><li>未命中缓存会发送请求, 并缓存响应。然后 fetch() 返回响应</li></ol></li><li>only-if-cached <ol><li>只在请求模式为 same-origin 时使用缓存</li><li>无论命中有效缓存还是无效缓存都通过 fetch() 返回。不发送请求</li><li>未命中缓存返回状态码为 504(网关超时)的响应</li></ol></li></ul></details><details class="details custom-block"><summary>credentials 在外发请求中如何包含 cookie</summary><p>与 XMLHttpRequest 的 WithCredentials 标签类似, 默认为 same-origin。</p><ul><li>omit : 不发送 cookie</li><li>same-origin : 只在请求 URL 与发送 fetch() 请求的页面同源时发送 cookie</li><li>include : 无论同源还是跨域都包含 cookie</li></ul></details><details class="details custom-block"><summary>headers 请求头部</summary><p>默认值为不包含键/值对的 Headers 对象。这不意味着请求不包含任何头部, 浏览器仍然会随请求发送一些头部。</p></details><details class="details custom-block"><summary>integrity 用于强制子资源完整性</summary><p>必须是包含子资源完整性标识符的字符串, 默认为空字符串。</p></details><details class="details custom-block"><summary>keepalive 用于指示浏览器允许请求存在时间超出页面生命周期</summary><p>适合报告事件或分析, 比如页面在 fetch() 请求后很快卸载。设置 keepalive 标志的 fetch() 请求可用于替代 Navigator.sendBeacon()。必须是布尔值, 默认为 false。</p></details><details class="details custom-block"><summary>method HTTP 请求方法</summary><p>默认为 GET。</p><ul><li>GET</li><li>POST</li><li>PUT</li><li>PATCH</li><li>DELETE</li><li>HEAD</li><li>OPTIONS</li><li>CONNECT</li><li>TARCE</li></ul></details><details class="details custom-block"><summary>mode 请求模式</summary><p>这个模式决定来自跨源请求的响应是否有效, 以及客户端可以读取多少响应。违反这里指定模式的请求会抛出错误。</p><p>在通过构造函数手动创建 Request 实例时, 默认为 cors; 否则, 默认为 no-cors。</p><ul><li>cors : 允许遵守 CORS 协议的跨源请求。响应是&quot;CORS 过滤的响应&quot;, 意思是响应中可以访问的浏览器头部是经过浏览器强制白名单过滤的</li><li>no-cors : 允许不需要发送预检请求的跨源请求(HEAD、GET 和只带有满足 CORS 请求头部的 POST)。响应类型是 opaque, 意思是不能读取响应内容</li><li>same-origin : 任何跨源请求都不允许发送</li><li>navigate：用于支持 HTML 导航, 只在文档间导航时使用。基本用不到</li></ul></details><details class="details custom-block"><summary>redirect 用于指定如何处理重定向响应(状态码为 301、 302、 303、 307 或 308)</summary><p>默认为 follow。</p><ul><li>follow : 跟踪重定向请求, 以最终非重定向 URL 的响应作为最终响应</li><li>error : 重定向请求会抛出错误</li><li>manual : 不跟踪重定向请求, 而是返回 opaqueredirect 类型的响应, 同时仍然暴露期望的重定向 URL。允许以手动方式跟踪重定向</li></ul></details><details class="details custom-block"><summary>referrer 用于指定 HTTP 的 Referer 头部的内容</summary><p>默认为 client/about:client</p><ul><li>no-referrer : 以 no-referrer 作为值</li><li>client/about:client : 以当前 URL 或 no-referrer(取决于来源策略 referrerPolicy)作为值</li><li>&lt;URL&gt; : 以伪造 URL 作为值。伪造 URL 的源必须与执行脚本的源匹配</li></ul></details><details class="details custom-block"><summary>referrerPolicy 用于指定 HTTP 的 Referer 头部</summary><p>默认为 no-referrer-when-downgrade。</p><ul><li>no-referrer : 请求中不包含 Referer 头部</li><li>no-referrer-when-downgrade <ol><li>对于从安全 HTTPS 上下文发送到 HTTP URL 的请求, 不包含 Referer 头部</li><li>对于所有其他请求, 将 Referer 设置为完整 URL</li></ol></li><li>origin : 对于所有请求, 将 Referer 设置为只包含源</li><li>same-origin <ol><li>对于跨源请求, 不包含 Referer 头部</li><li>对于同源请求, 将 Referer 设置为完整 URL</li></ol></li><li>strict-origin <ol><li>对于从安全 HTTPS 上下文发送到 HTTP URL 的请求, 不包含 Referer 头部</li><li>对于所有其他请求, 将 Referer 设置为只包含源</li></ol></li><li>origin-when-cross-origin <ol><li>对于跨源请求, 将 Referer 设置为只包含源</li><li>对于同源请求, 将 Referer 设置为完整 URL</li></ol></li><li>strict-origin-when-cross-origin <ol><li>对于从安全 HTTPS 上下文发送到 HTTP URL 的请求, 不包含 Referer 头部</li><li>对于所有其他跨源请求, 将 Referer 设置为只包含源</li><li>对于同源请求, 将 Referer 设置为完整 URL</li></ol></li><li>unsafe-url : 对于所有请求, 将 Referer 设置为完整 URL</li></ul></details><details class="details custom-block"><summary>details 用于支持通过 AbortController 中断进行中的 fetch()请求</summary><p>必须是 AbortSignal 的实例, 默认为未关联控制器的 AbortSignal 实例。</p></details><h3 id="中断" tabindex="-1">中断 <a class="header-anchor" href="#中断" aria-hidden="true">#</a></h3><p>Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController.abort()会中断所有网络传输, 特别适合希望停止传输大型负载的情况。</p><p>中断进行中的 fetch()请求会导致包含错误的拒绝。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> abortController </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AbortController</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wiki.zip</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">signal</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> abortController</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">signal </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#A6ACCD;">(console</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">log)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 10 毫秒后中断请求</span></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> abortController</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">abort</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="response-对象" tabindex="-1">Response 对象 <a class="header-anchor" href="#response-对象" aria-hidden="true">#</a></h2><p>Fetch API 的 Response 接口呈现了对一次请求的响应数据。</p><h3 id="body" tabindex="-1"><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Response/body" target="_blank" rel="noreferrer">body</a> <a class="header-anchor" href="#body" aria-hidden="true">#</a></h3><p>一个简单的 getter, 用于暴露一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream" target="_blank" rel="noreferrer">ReadableStream</a> 类型的 body 内容。</p><h3 id="bodyused" tabindex="-1"><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Response/bodyUsed" target="_blank" rel="noreferrer">bodyUsed</a> <a class="header-anchor" href="#bodyused" aria-hidden="true">#</a></h3><p>一个布尔值, 用来标示该 Response 是否读取过 body。</p><h3 id="headers" tabindex="-1">headers <a class="header-anchor" href="#headers" aria-hidden="true">#</a></h3><p>包含此 Response 所关联的 Headers 对象</p><h3 id="ok" tabindex="-1">ok <a class="header-anchor" href="#ok" aria-hidden="true">#</a></h3><p>一个布尔值, 用来标示该 Response 成功(HTTP 状态码的范围在 200-299)。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">response</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ok</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ... 一些操作</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="redirected" tabindex="-1">redirected <a class="header-anchor" href="#redirected" aria-hidden="true">#</a></h3><p>表示该 Response 是否来自一个重定向, 如果是的话, 它的 URL 列表将会有多个条目。</p><h3 id="status" tabindex="-1">status <a class="header-anchor" href="#status" aria-hidden="true">#</a></h3><p>包含 Response 的状态码(例如 200 表示成功)。</p><h3 id="statustext" tabindex="-1">statusText <a class="header-anchor" href="#statustext" aria-hidden="true">#</a></h3><p>包含了与该 Response 状态码一致的状态信息(例如, OK 对应 200)。</p><h3 id="type" tabindex="-1">type <a class="header-anchor" href="#type" aria-hidden="true">#</a></h3><p>包含 Response 的类型(例如, basic、cors)。</p><h3 id="url" tabindex="-1">url <a class="header-anchor" href="#url" aria-hidden="true">#</a></h3><p>包含 Response 的 URL。</p><h3 id="text" tabindex="-1">text() <a class="header-anchor" href="#text" aria-hidden="true">#</a></h3><p>返回一个 promise 对象, 结果值是文本格式的响应数据。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">response</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ok</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">text</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">text</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="json" tabindex="-1">json() <a class="header-anchor" href="#json" aria-hidden="true">#</a></h3><p>返回一个 promise 对象, 结果值是 JSON 格式的响应数据。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">response</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ok</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">json</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">json</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="formdata" tabindex="-1">formData() <a class="header-anchor" href="#formdata" aria-hidden="true">#</a></h3><p>返回一个 promise 对象, 结果值是 FormData 格式的响应数据。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">response</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ok</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">formData</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">formData</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="blob" tabindex="-1">blob() <a class="header-anchor" href="#blob" aria-hidden="true">#</a></h3><p>返回一个 promise 对象, 结果值是 Blob 格式的响应数据。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> imageElement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">img</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">fetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myImage.png</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">response</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">blob</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">blob</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">imageElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">URL</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createObjectURL</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">blob</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="arraybuffer" tabindex="-1">arrayBuffer() <a class="header-anchor" href="#arraybuffer" aria-hidden="true">#</a></h3><p>返回一个 promise 对象, 结果值是 ArrayBuffer 格式的响应数据。</p>`,58);function D(F,A,d,C,h,u){const a=p("f");return t(),e("div",null,[i,n(a,null,{default:o(()=>[r("只有当遇到网络错误时, fetch() 返回的 promise 才会被 reject, 并传回 TypeError。")]),_:1}),y])}const b=l(c,[["render",D]]);export{m as __pageData,b as default};