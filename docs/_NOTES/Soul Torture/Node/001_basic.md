# Node 基础

[[toc]]

## Node 的 Event Loop 机制?

:::info 前情提要
Node 宏任务优先级:

1. Timers : setTimeout setInterval
2. I/O callbacks - 处理网络、流、TCP 的错误回调
3. Idle, prepare - 闲置状态(node 内部使用)
4. Poll 轮询 - 执行 poll 中的 I/O 队列
5. Check 检查 - 存储 setImmediate 回调
6. Close callbacks - 关闭回调, 如 socket.on('close')

:::

:::tip 答案

1. 执行同步代码
2. 执行微任务队列(process.nextTick() 队列先执行, 再执行其它微任务队列)
3. 按顺序执行 6 个类型的微任务

:::
