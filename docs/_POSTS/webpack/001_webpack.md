---
date: '2023-03-20 09:13:18'
title: Webpack
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - webpack
---

# Webpack

## 起步

webpack 支持使用多种编程语言和数据描述格式来编写配置文件, 如支持使用 TypeScript、CoffScript 或 Babel + JSX 的方式编写配置文件。

要使用 TypeScript 编写 webapck 配置, 需要先安装必要的依赖, 比如 TypeScript 以及其相应的类型声明。

```shell
npm install webpack webpack-cli typescript ts-node @types/node @types/webpack -D
# 如果使用 webpack-dev-server 版本低于 v4.7.0 还需要安装以下依赖
npm install @types/webpack-dev-server -D
```

安装依赖完成后便可开始编写配置文件, 示例如下：

```ts
import * as path from 'path'
import * as webpack from 'webpack'

const webpackConfig: webpack.Configuration = {}

export default webpackConfig
```

值得注意的是需要确保 `tsconfig.json` 的 `compilerOptions` 中的 `module` 选项值为 `commonjs`, 否则 webapck 的运行会失败报错, 因为 `ts-node` 不支持 `commonjs` 以外的模块规范。

`tsc --init` 生成 `tsconfig.json` 的 `compilerOptions` 中的 `module` 选项值默认为 `commonjs`, 如需要配置为 `ESNext`。可以添加 ts-node 配置, 为 ts-node 设置一个重载。

```json
{
  "compilerOptions": {
    "module": "ESNext"
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

但需要注意的是, `module` 选项如果为 `es2015` 或 `exnext` 等 es module 规则时, `--allowSyntheticDefaultImports` 将不会生效, 也就是说引入 CommonJS 规范包时不能采用默认导入, 如 `import path from 'path'`, 只能采用 `import * as path from 'path'`。

webpack 开箱即用, 可以无需使用任何配置文件。默认情况下, webpack 会假定项目的入口起点为 `src/index.js`, 在 `dist/main.js` 输出结果, 并在生产环境开启压缩和优化。然而, 默认配置往往满足不了复杂多变的业务需求。

在日常开发中, 通常需要区分开发环境和生产环境, 这就意味着需要根据特定情况使用不同的 webpack 配置文件。有很多种方法可以做到这一点, 比如可以在命令行中通过 `--config` 标志显式指定使用的配置文件。

```json
{
  "scripts": {
    "dev": "webpack --config webpack.development.config.js",
    "build": "webpack --config webpack.production.config.js"
  }
}
```

并且可以在 `webpack.common.config.js` 文件中分离出开发环境与生产环境配置的公共部分, 再借助 `webapck-merge` 库帮助合并。

最简单也是最推荐的做法是, 将 webpack 配置导出一个函数而非对象, 这个函数包含两个参数：

- 参数一是环境(environment)
- 参数二是传递给 webpack 的配置项, 其中包含 `output-path` 和 `mode` 等

webpack.config.ts：

```ts
import * as path from 'path'
import * as webpack from 'webpack'

const webpackConfig = function (env: any, args: any): webpack.Configuration {
  return {
    mode: env.production ? 'production' : 'development',
  }
}

