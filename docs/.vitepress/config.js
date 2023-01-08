import { defineConfig } from 'vitepress'
import nav from './nav'
import getPages from '../../helper/getPages'
import getSidebarConfig from './sidebar'

const config = async () => {
  const sidebar = await getSidebarConfig() // 生成 sidebar 配置
  await getPages()

  const themeConfig = {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' }, // 主页 logo
    siteTitle: false, // 主页标题, 设置为 false 可不显示
    nav,
    sidebar,
    outlineTitle: '大纲', // 大纲标题
    outline: [2, 3], // 大纲层级
    lastUpdatedText: '上次更新时间',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    editLink: {
      pattern: 'https://github.com/lemonnuu/mochi-blog/blob/master/docs/:path', // 编辑链接
      text: '编辑此页',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lemonnuu' }],
    algolia: {
      // 搜索功能
      apiKey: 'your_api_key',
      indexName: 'index_name',
    },
    footer: {
      message: "Mochi's personal blog.",
      copyright: 'Copyright © 2021-present Mochi',
    },
  }

  return defineConfig({
    base: '/mochi-blog', // 基础路径
    title: 'Mochi', // 网页标题
    titleTemplate: 'Blog',
    description: "Mochi's personal blog.", // 描述
    lastUpdated: true, // 开启最近更新时间
    ignoreDeadLinks: true, // 忽略无效链接
    outDir: '../dist', // 输出目录
    themeConfig,
  })
}

export default config
