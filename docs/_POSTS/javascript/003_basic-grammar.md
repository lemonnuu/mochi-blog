---
date: '2023-02-01 13:10:20'
title: JavaScript 基础语法
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - javascript
---

# JavaScript 基础语法

ECMAScript 语法在很大程度上借鉴了 C 语言和其它类 C 语言, 如 Java 与 Perl。熟悉这些语言的开发者, 应该很容易理解 ECMAScript 宽松的语法。

## 区分大小写

<f>ECMAScript 中一切都区分大小写。</f>无论是变量、函数名还是操作符, 都区分大小写。换句话说, 变量 test 和变量 Test 是两个完全不同的变量。类似地, typeof 不能作为变量或函数名, 因为它是一个关键字, 但 Typeof 却是一个完全有效地变量或函数名。

## 标识符

所谓标识符, 就是变量、函数、属性或函数参数地名称。标识符可以由一或多个下列字符组成：

- 第一个字符必须是一个字母、下划线(\_)或美元符号($)
- 剩下的其它字符可以是字母、下划线、美元符号或数字

标识符中的字母可以是扩展 ASCII（Extended ASCII）中的字母, 也可以是 Unicode 的字母字符, 如 À 和 Æ （但不推荐使用）。

按照惯例, <f>ECMAScript 标识符推荐使用驼峰大小写形式</f>, 即第一个单词的首字母小写, 后面每个单词的首字母大写, 如 myCar、firstSecond。虽然这种写法并不是强制性的, 但因为这种形式跟 ECMAScript 内置函数和对象命名方式一致, 所以算是最佳实践。

:::warning 注意

1. 关键字、保留字、true、false 和 null 不能作为标识符
2. 但 undefined 却可以, 因为它既不是关键字, 也不是保留字, 所以代码中千万不要修改 undefined 的值

:::

## 语句

语句是一条完整的指令, 可以包含关键字、运算符、变量、常量以及表达式。语句一般可分为：

1. 声明式语句：`import _ from 'lodash'`
2. 赋值语句：`const variable = 123`
3. 执行式语句：`if (true) { // ... }`

### 表达式

<f>表达式不能独立表达出意思。从表现形式上来讲, 一般是获取一个值, 可直接赋给变量</f>。例如：

1. 字面值表达式：`1`
2. 变量表达式：`a`
3. 算数表达式：`a * b`
4. 函数表达式：`(function () {})()、setTimeout(function () {}, 1000)`
5. 赋值表达式：`a = b * 2 // 注意没有定义变量`

:::tip
有时一个独立表达式也可以被称为语句, 表达式是语句的子集。
:::

### 语句的结果值

很多人不知道, <f>语句也有结果值</f>（undefined 也算）。

获得结果值的最直接办法就是在浏览器开发控制台中输入语句, 默认情况下控制台会显示所执行的最后一条语句的结果值。

- 赋值表达式 ：以赋值表达式 `a = 18` 为例, 其结果值是赋给 a 的值 18
- 变量声明：但规范定义变量声明的结果值是 undefined, 如 `var a = 18`、`let a = 18`
- 代码块：代码块 `{...}` 的结果值是最后一个语句的结果

语法不允许获得语句的结果值并将其赋值给另外一个变量（至少目前不行）。

```js
let a, b
a = if (true) { // 运行不了
  b = 24
}
```

可以使用 eval(...) 来获取语句结果值, 但切勿在实际开发中这样操作：

```js
let a, b
a = eval('if (true) { b = 24}') // a = 24
```

这并不是一个好办法, 但确实管用。

:::tip

- 语句结果值目前使用场景：可以在 if 语句的判断条件杂糅进去, 使代码更简洁, 如：
  `if (str && (matches = str.match(/[aeiou]/g)))`
- 语句结果值未来使用场景：不需要将语句封装成函数再调用 return 来返回值

:::

### 自动分号

