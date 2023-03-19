import{_ as e,c as l,o as t,a as i}from"./app.e96f5412.js";const v=JSON.parse('{"title":"CSS 基础","description":"","frontmatter":{},"headers":[{"level":2,"title":"px、%、em、rem、vw/vh 有什么区别?","slug":"px、-、em、rem、vw-vh-有什么区别","link":"#px、-、em、rem、vw-vh-有什么区别","children":[]},{"level":2,"title":"什么是 BFC?","slug":"什么是-bfc","link":"#什么是-bfc","children":[]},{"level":2,"title":"如何创建一个 BFC?","slug":"如何创建一个-bfc","link":"#如何创建一个-bfc","children":[]}],"relativePath":"_NOTES/Soul Torture/CSS/001_basic.md","lastUpdated":1679223112000}'),a={name:"_NOTES/Soul Torture/CSS/001_basic.md"},r=i('<h1 id="css-基础" tabindex="-1">CSS 基础 <a class="header-anchor" href="#css-基础" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#px、-、em、rem、vw-vh-有什么区别">px、%、em、rem、vw/vh 有什么区别?</a></li><li><a href="#什么是-bfc">什么是 BFC?</a></li><li><a href="#如何创建一个-bfc">如何创建一个 BFC?</a></li></ul></nav><h2 id="px、-、em、rem、vw-vh-有什么区别" tabindex="-1">px、%、em、rem、vw/vh 有什么区别? <a class="header-anchor" href="#px、-、em、rem、vw-vh-有什么区别" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><ul><li>px : 基本单位, 绝对单位</li><li>% : 相对父元素的宽度比例</li><li>em : 相对于当前元素的 font-size</li><li>rem : 相对于根节点的 font-size</li><li>vw : 屏幕宽度的 1%</li><li>vh : 屏幕高度的 1% (vmin : vw 和 vh 的最小值, vmax : vw 和 vh 的最大值)</li></ul></div><h2 id="什么是-bfc" tabindex="-1">什么是 BFC? <a class="header-anchor" href="#什么是-bfc" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts" target="_blank" rel="noreferrer">BFC</a>(Block Formatting Contexts) 块级格式化上下文。它是一块独立的渲染区域, 内部元素的渲染不会影响边界以外的元素。</p><p>BFC 一般用于清除浮动, 但有一点需要注意的是, 属于同一个 BFC 的两个相邻 Box 的才存在 margin 塌陷问题。</p></div><h2 id="如何创建一个-bfc" tabindex="-1">如何创建一个 BFC? <a class="header-anchor" href="#如何创建一个-bfc" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">答案</p><p>首先, 根节点 &lt;html&gt; 就是一个 BFC, <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E5%9D%97%E6%A0%BC%E5%BC%8F%E4%B8%8A%E4%B8%8B%E6%96%87" target="_blank" rel="noreferrer">创建 BFC 的方法</a>有(常见):</p><ul><li>使用 float 使其浮动的元素</li><li>块级元素的 overflow 属性不为 visible</li><li>display 为 inline-block</li><li>绝对定位的元素(包含 fixed 和 sticky)</li><li>flex items</li></ul><p>其中, 设置 <code>overflow: hidden;</code> 是惯用手法。</p></div>',8),o=[r];function c(s,n,h,d,_,p){return t(),l("div",null,o)}const f=e(a,[["render",c]]);export{v as __pageData,f as default};
