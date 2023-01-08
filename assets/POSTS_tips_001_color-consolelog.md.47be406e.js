import{_ as s,c as n,o as a,a as l}from"./app.1b617646.js";const i=JSON.parse('{"title":"你不知道的 console","titleTemplate":false,"description":"","frontmatter":{"date":"2023-01-08 09:21:03","title":"你不知道的 console","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["tip"]},"headers":[{"level":2,"title":"为 log 抹上亿点点色彩","slug":"为-log-抹上亿点点色彩","link":"#为-log-抹上亿点点色彩","children":[]},{"level":2,"title":"打印错误日志","slug":"打印错误日志","link":"#打印错误日志","children":[]},{"level":2,"title":"计算耗时","slug":"计算耗时","link":"#计算耗时","children":[]},{"level":2,"title":"元素计数","slug":"元素计数","link":"#元素计数","children":[]},{"level":2,"title":"漂亮的输出对象","slug":"漂亮的输出对象","link":"#漂亮的输出对象","children":[]}],"relativePath":"_POSTS/tips/001_color-consolelog.md","lastUpdated":1673163682000}'),o={name:"_POSTS/tips/001_color-consolelog.md"},p=l(`<h1 id="你不知道的-console" tabindex="-1">你不知道的 console <a class="header-anchor" href="#你不知道的-console" aria-hidden="true">#</a></h1><p>众所周知, <code>console.log()</code> 会打印传入到控制台的字符串, 且可以接收多个参数。</p><p>但, 好像对 console 的了解, 好像也就局限于此了...</p><p>Node.js 提供了 console 模块, 它基本上与浏览器中的 console 对象相同, 含有大量非常有用的与命令行交互的方法。</p><h2 id="为-log-抹上亿点点色彩" tabindex="-1">为 log 抹上亿点点色彩 <a class="header-anchor" href="#为-log-抹上亿点点色彩" aria-hidden="true">#</a></h2><p>可以使用<a href="https://gist.github.com/iamnewton/8754917" target="_blank" rel="noreferrer">转义序列</a>在控制台中为文本的输出着色, 转义序列是一组标识颜色的字符。例如：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[30m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...黑</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[31m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...红</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[32m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...绿</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[33m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...黄</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[34m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...蓝</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[35m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...紫</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[36m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...青</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[37m%s</span><span style="color:#A6ACCD;">\\x1b</span><span style="color:#C3E88D;">[0m</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好...白</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><blockquote><p>可以对着转义序列去玩一下, 只要更改诸如 <code>[32m%s</code> 的子串即可。</p></blockquote><p>当然, 这是执行操作的底层方法。为控制台输出着色最简单的方法还是使用库, <a href="https://github.com/chalk/chalk" target="_blank" rel="noreferrer">chalk</a> 就是一个这样的库。</p><h2 id="打印错误日志" tabindex="-1">打印错误日志 <a class="header-anchor" href="#打印错误日志" aria-hidden="true">#</a></h2><p><code>console.error</code> 可打印错误日志, 它会打印到 stderr 流。</p><h2 id="计算耗时" tabindex="-1">计算耗时 <a class="header-anchor" href="#计算耗时" aria-hidden="true">#</a></h2><p>可以使用 <code>console.time()</code> 和 <code>console.timeEnd()</code> 轻松的计算中间代码运行所需的时间。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> doSomething </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> measureDoingSomething </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">time</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">doSomething()</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//做点事，并测量所需的时间。</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">doSomething</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">timeEnd</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">doSomething()</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">measureDoingSomething</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 测试</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// doSomething(): 0.619ms</span></span>
<span class="line"></span></code></pre></div><h2 id="元素计数" tabindex="-1">元素计数 <a class="header-anchor" href="#元素计数" aria-hidden="true">#</a></h2><p><code>console.count()</code> 不仅打印日志, 还打印日志的执行次数。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> oranges </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">橙子</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">橙子</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> apples </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">苹果</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">oranges</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fruit</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">count</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fruit</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">apples</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fruit</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">count</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fruit</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 橙子: 1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 橙子: 2</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 苹果: 1</span></span>
<span class="line"></span></code></pre></div><h2 id="漂亮的输出对象" tabindex="-1">漂亮的输出对象 <a class="header-anchor" href="#漂亮的输出对象" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre></div>`,19),e=[p];function t(c,r,D,y,C,F){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{i as __pageData,d as default};
