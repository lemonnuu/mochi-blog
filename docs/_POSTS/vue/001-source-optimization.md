---
date: '2023-01-14 15:18:37'
title: Vue3 の源码优化
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - vue
---

# Vue3 の源码优化

> 源码层面的优化主要体现在 monorepo 和 TypeScript 管理和开发源码。

## 目录结构

:::code-group

```text {0} [vue@3.2.37]
vue-next-3.2.37/
├── packages/ ⭕ 核心代码区
│   ├── compiler-core/ ⭕ 编译器的核心代码
│   ├── compiler-dom/ ⭕ 浏览器相关的编译模块
│   ├── compiler-sfc/ 👉 单文件组件(.vue)的编译模块
│   ├── compiler-ssr/ 👉 服务端渲染的编译模块
│   ├── global.d.ts 👉 全局的 TS 声明
│   ├── reactivity/ 👉 响应性的核心模块
│   ├── reactivity-transform/ 👉 已过期, 无需关注
│   ├── runtime-core/ ⭕ 运行时的核心代码, 内部针对不同平台进行了实现
│   ├── runtime-dom/ ⭕ 基于浏览器平台的运行时
│   ├── runtime-test/ 👉 runtime 测试相关
│   ├── server-renderer/ 👉 服务器渲染
│   ├── sfc-playground/ 👉 sfc 工具, 如 https://sfc.vuejs.org/
│   ├── shared/ ⭕ 共享的工具类
│   ├── size-check/ 👉 测试运行时包的大小
│   ├── template-explorer/ 👉 提供了一个线上的测试
│   ├──   (https://template-explorer.vuejs.org), 用于将 template 转化为 render
│   ├── vue/ ⭕ 测试实例、打包后的 dist 文件夹都在这里
│   └── vue-compat/ 👉 用于兼容 Vue2 代码
├── pnpm-lock.yaml 👉 pnpm 依赖包版本
├── pnpm-workspace.yaml 👉 pnpm 配置文件
├── rollup.config.mjs 👉 rollup 配置文件
├── scripts/ 👉 配置文件相关, 不需要关注
├── test-dts/ 👉 测试相关, 不需要关注
├── BACKERS.md 👉 赞助声明
├── CHANGELOG.md 👉 更新日志
├── LICENSE 👉 开源协议
├── README.md 👉 readme
├── SECURITY.md 👉 报告漏洞, 维护安全的声明文件
├── api-extractor.json 👉 TypeScript 的 API 分析工具
├── jest.config.js 👉 测试相关
├── netlify.toml 👉 自动化部署相关
├── package.json 👉 npm 依赖
└── tsconfig.json 👉 Typescript 配置文件
```

```text {0} [vue@2.6.14]
vue2.6.14/
├── src/ ⭕ 核心代码区
│   ├── compiler/ ⭕ 编译相关
│   ├── core/ ⭕ 核心代码
│   ├── platforms/ 👉 不同平台支持
│   ├── server/ 👉 服务端渲染
│   ├── sfc/ ⭕ .vue 文件解析
│   └── shared/ ⭕ 共享代码
├── flow/ 👉 flow, 类似 TS
├── benchmarks/ 👉 基准测试
├── examples/ 👉 测试实例
├── scripts/ 👉 配置文件相关, 不需要关注
├── test/ 👉 功能测试
├── types/ 👉 TS 类型声明文件
├── packages/ 👉 一些特定 render, 不需要关注
├── BACKERS.md 👉 赞助声明
├── LICENSE 👉 开源协议
├── package.json 👉 npm 依赖
└── README.md 👉 readme
```

:::

## 更好的代码管理方式 monorepo

首先, 源码的优化体现在代码管理方式上。

- Vue2 的源码托管在 src 目录, 然后依据功能拆分出了 compiler（模板编译的相关代码）、core（与平台无关的通用运行时代码）、platforms（平台专有代码）、server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码） 等目录
- 而到了 Vue3, 整个源码是通过 monorepo 的方式维护的, 根据功能将不同的模块拆分到 packages 目录下面不同的子目录中

相对于 Vue2 的源码组织方式, monorepo 把这些模块拆分到不同的 package 中, 每个 package 有各自的 API、类型定义和测试。这样使得模块拆分更细化, 职责划分更明确, 模块之间的依赖关系也更加明确, 开发人员也更容易阅读、理解和更改所有模块源码, 提高代码的可维护性。

另外一些 package (比如 reactivity 响应式库) 是可以独立于 Vue.js 使用的, 这样用户如果只想使用 Vue3 的响应式能力, 可以单独依赖这个响应式库而不用去依赖整个 Vue.js, 减小了引用包的体积大小, 而 Vue2 是做不到这一点的。

## TypeScript 重构项目

其次, 源码的优化还体现在 Vue3 自身采用了 TypeScript 开发。

Vue.js 1.x 版本的源码是没有用类型语言的, 但对于复杂的框架项目开发, 使用类型语言非常有利于代码的维护, 因为它可以在编码期间帮你做类型检查, 避免一些因类型问题导致的错误, 也可以利于它去定义接口的类型, 利于 IDE 对变量类型的推导。

因此 Vue2 采用了 Flow, 但是 Vue3 抛弃了 Flow 转而采用 TypeScript 重构了整个项目。

首先, Flow 是 Facebook 出品的 JavaScript 静态类型检查工具, 它可以以非常小的成本对已有的 JavaScript 代码迁入, 非常灵活, 这也是 Vue2 当初选型它时一方面的考量。但是 Flow 对于一些复杂场景类型的检查, 支持得并不好。甚至 Vue2 源码在组件更新 props 里还有对 Flow 的吐槽。

```js
const propOptions: any = vm.$options.props // wtf flow?
```

这里 Flow 并没有正确推导出 vm.$options.props 的类型, 从而开发人员不得不强制申明 propsOptions 的类型为 any, 显得很不合理。

而 TypeScript 提供了更好的类型检查, 能支持复杂的类型推导。源码使用 TypeScript 编写, 也省去了单独维护 d.ts 文件的麻烦。就整个 TypeScript 的生态来看, TypeScript 团队也是越做越好, TypeScript 本身保持着一定频率的迭代和更新, 支持的 feature 也越来越多。
