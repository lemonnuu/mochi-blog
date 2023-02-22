---
outline: [1, 2]
---

# `$listeners` 合并到 `$attrs`

## 概览

`$listeners` 对象在 Vue 3 中已被移除。事件监听器现在是 `$attrs` 的一部分：

```js
{
  text: '这是一个 attribute',
  onClose: () => console.log('close 事件被触发')
}
```

## 2.x 语法

在 Vue 2 中, 你可以通过 `this.$attrs` 访问传递给组件的 attribute, 以及通过 `this.$listeners` 访问传递给组件的事件监听器。

结合 `inheritAttrs: false`, 开发者可以将这些 attribute 和监听器应用到根元素之外的其它元素：

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false,
}
</script>
```

## 3.x 语法

在 Vue 3 的虚拟 DOM 中, 事件监听器现在只是以 `on` 为前缀的 attribute, 这样它就成为了 `$attrs` 对象的一部分, 因此 `$listeners` 被移除了。

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false,
}
</script>
```

如果这个组件接收一个 `id` attribute 和一个 `v-on:close` 监听器, 那么 `$attrs` 对象现在将如下所示:

```js
{
  id: 'my-input',
  onClose: () => console.log('close 事件被触发')
}
```

## 迁移策略

删除所有的 `$listeners` 用法。
