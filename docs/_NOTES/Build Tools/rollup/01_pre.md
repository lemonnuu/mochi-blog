---
title: Rollup
titleTemplate: 前言
---

# Rollup

天天听说 Rollup Rollup, Rollup 到底是个啥, 又有啥优势, 为什么开源类库都喜欢它？

对于 webacpk 肯定不陌生, 在业务项目中经常出现。不过, webpack 生成的代码有很多不是我们所写的逻辑代码, 比如一些他自有的模块加载功能。

对于业务项目来说这些影响不大, 但编写类库时, 由于类库本身就很小, 如果还用 webpack 打包的话就显得有的不合适了。

所以编写类库适合用 rollup 打包。

---

下面就让我们一起来和 Rollup 混个脸熟。notes 分为三个章节：

- [快速入门](02_use.md)：Rollup 的基本使用
- [插件](03_plugins.md)：Rollup 常见插件极其用法
- [常见问题](04_faqs.md)：一些关于 Rollup 的困惑
