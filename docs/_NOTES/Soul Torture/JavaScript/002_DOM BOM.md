# DOM 和 BOM

[[toc]]

## HTMLCollection 和 NodeList 区别?

![HTMLCollection 和 NodeList](../../../images/NOTES/Soul%20Torture/JavaScript/001_HTMLCollection-NodeList.png)

:::tip 答案

- HTMLCollection 是 Element 的集合
- NodeList 是 Node 集合

获取 Node 和 Element 的返回结果可能不一样, 如 elem.childNodes(NodeList) 的 elem.children(HTMLCollection) 不一样, 前者会包含 Text 和 Comment 节点, 后者不会。

:::

## offsetHeight、scrollHeight、clientHeight 区别?

:::info 前情提要

- offset (会四舍五入)
  - offsetWidth / offsetHeight : border + padding + content
  - offsetLeft / offsetTop : 左上角相对 [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 父节点的左/上边界偏移的像素值
- client (会四舍五入)
  - clientWidth / clientHeight : padding + content
  - clientLeft / clientTop : 左 / 上边框的宽度
- scroll (scrollWidth / scrollHeight 会四舍五入)
  - scrollWidth / scrollHeight : 实际内容尺寸 > content ? padding + 实际内容尺寸 : (clientWidth clientHeight)
  - scrollLeft / scrollTop : 卷起来的顶端到视口左/上侧的距离 (可以是小数)

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) API 可以获取 offsetWidth 的小数形式以及元素相对于视窗的位置。

:::

:::tip 答案

- offsetWidth offsetHeight : border + padding + content
- clientWidth clientHeight : padding + content
- scrollWidth scrollHeight : 实际内容尺寸 > content ? padding + 实际内容尺寸 : (clientWidth clientHeight)

:::
