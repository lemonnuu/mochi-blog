---
date: '2023-02-12 09:47:56'
title: Vue3 の compiler 编译器
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - vue
---

# Vue3 の compiler 编译器

整个 compiler 的过程, 就是一个把源代码转化为目标代码的过程。

编译器是一个非常复杂的概念, 在很多语言中均有涉及。不同类型的编译器在实现技术上都会有较大的差异。

比如要实现一个 Java 或者 JavaScript 的编译器, 那就是一个非常复杂的过程了。

但是对于我们而言, 并不需要设计这种复杂的语言编译器, 我们只需有一个领域特定语言 DSL 的编译器即可。

baseCompile:

1. 通过 parse 方法进行解析, 得到 AST
2. 通过 transform 方法对 AST 进行转化, 得到 JavaScript AST
3. 通过 generate 方法根据 AST 生成 render 函数

自动状态机、codegenNode

## 有限状态机

自动状态机解析模板为 tokens, 而 tokens 就是生成 AST 的关键

生成 AST 的过程, 就是 tokens 扫描的过程

以以下 html 为例

```html
<div>
  <p>hello</p>
  <p>world</p>
</div>
```

tokens:

```text
开始标签 : <div>
开始标签 : <p>
文本节点 : hello
结束标签 : </p>
开始标签 : <p>
文本节点 : hello
结束标签 : </p>
结束标签 : </div>
```

扫描 tokens, 递归下降算法

ast:

```json
{
  "type": 0, // tag
  "children": [
    // tag
    {
      "type": 1, // tag
      "ns": 0,
      "tag": "div", // tag
      "tagType": 0, // tag
      "props": [], // tag
      "isSelfClosing": false,
      "children": [
        // tag
        {
          "type": 2,
          "content": " hello world ",
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 19, "line": 1, "offset": 18 },
            "source": " hello world "
          }
        }
      ],
      "loc": {
        "start": { "column": 1, "line": 1, "offset": 0 },
        "end": { "column": 25, "line": 1, "offset": 24 },
        "source": "<div> hello world </div>"
      }
    }
  ],
  "helpers": [],
  "components": [],
  "directives": [],
  "hoists": [],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "loc": {
    // tag
    "start": { "column": 1, "line": 1, "offset": 0 },
    "end": { "column": 25, "line": 1, "offset": 24 },
    "source": "<div> hello world </div>"
  }
}
```

JavaScript Ast:

```json
{
  "type": 0,
  "children": [
    {
      "type": 1,
      "ns": 0,
      "tag": "div",
      "tagType": 0,
      "props": [],
      "isSelfClosing": false,
      "children": [
        {
          "type": 2,
          "content": " hello world ",
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 19, "line": 1, "offset": 18 },
            "source": " hello world "
          }
        }
      ],
      "loc": {
        "start": { "column": 1, "line": 1, "offset": 0 },
        "end": { "column": 25, "line": 1, "offset": 24 },
        "source": "<div> hello world </div>"
      },
      "codegenNode": {
        "type": 13,
        "tag": "\"div\"",
        "children": {
          "type": 2,
          "content": " hello world ",
          "loc": {
            "start": { "column": 6, "line": 1, "offset": 5 },
            "end": { "column": 19, "line": 1, "offset": 18 },
            "source": " hello world "
          }
        },
        "isBlock": true,
        "disableTracking": false,
        "isComponent": false,
        "loc": {
          "start": { "column": 1, "line": 1, "offset": 0 },
          "end": { "column": 25, "line": 1, "offset": 24 },
          "source": "<div> hello world </div>"
        }
      }
    }
  ],
  "helpers": [null, null],
  "components": [],
  "directives": [],
  "hoists": [],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "codegenNode": {
    "type": 13,
    "tag": "\"div\"",
    "children": {
      "type": 2,
      "content": " hello world ",
      "loc": {
        "start": { "column": 6, "line": 1, "offset": 5 },
        "end": { "column": 19, "line": 1, "offset": 18 },
        "source": " hello world "
      }
    },
    "isBlock": true,
    "disableTracking": false,
    "isComponent": false,
    "loc": {
      "start": { "column": 1, "line": 1, "offset": 0 },
      "end": { "column": 25, "line": 1, "offset": 24 },
      "source": "<div> hello world </div>"
    }
  },
  "loc": {
    "start": { "column": 1, "line": 1, "offset": 0 },
    "end": { "column": 25, "line": 1, "offset": 24 },
    "source": "<div> hello world </div>"
  }
}
```
