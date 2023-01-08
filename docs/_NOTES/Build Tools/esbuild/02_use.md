---
title: esbuild
titleTemplate: 入门
outline: [2,4]
---

# esbuild 入门

## 安装

首先, 下载并本地安装 [esbuild](https://esbuild.docschina.org/), 可以通过 npm a安装预编译的原生可执行文件：

```shell
npm install esbuild -D
```

## 使用

esbuild 的使用方式只能通过命令行或者是用 JavaScript API 构建脚本, 没有配置文件一说。

### 命令行

运行 `npx esbuild -h` 查看可用的配置项与参数。

> 毫无例外, esbuild 的可用选项和参数也很多哈...不过, 构建工具的理念都是相通的。

下面是简化的版本：

```
Usage:
  esbuild [options] [entry points]

Simple options:
  --bundle              Bundle all dependencies into the output files
  --define:K=V          Substitute K with V while parsing
  --external:M          Exclude module M from the bundle (can use * wildcards)
  --format=...          Output format (iife | cjs | esm, no default when not
                        bundling, otherwise default is iife when platform
                        is browser and cjs when platform is node)
  --loader:X=L          Use loader L to load file extension X, where L is
                        one of: js | jsx | ts | tsx | css | json | text |
                        base64 | file | dataurl | binary | copy
  --minify              Minify the output (sets all --minify-* flags)
  --outdir=...          The output directory (for multiple entry points)
  --outfile=...         The output file (for one entry point)
  --platform=...        Platform target (browser | node | neutral,
                        default browser)
  --serve=...           Start a local HTTP server on this host:port for outputs
  --sourcemap           Emit a source map
  --splitting           Enable code splitting (currently only for esm)
  --target=...          Environment target (e.g. es2017, chrome58, firefox57,
                        safari11, edge16, node10, ie9, opera45, default esnext)
  --watch               Watch mode: rebuild on file system changes

Advanced options:
  --version                 Print the current version (0.16.4) and exit
```

esbuild 的使用不像 Rollup 和 Webapck 一样需要安装各式各样的插件亦或是 loader, 它基本上都内置好了。

##### --build

`--build` 参数有点像 Rollup 的 @rollup/plugin-node-resolve  和 @rollup/plugin-commonjs 插件的结合版。

它会将所有的依赖打包入 bundle 中。

##### --define:K=V

`--define:K=V` 参数的作用和 Rollup 的 @rollip/plugin-replace 插件作用相同, 用于替换文件中目标字符串。

##### --external:M

`--external:M` 参数就基本和 Rollup 的 external 选项作用一致了, 剔除的依赖包将成为 bundle 的前置依赖。

##### --format=...

`--format=...` 参数和 Rollup 的 format 选项略微有点差异, esbuild 不支持构建 UMD 格式的 bundle。

且它没有统一的默认的配置, 但可以取决于 `--platform=... ` 参数的实现, 下面是对应关系：

- `--paltfrom=browser` -> iife
- `--paltfrom=node` -> cjs

##### --loader:X=L

`--loader:X=L` 参数就和 webpack loader 的概念很类似了, 用于处理不同类型的文件以及控制表现形式。

##### --minify

`--minify` 参数作用相当于启用 terser 压缩代码。

##### --outdir=...

`--outdir=...` 参数用于设置 bundle 的输出文件夹, 和 Rollup 的 output.dir 选项作用一致。

##### --outfile=...

`--outfile=...` 参数用于设置 bundle 的输出文件, 和 Rollup 的 output.file 选项作用一致。

##### --platform=...

`--platform=...` 参数用于指定构建 bundle 的运行平台, esbuild 可根据它调整默认的 format。

##### --sourcemap

`--sourcemap` 选项指定是否开启 source map 功能。

##### --target=...

`--target=...` 选项用于指定 bundle 的 JavaScript 版本, 默认是 esnext。

需要注意的是, esbuild 不支持构建 ES5 的 bundle, 且不管选择哪个版本, 都是使用 `var` 定义变量。

##### 简单的示例

```shell
npx esbuild app.jsx --bundle --minify --sourcemap --target=chrome58,firefox57
```

### JavaScript API

有三种方式可用调用 esbuild 的 JavaScript API：

- 命令行中调用
- Go 中调用
- JavaScript 中调用

这里只讲解在 JavaScript 中调用的方式。

> 其实消化了命令行调用 esbuild 后这个很容易理解。

这是一个示例：

```js
require('esbuild').build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
}).catch(() => process.exit(1))
```

`build` 函数会在子进程中运行 esbuild 的可执行文件, 并返回一个 Promise, 当构建完成后, 该 Promise 将被 resolve。

可以看到上述代码并未打印捕获的异常, 因为异常中的任何错误信息默认会被打印到控制台(可以修改 日志级别 按需关闭此功能)。

尽管还有个 `buildSync` 同步 API, 但是异步 API 对于构建脚本来说明显更为合适, 且插件只与异步 API 协同工作。

> 这里就不展开说了, 如有需要可翻看[官网的 JavaScript](https://esbuild.docschina.org/api/) 章节。
