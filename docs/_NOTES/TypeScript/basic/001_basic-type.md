---
title: TypeScript
titleTemplate: 基础类型
---

# 基础类型

再明确一遍, TS 属于静态类型。只要是变量或者对象属性, 都应该有一个明确的类型。

## JS 原有类型

TS 是 JS 的超集, 所以 JS 有的类型 TS 也有, 比如对象、函数、字符串、布尔值等等。

```ts
const username: string = 'judy'
const age: number = 18
const isMale: boolean = true
const address: undefined = undefined
const money: null = null
const id: symbol = Symbol('007')
const cellNumber: bigint = 999999999n

const user: { name: string; age: number } = { name: 'Wendy', age: 20 }
const hobby: string[] = ['sing', 'dance']
function add(m: number, n: number): number {
  return m + n
}
```

> 对象类型和函数类型会涉及到一些复杂的概念, 在后续章节单独讲解。

需要注意的是 null 和 undefined。默认情况下 null 和 undefined 是所有类型的子类型。也就是说可以把 null 和 undefined 赋值给任何类型的变量。(never 类型除外)

```ts
const username: string = null // ✔️
const age: number = undefined // ✔️
const fly: () => {} = null // ✔️
const money: null = undefined // ✔️
```

但如果开启了 `strictNullChecks` 编译选项, null 和 undefined 只能赋值给它们各自, undefined 还可以赋值给 void, 但 null 不行。

:::code-group

```ts [示例]
const a: undefined = undefined // ✔️
const b: null = null // ✔️
const c: void = undefined // ✔️
const d: number = undefined // ❌
const e: void = null // ❌
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

:::

:::tip 注意
在实际开发中, 一般都是开启了 `strict` 编译选项。
:::

## TS 扩展类型

单独的 JS 原有类型还不足以支撑复杂多变的业务场景, 所以 TS 还扩展了很多类型。

### 字面量类型

字面量类型可以理解为所谓的常量, 不可更改为其它值。

```ts
let username: 'judy' = 'judy'
username = 'hello' // ❌
```

const 声明的简单变量由 TS 进行类型推断就是字面量类型。

```ts
const username = 'judy'
```

### 元组类型

元组类型允许表示一个已知元素数量和类型的数组, 各元素的类型不必相同。

```ts
const info: [string, number] = ['judy', 18]
```

需要注意的是, 访问元组类型的变量不能越界。

```ts
info[3] // ❌
```

### 枚举类型

enum 枚举类型是对 JavaScript 标准数据类型的一个补充。像 C# 等其它语言一样, 使用枚举类型可以为一组数值赋予更"友好"的名字。

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let a = Color.Green // 1
let b = Color[1] // 'Green'
```

默认情况下，从 0 开始为元素编号。也可以手动指定成员的数值。例如, 将上面的例子改成从 1 开始编号:

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
let a = Color.Green // 2
let b = Color[1] // 'Red'
```

或者，全部都采用手动赋值：

```ts
enum Color {
  Red = 1,
  Green = 4,
  Blue = 5,
}
let a = Color.Green // 4
let b = Color[1] // 'Red'
```

> 枚举类型在消除魔法字符串方面非常有用。

### Any 类型

any 类型可以指定除 never 类型以外的所有类型, 这在改写原有代码时很有用。

```ts
let age: any = '18'
age = 18
```

> 应避免滥用 any 类型, 否则会失去 TS 的意义。

### Void 类型

void 类型表示没有任何类型。显示声明一个 void 类型的变量没有什么大用, 因为它只能被赋值 undefined 和 null。

```ts
const a: void = undefined
```

:::tip 注意
如果开启了 `strictNullChecks` 编译选项, 显示声明的 void 类型变量只能被赋值 undefined。
:::

当一个函数没有返回值时，其返回值类型是 void。

```ts
const helloLog: () => void = () => {
  console.log('hello')
}
```

### Never 类型

never 类型表示那些永不存在的值的类型。例如, never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式的返回值类型。

```ts
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为 never
function fail() {
  return error('Something failed')
}

function infiniteLoop(): never {
  while (true) {}
}
```

never 类型是任何类型的子类型, 可以赋值给任何类型。反过来说, 没有任何类型可以给 never 类型赋值(除 never 本身以外)。即使 any 也不可以赋值给 never。

## 类型别名

当需要经常复用一个类型或需要借助泛型来实现一些"高级类型"的话, 可能需要用到类型别名。类型别名使用 type 关键字定义。

```ts
type Name = string
type Age = string | number
const username: Name = 'judy'
const age: Age = 18
```

类型别名常用于联合类型、交叉类型以及条件类型。

## 类型注解和类型推断

前面说到, 只要是变量或者对象属性, 都应该有一个明确的类型。但是如果每一个都需要手动书写, 就会显得非常啰嗦, 所以 TS 提供了类型推断的能力。

:::code-group

```ts [类型推断]
let username = 'judy'
let age = 18
```

```ts [类型注解]
let username: string = 'judy'
let age: number = 18
```

:::

- 类型注解: 人工地告诉 TS 变量或者对象属性的明确类型
- 类型推断: TS 自动推断类型

虽然 TS 类型推断非常有用, 但并不是所有情况下都能符合预期。比如以下对象的 name 属性预期为 `judy` 字面量类型, 而交给 TS 推断结果始终是字符串类型。

```ts
const user = {
  name: 'judy',
  age: 18,
}
```

这就需要手动进行类型注解, 明确指出 name 属性为字面量类型。

```ts
const user: {
  name: 'judy'
  age: number
} = {
  name: 'judy',
  age: 18,
}
```

其实也不用太纠结这两个概念性的东西, 在使用原则上遵循以下即可:

- 如果类型推断能够准确地推断出类型, 就没有必要去手写类型注解
- 如果类型推断推断不出来, 或者推断的不准确, 再去手写类型注解

## 类型断言

当一个变量可以是多种类型时, 比如 any 类型或是联合类型。在某一时刻, 我们能清楚的知道当前变量的类型是什么, 就可以使用类型断言。

类型断言有两种形式。一种是尖括号语法:

```ts
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
```

另一种是 as 语法:

```ts
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

两种形式是等价的, 使用哪一种取决于个人喜好。但是需要注意的是, 在使用 JSX 时, 只有 as 语法断言是被允许的。

所以建议一直采用 as 断言语法, 避免错误。

## 非空断言

前面说过, 默认情况下, null 与 undefined 可以赋值给除 never 外的任何类型。

即使是开启了 `strictNullChecks` 编译选项, 某些场景下可能也会遇到: 包含它的联合类型:

```ts
let ele = document.getElementById('app')
```

ele 类型推断为 `HTMLElement | null`, 这是正确的。但是有时候我们能非常肯定 ele 一定存在, 比如在页面渲染完成后才执行的代码。不过可惜的是, TS 并不知道。

```ts
ele.innerHTML = 'hello' // “a”可能为 “null”
```

TS 会抛出 a 可能为 null 的错误, 我们可以在使用前判断一下 ele 是否存在。

```ts
if (ele) {
  ele.innerHTML = 'hello'
}
```

很明显, 它非常啰嗦。更好的做法是使用非空断言, 语法是添加 ! 后缀。

```ts
ele!.innerHTML = 'hello'
```
