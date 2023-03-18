---
title: TypeScript
titleTemplate: 接口
---

# 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查, 它有时被称做"鸭式辨型法"或"结构性子类型化"。

<f>接口能够描述 JavaScript 中对象拥有的各种各样的外形</f>。除了描述带有属性的普通对象外, 接口也可以描述函数类型, 还可以被类实现与继承自类。

## 普通对象

对于普通对象, 定义它最简单的方式就是和定义基础类型一样。

```ts
const user: { name: string } = { name: 'Judy' }
```

为了方便复用, 可以给它定义一个类型别名。

```ts
type User = { name: string }
const user: User = { name: 'Judy' }
```

但是用这种方式定义的对象类型不容易扩展, 而定义普通对象类型最好得方式是使用接口。

```ts
interface User {
  name: string
}
const user: User = { name: 'Judy' }
```

### 额外的属性检查

在继续深入之前, 有一点需要特别注意, <f>对象字面量会被特殊对待, 从而进行额外的属性检查</f>。当将它们赋值给变量或作为参数传递的时候, 如果一个对象字面量存在任何"目标类型"不包含的属性时, 就会得到一个错误。

```ts
interface User {
  name: string
}
const user: User = { name: 'Judy', age: 18 } // ❌ 对象字面量只能指定已知属性
```

绕开这种检查的方式有三种:

- 断言
- 添加索引签名 (推荐)
- 对象字面量先赋值给变量, 再将变量赋值给目标 (不推荐)

:::code-group

```ts [断言]
interface User {
  name: string
}
const user: User = { name: 'Judy', age: 18 } as User
```

```ts [索引签名]
interface User {
  name: string
  [key: string]: any
}
const user: User = { name: 'Judy', age: 18 }
```

```ts [变量中转]
interface User {
  name: string
}
const temp = { name: 'Judy', age: 18 }
const user: User = temp
```

:::

### 可选属性

可选属性与普通属性定义差不多, 只是在可选属性名字后面加一个 ? 符号。

```ts
interface User {
  name: string
  age?: number
}
const user1: User = { name: 'Judy' }
const user2: User = { name: 'Mini', age: 18 }
```

### 只读属性

只读属性是在属性名前加 readonly 指定, 与 const 指定常量类似, 只读属性一经定义不可修改。

```ts
interface User {
  readonly name: string
}
const user1: User = { name: 'Judy' }
user1.name = 'Mini' // ❌
```

### 索引签名

索引签名描述了对象索引的类型, 还有相应索引返回值类型。一般表示接口可拥有一些额外的属性。TS 支持两种索引签名:

- 字符串索引签名 : `obj.property` 和 `obj["property"]`
- 数字索引签名 : `obj["property"]`

```ts
interface User {
  name: string
  [key: string]: any
  [index: number]: number
}
const user: User = { name: 'Judy', age: 18, 0: 100 }
```

需要注意的是, 数字索引的返回值必须是字符串索引返回值类型的子类型。这是因为当使用 number 来索引时, JS 会将它转换成 string 后再去索引对象。

## 接口继承

和类一样, 接口也可以相互继承, 这可以更灵活地将接口分割到可重用的模块里。

```ts
interface Animal {
  age: number
}

interface Dog extends Animal {
  bark: () => void
}

const dog: Dog = {
  age: 3,
  bark() {
    console.log('hello')
  },
}
```

## 接口合并

接口不仅可以很方便的继承自另外一个接口, 同名的接口还会自行合并。

```ts
interface Animal {
  age: number
}
interface Animal {
  name: string
}

// 相当于
interface Animal {
  age: number
  name: string
}
```

## 函数

使用接口定义函数类型时需要给接口定义一个调用签名, 它就像是一个只有参数列表和返回值类型的函数定义, 参数列表里的每个参数都需要名字和类型。

```ts
interface AddFunc {
  (x: number, y: number): number
}
```

对于函数类型的类型检查来说, 函数的参数名不需要与接口里定义的名字相匹配, 只要相应位置上的参数类型是兼容的即可。

```ts
interface AddFunc {
  (x: number, y: number): number
}

const add: AddFunc = (m: number, n: number) => {
  return m + n
}
```

接口定义函数类型一般用于定义复杂的函数类型, 比如带有属性的函数类型或是构造函数类型。

### 带有属性的函数定义

带有属性的函数定义非常简单, 就是在接口定义函数的基础上增添其它属性即可。

```ts
interface FuncWithAttributes {
  (x: number, y: number): number
  attribute: string
}
```

### 构造函数定义

接口定义构造函数只要在函数签名前加上 new 即可。

```ts
interface classWithConstructor {
  new (str: string): void
}
class Test {
  constructor(public str: string) {}
}
function test(constructor: classWithConstructor) {
  return new constructor('hello')
}
test(Test)
```

## 类

接口与类搭配使用的场景一般包括类实现接口与接口继承自类。

### 类实现接口

接口可以被一个类实现, 从而约束类实例的类型。

```ts
interface User {
  name: string
}

class CreateUsers implements User {
  constructor(public name: string) {}
}
```

但需要注意的是, <f>接口只描述了类的公共部分, 并不包含私有或保护成员</f>。

```ts
interface User {
  name: string
}

class CreateUsers implements User {
  constructor(protected name: string) {} // ❌
}
```

还有一个要注意的点是, 类是包含两个类型的: 静态部分类型和实例类型。

<f>当一个类实现了一个接口时, 只会对其实例部分进行类型检查</f>, 诸如 constructor、static 等静态部分并不在检查范围内。

```ts
interface UserConstructor {
  new (name: string): void
}

class CreateUsers implements UserConstructor {
  // ❌ constructor 属于静态部分
  constructor(public name: string) {}
}
```

### 接口继承自类

当接口继承了一个类时, 它会继承类的成员但不包括其实现, 包括 private 和 protected 成员。

```ts
class People {
  constructor(public name: string) {}
}

interface User extends People {
  age: number
}

const user: User = { name: 'Judy', age: 18 }
```

当一个接口继承了拥有私有或受保护的成员的类时, 这个接口只能被这个类或其子类所实现。

```ts
class People {
  constructor(private name: string) {}
}

interface User extends People {
  age: number
}

class CreateUser extends People implements User {
  constructor(name: string, public age: number) {
    super(name)
  }
}

const user: CreateUser = new CreateUser('Judy', 18)
```

## 接口 VS 类型别名

虽然有时候接口和类型别名都能够描述清楚一个具体的类型, 但两者的适用场景还是不同的。

- 接口可以被继承、可以被合并, 所以能使用接口的情况就使用接口, 容易扩展
- 类型别名一般用于联合类型、交叉类型与条件类型
