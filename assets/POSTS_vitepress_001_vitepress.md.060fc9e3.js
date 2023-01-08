import{_ as n,c as l,d as a,a as p,o,r as e}from"./app.1b617646.js";const h=JSON.parse('{"title":"vitepress 常用配置","titleTemplate":false,"description":"","frontmatter":{"date":"2023-01-06 08:22:13","title":"vitepress 常用配置","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["vitepress"]},"headers":[{"level":2,"title":"页面配置","slug":"页面配置","link":"#页面配置","children":[]},{"level":2,"title":"静态资源处理","slug":"静态资源处理","link":"#静态资源处理","children":[{"level":3,"title":"公共文件","slug":"公共文件","link":"#公共文件","children":[]},{"level":3,"title":"静态资源","slug":"静态资源","link":"#静态资源","children":[]},{"level":3,"title":"基础 URL","slug":"基础-url","link":"#基础-url","children":[]}]},{"level":2,"title":"Markdown 扩展","slug":"markdown-扩展","link":"#markdown-扩展","children":[{"level":3,"title":"自定义容器","slug":"自定义容器","link":"#自定义容器","children":[]},{"level":3,"title":"代码块","slug":"代码块","link":"#代码块","children":[]}]},{"level":2,"title":"Badge","slug":"badge","link":"#badge","children":[]}],"relativePath":"_POSTS/vitepress/001_vitepress.md","lastUpdated":1673163682000}'),t={name:"_POSTS/vitepress/001_vitepress.md"},c=p(`<h1 id="vitepress" tabindex="-1">VitePress <a class="header-anchor" href="#vitepress" aria-hidden="true">#</a></h1><p><a href="https://vitepress.vuejs.org/" target="_blank" rel="noreferrer">VitePress</a> 是 <a href="https://vuepress.vuejs.org/zh/" target="_blank" rel="noreferrer">VuePress</a> 的小兄弟, 基于 Vite 构建。</p><blockquote><p>本篇文章主要针对笔者本身, 不具有普适性。如有需要请查阅官网, 避免浪费时间。</p></blockquote><h2 id="页面配置" tabindex="-1">页面配置 <a class="header-anchor" href="#页面配置" aria-hidden="true">#</a></h2><p>frontmatter 常用配置项：</p><ul><li>title : 标题 (String)</li><li>titleTemplate : 标题后缀 (String | Boolean)</li><li>description : 描述 (String)</li><li>layout : 布局 (docs、page、home、false)</li><li>aside : 是否显示大纲 (Boolean)</li><li>outline : 大纲层级 (Number | [number, number] | &#39;deep&#39; | false)</li><li>editLink : 是否可编辑 (Boolean)</li><li>lastUpdated: 是否显示最后更新时间 (Boolean)</li></ul><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">title</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">titleTemplate</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">title suffix</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">description</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">layout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docs</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">aside</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">outline</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">editLink</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">lastUpdated</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"></span></code></pre></div><h2 id="静态资源处理" tabindex="-1">静态资源处理 <a class="header-anchor" href="#静态资源处理" aria-hidden="true">#</a></h2><h3 id="公共文件" tabindex="-1">公共文件 <a class="header-anchor" href="#公共文件" aria-hidden="true">#</a></h3><p>在 VitePress 的配置中可能需要引用一些静态资源(如 logo 图标), 这时候就需要使用到公共文件。</p><p>存放在 <code>docs/public</code> 下的静态资源将原样复制到 <code>dist</code> 目录的跟文件。</p><p>需要注意的是, 应该使用<span class="text-red-400">根绝对路径</span>引用放置在 <code>docs/public</code> 文件夹中的文件。例如, 文件 <code>docs/public/logo.png</code> 在源代码中始终作为 <code>/logo.png</code> 被引用。</p><h3 id="静态资源" tabindex="-1">静态资源 <a class="header-anchor" href="#静态资源" aria-hidden="true">#</a></h3><p>所有的 Markdown 文件都通过 Vite 处理编译成 Vue 组件。可以并且<span class="text-red-400">应当使用相对 URL 引用静态资源。</span></p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">![</span><span style="color:#C3E88D;">An image</span><span style="color:#89DDFF;">](</span><span style="color:#A6ACCD;text-decoration:underline;">./image.png</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>当然也可以使用绝对公共路径(基于项目根目录), 只不过相对路径可能更符合使用习惯而已。</p><p>但是不管如何, 所有静态路径引用, 包括绝对路径, 都应当基于工作目录结构。</p><p>所有被引用的静态资源, 在生产构建中会被复制到 <code>dist</code> 文件夹中,并重命名为 hash 文件名的文件, 小于 4kb 的图片资源会转化为内联的 base64 字符串。</p><h3 id="基础-url" tabindex="-1">基础 URL <a class="header-anchor" href="#基础-url" aria-hidden="true">#</a></h3><p>如果站点部署在非根 URL, 需要在 <code>.vitepress/config.js</code> 中设置 base 选项。</p><p>例如, 如果计划部署站点到 <code>https://foo.github.io/bar/</code>, base 选项就应该设置为 <code>&#39;/bar/&#39;</code> (始终以/开始和结尾)。</p><p>设置基础 URL 后, 为了引用静态资源, 就需要使用类似 <code>/bar/image.png</code> 的 URL。 但是, 当改变 base 值时, 这样会很脆弱。</p><p>为此, VitePress 提供了一个内置的助手 <code>$withBase</code> (注入在 Vue 原型上), 用于生成正确的路径：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$withBase(&#39;/foo.png&#39;)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre></div><p>注意, 不仅可以在主题组件中使用以上语法, 还可以在 Markdown 文件中使用。</p><h2 id="markdown-扩展" tabindex="-1">Markdown 扩展 <a class="header-anchor" href="#markdown-扩展" aria-hidden="true">#</a></h2><h3 id="自定义容器" tabindex="-1">自定义容器 <a class="header-anchor" href="#自定义容器" aria-hidden="true">#</a></h3><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">::: info</span></span>
<span class="line"><span style="color:#A6ACCD;">This is an info box.</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">::: tip</span></span>
<span class="line"><span style="color:#A6ACCD;">This is a tip</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">::: warning 自定义标题</span></span>
<span class="line"><span style="color:#A6ACCD;">This is a warning</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">::: danger</span></span>
<span class="line"><span style="color:#A6ACCD;">This is a dangerous warning</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This is an info box.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This is a tip</p></div><div class="warning custom-block"><p class="custom-block-title">自定义标题</p><p>This is a warning</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>This is a dangerous warning</p></div><details class="details custom-block"><summary>Details</summary><p>This is a details</p></details><h3 id="代码块" tabindex="-1">代码块 <a class="header-anchor" href="#代码块" aria-hidden="true">#</a></h3><p>VitePress 通过 <a href="https://shiki.matsu.io/" target="_blank" rel="noreferrer">Shiki</a> 来实现 Markdown 中语法块的语法高亮, 使用了有色文本。</p><h4 id="行高亮" tabindex="-1">行高亮 <a class="header-anchor" href="#行高亮" aria-hidden="true">#</a></h4><ul><li>单行 : <code>{1}</code>、<code>{3}</code>、<code>{5}</code></li><li>行范围 : <code>{5-8}</code>、<code>{3-10}</code>、<code>{10-17}</code></li><li>混合 : <code>{4,7-13,16,23-27,40}</code> <span class="text-red-400">(没有空格)</span></li></ul><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">js {1,3-4}</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Highlighted!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight has-highlighted-lines"><code><span class="line highlighted"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line highlighted"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line highlighted"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Highlighted!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="行号" tabindex="-1">行号 <a class="header-anchor" href="#行号" aria-hidden="true">#</a></h4><ul><li><code>:line-numbers</code></li></ul><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">ts:line-numbers</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> line2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">This is line 1</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> line3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">This is line 2</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> line2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">This is line 1</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> line3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">This is line 2</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="focus-代码块" tabindex="-1">focus 代码块 <a class="header-anchor" href="#focus-代码块" aria-hidden="true">#</a></h4><ul><li><code>[!code focus]</code></li></ul><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Focused!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// [!code  focus]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 上面的 !code focus 之间的空格实际为 1 个</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight has-focused-lines"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line has-focus"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Focused!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="diffs-代码块" tabindex="-1">diffs 代码块 <a class="header-anchor" href="#diffs-代码块" aria-hidden="true">#</a></h4><ul><li><code>[!code --]</code></li><li><code>[!code ++]</code></li></ul><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Removed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// [!code  --]</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">msg</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Added</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// [!code  ++]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 上面的 !code -- 之间的空格实际为 1 个</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight has-diff"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line diff remove"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Removed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span></span>
<span class="line diff add"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">msg</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Added</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="error-warning-代码块" tabindex="-1">error / warning 代码块 <a class="header-anchor" href="#error-warning-代码块" aria-hidden="true">#</a></h4><ul><li><code>[!code error]</code></li><li><code>[!code warning]</code></li></ul><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Error</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// [!code  error]</span></span>
<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Warning</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// [!code  warning]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 上面的 !code error 之间的空格实际为 1 个</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight has-highlighted-lines"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line highlighted error"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Error</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span></span>
<span class="line highlighted warning"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Warning</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="code-group" tabindex="-1">Code Group <a class="header-anchor" href="#code-group" aria-hidden="true">#</a></h4><ul><li><code>:::code-group:::</code></li></ul><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">:::code-group</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">js [index.js]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span><span style="color:#A6ACCD90;">ts [index.ts]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#C3E88D;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span></code></pre></div><p>输出：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-tK4jb" id="tab--g9webU" checked="checked"><label for="tab--g9webU">index.js</label><input type="radio" name="group-tK4jb" id="tab-hoc0XF9"><label for="tab-hoc0XF9">index.ts</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"></span></code></pre></div></div></div><h2 id="badge" tabindex="-1">Badge <a class="header-anchor" href="#badge" aria-hidden="true">#</a></h2><p>徽章可以为标题添加状态。</p><p>输入：</p><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;Badge type=&quot;info&quot; text=&quot;default&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;Badge type=&quot;tip&quot; text=&quot;^1.9.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;Badge type=&quot;warning&quot; text=&quot;beta&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;Badge type=&quot;danger&quot; text=&quot;caution&quot; /&gt;</span></span>
<span class="line"></span></code></pre></div><p>输出：</p>`,78);function r(i,y,D,F,d,C){const s=e("Badge");return o(),l("div",null,[c,a(s,{type:"info",text:"default"}),a(s,{type:"tip",text:"^1.9.0"}),a(s,{type:"warning",text:"beta"}),a(s,{type:"danger",text:"caution"})])}const u=n(t,[["render",r]]);export{h as __pageData,u as default};
