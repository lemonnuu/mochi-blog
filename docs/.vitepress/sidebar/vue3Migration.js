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
]

module.exports = { '/_NOTES/Vue3 Migration/': vue3MigrationSidebar }
