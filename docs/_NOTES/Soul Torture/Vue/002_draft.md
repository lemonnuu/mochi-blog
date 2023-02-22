# Vue 相关(待整理)

## Vue 的核心是什么

Vue 是一套构建用户界面的渐进式自底向上增量开发的 MVVM 框架, vue 的核心只关注视图层。

核心思想:

- 数据驱动（视图的内容随着数据的改变而改变）
- 组件化（可以增加代码的复用性, 可维护性, 可测试性, 提高开发效率, 方便重复使用, 体现了高内聚低耦合）

## 请简述你对 vue 的理解

Vue 是一套构建用户界面的渐进式的自底向上增量开发的 MVVM 框架, 核心是关注视图层, vue 的核心是为了解决数据的绑定问题, 为了开发大
型单页面应用和组件化, 所以 vue 的核心思想是数据驱动和组件化。这里也说一下 MVVM 思想, MVVM 思想是 模型——视图 vm 是 v 和 m 连
接的桥梁, 当模型层数据修改时, VM 层会检测到, 并通知视图层进行相应修改。

## 请简述 vue 的单向数据流

父级 prop 的更新会向下流动到子组件中, 每次父组件发生更新, 子组件所有的 prop 都会刷新为最新的值, 数据从父组件传递给子组件, 只能单向绑定, 子组件内部不能直接修改。

## Vue 常用的修饰符有哪些

修饰符:

- `.lazy` : 改变后触发, 光标离开 input 输入框的时候值才会改变
- `.number` : 将输出字符串转为 number 类型
- `.trim` 自动过滤用户输入的首尾空格

事件修饰符:

- `.stop` 阻止点击事件冒泡, 相当于原生 js 中的 `event.stopPropagation()`
- `.prevent` 防止执行预设的行为, 相当于原生 js 中的 `event.preventDefault()`
- `.capture` 添加事件侦听器时使用事件捕获模式
- `.self` 只会触发自己范围内的事件, 不包括子元素
- `.once` 只执行一次

键盘修饰符:

- `.enter` 回车键
- `.tab` 制表键
- `.esc` 返回键
- `.space` 空格键
- `.up`向上键
- `.down` 向下键
- `.left` 向左建
- `.right` 向右键
  系统修饰符：`.ctrl` `.alt` `.shift` `.meta`

## `v-text` 与 `{{}}` 与 `v-html` 区别

- `{{}}` 将数据解析为纯文本, 不能显示输出 html
- `v-html` 可以渲染输出 html
- `v-text` 将数据解析为纯文本, 不能输出真正的 html, 与花括号的区别是在页面加载时不显示双花括号

`v-text` 指令作用：操作网页元素中的纯文本内容, `{{}}`是他的另外一种写法。

`v-text` 与 `{{}}` 区别：

`v-text` 与`{{}}`等价, `{{}}`叫模板插值, `v-text` 叫指令。有一点区别就是, 在渲染的数据比较多的时候, 可能会把大括号显示出
来, 俗称屏幕闪动。

## v-on 可以绑定多个方法吗

可以, 如果绑定多个事件, 可以用键值对的形式(对象形式)。如果绑定是多个相同事件, 直接用逗号分隔就行

## Vue 循环的 key 作用

Key 值的存在保证了唯一性, Vue 在执行时, 会对节点进行检查, 如果没有 key 值, 那么 vue 检查到这里有 dom 节点, 就会对内容清空并赋
新值, 如果有 key 值存在, 那么会对新老节点进行对比, 比较两者 key 是否相同, 进行调换位置或删除操作

## Vue 单页面应用(SPA)的优缺点

- 优点：前后端分离 用户体验好 一个字 快 内容改变不需要重新加载整个页面
- 缺点：不利于 SEO, 初次加载时耗长（浏览器一开始就要加载 html、css、js , 所有的页面内容都包含在主页面中）, 页面复杂度提高了, 导航不可用

## Vuex 是什么？ 怎么使用？ 在那种场景下使用

Vuex 是一个专为 vue.js 应用程序开发的状态管理模式, 通过创建一个集中的数据存储, 方便程序中的所有组件进行访问, 简单来说 vuex 就是 vue 的状态管理工具。

Vuex 有五个属性: state、getters、mutations、actions、modules。

State 就是数据源存放地, 对应一般 vue 对象的 data, state 里面存放的数据是响应式的, state 数据发生改变, 对应这个数据的组件也会发生改
变 用 `this.$store.state.xxx` 调用。

Getters 相当于 store 的计算属性, 主要是对 state 中数据的过滤, 用 `this.$store.getters.xxx` 调用

