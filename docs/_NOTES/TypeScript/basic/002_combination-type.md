---
title: TypeScript
titleTemplate: 组合类型
outline: [2, 4]
---

# 组合类型

组合类型指的是组合多个类型而产生的新类型, 包括联合类型和交叉类型。

## 联合类型

联合类型表示一个值可以是几种类型之一, 用竖线 | 分隔每个类型。如 `number | string | boolean` 代表值可以是 number、string 或 boolean 的任意一种。

```ts
type UnionType = string | number | boolean
```

在联合类型没有确定值真正属于哪种类型之前, 只能访问所有类型里共有的成员。

```ts
function test(arg: UnionType) {
  arg.toString() // ✔️
  arg.toFixed() // ❌
}
```

### 类型保护

在某些场景下, 需要把"宽"的联合类型, "收窄"到一个具体的类型。

也就是说, 需要一种机制, 能告诉类型系统:『听着, 现在我知道这个东西的具体类型了, 请把圈缩小一些。』而这种机制, 就是类型保护。

#### typeof 收窄

typeof 类型保护只有两种形式能够识别:

- `typeof v === typename`
- `typeof v !== typename`

```ts
function test(params: string | number) {
  if (typeof params === 'string') {
    // params 类型收窄到了 string
    params.toUpperCase() // ✔️
  }
}
```

并且 typename 只能是 `number`、`string`、`boolean` 或 `symbol`, 其余的 typeof 检测结果并不可靠, 所以不作为类型保护。

#### instanceof 收窄

instanceof 类型保护是通过构造函数来细化类型的一种方式。其右侧要求是一个构造函数, 此时左侧类型会被收窄到:

- 构造函数的 prototype 属性的类型
- 构造函数返回类型构成的联合类型(构造函数存在重载版本时)

```ts
interface DateOrRegExp {
  new (): Date
  new (str: string): RegExp
}

let A: DateOrRegExp

function test(params: Date | RegExp | DateOrRegExp) {
  if (params instanceof Date) {
    params.getFullYear() // params: Date
  }
  if (params instanceof A) {
    params // params: RegExp | Date
  }
}
```

#### 真值收窄

#### 相等收窄

#### in 语法收窄

### 自定义类型保护

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}
```

## 交叉类型

交叉类型是将多个类型合并为一个类型。这可以把现有的多种类型叠加到一起成为一种类型, 它包含了所需的所有类型的特性。例如, Person & Serializable & Loggable 同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。
