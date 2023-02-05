import{_ as o,c as d,b as a,d as e,e as t,w as l,a as i,r as c,o as p}from"./app.fd3cb011.js";const h="/mochi-blog/assets/002_http-cache.31db286a.svg",R=JSON.parse('{"title":"HTTP 缓存","titleTemplate":false,"description":"","frontmatter":{"date":"2023-02-05 10:38:20","title":"HTTP 缓存","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["http"]},"headers":[{"level":2,"title":"缓存相关的首部字段","slug":"缓存相关的首部字段","link":"#缓存相关的首部字段","children":[{"level":3,"title":"Expires","slug":"expires","link":"#expires","children":[]},{"level":3,"title":"Cache-Control","slug":"cache-control","link":"#cache-control","children":[]}]},{"level":2,"title":"资源标识相关的首部字段","slug":"资源标识相关的首部字段","link":"#资源标识相关的首部字段","children":[{"level":3,"title":"Last-Modified 与 If-Modified-Since","slug":"last-modified-与-if-modified-since","link":"#last-modified-与-if-modified-since","children":[]},{"level":3,"title":"Etag 与 If-None-Match","slug":"etag-与-if-none-match","link":"#etag-与-if-none-match","children":[]}]},{"level":2,"title":"强缓存与协商缓存","slug":"强缓存与协商缓存","link":"#强缓存与协商缓存","children":[{"level":3,"title":"强缓存","slug":"强缓存","link":"#强缓存","children":[]},{"level":3,"title":"协商缓存","slug":"协商缓存","link":"#协商缓存","children":[]}]},{"level":2,"title":"不同刷新操作, 不同缓存策略","slug":"不同刷新操作-不同缓存策略","link":"#不同刷新操作-不同缓存策略","children":[]},{"level":2,"title":"缓存改进方案","slug":"缓存改进方案","link":"#缓存改进方案","children":[{"level":3,"title":"md5/hash 缓存","slug":"md5-hash-缓存","link":"#md5-hash-缓存","children":[]},{"level":3,"title":"CDN 缓存","slug":"cdn-缓存","link":"#cdn-缓存","children":[]}]}],"relativePath":"_POSTS/http/002_http-cache.md","lastUpdated":1675603026000}'),r={name:"_POSTS/http/002_http-cache.md"},_=a("h1",{id:"http-缓存",tabindex:"-1"},[e("HTTP 缓存 "),a("a",{class:"header-anchor",href:"#http-缓存","aria-hidden":"true"},"#")],-1),u=a("strong",null,"浏览器端",-1),g=i(`<h2 id="缓存相关的首部字段" tabindex="-1">缓存相关的首部字段 <a class="header-anchor" href="#缓存相关的首部字段" aria-hidden="true">#</a></h2><h3 id="expires" tabindex="-1">Expires <a class="header-anchor" href="#expires" aria-hidden="true">#</a></h3><p>Expires 响应头用于控制缓存过期时间, 它是 HTTP/1.0 时代的产物, 后被 Cache-Control 通用首部字段替代。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Expires: Sun Feb 05 2023 17:05:35 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,4),C=a("h3",{id:"cache-control",tabindex:"-1"},[e("Cache-Control "),a("a",{class:"header-anchor",href:"#cache-control","aria-hidden":"true"},"#")],-1),f=a("p",null,"Cache-Control 是通用首部字段, 它是 HTTP/1.1 时代的产物。",-1),T=a("blockquote",null,[a("p",null,"当请求头设置了此字段时, 以请求头的为准, 但是请求头一般不包含此字段。")],-1),m=a("p",null,"它的常用指令如下:",-1),x=a("li",null,"no-store : 不缓存任何内容",-1),b=a("li",null,"public : 任意方都可缓存, 如代理",-1),A=i(`<div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Cache-Control: private, max-age=3600 (单位为秒)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">补充</p><ul><li>max-age 为必需参数是指如果需要缓存必须设置此字段, 例如协商缓存也要设置 max-age=0</li><li>no-cache 默认参数是指默认就是 no-cache, 如 <code>max-age=100</code> 与 <code>max-age=100, no-cache</code> 等价</li></ul></div><h2 id="资源标识相关的首部字段" tabindex="-1">资源标识相关的首部字段 <a class="header-anchor" href="#资源标识相关的首部字段" aria-hidden="true">#</a></h2><p>资源标识相关的首部字段用于判断资源是否过期。</p><h3 id="last-modified-与-if-modified-since" tabindex="-1">Last-Modified 与 If-Modified-Since <a class="header-anchor" href="#last-modified-与-if-modified-since" aria-hidden="true">#</a></h3>`,5),v=i(`<div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Last-Modified: Sun Feb 05 2023 17:05:35 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>If-Modified-Since 请求头就是上一次资源响应的 Last-Modified, 服务器获取此字段判断资源是否过期, 如果没有过期返回 304 状态码, 通知浏览器使用缓存即可, 否则, 返回最新资源与最新资源标识。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">If-Modified-Since: Sun Feb 05 2023 17:05:35 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="etag-与-if-none-match" tabindex="-1">Etag 与 If-None-Match <a class="header-anchor" href="#etag-与-if-none-match" aria-hidden="true">#</a></h3><p>由于 Last-Modified 并不能保证百分百准确, 所以 HTTP 协议增加了 Etag 字段作为资源的唯一标识。</p>`,5),k=i(`<div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Etag: &#39;usagi-1234&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>If-None-Match 请求头就是上一次资源响应的 Etag, 服务器获取此字段判断资源 Etag 是否相同, 不一致才会将新资源返回给浏览器, 否则, 返回 304 状态码, 通知浏览器使用缓存即可。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">If-None-Match: &#39;usagi-1234&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Etag 优先级比 Last-Modified 高。</p></div><h2 id="强缓存与协商缓存" tabindex="-1">强缓存与协商缓存 <a class="header-anchor" href="#强缓存与协商缓存" aria-hidden="true">#</a></h2>`,5),S=a("strong",null,"以下默认此条件",-1),y=i('<p>当 Cache-Control 值为 no-store 时, 浏览器会直接发起请求, 且不携带任何资源标识首部字段, 对返回资源也不进行缓存。</p><h3 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-hidden="true">#</a></h3><p>当 Cache-Control 的 max-age 值未过期时会触发强缓存, 浏览器直接读取缓存不请求接口。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>Cache-Control 的 max-age 值过期时, 浏览器请求仍然会携带 Etag、Last-Modified 资源标识, 此时就变成了协商缓存。当资源未改变时返回 304 状态码并更新 max-age 值, 否则, 返回新的资源。</p></div><h3 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-hidden="true">#</a></h3><p>协商缓存的意思就是浏览器与服务器共同判断资源是否可用, 常用的做法是将 max-age=0。</p><p>这样一来浏览器每次想使用缓存时都会发送一个携带资源标识的请求给浏览器。 如果资源可用, 服务器返回 304 状态码, 否则返回新的资源与资源标识。</p><h2 id="不同刷新操作-不同缓存策略" tabindex="-1">不同刷新操作, 不同缓存策略 <a class="header-anchor" href="#不同刷新操作-不同缓存策略" aria-hidden="true">#</a></h2><ul><li>正常操作 : 强制缓存有效, 协商缓存有效</li><li>手动刷新 : 强制缓存失效, 协商缓存有效</li><li>强制刷新 : 强制缓存失效, 协商缓存失效</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>所谓的协商缓存失效实际就是发送请求时不携带资源标识头部信息而已。</p></div><p><img src="'+h+'" alt="HTTP 缓存"></p><h2 id="缓存改进方案" tabindex="-1">缓存改进方案 <a class="header-anchor" href="#缓存改进方案" aria-hidden="true">#</a></h2>',12),P=i('<h3 id="md5-hash-缓存" tabindex="-1">md5/hash 缓存 <a class="header-anchor" href="#md5-hash-缓存" aria-hidden="true">#</a></h3><p>通过不缓存 HTML 文件, 为静态文件名称(css、js、image)添加 MD5 或 hash 标识, 解决浏览器无法跳过缓存过期时间主动感知文件变化的问题。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>像一些打包工具都可以设置给静态文件名称加上内容哈希值, 如 webpack 的 contenthash。这样一来, 文件发生变化后 html 的引用也会发生变化, 相当于请求了一个新的资源。</p></div><h3 id="cdn-缓存" tabindex="-1">CDN 缓存 <a class="header-anchor" href="#cdn-缓存" aria-hidden="true">#</a></h3><p>CDN 是构建在网络之上的内容分发网络, 依靠部署在各地的边缘服务器, 通过中心平台的负载均衡、内容分发、调度等功能模块, 使用户就近获取所需内容, 降低网络拥塞, 提高用户访问响应速度和命中率。</p>',5);function D(I,M,E,N,V,H){const s=c("f"),n=c("Badge");return p(),d("div",null,[_,a("p",null,[e("HTTP 缓存一般指的是为了性能优化在"),u,e("缓存一些静态文件, 例如 css、js、image 等。"),t(s,null,{default:l(()=>[e("HTML 文件一般不作缓存。")]),_:1})]),g,t(s,null,{default:l(()=>[e('由于 Expires 采取的是"绝对时间", 而服务器与浏览器的时间很有可能不一致, 所以它的判断并不是很准确。')]),_:1}),C,f,T,m,a("ul",null,[a("li",null,[e("max-age"),t(n,{type:"tip",text:"必需参数"}),e(" : 响应的有效时长")]),a("li",null,[e("no-cache"),t(n,{type:"tip",text:"默认参数"}),e(" : 获取资源前向服务器验证缓存是否可用")]),x,b,a("li",null,[e("private"),t(n,{type:"tip",text:"默认参数"}),e(" : 只允许用户做缓存, 不允许代理做缓存")])]),t(s,null,{default:l(()=>[e("max-age 可以说是 Expires 的替代产物, 它采取的是有效时长(时间的偏移量)。")]),_:1}),A,a("p",null,[e("Last-Modified 响应头表示资源最后修改时间, 但"),t(s,null,{default:l(()=>[e("只能精确到秒级")]),_:1}),e(", 所以并不能保证百分百准确。")]),v,t(s,null,{default:l(()=>[e("Etag 响应头有点像资源内容的哈希, 它是一个字符串, 只有资源内容发生改变时才会发生变化。")]),_:1}),k,t(s,null,{default:l(()=>[e("首先, 不管是强缓存还是协商缓存 Cache-Control 的值都不包含 no-store。")]),_:1}),S,e("。"),y,t(s,null,{default:l(()=>[e("浏览器是无法跳过缓存过期时间主动感知文件变化的。")]),_:1}),e("换句话说, 在缓存没有过期时, 哪怕服务器的资源发生了变化, 浏览器仍会使用缓存文件。"),P])}const B=o(r,[["render",D]]);export{R as __pageData,B as default};