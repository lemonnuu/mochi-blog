# esbuild

--outfile

--bundle 可以打包进去

<span class="color1" >Vite 使用 ESbuild 只是在开发环境中使用</span>

始终会编译成 var 不管咋配置, 不支持编译为 ES5， 没有 UMD 支持

Vite 使用 ESbuild 只是在开发环境中使用

--platform

--define:TEST=12


设置环境变量的方式：

- `--environment TEST:12`

`"build": "rollup -c --bundleConfigAsCjs --environment TEST:26"`

