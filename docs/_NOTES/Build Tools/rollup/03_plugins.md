---
title: Rollup
titleTemplate: 插件
outline: [2,4]
---

# Rollup 插件

## [常用插件](https://github.com/rollup/plugins)

Rollup 的 plugins 是有顺序关系的, 最前面的先执行。

> 可以说, rollup 没使用插件就废了一半...

### [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)

Rollup 默认是不能导入 JSON 文件的, 如需导入得安装 `@rollup/plugin-json` 插件并使用。

```shell
npm install @rollup/plugin-json -D
```

```js
import json from '@rollup/plugin-json'
export default {
  // ...
  plugins: [
    json()
  ]
}
```

### [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)

Rollup 默认不会将 NPM 包依赖打包在 bundle 中, 如需这么做, 要使用 `@rollup/plugin-node-resolve` 插件。

```shell
npm install @rollup/plugin-node-resolve -D
```

```js
import resolve from '@rollup/plugin-node-resolve'
export default {
  // ...
  plugins: [
    resolve()
  ]
}
```

### [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)

在使用 `@rollup/plugin-node-resolve` 后, 如果 NPM 包支持 ES Module 规范的导入则万事大吉, 但如果只支持 CommonJS 规范, 还需要使用 `@rollup/plugin-commonjs` 插件。

```shell
npm install @rollup/plugin-commonjs -D
```

```js
import commonjs from '@rollup/plugin-commonjs'
export default {
  // ...
  plugins: [
    commonjs()
  ]
}
```

### 前置依赖

使用了 `@rollup/plugin-node-resolve` 插件后, 默认会把所有的依赖项打包至 bundle 中, 但是更多的场景往往是需要控制哪些需要被打包, 哪些是作为前置依赖。

属性 `external` 用于配置前置依赖, 其接收一个模块名称组成的数组, 或者接收一个参数为模块名字的函数, 如果需要把某模块设置为外部引入, 只需要让该函数返回 true。

```js
export default {
  // ...
  // external: ['lodash'],
  external: id => /lodash/.test(id)
}
```

当 format 为 iife 或 umd 时, 前置依赖可能是全局变量的某个属性, Rollup 会根据 `external` 提供的模块名称自动猜测, 如：

- react -> (guessing "React")
- lodash -> (guessing "_")

但偶尔, Rollup 猜测的可能不符合我们的预期, 就可以把 `external` 数组的每一项配置为一个对象, 键为模块名称, 值为预设的属性名称。

```js
export default {
  // ...
  external: [{ 'react': 'React' }, { 'lodash': '_' }]
}
```

也可以配置 globals 属性：

```js
export default {
  // ...
  output: {
    // ...
    globals: {
      'react': 'React',
      'lodash': '_'
    }
  }
}
```

### [@rollup/plugin-terser](https://github.com/rollup/plugins/tree/master/packages/terser)

在生产环境下, 打包后的代码往往需要经过压缩, 压缩代码可以使用 `@rollup/plugin-terser` 插件。

> 插件不仅可以使用在"外层"的 `plugins` 中, 还可以使用在 `output.plugins` 中。`output.plugins` 中的插件会在"打包完成后"执行。


```shell
npm install @rollup/plugin-terser -D
```

```js
import terser from '@rollup/plugin-terser'

export default {
  // ...
  output: {
    dir: 'output',
    format: 'cjs',
    plugins: [terser()]
  }
}
```

> 需要注意的是, @rollup/plugin-terser@0.2.0+ 版本可能需要依赖 CommonJS, 所以如果采用 ES Module 规范书写配置文件时, 需要在命令行添加 `--bundleConfigAsCjs` 参数。
> 
### [@rollup/plugin-alias](https://github.com/rollup/plugins/tree/master/packages/alias)

`@rollup/plugin-alias` 插件可以给包的导入路径定义别名

> 这个插件的作用很熟悉的好伐！像 Vue 中可以通过 `@` 导入 `src` 下面的内容就是它的作用。

```shell
npm install @rollup/plugin-alias -D
```

```js
import alias from '@rollup/plugin-alias'
import path from 'path'

export default {
  // ...
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ]
    })
  ]
}
```

> 这里使用了 `path.resolve()`, 所以如果是 ES Module 规范书写的配置文件命令行也需要添加 `--bundleConfigAsCjs` 参数。

