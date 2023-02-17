import{_ as s,c as n,o as a,a as l}from"./app.53870d29.js";const A=JSON.parse('{"title":"Rollup","titleTemplate":"入门","description":"","frontmatter":{"title":"Rollup","titleTemplate":"入门","outline":[2,4]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[{"level":3,"title":"兼容性","slug":"兼容性","link":"#兼容性","children":[]},{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]}]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"命令行接口","slug":"命令行接口","link":"#命令行接口","children":[]},{"level":3,"title":"JavaScript API","slug":"javascript-api","link":"#javascript-api","children":[]}]}],"relativePath":"_NOTES/Build Tools/rollup/02_use.md","lastUpdated":1673163682000}'),p={name:"_NOTES/Build Tools/rollup/02_use.md"},o=l(`<h1 id="rollup-入门" tabindex="-1">Rollup 入门 <a class="header-anchor" href="#rollup-入门" aria-hidden="true">#</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-hidden="true">#</a></h2><p><a href="https://rollupjs.org/guide/en/#core-functionality" target="_blank" rel="noreferrer">Rollup</a> 是一个 JavaScript 模块打包工具, 可以将多个小的代码片段编译为完整的库和应用, 使用的是 ES Module 模块标准规范。</p><blockquote><p>顺便提一嘴, Rollup 是率先支持 Tree-Shaking 的, 随后 Webpack 等其它构建工具也相继支持。</p></blockquote><h3 id="兼容性" tabindex="-1">兼容性 <a class="header-anchor" href="#兼容性" aria-hidden="true">#</a></h3><p>&quot;裸的&quot; Rollup 只认识 ES Module 的导入和导出, 如果想要导入 CommonJS 模块, 就必须通过 Rollup 插件来实现。</p><h4 id="发布模块" tabindex="-1">发布模块 <a class="header-anchor" href="#发布模块" aria-hidden="true">#</a></h4><p>在编写类库时, 为了保证不同的模块化规范(CommonJS、ES Module)都能够正常的使用咱们的库。往往需要借助 Rollup 构建出多份不同格式的文件。</p><blockquote><p>像 Vue 就是这么做的。</p></blockquote><p>然后在 <code>package.json</code> 文件的 <code>main</code> 属性中指向 UMD 或 CommonJS 规范的代码, <code>module</code> 属性指向 ES Module 规范代码。</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">main</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist/compiler-sfc.cjs.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist/compiler-sfc.esm-browser.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>像 Rollup 和 Webpack 这类 ES 模块识别工具, 可以直接导入模块的 ES Module 版本。</p><p>也就是说, 通过 <code>import</code> 导入的会走 <code>module</code> 属性, 通过 <code>require</code> (或 script 标签) 导入的会走 <code>main</code> 属性。</p><blockquote><p>这也是为什么有的库既可以 require() 导入又可以 import 导入的一部分原因。</p></blockquote><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rollup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span></code></pre></div><p>全局安装可以让 Rollup 成为全局可用的命令行, 当然也可以安装在本地, 然后通过 <code>npx</code> 调用。推荐本地安装。</p><blockquote><p>这不是重点, 谁都会装, 关键是怎么使用。</p></blockquote><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h2><p>Rollup 可以通过两种方式使用：</p><ul><li>命令行</li><li>JavaScript API</li></ul><p>运行 <code>rollup --help</code> 可以查看可用的选项和参数。</p><blockquote><p>运行之后你会发现选项非常多哈... 没关系, 常用的也就那 20%。不过, 这里一定要自己尝试一下, 说一千道一万, 不如自己手敲一遍。</p></blockquote><p>下面是简化及归类后的可用选项及参数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">rollup version 3.7.0</span></span>
<span class="line"><span style="color:#A6ACCD;">=====================================</span></span>
<span class="line"><span style="color:#A6ACCD;">Usage: rollup [options] &lt;entry file&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">Basic options:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-c, --config &lt;filename&gt;     Use this config file (if argument is used but value</span></span>
<span class="line"><span style="color:#A6ACCD;">                              is unspecified, defaults to rollup.config.js)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-i, --input &lt;filename&gt;      Input (alternative to &lt;entry file&gt;)</span></span>
<span class="line"><span style="color:#A6ACCD;">-o, --file &lt;output&gt;         Single output file (if absent, prints to stdout)</span></span>
<span class="line"><span style="color:#A6ACCD;">-d, --dir &lt;dirname&gt;         Directory for chunks (if absent, prints to stdout)</span></span>
<span class="line"><span style="color:#A6ACCD;">-f, --format &lt;format&gt;       Type of output (amd, cjs, es, iife, umd, system)</span></span>
<span class="line"><span style="color:#A6ACCD;">-n, --name &lt;name&gt;           Name for UMD export</span></span>
<span class="line"><span style="color:#A6ACCD;">-e, --external &lt;ids&gt;        Comma-separate list of module IDs to exclude</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-m, --sourcemap             Generate sourcemap (\`-m inline\` for inline map)</span></span>
<span class="line"><span style="color:#A6ACCD;">-p, --plugin &lt;plugin&gt;       Use the plugin specified (may be repeated)</span></span>
<span class="line"><span style="color:#A6ACCD;">-w, --watch                 Watch files in bundle and rebuild on changes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-h, --help                  Show this help message</span></span>
<span class="line"><span style="color:#A6ACCD;">-v, --version               Show version number</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">--banner &lt;text&gt;             Code to insert at top of bundle (outside wrapper)</span></span>
<span class="line"><span style="color:#A6ACCD;">--footer &lt;text&gt;             Code to insert at end of bundle (outside wrapper)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="命令行接口" tabindex="-1">命令行接口 <a class="header-anchor" href="#命令行接口" aria-hidden="true">#</a></h3><p>在通过命令行的方式使用 Rollup 时, 可以通过一份可选的配置文件来简化命令行操作, 同时还可以通过配置文件启用一些 Rollup 的高级特性。</p><h4 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-hidden="true">#</a></h4><p>Rollup2 时, 配置文件希望是一个 ES Module 模块, 对外导出的可以是一个对象、数组以及函数。</p><blockquote><p>Rollup3+ 时, Rollup 配置文件的模块化规范受 <code>package.json</code> 文件的 <code>type</code> 属性影响, 如若不是 <code>&quot;type&quot;: &quot;module&quot;</code>, 配置文件需是 CommonJS 规范。是 <code>&quot;type&quot;: &quot;module&quot;</code>时, 需是 ES Module 规范。</p><p>当然也可以改为 <code>.mjs</code> 或 <code>.cjs</code> 以决定使用哪种规范。</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/main.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bundle.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">format</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cjs</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><p>如果想构建多个 bundle, 导出的可以是一个数组, 数组的每一项是一个单独的配置。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">main-a.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dist/bundle-a.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">format</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cjs</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">main-b.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dist/bundle-b1.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">format</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cjs</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dist/bundle-b2.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">format</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">es</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>或者如果共用一个入口的话, 也可以将 <code>output</code> 配置为数组。</p><blockquote><p>推荐使用导出数组的方式, 而不是将 output 配置为数组, 因为容易扩展。</p></blockquote><p>如果需要根据命令行参数动态调整配置文件, 可以导出一个函数, 函数的返回值是真正的配置, 函数的参数会接收当前命令行的参数：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> defaultConfig </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./rollup.default.config.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> debugConfig </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./rollup.debug.config.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">commandLineArgs</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">commandLineArgs</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">configDebug</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">debugConfig</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defaultConfig</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>通常, 这个配置文件位于项目的根目录, 并且命名为 <code>rollup.config.js</code>。</p><p>在编译时, 使用 <code>-c</code> 或 <code>--config</code> 指定所用的配置文件：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight has-highlighted-lines"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 将自定义配置文件的路径传给 Rollup</span></span>
<span class="line"><span style="color:#FFCB6B;">rollup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果你不传文件名, Rollup 将会尝试</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 按照以下顺序加载配置文件：</span></span>
<span class="line highlighted"><span style="color:#676E95;font-style:italic;"># rollup.config.mjs -&gt; rollup.config.cjs -&gt; rollup.config.js</span></span>
<span class="line"><span style="color:#FFCB6B;">rollup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--config</span></span>
<span class="line"></span></code></pre></div><blockquote><p>Rollup 本身执行了配置文件, 因此我们能够使用 export default 语法 – 这些代码没有被 Babel 或者其他类似工具编译, 因此只能使用 Node.js 版本支持的 ES2015 语法特性。</p></blockquote><h5 id="iife-与-umd" tabindex="-1">iife 与 umd <a class="header-anchor" href="#iife-与-umd" aria-hidden="true">#</a></h5><p>当 <code>format</code> 配置为 <code>iife</code> 或 <code>umd</code> 格式时, 需要特别注意一点。</p><p>当入口文件需要导出内容, 比如 <code>export const a = 123</code> 时, 就需要配置 <code>output.name</code> 选项, 告诉 Rollup 将导出挂载至全局变量的哪个属性下。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">format</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">umd</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">namename</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="banner-和-footer" tabindex="-1">banner 和 footer <a class="header-anchor" href="#banner-和-footer" aria-hidden="true">#</a></h5><p>如果想给打包生成的 bundle 添加一些诸如作者信息之类的注释, 可以使用 banner 和 footer。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">banner</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">// Banner</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">footer</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">// Footer</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="转译配置文件" tabindex="-1">转译配置文件 <a class="header-anchor" href="#转译配置文件" aria-hidden="true">#</a></h4><p>Rollup 会在配置文件被依赖之前, 在后台将配置文件和 CommonJS 的相关依赖项进行转译和打包, 这样做的优点是易于配置和 ES 模块代码库共享代码, 同时与 Node 生态完全互通。</p><blockquote><p><code>.js</code> 后缀会转译配置文件, <code>.cjs</code> 和 <code>.mjs</code> 不会, 像 Vue 就是使用 <code>.mjs</code></p></blockquote><p>使用 <code>m.js</code> 可能会无法导入 JSON 文件, 例如 <code>package.json file</code>, 有两种方式解决这个问题：</p><ol><li>通过以下方式运行 Rollup：<code>node --experimental-json-modules ./node_modules/.bin/rollup --config</code></li><li>创建一个依赖 JSON 文件的 CommonJS 的包装器：</li></ol><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// load-package.cjs</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./package.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// rollup.config.mjs</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> pkg </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./load-package.cjs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"></span></code></pre></div><h4 id="配置文件列表" tabindex="-1">配置文件列表 <a class="header-anchor" href="#配置文件列表" aria-hidden="true">#</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight has-focused-lines"><code><span class="line"><span style="color:#676E95;font-style:italic;">// rollup.config.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 可以是一个数组（用于多个输入的情况）</span></span>
<span class="line has-focus"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 核心的输入选项 </span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">  external</span><span style="color:#89DDFF;">,</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">  input</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 必要项</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">  plugins</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 高级输入选项</span></span>
<span class="line"><span style="color:#A6ACCD;">  cache</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  onwarn</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  preserveEntrySignatures</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  strictDeprecations</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 危险区</span></span>
<span class="line"><span style="color:#A6ACCD;">  acorn</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  acornInjectPlugins</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  context</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  moduleContext</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  preserveSymlinks</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  shimMissingExports</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  treeshake</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 实验性</span></span>
<span class="line"><span style="color:#A6ACCD;">  experimentalCacheExpiry</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  perf</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line has-focus"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 必要项 (可以是一个数组, 用于多输出的情况) </span></span>
<span class="line has-focus"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 核心的输出选项</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">    dir</span><span style="color:#89DDFF;">,</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">    file</span><span style="color:#89DDFF;">,</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">    format</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 必要项</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">    globals</span><span style="color:#89DDFF;">,</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">    name</span><span style="color:#89DDFF;">,</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">    plugins</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 高级输出选项</span></span>
<span class="line"><span style="color:#A6ACCD;">    assetFileNames</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    banner</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    chunkFileNames</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    compact</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    entryFileNames</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    extend</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    footer</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    hoistTransitiveImports</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    inlineDynamicImports</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    interop</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    intro</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    manualChunks</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    minifyInternalExports</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    outro</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    paths</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    preserveModules</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    sourcemap</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    sourcemapExcludeSources</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    sourcemapFile</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    sourcemapPathTransform</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 危险区</span></span>
<span class="line"><span style="color:#A6ACCD;">    amd</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    esModule</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    exports</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    externalLiveBindings</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    freeze</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    indent</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    namespaceToStringTag</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    noConflict</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    preferConst</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    strict</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    systemNullSetters</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">watch</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    buildDelay</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    chokidar</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    clearScreen</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    skipWrite</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    exclude</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    include</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line has-focus"><span style="color:#89DDFF;">};</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><h3 id="javascript-api" tabindex="-1">JavaScript API <a class="header-anchor" href="#javascript-api" aria-hidden="true">#</a></h3><p>Rollup 虽然提供了可在 Node.js 中使用的 <a href="https://rollupjs.org/guide/en/#javascript-api" target="_blank" rel="noreferrer">JavaScript API</a>。但是一般情况下不需要使用它, 而应使用命令行, 除非需要扩展 Rollup 本身或者使用它进行一些高级操作, 比如通过编程生成 bundle。</p><blockquote><p>所以需要的话去翻官方文档吧。</p></blockquote>`,59),e=[o];function t(c,r,D,i,y,F){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
