---
date: '2023-01-06 08:22:13'
title: vitepress 常用配置
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - vitepress
---

# VitePress

[VitePress](https://vitepress.vuejs.org/) 是 [VuePress](https://vuepress.vuejs.org/zh/) 的小兄弟, 基于 Vite 构建。

> 本篇文章主要针对笔者本身, 不具有普适性。如有需要请查阅官网, 避免浪费时间。

## 页面配置

frontmatter 常用配置项：

- title : 标题 (String)
- titleTemplate : 标题后缀 (String | Boolean)
- description : 描述 (String)
- layout : 布局 (docs、page、home、false)
- aside : 是否显示大纲 (Boolean)
- outline : 大纲层级 (Number | [number, number] | 'deep' | false)
- editLink : 是否可编辑 (Boolean)
- lastUpdated: 是否显示最后更新时间 (Boolean)

```yaml
---
- title: title
- titleTemplate: title suffix
- description: description
- layout: docs
- aside: true
- outline: [2, 4]
- editLink: true
- lastUpdated: true
---
```

## 静态资源处理

### 公共文件

在 VitePress 的配置中可能需要引用一些静态资源(如 logo 图标), 这时候就需要使用到公共文件。

存放在 `docs/public` 下的静态资源将原样复制到 `dist` 目录的跟文件。

需要注意的是, 应该使用<span class="text-red-400">根绝对路径</span>引用放置在 `docs/public` 文件夹中的文件。例如, 文件 `docs/public/logo.png` 在源代码中始终作为 `/logo.png` 被引用。

### 静态资源

所有的 Markdown 文件都通过 Vite 处理编译成 Vue 组件。可以并且<span class=" text-red-400">应当使用相对 URL 引用静态资源。</span>

```markdown
![An image](./image.png)
```

当然也可以使用绝对公共路径(基于项目根目录), 只不过相对路径可能更符合使用习惯而已。

但是不管如何, 所有静态路径引用, 包括绝对路径, 都应当基于工作目录结构。

所有被引用的静态资源, 在生产构建中会被复制到 `dist` 文件夹中,并重命名为 hash 文件名的文件, 小于 4kb 的图片资源会转化为内联的 base64 字符串。

### 基础 URL

如果站点部署在非根 URL, 需要在 `.vitepress/config.js` 中设置 base 选项。

例如, 如果计划部署站点到 `https://foo.github.io/bar/`, base 选项就应该设置为 `'/bar/'` (始终以/开始和结尾)。

设置基础 URL 后, 为了引用静态资源, 就需要使用类似 `/bar/image.png` 的 URL。 但是, 当改变 base 值时, 这样会很脆弱。

为此, VitePress 提供了一个内置的助手 `$withBase` (注入在 Vue 原型上), 用于生成正确的路径：

```html
<img :src="$withBase('/foo.png')" alt="foo" />
```

注意, 不仅可以在主题组件中使用以上语法, 还可以在 Markdown 文件中使用。

## Markdown 扩展

### 自定义容器

输入：

```markdown
::: info
This is an info box.
:::

::: tip
This is a tip
:::

::: warning 自定义标题
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

输出：

::: info
This is an info box.
:::

::: tip
This is a tip
:::

::: warning 自定义标题
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details
:::

### 代码块

VitePress 通过 [Shiki](https://shiki.matsu.io/) 来实现 Markdown 中语法块的语法高亮, 使用了有色文本。

#### 行高亮

- 单行 : `{1}`、`{3}`、`{5}`
- 行范围 : `{5-8}`、`{3-10}`、`{10-17}`
- 混合 : `{4,7-13,16,23-27,40}` <span class="text-red-400">(没有空格)</span>

输入：

````markdown
```js {1,3-4}
export default {
  data() {
    return {
      msg: 'Highlighted!',
    }
  },
}
```
````

输出：

```js {1,3-4}
export default {
  data() {
    return {
      msg: 'Highlighted!',
    }
  },
}
```

#### 行号

- `:line-numbers`

输入：

````markdown
```ts:line-numbers
const line2 = 'This is line 1'
const line3 = 'This is line 2'
```
````

输出：

```ts:line-numbers
const line2 = 'This is line 1'
const line3 = 'This is line 2'
```

#### focus 代码块

- `[!code  focus]`

输入：

````markdown
```js
export default {
  data() {
    return {
      msg: 'Focused!', // [!code  focus]
    } // 上面的 !code focus 之间的空格实际为 1 个
  },
}
```
````

输出：

```js
export default {
  data() {
    return {
      msg: 'Focused!', // [!code focus]
    }
  },
}
```

#### diffs 代码块

- `[!code --]`
- `[!code ++]`

输入：

````markdown
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code  --]
      msg: 'Added' // [!code  ++]
    } // 上面的 !code -- 之间的空格实际为 1 个
  }
}
```
````

输出：

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

#### error / warning 代码块

- `[!code error]`
- `[!code warning]`

输入：

````markdown
```js
export default {
  data() {
    return {
      msg: 'Error', // [!code  error]
      msg: 'Warning', // [!code  warning]
    } // 上面的 !code error 之间的空格实际为 1 个
  },
}
```
````

输出：

```js
export default {
  data() {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning', // [!code warning]
    }
  },
}
```

#### Code Group

- `:::code-group:::`

输入：

````markdown
:::code-group

```js [index.js]
const a = 1
```

```ts [index.ts]
const a: number = 1
```

:::
````

输出：

:::code-group

```js [index.js]
const a = 1
```

```ts [index.ts]
const a: number = 1
```

:::

## Badge

徽章可以为标题添加状态。

输入：

```markdown
<Badge type="info" text="default" />
<Badge type="tip" text="^1.9.0" />
<Badge type="warning" text="beta" />
<Badge type="danger" text="caution" />
```

输出：

<Badge type="info" text="default" />
<Badge type="tip" text="^1.9.0" />
<Badge type="warning" text="beta" />
<Badge type="danger" text="caution" />