export default webpackConfig
```

package.json：

```json
{
  "scripts": {
    "dev": "webpack --env development",
    "build": "webpack --env production"
  }
}
```

可以执行 `npm run dev` 再分别打印一下 `env` 和 `args`：

```js
// env
{ WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, development: true }
// args
{
  env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, development: true }
}
```

webpack 集成 TypeScript 有两种方式：

- 第一种是安装 `ts-loader` 处理 ts 或 tsx 文件
- 第二种是加载 babel 的 `@babel/preset-typescript` 预设编译 ts 代码

这两种方式还是存在一些区别的, 主要是 tsc 与 babel 的编译流程不同。

1. tsc 会进行类型检查和生成 d.ts 文件, 而 babel 不会做类型检查, 也没有类型信息, 生成不了 d.ts 文件
2. tsc 默认支持草案阶段语法, 而 babel 是通过 @babel/preset-env 按照目标环境的配置自动引入需要用到的插件来支持标准语法, 对于草案阶段的语法需要单独引入 @babel/proposal-xx 的插件支持
3. tsc 不支持 polyfill 的按需引入, 如果需要 polyfill 需要入口全量引入, 而 babel 可以按需引入 polyfill
4. tsc 是整个项目一起编译, 会处理类型声明文件, 会做跨文件的类型声明合并, 而 babel 是每个文件单独编译
5. babel 不支持部分 ts 语法, 如不支持 `const enum`、不支持 namespace 的跨文件合并及导出非 const 的值、不支持过时的 `export=import=` 的模块语法

我们将采用 ts-loader 的方式对 ts 文件进行打包, 安装 `ts-loader`：

```shell
npm install ts-loader -D
```

要编译 ts 文件, 得创建 `tsconfig.json` 文件指定编译项目的根文件和编译选项, 可以执行命令 `npx tsc --init` 生成默认配置。

```shell
npx tsc --init
```

如果 ts 文件中需要引入 JS 文件, 需要将 `tsconfig.json` 的 `compilerOptions` 中的 `allowJS` 选项配置为 true, 允许编译 JavaScript 文件。

tsconfig.json：

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "allowJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

在从 npm 安装第三方库时, 一定要记得同时安装此 library 的类型声明文件。可以从 TypeSearch 中找到并安装这些第三方库的类型声明文件。如上方的 `@types/node`、`@types/webpack`。

要在 TypeScript 中使用非代码资源时, 需要告诉 TypeScript 推断导入资源的类型。可以在项目里创建一个 `custom.d.ts` 文件, 这个文件用来表示项目中 TypeScript 的自定义类型声明。如为 `.svg` 文件设置一个声明：

```ts
declare module '*.svg' {
  export default const content: any;
}
```

这里通过指定任何以 `.svg` 结尾的 import, 将 SVG 声明为一个新的模块, 并将模块的 content 定义为 any。也可以通过将类型定义为字符串, 来更加显式地将它声明为一个 url。同样的概念适用于其它资源, 包括 CSS, SCSS, JSON 等。

## 配置

在配置 devServer 时, 如果没有 `import 'webpack-dev-server'` 会报 devServer 类型错误, 官网有提到这一点, 所以需要引入一下：

```js
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'
```

在配置模块热更新时, 如果引用 `module.hot` 会报错 hot 不存在, 需要装一下 `@types/webpack-env` 解决它。

TS 的热模块更新有问题, 暂未解决... 要重新按需引入一次??? 感觉应该像是 bug, JS 模块是可以的, 暂且搁置吧, 晓得怎么写就行。

```js
if (module.hot) {
  module.hot.accept('./component/div', () => {
    // 此模块发生改变时触发此回调函数
  })
}
```

原则上涉及到热模块更新我们就需要写一坨这玩意儿, 但会发现 CSS 文件并没有写而且会 HMR, 是因为 style-loader 帮我们做了这层处理。类似做了 HMR 的 loader 还有 vue-loader、React Hot Loader、Angular HMR、Svelte Loader 等等。

:::details 配置示例

```ts
import * as path from 'path'
import * as webpack from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin'

const webpackConfig = function (env: any, args: any): webpack.Configuration {
  return {
    mode: env.production ? 'production' : 'development',
    context: path.resolve(__dirname),
    entry: './src/index.ts',
    devtool: env.production ? false : 'source-map',
    devServer: {
      client: {
        overlay: true,
      },
      compress: true,
      open: true,
      hot: true,
    },
    optimization: {
      usedExports: true,
      minimize: env.production ? true : false, // 开发环境不让它压缩, 要不然丢失了 source-map
      minimizer: ['...', new CssMinimizerWebpackPlugin()],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[contenthash:6].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
              },
            },
            'sass-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'font/[name]-[contenthash:6][ext]',
          },
        },
        {
          test: /\.(jpg|jpeg|svg|pdf|png)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 20 * 1024,
            },
          },
          generator: {
            filename: 'image/[name]-[contenthash:6][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'TS 构建',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash:6].css',
        chunkFilename: 'css/[name]-[chunkhash:6].css',
      }),
    ],
  }
}

