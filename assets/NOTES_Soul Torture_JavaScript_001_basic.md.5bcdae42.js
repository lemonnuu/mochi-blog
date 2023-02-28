import{_ as o,c as e,b as s,d as l,e as p,w as t,a,r as c,o as i}from"./app.ef610d19.js";const x=JSON.parse('{"title":"基础知识","description":"","frontmatter":{},"headers":[{"level":2,"title":"JavaScript 值类型和引用类型的区别?","slug":"javascript-值类型和引用类型的区别","link":"#javascript-值类型和引用类型的区别","children":[]},{"level":2,"title":"typeof 能判断的类型?","slug":"typeof-能判断的类型","link":"#typeof-能判断的类型","children":[]},{"level":2,"title":"哪些值是假值, 哪些值是真值?","slug":"哪些值是假值-哪些值是真值","link":"#哪些值是假值-哪些值是真值","children":[]},{"level":2,"title":"何时使用 === 何时使用 ==","slug":"何时使用-何时使用","link":"#何时使用-何时使用","children":[]},{"level":2,"title":"什么是作用域？什么是自由变量?","slug":"什么是作用域-什么是自由变量","link":"#什么是作用域-什么是自由变量","children":[]},{"level":2,"title":"什么是闭包？闭包的场景?","slug":"什么是闭包-闭包的场景","link":"#什么是闭包-闭包的场景","children":[]},{"level":2,"title":"如何准确获取数据类型?","slug":"如何准确获取数据类型","link":"#如何准确获取数据类型","children":[]},{"level":2,"title":"this 有几种赋值情况?","slug":"this-有几种赋值情况","link":"#this-有几种赋值情况","children":[]},{"level":2,"title":"window.onload 和 DOMContentLoaded 的区别","slug":"window-onload-和-domcontentloaded-的区别","link":"#window-onload-和-domcontentloaded-的区别","children":[]},{"level":2,"title":"[1, 2, 3].map(parseInt)输出什么?","slug":"_1-2-3-map-parseint-输出什么","link":"#_1-2-3-map-parseint-输出什么","children":[]},{"level":2,"title":"函数声明与函数表达式的区别?","slug":"函数声明与函数表达式的区别","link":"#函数声明与函数表达式的区别","children":[]},{"level":2,"title":"new Object() 和 Object.create() 区别","slug":"new-object-和-object-create-区别","link":"#new-object-和-object-create-区别","children":[]},{"level":2,"title":"箭头函数的缺点?什么时候不能用箭头函数?","slug":"箭头函数的缺点-什么时候不能用箭头函数","link":"#箭头函数的缺点-什么时候不能用箭头函数","children":[]},{"level":2,"title":"for...in 与 for...of 有什么区别","slug":"for-in-与-for-of-有什么区别","link":"#for-in-与-for-of-有什么区别","children":[]},{"level":2,"title":"for await...of 有什么作用?","slug":"for-await-of-有什么作用","link":"#for-await-of-有什么作用","children":[]},{"level":2,"title":"类数组转化为数组?","slug":"类数组转化为数组","link":"#类数组转化为数组","children":[]},{"level":2,"title":"JS 严格模式有什么特点?","slug":"js-严格模式有什么特点","link":"#js-严格模式有什么特点","children":[]},{"level":2,"title":"遍历一个数组用 for 和 forEach 哪个更快?","slug":"遍历一个数组用-for-和-foreach-哪个更快","link":"#遍历一个数组用-for-和-foreach-哪个更快","children":[]}],"relativePath":"_NOTES/Soul Torture/JavaScript/001_basic.md","lastUpdated":1675862808000}'),r={name:"_NOTES/Soul Torture/JavaScript/001_basic.md"},y=a('<h1 id="基础知识" tabindex="-1">基础知识 <a class="header-anchor" href="#基础知识" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#javascript-值类型和引用类型的区别">JavaScript 值类型和引用类型的区别?</a></li><li><a href="#typeof-能判断的类型">typeof 能判断的类型?</a></li><li><a href="#哪些值是假值-哪些值是真值">哪些值是假值, 哪些值是真值?</a></li><li><a href="#何时使用-何时使用">何时使用 === 何时使用 ==</a></li><li><a href="#什么是作用域-什么是自由变量">什么是作用域？什么是自由变量?</a></li><li><a href="#什么是闭包-闭包的场景">什么是闭包？闭包的场景?</a></li><li><a href="#如何准确获取数据类型">如何准确获取数据类型?</a></li><li><a href="#this-有几种赋值情况">this 有几种赋值情况?</a></li><li><a href="#window-onload-和-domcontentloaded-的区别">window.onload 和 DOMContentLoaded 的区别</a></li><li><a href="#_1-2-3-map-parseint-输出什么">[1, 2, 3].map(parseInt)输出什么?</a></li><li><a href="#函数声明与函数表达式的区别">函数声明与函数表达式的区别?</a></li><li><a href="#new-object-和-object-create-区别">new Object() 和 Object.create() 区别</a></li><li><a href="#箭头函数的缺点-什么时候不能用箭头函数">箭头函数的缺点?什么时候不能用箭头函数?</a></li><li><a href="#for-in-与-for-of-有什么区别">for...in 与 for...of 有什么区别</a></li><li><a href="#for-await-of-有什么作用">for await...of 有什么作用?</a></li><li><a href="#类数组转化为数组">类数组转化为数组?</a></li><li><a href="#js-严格模式有什么特点">JS 严格模式有什么特点?</a></li><li><a href="#遍历一个数组用-for-和-foreach-哪个更快">遍历一个数组用 for 和 forEach 哪个更快?</a></li></ul></nav><h2 id="javascript-值类型和引用类型的区别" tabindex="-1">JavaScript 值类型和引用类型的区别? <a class="header-anchor" href="#javascript-值类型和引用类型的区别" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><p>首先需要明确的是 JavaScript 的原始类型和引用类型分别有哪些?</p><ul><li>原始类型 : string、boolean、number、undefined、null、symbol、bigint (7 种)</li><li>引用类型 : object、function、array...</li></ul></div>',4),d={class:"tip custom-block"},F=s("p",{class:"custom-block-title"},"答案",-1),D=s("li",null,"值类型实际存储在栈内存中, 引用类型实际存储在堆内存中",-1),C=s("li",null,"涉及拷贝时, 原始类型拷贝的是另外一个实例, 而引用类型只是拷贝了一个副本",-1),A=a('<div class="text-center border-2 mb-4 rounded-lg"><div class="border-b-2">栈内存</div><div class="flex border-b-2"><div class="flex-1 border-r-2">key</div><div class="flex-1">value</div></div><div class="flex border-b-2"><div class="flex-1 border-r-2">a</div><div class="flex-1">10</div></div><div class="flex border-b-2"><div class="flex-1 border-r-2">b</div><div class="flex-1">引用地址1</div></div><div class="flex"><div class="flex-1 border-r-2">...</div><div class="flex-1">...</div></div></div><div class="text-center border-2 rounded-lg"><div class="flex border-b-2"><div class="flex-1 border-r-2">...</div><div class="flex-1">...</div></div><div class="flex border-b-2"><div class="flex-1 border-r-2">引用地址1</div><div class="flex-1">{age: 10}</div></div><div class="flex border-b-2"><div class="flex-1 border-r-2">key</div><div class="flex-1">value</div></div><div>堆内存</div></div>',2),u=a(`<h2 id="typeof-能判断的类型" tabindex="-1">typeof 能判断的类型? <a class="header-anchor" href="#typeof-能判断的类型" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><p>typeof 可以判断出 string、boolean、number、undefined、symbol、bigint、object、function。</p></div><div class="tip custom-block"><p class="custom-block-title">答案</p><p>typeof 可以用于判断除 null 以外的原始类型以及函数, 特别注意的是, <code>typeof null === &#39;object&#39;</code></p></div><h2 id="哪些值是假值-哪些值是真值" tabindex="-1">哪些值是假值, 哪些值是真值? <a class="header-anchor" href="#哪些值是假值-哪些值是真值" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><ol><li>除了 6 个假值以外的值都为真值</li><li>假值: false、&#39;&#39;(空字符串)、0、NaN、null、undefined</li></ol></div><h2 id="何时使用-何时使用" tabindex="-1">何时使用 === 何时使用 == <a class="header-anchor" href="#何时使用-何时使用" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><ol><li>除了 == null 之外, 其它都一律用全等操作符（===）</li><li>a == null 相当于 a === null || a === undefined</li></ol></div><h2 id="什么是作用域-什么是自由变量" tabindex="-1">什么是作用域？什么是自由变量? <a class="header-anchor" href="#什么是作用域-什么是自由变量" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p>变量的查找规则就是作用域, 当前词法作用域没有定义却使用的变量就是自由变量。</p></div><div class="info custom-block"><p class="custom-block-title">拓展</p><ul><li>作用域分为词法作用域和动态作用域(this)</li><li>词法作用域又分为全局作用域、函数作用域和块级作用域</li><li>var 定义的变量含有全局作用域、函数作用域</li><li>let 或 const 定义的变量含有全局作用域、函数作用域和块级作用域</li></ul></div><h2 id="什么是闭包-闭包的场景" tabindex="-1">什么是闭包？闭包的场景? <a class="header-anchor" href="#什么是闭包-闭包的场景" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><ol><li>无论以哪种方式对函数类型的值进行传递, 就会产生闭包。</li><li>闭包的表现形式是函数定义时所在的作用域和执行时所在的作用域不一致。</li><li>场景： <ul><li>只要使用了回调函数就是闭包, 比如定时器、事件监听器、Ajax 等</li><li>模块导出函数类型的值</li></ul></li></ol></div><h2 id="如何准确获取数据类型" tabindex="-1">如何准确获取数据类型? <a class="header-anchor" href="#如何准确获取数据类型" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p>使用 Object.prototype.toString.call() 获取。</p></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getType</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 注意：不要弄成了 Object.toString.call()</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 只能使用 Object.prototype.toString.call()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">originType</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">toString</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">spaceIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">originType</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">originType</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">spaceIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toLowerCase</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="this-有几种赋值情况" tabindex="-1">this 有几种赋值情况? <a class="header-anchor" href="#this-有几种赋值情况" aria-hidden="true">#</a></h2><p>欠一篇文章, 写一篇这个</p><h2 id="window-onload-和-domcontentloaded-的区别" tabindex="-1">window.onload 和 DOMContentLoaded 的区别 <a class="header-anchor" href="#window-onload-和-domcontentloaded-的区别" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">load</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 页面的全部资源加载完才会执行, 包括图片、视频等</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">DOMContentLoaded</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// DOM 渲染完即可, 此时图片、视频还可能没有下载</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="_1-2-3-map-parseint-输出什么" tabindex="-1">[1, 2, 3].map(parseInt)输出什么? <a class="header-anchor" href="#_1-2-3-map-parseint-输出什么" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><p>首先得知道 parseInt 的规则, parseInt(string, radix)接收两个参数:</p><ul><li>返回一个 <strong>十进制整数</strong> 或 <strong>NaN</strong></li><li>string：要解析的字符串, 不是字符串会调用 String() 转型函数转化为字符串 <ul><li>特别注意的是极大或极小值转化为字符串是用科学计数法表示的</li></ul></li><li>radix：基数, 2 ~ 36 的整数, 表示字符串表示的进制数 <ul><li>如果为假值, 比如 0、&#39;&#39;、null、undefined 则忽略此参数, 基数根据字符串的值推断</li><li>如果不是数字型, 则会调用 Number() 转型函数转化为数字</li><li>超过这个范围则返回 NaN, 0 除外, 0 会忽略此参数, 基数根据字符串的值推断</li></ul></li><li>如果第二个参数 radix 没有或被忽略, 基数根据字符串的值推断, 规则如下 <ul><li>0x（0X）开头的字符串被推断成十六进制</li><li>其它一律表示为十进制</li><li>其实, 在 ES5 之前 0 开头的表示八进制, 后面被废除了, 所以只有以上两种情况。但为了兼容老浏览器, 建议每次使用 parseInt() 函数时都要手动指定基数</li></ul></li><li>parseInt() 能识别 +、-、进制内合规字符。 <ul><li>从字符串的第一个字符开始解析, 如果开头是空格则忽略空格</li><li>如果遇见的第一个字符是不合规字符, 则返回 NaN</li><li>如果第一个字符是合规字符, 则依次检测每个字符, 直到遇见非合规字符或字符串末尾。截取首部的合规字符串进行解析</li></ul></li></ul></div><div class="tip custom-block"><p class="custom-block-title">答案</p><p>输出 1, NaN, NaN</p></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(parseInt)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 相当于</span></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">index</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">arr</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">parseInt</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">index</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 也就是相当于</span></span>
<span class="line"><span style="color:#82AAFF;">parseInt</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">parseInt</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">parseInt</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">解析</p><ul><li>parseInt(1, 0) <ul><li>radix 为 0, 此参数被忽略</li><li>字符串以十进制字符串进行解析</li><li>返回 1</li></ul></li><li>parseInt(2, 1) <ul><li>radix 为 1, 不在 2~36 范围内</li><li>返回 NaN</li></ul></li><li>parseInt(3, 2) <ul><li>radix 为 2, 此参数被忽略</li><li>字符串以二进制字符串进行解析</li><li>二进制字符串的合规字符是 0、1。3 是不合规字符</li><li>返回 NaN</li></ul></li></ul></div><h2 id="函数声明与函数表达式的区别" tabindex="-1">函数声明与函数表达式的区别? <a class="header-anchor" href="#函数声明与函数表达式的区别" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><p>首先得会区分函数声明和函数表达式:</p><p>区分函数声明和函数表达式最简单的方法是看 function 关键字在声明中的位置(不仅仅是一行代码, 而是整个声明中的位置)。如果 function 是声明中的第一个词, 那么就是一个函数声明, 否则就是一个函数表达式。</p><p>例如:</p><ul><li>函数声明 : <code>function foo() {}</code></li><li>函数表达式 : <code>(function foo {})()</code></li></ul></div><div class="tip custom-block"><p class="custom-block-title">答案</p><ol><li>函数声明会函数提升, 而函数表达式不会</li><li>函数声明名称标识符绑定在所在作用域中, 而函数表达式名称标识符绑定在自身函数中</li></ol><blockquote><p>对于第 2 点, 换句话说, <code>(function foo {...})()</code> 作为函数表达式意味着 foo 只能在 ... 所代表的作用域中访问, 外部作用域则不行。</p></blockquote></div><h2 id="new-object-和-object-create-区别" tabindex="-1">new Object() 和 Object.create() 区别 <a class="header-anchor" href="#new-object-和-object-create-区别" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><ol><li>{} 等同于 new Object(), 原型为 Object.prototype</li><li>Object.create(null) 没有原型</li><li>Object.create({...}) 可指定原型</li></ol></div><h2 id="箭头函数的缺点-什么时候不能用箭头函数" tabindex="-1">箭头函数的缺点?什么时候不能用箭头函数? <a class="header-anchor" href="#箭头函数的缺点-什么时候不能用箭头函数" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p>箭头函数的缺点:</p><ul><li>没有 arguments</li><li>无法通过 apply、call、bind 改变 this</li></ul><p>什么时候不能用箭头函数:(其实就是有关 this 的考量)</p><ul><li>对象方法</li><li>对象原型</li><li>构造函数</li><li>动态上下文的回调函数</li><li>Vue 生命周期和 method</li></ul></div><h2 id="for-in-与-for-of-有什么区别" tabindex="-1">for...in 与 for...of 有什么区别 <a class="header-anchor" href="#for-in-与-for-of-有什么区别" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><ul><li>可枚举 : 属性具有 enumerable 特性</li><li>可迭代 : 目标具有 [Symbol.iterator] 属性</li></ul></div><div class="tip custom-block"><p class="custom-block-title">答案</p><ul><li>for...in 用于可枚举数据, 如对象、数组、字符串, 得到 key, 且可以遍历原型上的属性</li><li>for...of 用于可迭代数据, 如数组、字符串、Map、Set, 得到 value</li></ul></div><h2 id="for-await-of-有什么作用" tabindex="-1">for await...of 有什么作用? <a class="header-anchor" href="#for-await-of-有什么作用" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p>for await...of 用于遍历多个 Promise, 有点像遍历 Promise.all() 的结果。</p></div><div class="vp-code-group"><div class="tabs"><input type="radio" name="group--9dla" id="tab-zZkKpSE" checked="checked"><label for="tab-zZkKpSE">举个栗子</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createPromise</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">time</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">resolve</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">time</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createPromise</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createPromise</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">5000</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p3</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createPromise</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">list</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">p1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p2</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p3</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">of</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">list</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1 秒后打印 1000</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 5 秒后打印 5000</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接着立马打印 3000</span></span>
<span class="line"></span></code></pre></div></div></div><h2 id="类数组转化为数组" tabindex="-1">类数组转化为数组? <a class="header-anchor" href="#类数组转化为数组" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><p>常见的类数组:</p><ul><li>函数中的 arguments</li><li>HTMLCollection</li><li>NodeList</li></ul></div><div class="tip custom-block"><p class="custom-block-title">答案</p><ul><li>Array.from(list)</li><li>Array.prototype.slice.call(list)</li><li>[...list]</li></ul></div><h2 id="js-严格模式有什么特点" tabindex="-1">JS 严格模式有什么特点? <a class="header-anchor" href="#js-严格模式有什么特点" aria-hidden="true">#</a></h2><div class="info custom-block"><p class="custom-block-title">前情提要</p><p>开启严格模式:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">use strict</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 全局开启</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">use strict</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 某个函数开启</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></div><div class="tip custom-block"><p class="custom-block-title">答案</p><ul><li>全局变量必须先声明 (var)</li><li>禁止使用 with</li><li>eval 拥有自己独立的作用域</li><li>禁止 this 指向 window</li><li>函数参数不能重名</li></ul></div><h2 id="遍历一个数组用-for-和-foreach-哪个更快" tabindex="-1">遍历一个数组用 for 和 forEach 哪个更快? <a class="header-anchor" href="#遍历一个数组用-for-和-foreach-哪个更快" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p>for 更快, forEach 每次都要创建一个函数来调用, 而 for 不会创建函数, 函数需要独立的作用域, 会有额外的开销。</p></div><div class="info custom-block"><p class="custom-block-title">提一嘴</p><p>越&quot;低级&quot;的代码, 性能往往越好。虽然 for 性能更好, 但是使用 forEach 的可维护性更强。</p></div>`,46);function f(h,v,b,m,k,_){const n=c("un");return i(),e("div",null,[y,s("div",d,[F,s("ol",null,[D,s("li",null,[l("对于值类型, 变量存储的是实际的值。而对于引用类型, 变量存储的是引用地址, 统一放入"),p(n,null,{default:t(()=>[l("栈内存")]),_:1}),l(", 其引用地址可映射到实际存储的堆内存中")]),C]),A]),u])}const E=o(r,[["render",f]]);export{x as __pageData,E as default};