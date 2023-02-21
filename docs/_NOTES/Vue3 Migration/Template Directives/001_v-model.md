---
outline: [1, 2]
---

# v-model

## 概览

以下是对变化的总体概述:

- **非兼容** : 用于自定义组件时, `v-model` prop 和事件默认名称已更改:
  - prop : `value` -> `modelValue`
  - 事件 : `input` -> `update:modelValue`
- **非兼容** : `v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除, 可在 `v-model` 上加一个参数代替
- **新增** : 现在可以在同一个组件上使用多个 `v-model` 绑定
- **新增** : 现在可以自定义 `v-model` 修饰符

## 介绍

Vue2.0 发布后, 使用 `v-model` 指令时必须使用名为 `value` 的 prop。如果出于不同的目的需要使用其他的 prop, 就不得不使用 `v-bind.sync`。此外, 由于 `v-model` 和 `value` 之间的这种硬编码关系的原因, 产生了如何处理原生元素和自定义元素的问题。

在 Vue2.2 中, 引入了 `model` 组件选项, 允许组件自定义用于 `v-model` 的 prop 和事件。但是, 这仍然只允许在组件上使用一个 `v-model`。

在 Vue3 中, 双向数据绑定的 API 已经标准化, 以减少开发者在使用 `v-model` 指令时的混淆, 并且更加灵活。

## 2.x 语法

在 2.x 中, 在组件上使用 `v-model` 相当于绑定 `value` prop 并触发 `input` 事件:

```vue
<ChildComponent v-model="pageTitle"></ChildComponent>

<!-- 是以下的简写 -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event"></ChildComponent>
```

:::warning 注意
子组件的 props 选项里仍然需要声明 value 这个 prop。
:::

如果子组件恰巧需要将值双向绑定在 input 输入框上, 可以利用 computed 透传绑定:

:::code-group

```vue [ChildComponent]
<template>
  <div class="child-component">
    <input type="text" v-model="inputValue" />
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    inputValue: {
      set(newValue) {
        this.$emit('input', newValue)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>
```

```vue [ParentComponent]
<ChildComponent v-model="pageTitle"></ChildComponent>
```

:::

如果想要更改 prop 或事件名称, 则需要在 ChildComponent 组件中添加 model 选项:

:::code-group

```vue [ChildComponent]
<template>
  <div class="child-component">
    <input type="text" v-model="inputValue" />
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    // 使用 `modelValue` 代替 `value` 作为 model 的 prop
    modelValue: {
      type: String,
    },
  },
  computed: {
    inputValue: {
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      },
      get() {
        return this.modelValue
      },
    },
  },
}
</script>
```

```vue [ParentComponent]
<ChildComponent v-model="pageTitle"></ChildComponent>
```

:::

所以, 在这个例子中 `v-model` 是以下的简写:

```vue
<ChildComponent :modelValue="pageTitle" @update:modelValue="pageTitle = $event" />
```

### 使用 `v-bind.sync`

在某些情况下, 可能需要对某一个 prop 进行“双向绑定”(除了前面用 v-model 绑定 prop 的情况)。

为此，建议使用 `update:myPropName` 抛出事件。例如, 对于带有 `title` prop 的 ChildComponent, 可以通过下面的方式将分配新 value 的意图传达给父级:

```js
this.$emit('update:title', newValue)
```

然后父组件可以在需要时监听该事件, 并更新本地的 data property。例如:

```vue
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

为了方便起见, 可以使用 `.sync` 修饰符来缩写，如下所示:

```vue
<ChildComponent :title.sync="pageTitle" />
```

## 3.x 语法

在 3.x 中, 自定义组件上的 v-model 相当于传递了 `modelValue` prop 并接收抛出的 `update:modelValue` 事件:

```vue
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :modelValue="pageTitle" @update:modelValue="pageTitle = $event" />
```

### `v-model` 参数

若需要更改 model 的名称, 可以为 `v-model` 传递一个参数, 以作为组件内 `model` 选项的替代:

```vue
<ChildComponent v-model:title="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

![v-bind-instead-of-sync](https://v3-migration.vuejs.org/images/v-bind-instead-of-sync.png)

这可以作为 `.sync` 修饰符的替代, 而且允许我们在自定义组件上使用多个 `v-model`。

```vue
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 是以下的简写： -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### `v-model` 修饰符

除了像 `.trim` 这样的 2.x 硬编码的 `v-model` 修饰符外, 3.x 还支持自定义修饰符:

```vue
<ChildComponent v-model.capitalize="pageTitle" />
```

组件的 `v-model` 上所添加的修饰符, 可以通过 `modelModifiers` prop 在组件内访问到。但对于又有参数又有修饰符的 `v-model` 绑定, 生成的 prop 名将是 arg + "Modifiers"。例如 `titleModifiers`。

:::code-group

```vue [ParentComponent]
<ChildComponent v-model:title.capitalize="pageTitle" />
```

```vue {6-10,16-18} [ChildComponent]
<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  titleModifiers: {
    default: () => {
      return {}
    },
  },
})
const emits = defineEmits(['update:title'])

const emitTitle = (e) => {
  let value = e.target.value
  if (props.titleModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emits('update:title', value)
}
</script>

<template>
  <div>
    <input type="text" :value="title" @input="emitTitle" />
  </div>
</template>
```

:::

## 迁移策略

- 检查你的代码库中所有使用 `.sync` 的部分并将其替换为 `v-model`:

```vue
<ChildComponent :title.sync="pageTitle" />

<!-- 替换为 -->

<ChildComponent v-model:title="pageTitle" />
```

- 对于所有不带参数的 `v-model`, 请确保分别将 `prop` 和 `event` 命名更改为 `modelValue` 和 `update:modelValue`:

```vue
<ChildComponent v-model="pageTitle" />
```

```js
// ChildComponent.vue

export default {
  props: {
    modelValue: String, // 以前是`value：String`
  },
  emits: ['update:modelValue'],
  methods: {
    changePageTitle(title) {
      this.$emit('update:modelValue', title) // 以前是 `this.$emit('input', title)`
    },
  },
}
```