export default webpackConfig
```

:::

## 模块混用

在 webpack 里模块的引入和导出是可以混用的, 例如可以用 ES Module 导出, Common JS 导入模块

1. ES Module 导出, CommonJS 导入：这样 Common JS 导入的模块是一个对象, 类似于 `{default: xxx, other: xxx....}` 这样的形式
2. Common JS 导出, ES Module 导入：这样 ES Module 如果是默认导入的话, 则导入的是 Common JS 的 `module.exports`, 分别导入的话是 `module.exports` 的一个属性, 但以 `import * as xxx from 'xxx'` 是最稳妥的方式, 不仅导入了 `module.exports`, 还额外挂载了一个 `default` 属性上去, 其值为 `module.exports` 的一个副本

但需要注意的是, tsc 与 webpack 模块解析规则略微不同

tsc 的 ES Module 导入 Common JS 采用默认导入的话, 如果 `module.exports` 属性上没有 `default` 属性是会报错的, 需要配置 tsconfig.json 中 `compilerOptions` 的 `esModuleInterop` 选项为 true 后, 默认开启 `allowSyntheticDefaultImports` 为 true, 这样一来编译的代码会做一层判断, 没有 `default` 的话将导出挂载至 `default` 属性。

### 打包 CSS 文件

打包 CSS 文件常用的 loader 就是 style-loader、css-loader。

```shell
npm install style-loader css-loader -D
```

如果用到了 scss 还需要 sass-loader, 使用 sass-loader 得预先安装 Dart Sass 或 Node Sass, 推荐使用 Dart Sass。

```shell
npm install sass sass-loader -D
```

如果需要给 CSS 加上厂商前缀什么的, 可以使用 postcss-loader 对 CSS 进行处理。值得注意的是, postcss 工作得添加配置文件或直接在 webpack 中进行配置, 通常还需搭配 postcss-preset-env 插件使用, postcss-preset-env 内置了 autoprefixer 插件

```shell
npm install postcss postcss-loader postcss-preset-env -D
```

postcss.config.js

```js
module.exports = {
  plugins: ['postcss-preset-env'],
}
```

需要注意的是 postcss-preset-env、Babel 都依赖 browserslist

若使用了诸如 sass 这样的 CSS 预处理器后, 可能还需要向 css-loader 传递一些参数, 比如 `importLoaders: 2`, 因为 scss 文件可以引入其它的 scss 文件, 对此文件就需要用所有的 loader 再处理一遍。

默认引入的 CSS 拥有全局作用域, 如果需要对 CSS 进行模块化, 需要向 css-loader 传递 `modules: true` 的参数。并且通过 `import './xxx.scss'` 引入的 CSS 换成 `import style from 'xxx.scss'`, 使用时为 `classList.add(style.xxx)` 这样的形式。

### 提取 css 与压缩

采用 style-loader 的话 css 是与 js 杂糅在一块儿的, 如果 css 文件过大势必会影响性能, 可以使用 mini-css-extract-plugin 将 css 分离成单独的文件。

```js
{
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: 2,
      },
    },
    "sass-loader",
    "postcss-loader",
  ],
},