### [@rollup/plugin-babel](https://github.com/rollup/plugins/tree/master/packages/babel)

为了能够使用浏览器和 Node.js 尚不支持的最新 JavaScript 特性, 需要使用到 Babel。

Babel 和 Rollup 一起使用的最简单的方式就是通过 `@rollup/plugin-babel` 插件。

```shell
npm install @rollup/plugin-babel -D
```

如果 `@rollup/plugin-babel` 和 `@rollup/plugin-commonjs` 需要一起使用, commonjs 必须放在 babel 的前面。

```js
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
  // ...
  plugins: [
    commonjs(),
    babel({ babelHelpers: 'bundled' })
  ]
}
```

在 Babel 实际编译代码之前, 还需要对其进行配置。创建 `src/.babelrc` 文件：

```json
{
  "presets": [
    ["@babel/env", {"modules": false}]
  ]
}
```

这里需要将 `modules` 设置为 `false`, 否则 Babel 将在 Rollup 有机会执行其操作之前将模块转换为 CommonJS, 从而导致其失败。

接着安装 `babel-core` 和 `env` 就可以了。

```shell
npm install @babel/core @babel/preset-env -D
```

### [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace)

`@rollup/plugin-replace` 插件可以替换文件中的目标字符串。

> 一般可用于替换 `__buildDate__`、`__buildVersion` 什么之类的。

```shell
npm install @rollup/plugin-replace -D
```

```js
import replace from '@rollup/plugin-replace';

export default {
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15
    })
  ]
}
```

### [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript)

如果需要使用 typescript, 可以使用 `@rollup/plugin-typescript` 插件。

> Babel、esbuild 都可以编译 TS 文件, 只不过它们不会校验类型。

`@rollup/plugin-typescript` 插件需要依赖于 `typescript` 和 `tslib`。

```shell
npm install typescript tslib @rollup/plugin-typescript -D
```

```js
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/main.ts',
  // ...
  plugins: [
    typescript()
  ]
}
```

### [rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2)

`rollup-plugin-typescript2` 不是官方插件, 比 `@rollup/plugin-typescript` 编译慢一点点, 但它会打印出 TypeScript 语法诊断信息。

> Vue 使用的就是 rollup-plugin-typescript2 插件。

```shell
npm install typescript tslib rollup-plugin-typescript2 -D
```

```js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/main.ts',
  // ...
  plugins: [
    typescript()
  ]
}
```

### [@rollup/plugin-eslint](https://github.com/rollup/plugins/tree/master/packages/eslint)

Rollup 和 ESLint 结合可使用 `@rollup/plugin-eslint` 插件。

```shell
npm install @rollup/plugin-eslint -D
```

> 这并不意味着你不需要安装 ESlint 和配置 `.eslintrc.js`, 这里默认你有。


```js
import eslint from '@rollup/plugin-eslint'

export default {
  // ...
  plugins: [
    eslint({
      // throwOnError: true,
      // fix: true
    })
  ]
}
```

这样打包的话, 如果 eslint 校验不通过会在控制台输出错误信息, 但仍可以生成 bundle。

如果想有错误停止打包可将 `throwOnError` 选项配置为 true, 如果想自动修复可将 `fix` 选项配置为 true。

### [@rollup/plugin-image](https://github.com/rollup/plugins/tree/master/packages/image)

如果想引入图片资源需要使用 `@rollup/plugin-image` 插件, 实际上就是转为了 base64。

> base64 编码比磁盘上的大小大 33%, 也就是说 `base64 : 磁盘 = 4 : 3`。

```shell
npm install @rollup/plugin-image -D
```

```js
import image from '@rollup/plugin-image'

export default {
  // ...
  plugins: [image()]
}
```

### [@rollup/plugin-strip](https://github.com/rollup/plugins/tree/master/packages/strip)

这个插件会在代码中删除调试语句, 如 `console.log()`、`assert.equal` 等。

> 这个插件并不是那么的常用, 因为生产环境下 terser 就可以做到。

```shell
npm install @rollup/plugin-strip --save-dev
```

```js
import strip from '@rollup/plugin-strip'

export default {
  // ...
  plugins: [
    strip()
  ]
}
```

## [编写插件](https://rollupjs.org/guide/en/#plugins-overview)

编写插件实际上就是调用一系列的 Hook, 执行某些特定的操作, 有需要再看官网。