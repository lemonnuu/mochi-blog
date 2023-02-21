---
outline: [1, 2]
---

# key 使用改变

## 概览

- **非兼容** : `<template v-for>` 的 `key` 应该设置在 `<template>` 标签上 (而不是设置在它的子节点上)

## 背景

特殊的 `key` attribute 被作为 Vue 的虚拟 DOM 算法的提示, 以保持对节点身份的持续跟踪。这样 Vue 就可以知道何时能够重用和修补现有节点, 以及何时需要对它们重新排序或重新创建。可以查看官方文档获取详情:

- [列表渲染 : 维护状态](https://cn.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
- [API 参考 : 特殊的 key attribute](https://cn.vuejs.org/api/built-in-special-attributes.html#key)

## 结合 `<template v-for>`

在 Vue2 中, `<template>` 标签不能拥有 `key`。不过, 可以为其每个子节点分别设置 `key`。

```vue
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

在 Vue3 中, `key` 则应该被设置在 `<template>` 标签上。

```vue
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

类似地, 当使用 `<template v-for>` 时如果存在使用 `v-if` 的子节点, 则 `key` 应改为设置在 `<template>` 标签上。

:::code-group

```vue {0} [vue2]
<template v-for="item in list">
  <div v-if="item.isVisible" :key="item.id">...</div>
  <span v-else :key="item.id">...</span>
</template>
```

```vue {0} [vue3]
<template v-for="item in list" :key="item.id">
  <div v-if="item.isVisible">...</div>
  <span v-else>...</span>
</template>
```

:::
