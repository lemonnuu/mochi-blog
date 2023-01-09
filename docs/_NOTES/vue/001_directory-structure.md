---
date: '2023-01-08 19:06:44'
title: vue-next 源码解析前的准备工作
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - note
tags:
  - vue
---

# vue-next 源码解析前的准备工作

> 解析的 Vue 版本为 3.2.37 (下载地址：[vue-next-3.2.37](https://github.com/lemonnuu/vue-next-3.2.37))

## vue-next 目录结构

```text
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

## 添加测试实例

在添加测试实例之前, 首先得对项目安装依赖并进行打包, 依次执行：

```shell
pnpm install
pnpm build
```

当打包成功时, 在 `vue-next-3.2.37/packages/vue/` 文件夹下会新增出 dist 文件夹：

```text
vue/dist/
├── vue.cjs.js
├── vue.cjs.prod.js
├── vue.esm-browser.js
├── vue.esm-browser.prod.js
├── vue.esm-bundler.js
├── vue.global.js
├── vue.global.prod.js
├── vue.runtime.esm-browser.js
├── vue.runtime.esm-browser.prod.js
├── vue.runtime.esm-bundler.js
├── vue.runtime.global.js
└── vue.runtime.global.prod.js
```

> 注: 在打包 vue-next 时, 默认是不开启 sourmap 的。

### 初步添加

在 `vue-next-3.2.37/packages/vue/examples/` 下新建 mochi 文件夹用于存放测试实例：

```
examples/
└── mochi/
    └── reactivity/
        └── reactive.html
```

可以先简单验证一下打包生成的文件是否有效：

:::code-group

```html [reactive.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../../../dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const { reactive, effect } = Vue
      const user = reactive({ name: '张三' })
      effect(() => (document.getElementById('app').innerHTML = user.name))
      setTimeout(() => (user.name = '李四'), 2000)
    </script>
  </body>
</html>
```

:::

Live Server 打开 reactive.html, 如果出现"张三"且两秒后变为"李四"则一切 OK。

### source map 调试

想要开启 sourcemap 功能也非常简单, 只需在 build 命令后添加 `-sourcemap` 或 `-s` 参数即可。

::: code-group

```json [package.json]
"scripts": {
  "build": "node scripts/build.js", // [!code --]
  "build": "node scripts/build.js -s", // [!code ++]
},
```

:::

> 翻看 `vue-next-3.2.37/scripts/build.js` 会发现先是使用了 [minimist](https://www.npmjs.com/package/minimist) 进行命令行参数解析, 然后会交给 rollup.config.js 开启相应功能。

再次打包后, dist 文件夹下将会包含 .map 文件:

```text
dist/
├── vue.cjs.js
├── vue.cjs.js.map
├── vue.cjs.prod.js
├── vue.cjs.prod.js.map
├── vue.esm-browser.js
├── vue.esm-browser.js.map
├── vue.esm-browser.prod.js
├── vue.esm-browser.prod.js.map
├── vue.esm-bundler.js
├── vue.esm-bundler.js.map
├── vue.global.js
├── vue.global.js.map
├── vue.global.prod.js
├── vue.global.prod.js.map
├── vue.runtime.esm-browser.js
├── vue.runtime.esm-browser.js.map
├── vue.runtime.esm-browser.prod.js
├── vue.runtime.esm-browser.prod.js.map
├── vue.runtime.esm-bundler.js
├── vue.runtime.esm-bundler.js.map
├── vue.runtime.global.js
├── vue.runtime.global.js.map
├── vue.runtime.global.prod.js
└── vue.runtime.global.prod.js.map
```

## 阅读源码的正确姿势

阅读源码千万不要一行一行逐条逐句的去读, 可行的方式是跟随一条主线 debugger。

- 摒弃边缘情况
- 跟随一条主线

也就是说, 仅需要跟随一条主线阅读核心逻辑。
