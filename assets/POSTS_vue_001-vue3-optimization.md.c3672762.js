import{_ as s,c as a,o as n,a as e}from"./app.8fa43329.js";const p="/mochi-blog/assets/001_vue3-optimization.e2e72b8a.svg",h=JSON.parse('{"title":"Vue3 の 优化","titleTemplate":false,"description":"","frontmatter":{"date":"2023-01-14 15:18:37","title":"Vue3 の 优化","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["vue"]},"headers":[{"level":2,"title":"源码优化","slug":"源码优化","link":"#源码优化","children":[{"level":3,"title":"更好的代码管理方式 monorepo","slug":"更好的代码管理方式-monorepo","link":"#更好的代码管理方式-monorepo","children":[]},{"level":3,"title":"TypeScript 重构项目","slug":"typescript-重构项目","link":"#typescript-重构项目","children":[]}]},{"level":2,"title":"性能优化","slug":"性能优化","link":"#性能优化","children":[{"level":3,"title":"源码体积优化","slug":"源码体积优化","link":"#源码体积优化","children":[]},{"level":3,"title":"数据劫持优化","slug":"数据劫持优化","link":"#数据劫持优化","children":[]},{"level":3,"title":"编译优化","slug":"编译优化","link":"#编译优化","children":[]}]}],"relativePath":"_POSTS/vue/001-vue3-optimization.md","lastUpdated":1676556196000}'),l={name:"_POSTS/vue/001-vue3-optimization.md"},o=e('<h1 id="vue3-の-优化" tabindex="-1">Vue3 の 优化 <a class="header-anchor" href="#vue3-の-优化" aria-hidden="true">#</a></h1><p><img src="'+p+`" alt="vue3 的优化"></p><h2 id="源码优化" tabindex="-1">源码优化 <a class="header-anchor" href="#源码优化" aria-hidden="true">#</a></h2><p>源码的优化主要体现在 monorepo 和 TypeScript 管理和开发源码, 这样做的目的是提升自身代码的可维护性。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-oUE-C" id="tab-8U4IaX4" checked="checked"><label for="tab-8U4IaX4">vue@3.2.37</label><input type="radio" name="group-oUE-C" id="tab-kInvPhF"><label for="tab-kInvPhF">vue@2.6.14</label></div><div class="blocks"><div class="language-text active"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">vue-next-3.2.37/</span></span>
<span class="line"><span style="color:#A6ACCD;">├── packages/ ⭕ 核心代码区</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── compiler-core/ ⭕ 编译器的核心代码</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── compiler-dom/ ⭕ 浏览器相关的编译模块</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── compiler-sfc/ 👉 单文件组件(.vue)的编译模块</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── compiler-ssr/ 👉 服务端渲染的编译模块</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── global.d.ts 👉 全局的 TS 声明</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── reactivity/ 👉 响应性的核心模块</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── reactivity-transform/ 👉 已过期, 无需关注</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── runtime-core/ ⭕ 运行时的核心代码, 内部针对不同平台进行了实现</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── runtime-dom/ ⭕ 基于浏览器平台的运行时</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── runtime-test/ 👉 runtime 测试相关</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── server-renderer/ 👉 服务器渲染</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── sfc-playground/ 👉 sfc 工具, 如 https://sfc.vuejs.org/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── shared/ ⭕ 共享的工具类</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── size-check/ 👉 测试运行时包的大小</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── template-explorer/ 👉 提供了一个线上的测试</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├──   (https://template-explorer.vuejs.org), 用于将 template 转化为 render</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── vue/ ⭕ 测试实例、打包后的 dist 文件夹都在这里</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── vue-compat/ 👉 用于兼容 Vue2 代码</span></span>
<span class="line"><span style="color:#A6ACCD;">├── pnpm-lock.yaml 👉 pnpm 依赖包版本</span></span>
<span class="line"><span style="color:#A6ACCD;">├── pnpm-workspace.yaml 👉 pnpm 配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── rollup.config.mjs 👉 rollup 配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── scripts/ 👉 配置文件相关, 不需要关注</span></span>
<span class="line"><span style="color:#A6ACCD;">├── test-dts/ 👉 测试相关, 不需要关注</span></span>
<span class="line"><span style="color:#A6ACCD;">├── BACKERS.md 👉 赞助声明</span></span>
<span class="line"><span style="color:#A6ACCD;">├── CHANGELOG.md 👉 更新日志</span></span>
<span class="line"><span style="color:#A6ACCD;">├── LICENSE 👉 开源协议</span></span>
<span class="line"><span style="color:#A6ACCD;">├── README.md 👉 readme</span></span>
<span class="line"><span style="color:#A6ACCD;">├── SECURITY.md 👉 报告漏洞, 维护安全的声明文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── api-extractor.json 👉 TypeScript 的 API 分析工具</span></span>
<span class="line"><span style="color:#A6ACCD;">├── jest.config.js 👉 测试相关</span></span>
<span class="line"><span style="color:#A6ACCD;">├── netlify.toml 👉 自动化部署相关</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json 👉 npm 依赖</span></span>
<span class="line"><span style="color:#A6ACCD;">└── tsconfig.json 👉 Typescript 配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">vue2.6.14/</span></span>
<span class="line"><span style="color:#A6ACCD;">├── src/ ⭕ 核心代码区</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── compiler/ ⭕ 编译相关</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── core/ ⭕ 核心代码</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── platforms/ 👉 不同平台支持</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── server/ 👉 服务端渲染</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── sfc/ ⭕ .vue 文件解析</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── shared/ ⭕ 共享代码</span></span>
<span class="line"><span style="color:#A6ACCD;">├── flow/ 👉 flow, 类似 TS</span></span>
<span class="line"><span style="color:#A6ACCD;">├── benchmarks/ 👉 基准测试</span></span>
<span class="line"><span style="color:#A6ACCD;">├── examples/ 👉 测试实例</span></span>
<span class="line"><span style="color:#A6ACCD;">├── scripts/ 👉 配置文件相关, 不需要关注</span></span>
<span class="line"><span style="color:#A6ACCD;">├── test/ 👉 功能测试</span></span>
<span class="line"><span style="color:#A6ACCD;">├── types/ 👉 TS 类型声明文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── packages/ 👉 一些特定 render, 不需要关注</span></span>
<span class="line"><span style="color:#A6ACCD;">├── BACKERS.md 👉 赞助声明</span></span>
<span class="line"><span style="color:#A6ACCD;">├── LICENSE 👉 开源协议</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json 👉 npm 依赖</span></span>
<span class="line"><span style="color:#A6ACCD;">└── README.md 👉 readme</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></div></div><h3 id="更好的代码管理方式-monorepo" tabindex="-1">更好的代码管理方式 monorepo <a class="header-anchor" href="#更好的代码管理方式-monorepo" aria-hidden="true">#</a></h3><p>首先, 源码的优化体现在代码管理方式上。</p><ul><li>Vue2 的源码托管在 src 目录, 然后依据功能拆分出了 compiler（模板编译的相关代码）、core（与平台无关的通用运行时代码）、platforms（平台专有代码）、server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码） 等目录</li><li>而到了 Vue3, 整个源码是通过 monorepo 的方式维护的, 根据功能将不同的模块拆分到 packages 目录下面不同的子目录中</li></ul><p>相对于 Vue2 的源码组织方式, monorepo 把这些模块拆分到不同的 package 中, 每个 package 有各自的 API、类型定义和测试。这样使得模块拆分更细化, 职责划分更明确, 模块之间的依赖关系也更加明确, 开发人员也更容易阅读、理解和更改所有模块源码, 提高代码的可维护性。</p><p>另外一些 package (比如 reactivity 响应式库) 是可以独立于 Vue.js 使用的, 这样用户如果只想使用 Vue3 的响应式能力, 可以单独依赖这个响应式库而不用去依赖整个 Vue.js, 减小了引用包的体积大小, 而 Vue2 是做不到这一点的。</p><h3 id="typescript-重构项目" tabindex="-1">TypeScript 重构项目 <a class="header-anchor" href="#typescript-重构项目" aria-hidden="true">#</a></h3><p>其次, 源码的优化还体现在 Vue3 自身采用了 TypeScript 开发。</p><p>Vue.js 1.x 版本的源码是没有用类型语言的, 但对于复杂的框架项目开发, 使用类型语言非常有利于代码的维护, 因为它可以在编码期间帮你做类型检查, 避免一些因类型问题导致的错误, 也可以利于它去定义接口的类型, 利于 IDE 对变量类型的推导。</p><p>因此 Vue2 采用了 Flow, 但是 Vue3 抛弃了 Flow 转而采用 TypeScript 重构了整个项目。</p><p>首先, Flow 是 Facebook 出品的 JavaScript 静态类型检查工具, 它可以以非常小的成本对已有的 JavaScript 代码迁入, 非常灵活, 这也是 Vue2 当初选型它时一方面的考量。但是 Flow 对于一些复杂场景类型的检查, 支持得并不好。甚至 Vue2 源码在组件更新 props 里还有对 Flow 的吐槽。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> propOptions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> vm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">props </span><span style="color:#676E95;font-style:italic;">// wtf flow?</span></span>
<span class="line"></span></code></pre></div><p>这里 Flow 并没有正确推导出 vm.$options.props 的类型, 从而开发人员不得不强制申明 propsOptions 的类型为 any, 显得很不合理。</p><p>而 TypeScript 提供了更好的类型检查, 能支持复杂的类型推导。源码使用 TypeScript 编写, 也省去了单独维护 d.ts 文件的麻烦。就整个 TypeScript 的生态来看, TypeScript 团队也是越做越好, TypeScript 本身保持着一定频率的迭代和更新, 支持的 feature 也越来越多。</p><h2 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-hidden="true">#</a></h2><h3 id="源码体积优化" tabindex="-1">源码体积优化 <a class="header-anchor" href="#源码体积优化" aria-hidden="true">#</a></h3><p>我们知道, JavaScript 包体积越小, 意味着网络传输时间越短, JavaScript 引擎解析包的速度也越快。所以 Vue3 优化了引入源码的包体积大小:</p><ul><li>移除了一些冷门的 feature (例如 filter、inline-template 等)</li><li>支持 tree shaking, 减少打包体积</li></ul><h3 id="数据劫持优化" tabindex="-1">数据劫持优化 <a class="header-anchor" href="#数据劫持优化" aria-hidden="true">#</a></h3><h3 id="编译优化" tabindex="-1">编译优化 <a class="header-anchor" href="#编译优化" aria-hidden="true">#</a></h3>`,24),t=[o];function c(r,i,C,A,d,y){return n(),a("div",null,t)}const D=s(l,[["render",c]]);export{h as __pageData,D as default};
