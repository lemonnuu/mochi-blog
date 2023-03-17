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

typeof 类型保护有两种形式能够识别:

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

#### in 语法收窄

in 操作符可以安全的检查一个对象上是否存在一个属性, 也可被作为类型保护使用。

```ts
interface Fish {
  swim: () => {}
}
interface Bird {
  fly: () => {}
}
function test(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}
```

#### 真值收窄

```ts
function test(params?: string) {
  params.toUpperCase() // ❌
  if (params) {
    params.toUpperCase() // ✔️
  }
}
```

#### 相等收窄

=== 全等运算符也可用于类型保护。

```ts
function test(x: string | number, y: string | boolean) {
  if (x === y) {
    x.toUpperCase() // ✔️
  }
}
```

### 自定义类型保护

我们也可以自定义一个类型保护, 只需要简单地定义一个函数, 它的返回值是一个 类型谓词:

```ts {7}
interface Fish {
  swim: () => {}
}
interface Bird {
  fly: () => {}
}
function isFish(animal: Fish | Bird): animal is Fish {
  return !!(animal as Fish).swim
}
function test(animal: Fish | Bird) {
  if (isFish(animal)) {
    return animal.swim()
  }
  return animal.fly()
}
```

## 交叉类型

交叉类型是将多个类型合并为一个类型。这可以把现有的多种类型叠加到一起成为一种类型, 它包含了所需的所有类型的特性。

```ts {8}
interface Circle {
  radius: number
}
interface Colorful {
  color: string
}

type ColorfulCircle = Circle & Colorful
// colorfulCircle 必须同时包含 radius 和 color 属性
const colorfulCircle: ColorfulCircle = {
  radius: 1,
  color: 'yellow',
}
```
