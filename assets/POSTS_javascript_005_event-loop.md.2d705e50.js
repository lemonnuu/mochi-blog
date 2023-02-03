import{_ as o,c as i,b as a,d as e,e as s,w as c,a as t,r as n,o as p}from"./app.2605d047.js";const r="/mochi-blog/assets/001_event-loop.302e639e.svg",g=JSON.parse('{"title":"Event Loop 机制","titleTemplate":false,"description":"","frontmatter":{"date":"2023-02-02 09:13:31","title":"Event Loop 机制","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["javascript"]},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"宏任务与微任务","slug":"宏任务与微任务","link":"#宏任务与微任务","children":[]},{"level":2,"title":"event loop","slug":"event-loop","link":"#event-loop","children":[]}],"relativePath":"_POSTS/javascript/005_event-loop.md","lastUpdated":1675306730000}'),d={name:"_POSTS/javascript/005_event-loop.md"},_=t('<h1 id="event-loop-机制" tabindex="-1">Event Loop 机制 <a class="header-anchor" href="#event-loop-机制" aria-hidden="true">#</a></h1><blockquote><p>只涉及浏览器环境下的事件循环机制, Node 环境不一样。</p></blockquote><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-hidden="true">#</a></h2><p>总所周知, JavaScript 诞生起就是一门<strong>单线程非阻塞</strong>的脚本语言。这是由其最初的用途来决定的: 与浏览器交互。</p><p>单线程意味着, JavaScript 代码在执行的任何时候, 都只有一个主线程来处理所有任务。比如 DOM 渲染和脚本执行就是共用一个线程。</p><p>而非阻塞则是当代码需要进行一项异步任务(无法立刻返回结果, 需要花一定时间才能返回的任务, 如 Ajax 事件)的时候，主线程会先挂起这个任务，然后在异步任务返回结果的时候再根据一定规则去执行相应的回调。</p>',6),v=t('<div class="tip custom-block"><p class="custom-block-title">补充</p><p>DOM 事件也使用回调, 同样基于 event loop。</p></div><div class="info custom-block"><p class="custom-block-title">JS 如何执行</p><ol><li>从前往后, 一行一行执行</li><li>如果某一行执行出错, 则停止下面代码的执行</li><li>先执行完同步代码, 再执行异步回调</li></ol></div><h2 id="宏任务与微任务" tabindex="-1">宏任务与微任务 <a class="header-anchor" href="#宏任务与微任务" aria-hidden="true">#</a></h2><p>在介绍 event loop 机制之前, 还需要明确宏任务与微任务的一些相关概念。</p><p>由于异步任务之间并不相同，因此它们执行的优先级也有区别。不同的异步任务被分为两类:</p><ul><li>宏任务(macro task)</li><li>微任务(micro task)</li></ul><p>宏任务是由浏览器规定的, 而微任务是 ECMAScript 语法制定。宏任务在 DOM 渲染后触发, 微任务在 DOM 渲染前触发。</p><div class="danger custom-block"><p class="custom-block-title">重要</p><ul><li>宏任务 : setTimeout、setInterval、Ajax、requestAnimationFrame、DOM 事件等</li><li>微任务: Promise.then、Promise.catch、Promise.finally、MutationObserver、queueMicrotask、process.nextTick(Node 独有)</li></ul></div><h2 id="event-loop" tabindex="-1">event loop <a class="header-anchor" href="#event-loop" aria-hidden="true">#</a></h2><p>event loop(事件循环/事件轮询)是回调实现的原理, 所有需要基于回调实现的都是基于 event loop 机制。</p><p><img src="'+r+'" alt="Event Loop"></p><ol><li>清空函数调用堆栈。至此, 同步代码执行完毕 <ul><li>遇到微任务回调推入微任务队列</li><li>遇到宏任务回调挂起, 等待时机, 时机成熟推入宏任务队列</li></ul></li><li>清空微任务队列</li><li>渲染 DOM</li><li>不停轮询宏任务队列, 直至宏任务队列含有队头, 单个将队头推入函数调用堆栈</li><li>回到第一步, 不断重复整个流程</li></ol><div class="warning custom-block"><p class="custom-block-title">注意</p><p>宏任务推入函数调用堆栈都是<strong>单个</strong>的, 可以理解为一个宏任务就有一个循环流程。</p></div><div class="info custom-block"><p class="custom-block-title">补充</p><ul><li>大部分资料没有宏任务队列, 而是 call queue, 可看作相同</li><li>event loop 只是轮询宏任务, 上一阶段的微任务已执行完毕</li></ul></div>',14);function u(h,m,k,b,f,T){const l=n("f");return p(),i("div",null,[_,a("p",null,[e("首先需要明确的是, 异步是基于回调实现的, 而 "),s(l,null,{default:c(()=>[e("event loop 就是回调的实现原理")]),_:1}),e("。")]),v])}const x=o(d,[["render",u]]);export{g as __pageData,x as default};
