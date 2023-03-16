import{_ as l,c as o,b as a,d as s,e as p,a as e,o as t,r as c}from"./app.c9e81603.js";const _=JSON.parse('{"title":"函数式组件","description":"","frontmatter":{"outline":[2,3]},"headers":[{"level":2,"title":"概览","slug":"概览","link":"#概览","children":[]},{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"2.x 语法","slug":"_2-x-语法","link":"#_2-x-语法","children":[]},{"level":2,"title":"3.x 语法","slug":"_3-x-语法","link":"#_3-x-语法","children":[{"level":3,"title":"通过函数创建组件","slug":"通过函数创建组件","link":"#通过函数创建组件","children":[]},{"level":3,"title":"单文件组件 (SFC)","slug":"单文件组件-sfc","link":"#单文件组件-sfc","children":[]}]}],"relativePath":"_NOTES/Vue3 Migration/Component/001_functional-components.md","lastUpdated":1677030796000}'),r={name:"_NOTES/Vue3 Migration/Component/001_functional-components.md"},D={id:"函数式组件",tabindex:"-1"},y=a("a",{class:"header-anchor",href:"#函数式组件","aria-hidden":"true"},"#",-1),F=e(`<h2 id="概览" tabindex="-1">概览 <a class="header-anchor" href="#概览" aria-hidden="true">#</a></h2><p>对变化的总体概述:</p><ul><li>在 3.x 中, 2.x 带来的函数式组件的性能提升可以忽略不计, 因此我们建议只使用有状态的组件</li><li>函数式组件只能由接收 <code>props</code> 和 <code>context</code> (即：<code>slots</code>、<code>attrs</code>、<code>emit</code>) 的普通函数创建</li><li>非兼容 : <code>functional</code> attribute 已从单文件组件 (SFC) 的 <code>&lt;template&gt;</code> 中移除</li><li>非兼容 : <code>{ functional: true }</code> 选项已从通过函数创建的组件中移除</li></ul><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h2><p>在 Vue 2 中, 函数式组件主要有两个应用场景:</p><ul><li>作为性能优化, 因为它们的初始化速度比有状态组件快得多</li><li>返回多个根节点</li></ul><p>然而, 在 Vue 3 中, 有状态组件的性能已经提高到它们之间的区别可以忽略不计的程度。此外, 有状态组件现在也支持返回多个根节点。</p><p>因此, 函数式组件剩下的唯一应用场景就是简单组件, 比如创建动态标题的组件。否则, 建议你像平常一样使用有状态组件。</p><h2 id="_2-x-语法" tabindex="-1">2.x 语法 <a class="header-anchor" href="#_2-x-语法" aria-hidden="true">#</a></h2><p>使用 <code>&lt;dynamic-heading&gt;</code> 组件, 负责提供适当的标题 (即：<code>h1</code>、<code>h2</code>、<code>h3</code> 等等), 在 2.x 中, 这可以通过单文件组件编写:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Vue 2 函数式组件示例</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">functional</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">level</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">h</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">children</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">h</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">h</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">level</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">children</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>或者, 对于喜欢在单文件组件中使用 <code>&lt;template&gt;</code> 的用户:</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- Vue 2 结合 &lt;template&gt; 的函数式组件示例 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">functional</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">component</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:is</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\`h\${props.level}\`</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">attrs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-on</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">listeners</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">level</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="_3-x-语法" tabindex="-1">3.x 语法 <a class="header-anchor" href="#_3-x-语法" aria-hidden="true">#</a></h2><h3 id="通过函数创建组件" tabindex="-1">通过函数创建组件 <a class="header-anchor" href="#通过函数创建组件" aria-hidden="true">#</a></h3><p>现在, 在 Vue 3 中, 所有的函数式组件都是用普通函数创建的。换句话说, 不需要定义 <code>{ functional: true }</code> 组件选项。</p><p>它们将接收两个参数: <code>props</code> 和 <code>context</code>。<code>context</code> 参数是一个对象, 包含组件的 <code>attrs</code>、<code>slots</code> 和 <code>emit</code> property。</p><p>此外, <code>h</code> 现在是全局导入的, 而不是在 <code>render</code> 函数中隐式提供。</p><p>以前面提到的 <code>&lt;dynamic-heading&gt;</code> 组件为例, 下面是它现在的样子。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">h</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> DynamicHeading </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">h</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">h</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">level</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">attrs</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">slots</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">DynamicHeading</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">props </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">level</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> DynamicHeading</span></span>
<span class="line"></span></code></pre></div><h3 id="单文件组件-sfc" tabindex="-1">单文件组件 (SFC) <a class="header-anchor" href="#单文件组件-sfc" aria-hidden="true">#</a></h3><p>在 3.x 中, 有状态组件和函数式组件之间的性能差异已经大大减少, 并且在大多数用例中是微不足道的。因此, 在单文件组件上使用 <code>functional</code> 的开发者的迁移路径是删除该 attribute, 并将 <code>props</code> 的所有引用重命名为 <code>$props</code>, 以及将 <code>attrs</code> 重命名为 <code>$attrs</code>。</p><p>以之前的 <code>&lt;dynamic-heading&gt;</code> 为例, 下面是它现在的样子。</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">component</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind:is</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\`h\${$props.level}\`</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$attrs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">level</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>主要的区别在于：</p><ul><li>从 <code>&lt;template&gt;</code> 中移除 <code>functional</code> attribute</li><li><code>listeners</code> 现在作为 <code>$attrs</code> 的一部分传递, 可以将其删除</li></ul>`,26);function i(d,C,A,u,h,f){const n=c("Badge");return t(),o("div",null,[a("h1",D,[s("函数式组件 "),p(n,{text:"非兼容",type:"danger"}),s(),y]),F])}const m=l(r,[["render",i]]);export{_ as __pageData,m as default};