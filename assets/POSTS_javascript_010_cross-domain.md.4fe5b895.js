import{_ as p,c as t,b as a,d as s,e as n,w as o,a as e,r as c,o as r}from"./app.e96f5412.js";const f=JSON.parse('{"title":"跨域资源共享","titleTemplate":false,"description":"","frontmatter":{"date":"2023-02-04 16:56:30","title":"跨域资源共享","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["javascript"]},"headers":[{"level":2,"title":"同源策略","slug":"同源策略","link":"#同源策略","children":[]},{"level":2,"title":"跨域解决方案","slug":"跨域解决方案","link":"#跨域解决方案","children":[{"level":3,"title":"CORS","slug":"cors","link":"#cors","children":[]},{"level":3,"title":"JSONP","slug":"jsonp","link":"#jsonp","children":[]},{"level":3,"title":"图片探测","slug":"图片探测","link":"#图片探测","children":[]}]}],"relativePath":"_POSTS/javascript/010_cross-domain.md","lastUpdated":1675513214000}'),i={name:"_POSTS/javascript/010_cross-domain.md"},D=a("h1",{id:"跨域资源共享",tabindex:"-1"},[s("跨域资源共享 "),a("a",{class:"header-anchor",href:"#跨域资源共享","aria-hidden":"true"},"#")],-1),y=a("p",null,"接口请求的一个主要限制是跨源安全策略。默认情况下, 只能访问与发起请求的页面在同一个域内的资源。",-1),C=a("h2",{id:"同源策略",tabindex:"-1"},[s("同源策略 "),a("a",{class:"header-anchor",href:"#同源策略","aria-hidden":"true"},"#")],-1),d=a("p",null,"同源策略是一个重要的安全策略, 它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档, 减少可能被攻击的媒介。",-1),A=e('<div class="tip custom-block"><p class="custom-block-title">TIP</p><ol><li>只有浏览器存在同源策略, Node 环境是没有的。</li><li>图片、CSS 及 JS 加载可无视同源策略 <ul><li><code>&lt;img src=&quot;xxx&quot; alt=&quot;&quot;&gt;</code></li><li><code>&lt;link rel=&quot;stylesheet&quot; href=&quot;xxx&quot;&gt;</code></li><li><code>&lt;script src=&quot;xxx&quot;&gt;&lt;/script&gt;</code></li></ul></li></ol></div><p>这个安全限制可以防止某些恶意行为。不过, 浏览器也需要支持合法跨源访问的能力。</p><h2 id="跨域解决方案" tabindex="-1">跨域解决方案 <a class="header-anchor" href="#跨域解决方案" aria-hidden="true">#</a></h2>',3),F=e(`<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在使用一些打包工具诸如 Webpack 时, 开发过程中可以使用代理(<a href="https://webpack.docschina.org/configuration/dev-server/#devserverproxy" target="_blank" rel="noreferrer">devServer.proxy</a>)。</p></div><h3 id="cors" tabindex="-1">CORS <a class="header-anchor" href="#cors" aria-hidden="true">#</a></h3><p>跨域资源共享(CORS, Cross-Origin Resource Sharing) 定义了浏览器与服务器如何实现跨域通信。CORS 背后得基本思路就是使用自定义的 HTTP 头部允许浏览器和服务器相互了解, 以确实请求或响应应该是成功还是失败。</p><p>简单点说, 就是浏览器自动携带 Origin 请求头:</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Origin: https://moyo.love</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>服务器配置 Access-Control-Allow-Origin 响应头, 用于暴露公开的源:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-Fx9Yw" id="tab-VMTwWeq" checked="checked"><label for="tab-VMTwWeq">Access-Control-Allow-Origin</label><input type="radio" name="group-Fx9Yw" id="tab-80yF7ro"><label for="tab-80yF7ro">其它示例</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Origin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://moyo.love</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Origin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://moyo.love</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Headers</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">X-Request-With</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Methods</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PUT,POST,GET,DELETE,OPTIONS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接收跨域的 cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Access-Control-Allow-Credentials</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div></div></div><h4 id="预检请求-options" tabindex="-1">预检请求(OPTIONS) <a class="header-anchor" href="#预检请求-options" aria-hidden="true">#</a></h4><p>CORS 允许使用自定义头部、除 GET 和 POST 之外的方法, 以及不同请求体数据类型。</p><p>但要发送涉及上述高级选项的请求时, 会先向服务器发送一个&quot;预检&quot;请求(OPTIONS), 以向服务器验证是否可行:</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Origin: https://moyo.love</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Request-Method: 请求希望使用的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Request-Headers: (可选) 逗号分隔的自定义头部列表</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>服务器可以确定是否允许这种类型的请求, 服务器会通过在响应中发送如下头部与浏览器沟通这些信息:</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Origin: https://moyo.love</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Methods: 允许的方法(逗号分隔的列表)</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Headers: 服务器允许的头部(逗号分隔的列表)</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Max-Age: 缓存预检请求的秒数</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,13),h=e(`<h4 id="凭据请求" tabindex="-1">凭据请求 <a class="header-anchor" href="#凭据请求" aria-hidden="true">#</a></h4><p>默认情况下, 跨域请求<strong>不</strong>提供凭据(cookie、HTTP 认证和客户端 SSL 证书)。可以通过将 withCredentials 属性设置为 true 来表明请求会发送凭据。</p><p>如果服务器允许带凭据的请求, 那么响应中会包含如下 HTTP 头部:</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Credentials: true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>如果发送了凭据请求而服务器返回的响应中没有这个头部, 则浏览器不会把响应交给 JavaScript(responseText 是空字符串, status 是 0, onerror() 被调用)。注意, 服务器也可以在预检请求的响应中发送这个 HTTP 头部, 以表明这个源允许发送凭据请求。</p><h3 id="jsonp" tabindex="-1">JSONP <a class="header-anchor" href="#jsonp" aria-hidden="true">#</a></h3><p>JSONP 实现原理:</p><ul><li>&lt;script&gt; 可绕过跨域限制</li><li>服务器可随意动态拼接数据返回</li></ul><p>JSONP 格式包含两个部分：回调和数据。回调是在页面接收到响应之后应该调用的函数, 通常回调函数的名称是通过请求来动态指定的。而数据就是作为参数传给回调函数的 JSON 数据。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-IjqSP" id="tab-7UQAseG" checked="checked"><label for="tab-7UQAseG">浏览器</label><input type="radio" name="group-IjqSP" id="tab-pO2_xlA"><label for="tab-pO2_xlA">服务器</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">callbackFunc</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 跨域得到的信息</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> script </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  script</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://moyo.love/getData.js?cb=callbackFunc&amp;user=judy</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">insertBefore</span><span style="color:#A6ACCD;">(script</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">firstChild)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 服务器根据浏览器传入的 cb 字段调用 callbackFunc 函数, 数据 user 查询 judy 的年龄</span></span>
<span class="line"><span style="color:#82AAFF;">callbackFunc</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 拼接的 JS 返回给浏览器执行</span></span>
<span class="line"></span></code></pre></div></div></div><h3 id="图片探测" tabindex="-1">图片探测 <a class="header-anchor" href="#图片探测" aria-hidden="true">#</a></h3><p>图片探测是利用 &lt;img/&gt; 标签实现跨域通信的最早的一种技术。浏览器通过图片探测拿不到任何数据, 但可以通过监听 onload 和 onerror 事件知道什么时候能接收到响应。</p><p>图片探测技术可用于统计打点, 可使用第三方统计服务。</p>`,13);function u(g,_,b,v,T,m){const l=c("f");return r(),t("div",null,[D,y,C,d,a("p",null,[s("同源指的是"),n(l,null,{default:o(()=>[s("同域名、同端口、同协议")]),_:1}),s("。如果请求 URL 与发送请求页面在任何方面有所不同, 则会抛出安全错误。")]),A,n(l,null,{default:o(()=>[s("所有跨域解决方案都需要服务端允许和配合。")]),_:1}),F,n(l,null,{default:o(()=>[s("预检请求返回后, 结果会按响应指定的时间缓存一段时间。换句话说, 只有第一次发送这种类型的请求时才会多发送一次额外的 HTTP 请求。")]),_:1}),h])}const x=p(i,[["render",u]]);export{f as __pageData,x as default};