new MiniCssExtractPlugin({
  filename: "css/[name]-[contenthash:6].css",
  chunkFilename: "css/[name]-[chunkhash:6].css",
}),
```

将 css 提取成单独文件后在生产环境可用 css-minimizer-webpack-plugin 将 css 文件进行压缩

```ts
optimization: {
  usedExports: true,
  minimize: env.production ? true : false, // 开发环境不让它压缩, 要不然丢失了 source-map
  minimizer: ["...", new CssMinimizerWebpackPlugin()],
},
```

### 打包字体和图片

打包字体和图片在 webpack4 时代是通过 file-loader、url-loader 等将静态资源复制或转化成 base64 的形式, 而 webpack5 新增了资源模块的概念, 帮我们内置集成了这些 loader, 我们只需指定模块类型即可。

```js
{
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: "asset/resource",
  generator: {
    filename: "font/[name]-[contenthash:6][ext]",
  },
},
```

asset 一共有 4 种类型：

- asset/resource : 复制资源, 之前通过 file-loader 实现
- asset/inline : 转化为 base64, 之前通过 url-loader 实现
- asset/source : 导出资源源代码, 之前通过 raw-loader 实现
- asset : 在复制资源和转 base64 之间选择, 需要配置资源体积大小限制, 之前通过 url-loader 实现

```js
{
  test: /\.(jpg|jpeg|svg|pdf|png)$/i,
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: 20 * 1024,
    },
  },
  generator: {
    filename: "image/[name]-[contenthash:6][ext]",
  },
},
```

## code-spliting

code-spliting 是非常有必要的, 它可以分离我们引入的第三方库或将业务代码分割。假如将业务代码和第三方库打包为一个 JS 文件, 从运行角度上来说是没有任何问题的, 但是性能上会造成损耗。可以想象一下有十万行的业务逻辑和十万行的第三方库代码, 打包在一起势必会造成包过大, 请求时间过长的问题, 其次, 引入第三方库代码是基本不会修改的, 如果修改了业务代码, 相当于用户又得请求一次第三方库代码, 完全可以分为俩个甚至更多的文件使得利用缓存只重新请求业务代码。

动态引入都默认支持 code-spliting, 同步引入的需要配置 `optimization` 的 `spiltChuns` 配置项。无论是同步代码的代码分割还是异步代码的代码分割, 都需要用到 split-chuns-plugin 插件, 所幸, webpack5 内置了它。

异步代码的代码分割要重命名生成的文件名称可采用魔法注释的方式, 如：`/* webpackChunkName: lodash */`。

要打包同步代码, 首先得将 `optimization` 中 `splitChuns` 的 `chunks` 配置成 `all`, 再符合其它配置项规则后, 然后还得匹配到 `cacheGroups` 的组, 才会进行代码分割。

### chunk

chunk 是什么? 最后打包生成的每一个 JS 文件都可以叫一个 chunk, 由 code-spliting 分割而来, 异步引入的模块就是一个单独的 chunk。

### 懒加载

懒加载其实就是异步引入 `import('xxx').then()`, 它主要是可以做到需要用的时候再加载, 不用不加载, 以免浪费资源, 造成性能损耗。

### webpackPrefetch、webpackPreload

懒加载其实会带来一个问题, 那就是必须触发一个条件才加载相应模块, 而这必定需要用户等待一定的时长, 降低了用户的体验。

预加载就是在懒加载这种异步引入的基础上, 没触发条件的时候也加载相应模块, 然后就会在浏览器形成缓存, 当触发条件时直接从缓存读取资源, 大大提升了用户体验。

预加载的实现方式有两种, 分别是 webpackPrefetch 和 webpackPreload：

- webpackPrefetch 是必须等加载完主要模块后, 带宽空闲出来了, 再偷偷加载资源
- webpackPreload 是和主模块一起加载

显而易见, 选择 webpackPrefetch 的方式更有利于提升用户的交互体验。如：`import(/* webpackPrefetch: true */'xxx').then()`

采用懒加载或预加载的方式可以提升代码的利用率！

## 浏览器缓存与 webpack

由于浏览器缓存的存在, 二次请求服务器相同文件名会优先从缓存读取资源。项目发生更新迭代时, 如果打包后新代码与老代码文件名称一模一样, 用户在不是第一次访问的情况下, 不强制刷新浏览器是获取不到服务器资源的。所以我们得保证如果文件发生改变后文件名需要发生改变才行, 就需要用到 hash, 让生成的文件名称包含 contenthash 即可。

## shimming(垫片)

垫片的概念很宽泛, 比如 babel 将 ES6 转 ES5 就是一个 shimming, 当然远不止如此。

假设一：我们需要引入一些非常老旧的依赖, 其内部默认了 $ 就是全局变量, 默认了我们就引入了 jQuery 库, 这对于使用 webpack 以前的确是没有问题的, 因为当时没有模块化的概念, 我们引入的 jQuery 的确会成为全局变量。但是, 恰巧不巧, 我们用了 webpack, webpack 是基于模块的, 哪怕我们导入了 jQuery 在这个老旧的依赖内部还是获取不到资源。

这个时候需要用到 webpack 内置的插件 —— ProvidePlugin：

```js
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
})
```

诸如上面这个配置, ProvidePlugin 会在我们项目中遇到 `$` 或 `jQuery` 的地方, 先偷偷的引入一遍 jquery 先, 这样一来, 老旧的依赖运行就没任何问题了。

假设二：依旧是令人讨厌的老旧依赖, 其内部默认全局 this 指向 window, 这在没有使用 webpack 以前也没有任何问题, 但成也模块化败也模块化, webpack 的 this 指向模块自己, 要解决这个问题, 需要用到 imports-loader, 然后最好采用内联的方式调用 loader 以免影响其它文件。

```js
import 'babel-loader!imports-loader?this=>window!./example.js'
```

## 多页面应用打包

多页面应用本质上就是配置多个打包入口文件, 然后调用多次 html-webpack-plugin 生成多份模板, 再配置对插件的 chunks 就好了。但是, 可以写一个函数解析 entry 选项再自动的向 plugins 送入多份 html-webpack-plugin 配置, 以免多个入口就得手动写一份 html-webpack-plugin 配置。

## ejs

如果 html 内容存在可复用或者动态插入的部分, 可用 ejs 模板引擎, 需要使用到 ejs-loader

```html
<%= require('../ejs/header.ejs')() %>
```

```js
{
  test: /\.ejs$/,
  loader: "ejs-loader",
  options: {
    esModule: false,
  },
},
```

## vue-loader

vue-loader@15 匹配的是 vue2, 15 版本以上匹配的是 vue3

vue2 - vue-loader15 - vue-router3 - vuex4
vue3 - vue-loader16+ - vue-router4+ - vuex5+

vue2 得用 vue-loader 自带的 plugin : `const VueLoaderPlugin = require("vue-loader/lib/plugin");`

vue3 得用 vue-loader 自带的 plugin : `const { VueLoaderPlugin } = require("vue-loader");`

## history 路由

当配置 history 路由时, 需要配置 nginx, 开发模式时配置 webpack-dev-server 的 historyApiFallback 为 true 就行, 实际上当它访问没有的页面如 `xxx.html` 时会自动返回 `index.html` 给页面。

## 优化打包速度

1. 尽可能升级 node, npm, wbpack 版本
2. 合理使用 resolve 配置项
3. 正确配置 source-map
4. 开发环境无用插件剔除, 如压缩
5. 控制包文件大小
6. 多进程打包, thread-loader, parallel-webpack, happypack
7. 结合 stats 分析打包结果

## eslint

使用 eslint 不用和 webpack 绑定起来, 单独使用 eslint 有两种方式：

1. 安装 eslint, 然后命令行输入 `npx eslint src` 即可在命令行输出校验结果。(不推荐)
2. 安装 eslint, 编辑器再安装 eslint 插件！通过插件可在编辑器内提示我们。(推荐)

如果每个成员靠编辑器 eslint 插件去约束代码规范, 明显不合理, 成员的编辑器不尽相同。

eslint 可以和 webpack 联合起来, 使用 eslint-loader 在打包构建的时候, 自动校验代码规范性, 并在命令行抛出错误, 相当于执行了 `npx eslint src`, 但是结合 devServer 的 overlay 选项, 可以做到像 Vue 一样界面上会显式错误。

听起来这样不错, 但是会有俩个缺点：

1. 多使用了一层 loader 势必打包效率降低
2. 尽管提示了错误, 但是不规范的代码仍然可以合并分支

所以可以结合 git hooks 来做这件事, 在提交代码的时候 `npx eslint src`, 有错误不让提交代码。成员自己尽可能在编辑器里装好 eslint 插件。

## babel

[babel](https://www.jiangruitao.com/babel/) 看这一篇文章就行了

babel 的使用需要预设的, 然后参数 useBuiltIns 设置为 usage 可按需引入 useBuiltIns

几个点？

开发环境不要压缩文件, 否则 source-map 会出问题

1. postcss-preset-env 依赖于 browserslistrc, 所以得撸一遍 browserslist
2. 再看 postcss-preset-env 干了些啥玩意
3. autoprefix、Babel、postcss-preset-env、eslint-plugin-compat、stylelint-no-unsupported-browser-features、postcss-normalize 都依赖于 browserslist
4. 在 package.json 中配置或在 browserslistrc 中, 默认配置 `['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead']`