ECMAScript 规定语句以分号结尾。如果缺失了必要的分号, 代码将无法运行, 语言的容错性也会降低。为了让我们能够忽略那些不必要的分号, JavaScript 会自动为代码补上缺失的分号, 即自动分号插入（Automatic Semicolon Insertion, ASI）。

```js
const test = 1 // 没有分号, 编译器会进行 ASI
const Test = 2 // 有分号, 推荐
```

<f>ASI 只在换行符处起作用, 而不会在代码行的中间插入分号</f>。如果 JavaScript 编译器发现代码行可能因为缺失分号而导致错误, 那么它就会自动补上分号。并且, 只有在代码行末尾与换行符之间除了空格和注释之外没有别的内容时, 它才会这么做。

ASI 在某些情况下很有用, 比如：

```js
let a = 3
do {
  // ...
} while (a-- > 0) // do...while 循环后必须带分号
```

语法规定 do...while 循环后必须带分号, 而 while 和 for 循环后则不需要。大多数人不记得这一点, 此时 ASI 就会自动补上分号。其它涉及 ASI 的情况是 break、continue、return、和 yield 等关键字。

:::tip

1. 加不加分号取决于代码习惯, 遵循仓库风格即可
2. 不加分号时, 括号"(", 方括号"[", 正则开头的斜杠"/" , 加号"+", 减号"-" 作为行首可能会导致上下行解析出现问题
3. <f>最佳实践：一行以 "(", "[", "+", "-", "/" 开头时, 在其前加上分号</f>
4. 建议在有需要的地方加上分号, 将对 ASI 的依赖降到最低

:::

### if 语句

```js
if (condition) {
  statement1
} else {
  statement2
}
```

这里的条件（condition）可以是任何表达式, 并且求值结果不一定是布尔值。ECMAScript 会自动调用 Boolean() 函数将表达式的值转换为布尔值。

- 如果条件求值为 true, 则执行语句 statement1
- 如果条件求值为 false, 则执行语句 statement2

当 if 和 else 只包含单条语句的时候可以省略代码块的 "{}"

```js
if (condition) statement1 else statement2
```

很多人误以为 JavaScript 中有 else if, 因为可以这样来写代码:

```js
if (condition1) statement1 else if (condition2) statement2 else statement3
```

实际上,<f>JavaScript 没有 else if, else 其后的 if 只是包含单条语句时省略了 "{}"</f>。

### switch 语句

switch 语句是与 if 语句紧密相关的一种流程控制语句, 从其它语言借鉴而来。ECMAScript 中 switch 语句跟 C 语言中的 switch 语句的语法非常相似, 如下所示:

```js
switch (key) {
  case value: // 可选, 用于匹配 key 的子句
    // 当 key 和 value 完全匹配时(===), 执行此处语句
    break // 可选, 用于跳出switch
  case valueN:
    break
  default: // 可选, 当没有 case 与 key 匹配时执行
    break
}
```

- key：一个用来与 case 子语句匹配的表达式
- case value：可选, 用于匹配 key 的 case 子句, value 也是一个表达式, 当 key === value 时, 执行相应语句
- break：可选, 用于跳出 switch 语句, 如没有, 则会匹配下一个 case
- default：可选, 如果给定, 该子句会在 key 与任一 value 不匹配时执行

```js
let a = '1'
switch (a) {
  case 1:
    // ...执行一些代码
    break
  case 2:
    // ...执行另外一些代码
    break
  default:
  // ...执行缺省代码
}
```

<f>key 与 value 的匹配算法与 === 相同</f>。有时可能会需要通过强制类型转换来进行相等比较, 这时就需要做一些特殊处理:

```js
let a = '1'
let b = '2'
switch (true) {
  case a || b == 2:
    // 永远不会执行到这里
    break
  case a > 0:
    // ...执行一些代码
    break
  case a < 0:
    // ...执行另外一些代码
    break
  default:
    // ...执行缺省代码
    break
}
```

