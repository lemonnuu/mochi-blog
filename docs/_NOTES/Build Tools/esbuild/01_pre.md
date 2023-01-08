---
title: esbuild
titleTemplate: 前言
---

# esbuild

Vite 在开发环境使用了 esbuild 构建『依赖』后, esbuild 逐渐进入我们的视野。最直观的感受就是非常 快！

> 注意 Vite 只是使用 esbuild 构建依赖, 源码部分是采用原生 ES Module 方式提供源码, 相当于让浏览器接管了打包的部分任务。

esbuild 是一个极速的 JavaScript 打包器, 和 Rollup 不同, 它是用 Go 语言编写的, 且并不能使用配置文件。它的使用可以通过命令行, 或者是在 JavaScript 中构建脚本, Vite 就是采取这种方式。

需要注意的是, Vite 在生产环境并没有使用 esbuild, 而是选择了 Rollup。因为目前来说针对构建应用的一些重要功能 esbuild 还在持续开发中, 比如 code spliting 和 CSS 处理方面(举个栗子：JS 里并不会包含插入 CSS 的逻辑, 构建完 CSS 还得手动插入)。

下面是 esbuild 的一些主要特性：

- 极快的速度, 无需缓存
- 支持 ES6 和 CommonJS 模块
- 支持对 ES6 模块进行 tree shaking
- API 可同时用于 JavaScript 和 Go
- 兼容 TypeScript 和 JSX 语法
- 支持 Source maps
- 支持 Minification
- 支持 plugins

也就是说, esbuild 不支持转化为 ES5 和 UDM 规范。

还有一点要补充的是, esbuild 对 TypeScript 的构建并不会进行类型检查, 只是进行转译工作。如果需要进行类型检查单独运行 `tsc --noEmit` 即可。

> Vite 里就是使用 esbuild 转译 TypeScript, 对 TypeScript 不做类型检查的还有 Babel。

---

接下来, 就让我们一起来看看这个快到离谱的"男人"。notes 分为两个章节：

- [快速上手](02_use.md)：esbuild 基本使用
- [常见问题](03_faqs.md)：关于 esbuild 的一些疑惑

> 注：wiki 并没有包含 esbuild 插件板块, 如果想写 Vite 插件的话, 研究一下还是很有必要的, 因为 Vite 插件需要兼容 esbuild 和 Rollup。
