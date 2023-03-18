import{_ as s,c as n,o as a,a as l}from"./app.eb5321dd.js";const e="/mochi-blog/assets/001_typescript-playground.1fe9e72f.png",g=JSON.parse('{"title":"TypeScript","titleTemplate":"环境配置","description":"","frontmatter":{"title":"TypeScript","titleTemplate":"环境配置"},"headers":[{"level":2,"title":"tsc 的安装与使用","slug":"tsc-的安装与使用","link":"#tsc-的安装与使用","children":[]},{"level":2,"title":"ts-node","slug":"ts-node","link":"#ts-node","children":[]},{"level":2,"title":"线上环境","slug":"线上环境","link":"#线上环境","children":[]}],"relativePath":"_NOTES/TypeScript/common/002_environment-configuration.md","lastUpdated":1679013837000}'),p={name:"_NOTES/TypeScript/common/002_environment-configuration.md"},t=l(`<h1 id="环境配置" tabindex="-1">环境配置 <a class="header-anchor" href="#环境配置" aria-hidden="true">#</a></h1><p><code>.ts</code> 文件是不可以直接执行的, 需要编译为 <code>.js</code> 文件, 才能够进行运行。</p><h2 id="tsc-的安装与使用" tabindex="-1">tsc 的安装与使用 <a class="header-anchor" href="#tsc-的安装与使用" aria-hidden="true">#</a></h2><p>tsc 是 typescript compiler 的缩写, 即为 TS 的编译器。它是 <code>typescript</code> 包自带的命令行工具。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># npm 全局安装 typescript</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">typescript</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span></code></pre></div><blockquote><p>typescript 可以全局安装也可以只为项目安装, 建议全局也安装一下。</p></blockquote><p>现在, 可以尝试输入如下指令来检查 TS 环境的工作情况。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 检查是否存在 tsc 环境变量, 打印其版本信息</span></span>
<span class="line"><span style="color:#FFCB6B;">tsc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 打印 tsc 的帮助信息</span></span>
<span class="line"><span style="color:#FFCB6B;">tsc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-h</span></span>
<span class="line"></span></code></pre></div><p>下面是 <code>tsc -h</code> 的部分输出信息(不全, 可自行打印)。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight has-highlighted-lines"><code><span class="line"><span style="color:#A6ACCD;">tsc: The TypeScript Compiler - Version 4.8.4</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">COMMON COMMANDS</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  tsc</span></span>
<span class="line"><span style="color:#A6ACCD;">  Compiles the current project (tsconfig.json in the working directory.)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  tsc app.ts util.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">  Ignoring tsconfig.json!</span></span>
<span class="line"><span style="color:#A6ACCD;">  compiles the specified files with default compiler options.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  tsc -b</span></span>
<span class="line"><span style="color:#A6ACCD;">  Build a composite project in the working directory.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  tsc --init</span></span>
<span class="line"><span style="color:#A6ACCD;">  Creates a tsconfig.json with the recommended settings in the working directory.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  tsc -p ./path/to/tsconfig.json</span></span>
<span class="line"><span style="color:#A6ACCD;">  Compiles the TypeScript project located at the specified path.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  tsc --help --all</span></span>
<span class="line"><span style="color:#A6ACCD;">  An expanded version of this information, showing all possible compiler options</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  tsc --noEmit</span></span>
<span class="line"><span style="color:#A6ACCD;">  tsc --target esnext</span></span>
<span class="line"><span style="color:#A6ACCD;">  Compiles the current project, with additional settings.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">You can learn about all of the compiler options at https://aka.ms/tsc</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>所以想要编译以及运行某个 ts 文件只需要进行以下操作。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 将 ts 文件编译为 js 文件</span></span>
<span class="line"><span style="color:#FFCB6B;">tsc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 运行 js 文件</span></span>
<span class="line"><span style="color:#FFCB6B;">node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo.js</span></span>
<span class="line"></span></code></pre></div><h2 id="ts-node" tabindex="-1">ts-node <a class="header-anchor" href="#ts-node" aria-hidden="true">#</a></h2><p>tsc 的使用每次都需要两步, 先将 ts 文件编译为 js 文件, 再执行 js 文件。</p><p>在 node.js 环境下, 可利用 <code>ts-node</code> 合并以上操作。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 全局安装 ts-node</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ts-node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 直接运行</span></span>
<span class="line"><span style="color:#FFCB6B;">ts-node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo.ts</span></span>
<span class="line"></span></code></pre></div><h2 id="线上环境" tabindex="-1">线上环境 <a class="header-anchor" href="#线上环境" aria-hidden="true">#</a></h2><p>官网的 <a href="https://www.typescriptlang.org/play" target="_blank" rel="noreferrer">Playground</a> 可用于线上编写 TS 代码, 适用于编写一些 demo。</p><p><img src="`+e+'" alt="TypeScript Playground"></p>',19),o=[t];function c(i,r,C,d,y,h){return a(),n("div",null,o)}const D=s(p,[["render",c]]);export{g as __pageData,D as default};