因为 (a || b == 2) 的结果是 1 而不是 true, 所以永远不会执行, 此时可通过强制表达式返回 true 或 false, 如 !!(a || b == 2)。

:::tip

1. <f>当 case 没有 break 时, 会执行下面的 case 代码, 且不用再次判断</f>
2. switch 语句在适当情况下可替换掉 if...else if...else 语句
3. switch 语句在比较每个条件的值时会使用全等操作符 （===）
4. <f>为避免不必要的条件判断, 最好给每个条件后面都加上 break 语句</f>。如果确实需要连续匹配几个条件时, 推荐写个注释表明是故意忽略了 break
5. default 可以放在 case 之上, JavaScript 会在找不到匹配项时跳回至 default, 但推荐将其放在最下面

:::

### 标签语句

标签语句需要和 break 或 continue 语句一起使用。标签（或标记）就是在一条语句前加个可以引用的标识符。

```js
label: statement
```

标签语句的典型应用场景是嵌套循环:

```js
let i, j
loop1: for (i = 0; i < 3; i++) {
  loop2: for (j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      continue loop1
    }
    console.log('i = ' + i + ', j = ' + j)
  }
}

// i = 0, j = 0
// i = 0, j = 1
// i = 0, j = 2
// i = 1, j = 0
// i = 2, j = 0
// i = 2, j = 1
// i = 2, j = 2
```

### break 语句

break 语句用于终止整个循环（包括 while、do...while、for、for...in、for...of）、switch 语句或标签语句。

```js
for (let i = 0; i < 5; i++) {
  if (i === 3) break
  console.log(i)
}

// 0
// 1
// 2
```

### continue 语句

continue 语句用于中止当前迭代（包括 while、do...while、for、for...in、for...of）或标签语句。

```js
for (let i = 0; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
```

与 break 语句的区别在于, continue 并不会终止整个循环, 而只是中止当前迭代:

- 在 while 循环中, 流程控制跳转回条件判断
- 在 for 循环中, 流程控制转到更新语句

### try...catch 语句

try...catch 语句标记要尝试的语句块, 并指定一个出现异常时抛出的响应。

```js
try {
  // 执行一系列操作, 期间可能抛错
} catch (error) {
  // 如果 try 语句块抛错, 则错误为 error
}
```

try 语句包含了一个 try 块, 和至少一个 catch 块或者一个 finally 块的其中一个, 或者两个都有, 下面是 try 声明的三种形式:

1. `try...catch`
2. `try...finally`
3. `try...catch...finally`

finally 的代码总在 try 之后执行, 如果有 catch 的话在 catch 之后执行。

### throw 语句

throw 语句用来抛出一个用户自定义的异常。throw 之后的语句将不会执行, 并且控制流转到调用堆栈的第一个 catch 块。如果调用者函数中没有 catch 块, 程序将会终止。

```js
throw expression
```

- expression : 要抛出的表达式

# debugger 语句

debugger 语句调用任何可用的调试功能, 相当于设置断点。如果没有调试功能可用, 则此语句不起作用。

```js
debugger
```

## 严格模式

ECMAScript 5 增加了严格模式（strict mode）的概念。严格模式是一种不同的 JavaScript 解析和执行模型, ECMAScript 3 的一些不规范写法在这种模式下会被处理, 对于不安全的活动将抛出错误。

要对整个脚本启用严格模式, 在脚本开头加上这一行：

```js
'use strict'
```

虽然看起来像个没有赋值给任何变量的字符串, 但它其实是一个预处理指令。任何支持的 JavaScript 引擎看到它都会切换到严格模式。选择这种语法形式的目的是不破坏 ECMAScript 3 语法。 也可以单独指定一个函数在严格模式下执行, 只要把这个预处理指令放到函数体开头即可：

```js
function doSomething() { "use strict"; // 函数体 }
```

严格模式会影响 JavaScript 执行的很多方面, 所有现代浏览器都支持严格模式。
