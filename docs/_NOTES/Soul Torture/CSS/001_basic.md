# CSS 基础

[[toc]]

## px、%、em、rem、vw/vh 有什么区别?

:::tip 答案

- px : 基本单位, 绝对单位
- % : 相对父元素的宽度比例
- em : 相对于当前元素的 font-size
- rem : 相对于根节点的 font-size
- vw : 屏幕宽度的 1%
- vh : 屏幕高度的 1% (vmin : vw 和 vh 的最小值, vmax : vw 和 vh 的最大值)

:::

## 如何创建一个 BFC?

:::tip 答案

- 根节点 &lt;html&gt;
- flot: left/right;
- overflow: auto/scroll/hidden;
- display: inline-block/table/table-row/table-cell;
- display: flex/grid; 的直接子元素
- position: absolute/fixed;

:::