Mutations 处理数据逻辑的方法全部放在 mutations 中, 当触发事件想改变 state 数据的时候使用 mutations, 用 `this.$store.commit` 调用, 给这个方法添加一个参数, 就是 mutation 的载荷（payload）

Actions 异步操作数据 , 但是是通过 mutation 来更新 State, 用 `this.$store.dispatch` 来触发, actions 也支持载荷

使用场景：组件之间的状态, 登录状态, 加入购物车, 音乐播放

## Vue 中路由跳转方式（声明式/编程式）

Vue 中路由跳转有两种, 分别是声明式和编程式

- 用 js 方式进行跳转的叫编程式导航 `this.$router.push()`
- 用 `router-link` 进行跳转的叫声明式 `router-view` 路由出口, 路由模板显示的位置

路由中 name 属性有什么作用？
在 router-link 中使用 name 导航到对应路由使用 name 导航的同时, 给子路由传递参数

## vue 跨域的解决方式

1. 后台更改 header (CORS)
2. 使用 jq 提供 jsonp 3.用 http-proxy-middleware（配置代理服务器的中间件）

## Vue 的生命周期请简述

vue 的生命周期就是 vue 实例创建到实例销毁的过程。期间会有 8 个钩子函数的调用。

- beforeCreate（创建实例）
- created（创建完成）、
- beforeMount（开始创建模板）
- mounted（创建完成）、
- beforeUpdate（开始更新）
- updated（更新完成）、
- beforeDestroy（开始销毁）
- destroyed（销毁完成）

## Vue 生命周期的作用

给了用户在不同阶段添加自己的代码的机会

## DOM 渲染在那个生命周期阶段内完成

DOM 渲染在 mounted 周期中就已经完成

## Vue 路由的实现

前端路由就是更新视图但不请求页面, 利用锚点完成切换, 页面不会刷新

## Vue 路由模式 hash 和 history, 简单讲一下

- Hash 模式地址栏中有`#`, history 没有,
- history 模式下刷新, 会出现 404 情况, 需要后台配置

使用 JavaScript 来对 loaction.hash 进行赋值, 改变 URL 的 hash 值, 可以使用 hashchange 事件来监听 hash 值的变化。

HTML5 提供了 History API 来实现 URL 的变化。其中最主要的 API 有以下两个：

- `history.pushState()`
- `history.repalceState()`

这两个 API 可以在不进行刷新的情况下, 操作浏览器的历史纪录。唯一不同的是, 前者是新增一个历史记录, 后者是直接替换当前的历史记录。

## Vue 路由传参的两种方式, params 和 query

方式与区别:

动态路由也可以叫路由传参, 就是根据不同的选择在同一个组件渲染不同的内容

用法上：query 用 path 引入, params 用 name 引入, 接收参数都是类似的, 分别是 `this.$route.query.name` 和 `this.$route.params.name`

url 展示上:

- params 类似于 post, query 类似于 get, 也就是安全问题, params 传值相对更安全点, query 通过 url 传参, 刷新页面还在, params
  刷新页面不在了

## Vue 的路由钩子函数/路由守卫有哪些

全局守卫：`beforeEach`（to, from, next）和 `afterEach`（to, from）

路由独享守卫：`beforeEnter`

组件内的守卫 ： 路由进入/ 更 新 / 离开之前 : beforeRouterEnter/update/leave

## Vue 中如何进行动态路由设置？ 有哪些方式？ 怎么获取传递过来的数据？

动态路由也可以叫路由传参, 动态路由有 query 和 prrams 两种方式传参

query 用 path 引 入 , params 用 name 引 入 , query 用 `this.$route.query.name` 接收参数, params 用 `this.$route.params.name` 接收参数

## 如何让组件中的 css 在当前组件生效

- 在 styled 中加上 `scoped`
- 还有 CSS module

## Mvvm 与 mvc 的区别

Mvc 模型视图控制器, 视图是可以直接访问模型, 所以, 视图里面会包含模型信息, mvc 关注的是模型不变, 所以, 在 mvc 中, 模型不依赖视
图, 但是视图依赖模型 Mvvm 模型 视图 和 vm vm 是作为模型和视图的桥梁, 当模型层数据改变, vm 会检测到并通知视图层进行相应的修改

## Vue 组件中的 data 为什么是函数

Data 是一个函数时, 每个组件实例都有自己的作用域, 每个实例相互独立, 不会相互影响

如果是引用类型（对象）, 当多个组件共用一个数据源时, 一处数据改变, 所有的组件数据都会改变, 所以要利用函数通过 return 返回对象的拷贝, （返回一个新数据）, 让每个实例都有自己的作用域, 相互不影响。
