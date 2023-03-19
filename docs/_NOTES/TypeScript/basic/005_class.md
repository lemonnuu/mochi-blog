---
title: TypeScript
titleTemplate: 类
---

# 类

正在拼命归档整理中...

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

## 静态属性

## 存取器

## 继承

### 把类当做接口使用

## 抽象类
