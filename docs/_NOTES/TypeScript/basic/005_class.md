---
title: TypeScript
titleTemplate: 类
---

# 类

对于学习过 C++、Java 等语言的童鞋来说, 类可以说是非常的熟悉。在 ES6 后, JS 童鞋也能够使用基于类的面向对象的方式编程。但是, TS 对类的支持更香。

```ts
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const animal = new Animal('Judy')
```

## 成员修饰符

类成员可以用不同的修饰符授予不同的"权限", 比如谁可访问、能否修改等。

### 公共、私有与受保护的修饰符

访问权限修饰符有公共、私有和受保护的修饰符, 默认为 public:

- `public` (公有) : 允许被随意调用
- `private` (私有) : 只允许在类内被调用
- `protected` (受保护) : 允许在类内及继承的子类中被调用

```ts
class Animal {
  name: string
  protected age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class Dog extends Animal {
  private category: string
  constructor(name: string, age: number) {
    super(name, age)
    this.category = 'dog'
  }
}
```

### readonly 修饰符

可以使用 readonly 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

```ts
class Animal {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}
```

### 参数属性

参数属性实际就是一种简写模式, 可以方便地在定义并初始化一个成员。比如上面的栗子可以改写为:

```ts
class Animal {
  constructor(readonly name: string) {}
}
```

参数属性通过给构造函数参数前面添加一个修饰符来声明, 把声明和赋值合并至一处。

## 静态属性

如果属性需要直接挂载至类上, 而不是类的原型上, 可以使用 static 关键字修饰。和 JS 是一致的。

```ts
class Animal {
  constructor(readonly name: string) {}
  static info = {
    nation: 'china',
  }
}
console.log(Animal.info.nation)
```

## 存取器

TS 支持通过 getters/setters 来截取对对象成员的访问, 和 JS 是一致的。

```ts
class Animal {
  constructor(private _name: string) {}
  get name() {
    return 'name: ' + this._name
  }
  set name(str: string) {
    this._name = str
  }
}

const animal = new Animal('dog')
console.log(animal.name)
```

在使用存取器时, 要求编译选项设置为输出 ES5 或更高, 不支持降级到 ES3 版本。其次, 只带有 get 不带有 set 的存取器会被自动推断为 readonly。

## 继承

基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

```ts
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(name: string, public age: number) {
    super(name)
  }
}
```

类从基类中继承了属性和方法。这里, Dog 是一个派生类, 它派生自 Animal 基类, 通过 extends 关键字。派生类通常被称作子类, 基类通常被称作超类。

如果派生类包含了一个构造函数, 那么它必须调用 `super()` 执行基类的构造函数。而且, 需要在构造函数里访问 this 的属性之前调用 `super()`。

## 抽象类

抽象类作为其它派生类的基类使用, 它们只能被继承, 不能被实例化。abstract 关键字用于定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earch...')
  }
}
const animal = new Animal() // ❌ 不能被实例化, 只能被继承
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

```ts
class Dog extends Animal {
  // ✔️ 派生类必须包含抽象方法的实现
  makeSound() {
    console.log('bark')
  }
}
```
