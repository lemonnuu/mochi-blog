const vue3MigrationSidebar = [
  {
    text: '指南',
    collapsible: true,
    items: [{ text: '前言', link: '/_NOTES/Vue3 Migration/Guide/001_pre' }],
  },
  {
    text: '模板指令',
    collapsible: true,
    items: [
      { text: 'v-model', link: '/_NOTES/Vue3 Migration/Template Directives/001_v-model' },
      { text: 'key 使用改变', link: '/_NOTES/Vue3 Migration/Template Directives/002-key-attribute' },
      { text: 'v-if 与 v-for 优先级', link: '/_NOTES/Vue3 Migration/Template Directives/003_v-if-v-for' },
      { text: 'v-bind 合并行为', link: '/_NOTES/Vue3 Migration/Template Directives/004_v-bind' },
      { text: 'v-on.native 移除', link: '/_NOTES/Vue3 Migration/Template Directives/005_v-on-native-modifier-removed' },
    ],
  },
  {
    text: '渲染函数',
    collapsible: true,
    items: [
      { text: '渲染函数 API', link: '/_NOTES/Vue3 Migration/Render Function/001_render-function-api' },
      { text: '插槽统一', link: '/_NOTES/Vue3 Migration/Render Function/002_slots-unification' },
      { text: '$listeners 合并到 $attrs', link: '/_NOTES/Vue3 Migration/Render Function/003_listeners-removed' },
      {
        text: '$attrs 包含 class & style',
        link: '/_NOTES/Vue3 Migration/Render Function/004_attrs-includes-class-style',
      },
    ],
  },
]

module.exports = { '/_NOTES/Vue3 Migration/': vue3MigrationSidebar }
