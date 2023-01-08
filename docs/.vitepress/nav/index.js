const nav = [
  // 笔记相关, 自动生成 siderbar, 但是与博客系统分开, 没有 date、categories、tags 的 frontmatter
  {
    text: 'Notes',
    items: [{ text: 'Build Tools', link: '/_NOTES/Build Tools/rollup/01_pre' }],
  },
  // 面试相关, 自动生成 nav 和 siderbar
  // {
  //   text: 'Interview',
  //   link: '/_INTERVIEW/',
  // },
  // // 项目相关, 得再画个页面
  // {
  //   text: 'Projects',
  //   link: '/_PROJECTS/',
  // },
  // 帖子相关, 依靠博客功能检索, 主要
  {
    text: 'Posts',
    items: [
      { text: 'Timeline', link: '/timeline' },
      { text: 'Categories', link: '/category' },
      { text: 'Tags', link: '/tag' },
    ],
  },
]

export default nav
