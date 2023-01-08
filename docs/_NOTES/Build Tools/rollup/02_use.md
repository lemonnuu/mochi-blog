---
title: Rollup
titleTemplate: 入门
outline: [2,4]
---

# Rollup 入门

## 概述

[Rollup](https://rollupjs.org/guide/en/#core-functionality) 是一个 JavaScript 模块打包工具, 可以将多个小的代码片段编译为完整的库和应用, 使用的是 ES Module 模块标准规范。

> 顺便提一嘴, Rollup 是率先支持 Tree-Shaking 的, 随后 Webpack 等其它构建工具也相继支持。

### 兼容性

"裸的" Rollup 只认识 ES Module 的导入和导出, 如果想要导入 CommonJS 模块, 就必须通过 Rollup 插件来实现。

#### 发布模块

在编写类库时, 为了保证不同的模块化规范(CommonJS、ES Module)都能够正常的使用咱们的库。往往需要借助 Rollup 构建出多份不同格式的文件。

> 像 Vue 就是这么做的。

然后在 `package.json` 文件的 `main` 属性中指向 UMD 或 CommonJS 规范的代码, `module` 属性指向 ES Module 规范代码。

```json
{
  "main": "dist/compiler-sfc.cjs.js",
  "module": "dist/compiler-sfc.esm-browser.js",
}
```

像 Rollup 和 Webpack 这类 ES 模块识别工具, 可以直接导入模块的 ES Module 版本。

也就是说, 通过 `import` 导入的会走 `module` 属性, 通过 `require` (或 script 标签) 导入的会走 `main` 属性。

> 这也是为什么有的库既可以 require() 导入又可以 import 导入的一部分原因。


### 安装

```shell
npm install rollup -g
```

全局安装可以让 Rollup 成为全局可用的命令行, 当然也可以安装在本地, 然后通过 `npx` 调用。推荐本地安装。

> 这不是重点, 谁都会装, 关键是怎么使用。

## 使用

Rollup 可以通过两种方式使用：

- 命令行
- JavaScript API

运行 `rollup --help` 可以查看可用的选项和参数。

> 运行之后你会发现选项非常多哈... 没关系, 常用的也就那 20%。不过, 这里一定要自己尝试一下, 说一千道一万, 不如自己手敲一遍。

下面是简化及归类后的可用选项及参数：

```
rollup version 3.7.0
=====================================
Usage: rollup [options] <entry file>
Basic options:

-c, --config <filename>     Use this config file (if argument is used but value
                              is unspecified, defaults to rollup.config.js)

-i, --input <filename>      Input (alternative to <entry file>)
-o, --file <output>         Single output file (if absent, prints to stdout)
-d, --dir <dirname>         Directory for chunks (if absent, prints to stdout)
-f, --format <format>       Type of output (amd, cjs, es, iife, umd, system)
-n, --name <name>           Name for UMD export
-e, --external <ids>        Comma-separate list of module IDs to exclude

-m, --sourcemap             Generate sourcemap (`-m inline` for inline map)
-p, --plugin <plugin>       Use the plugin specified (may be repeated)
-w, --watch                 Watch files in bundle and rebuild on changes

-h, --help                  Show this help message
-v, --version               Show version number

--banner <text>             Code to insert at top of bundle (outside wrapper)
--footer <text>             Code to insert at end of bundle (outside wrapper)
```

### 命令行接口

在通过命令行的方式使用 Rollup 时, 可以通过一份可选的配置文件来简化命令行操作, 同时还可以通过配置文件启用一些 Rollup 的高级特性。

#### 配置文件

Rollup2 时, 配置文件希望是一个 ES Module 模块, 对外导出的可以是一个对象、数组以及函数。

> Rollup3+ 时, Rollup 配置文件的模块化规范受 `package.json` 文件的 `type` 属性影响, 如若不是 `"type": "module"`, 配置文件需是 CommonJS 规范。是 `"type": "module"`时, 需是 ES Module 规范。
>
> 当然也可以改为 `.mjs` 或 `.cjs` 以决定使用哪种规范。

```js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

如果想构建多个 bundle, 导出的可以是一个数组, 数组的每一项是一个单独的配置。

```js
export default [
  {
    input: 'main-a.js',
    output: {
      file: 'dist/bundle-a.js',
      format: 'cjs'
    }
  }, 
  {
    input: 'main-b.js',
    output: [
      {
        file: 'dist/bundle-b1.js',
        format: 'cjs'
      },
      {
        file: 'dist/bundle-b2.js',
        format: 'es'
      }
    ]
  }
];
```

或者如果共用一个入口的话, 也可以将 `output` 配置为数组。

> 推荐使用导出数组的方式, 而不是将 output 配置为数组, 因为容易扩展。

如果需要根据命令行参数动态调整配置文件, 可以导出一个函数, 函数的返回值是真正的配置, 函数的参数会接收当前命令行的参数：

```js
import defaultConfig from './rollup.default.config.js';
import debugConfig from './rollup.debug.config.js';

export default commandLineArgs => {
  if (commandLineArgs.configDebug) {
    return debugConfig;
  }
  return defaultConfig;
}
```

通常, 这个配置文件位于项目的根目录, 并且命名为 `rollup.config.js`。

在编译时, 使用 `-c` 或 `--config` 指定所用的配置文件：

```shell{6}
# 将自定义配置文件的路径传给 Rollup
rollup --config my.config.js

# 如果你不传文件名, Rollup 将会尝试
# 按照以下顺序加载配置文件：
# rollup.config.mjs -> rollup.config.cjs -> rollup.config.js
rollup --config
```

> Rollup 本身执行了配置文件, 因此我们能够使用 export default 语法 – 这些代码没有被 Babel 或者其他类似工具编译, 因此只能使用 Node.js 版本支持的 ES2015 语法特性。

##### iife 与 umd

当 `format` 配置为 `iife` 或 `umd` 格式时, 需要特别注意一点。

当入口文件需要导出内容, 比如 `export const a = 123` 时, 就需要配置 `output.name` 选项, 告诉 Rollup 将导出挂载至全局变量的哪个属性下。

```js
export default {
  // ...
  output: {
    format: 'umd',
    name: 'namename'
  }
}
```

##### banner 和 footer

如果想给打包生成的 bundle 添加一些诸如作者信息之类的注释, 可以使用 banner 和 footer。

```js
export default {
  // ...
  output: {
    // ...
    banner: '// Banner',
    footer: '// Footer'
  }
}
```

#### 转译配置文件

Rollup 会在配置文件被依赖之前, 在后台将配置文件和 CommonJS 的相关依赖项进行转译和打包, 这样做的优点是易于配置和 ES 模块代码库共享代码, 同时与 Node 生态完全互通。

> `.js` 后缀会转译配置文件, `.cjs` 和 `.mjs` 不会, 像 Vue 就是使用 `.mjs`

使用 `m.js` 可能会无法导入 JSON 文件, 例如 `package.json file`, 有两种方式解决这个问题：

1. 通过以下方式运行 Rollup：`node --experimental-json-modules ./node_modules/.bin/rollup --config`
2. 创建一个依赖 JSON 文件的 CommonJS 的包装器：

```js
// load-package.cjs
module.exports = require('./package.json');

// rollup.config.mjs
import pkg from './load-package.cjs';
...
```

#### 配置文件列表

```js
// rollup.config.js
export default { // 可以是一个数组（用于多个输入的情况）
  // 核心的输入选项 // [!code focus:4]
  external,
  input, // 必要项
  plugins,

  // 高级输入选项
  cache,
  onwarn,
  preserveEntrySignatures,
  strictDeprecations,

  // 危险区
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,

  // 实验性
  experimentalCacheExpiry,
  perf,

  output: { // 必要项 (可以是一个数组, 用于多输出的情况) // [!code focus:8]
    // 核心的输出选项
    dir,
    file,
    format, // 必要项
    globals,
    name,
    plugins,

    // 高级输出选项
    assetFileNames,
    banner,
    chunkFileNames,
    compact,
    entryFileNames,
    extend,
    footer,
    hoistTransitiveImports,
    inlineDynamicImports,
    interop,
    intro,
    manualChunks,
    minifyInternalExports,
    outro,
    paths,
    preserveModules,
    sourcemap,
    sourcemapExcludeSources,
    sourcemapFile,
    sourcemapPathTransform,

    // 危险区
    amd,
    esModule,
    exports,
    externalLiveBindings,
    freeze,
    indent,
    namespaceToStringTag,
    noConflict,
    preferConst,
    strict,
    systemNullSetters
  },

  watch: {
    buildDelay,
    chokidar,
    clearScreen,
    skipWrite,
    exclude,
    include
  } | false
}; // [!code focus]
```

### JavaScript API

Rollup 虽然提供了可在 Node.js 中使用的 [JavaScript API](https://rollupjs.org/guide/en/#javascript-api)。但是一般情况下不需要使用它, 而应使用命令行, 除非需要扩展 Rollup 本身或者使用它进行一些高级操作, 比如通过编程生成 bundle。

> 所以需要的话去翻官方文档吧。