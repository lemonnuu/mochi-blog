const typeScriptSidebar = [
  {
    text: '开始',
    collapsible: true,
    items: [
      { text: '前言', link: '/_NOTES/TypeScript/common/001_pre' },
      { text: '环境配置', link: '/_NOTES/TypeScript/common/002_environment-configuration' },
    ],
  },
  {
    text: '基础',
    collapsible: true,
    items: [
      { text: '基础类型', link: '/_NOTES/TypeScript/basic/001_basic-type' },
      { text: '组合类型', link: '/_NOTES/TypeScript/basic/002_combination-type' },
      { text: '接口', link: '/_NOTES/TypeScript/basic/003_interface' },
      { text: '函数', link: '/_NOTES/TypeScript/basic/004_function' },
      { text: '类', link: '/_NOTES/TypeScript/basic/005_class' },
      { text: '泛型', link: '/_NOTES/TypeScript/basic/006_generic' },
      { text: '命名空间', link: '/_NOTES/TypeScript/basic/007_namespace' },
      { text: '配置文件', link: '/_NOTES/TypeScript/basic/008_configuration-file' },
      { text: '声明文件', link: '/_NOTES/TypeScript/basic/009_statement-file' },
    ],
  },
  {
    text: '进阶',
    collapsible: true,
    items: [
      { text: '条件类型', link: '/_NOTES/TypeScript/basic/001_condition-type' },
      { text: '装饰器', link: '/_NOTES/TypeScript/basic/002_decorator' },
      { text: '类型兼容性', link: '/_NOTES/TypeScript/basic/003_type-compatibility' },
    ],
  },
]

module.exports = { '/_NOTES/TypeScript/': typeScriptSidebar }
