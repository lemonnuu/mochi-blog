const buildToolsSidebar = [
  {
    text: 'Rollup',
    collapsible: true,
    items: [
      { text: '前言', link: '/_NOTES/Build Tools/rollup/01_pre' },
      { text: '快速上手', link: '/_NOTES/Build Tools/rollup/02_use' },
      { text: '插件', link: '/_NOTES/Build Tools/rollup/03_plugins' },
      { text: '常见问题', link: '/_NOTES/Build Tools/rollup/04_faqs' },
    ],
  },
  {
    text: 'esbuild',
    collapsible: true,
    items: [
      { text: '前言', link: '/_NOTES/Build Tools/esbuild/01_pre' },
      { text: '快速上手', link: '/_NOTES/Build Tools/esbuild/02_use' },
      { text: '常见问题', link: '/_NOTES/Build Tools/esbuild/03_faqs' },
    ],
  },
  {
    text: 'Parcel',
    collapsible: true,
    items: [{ text: '前言', link: '/_NOTES/Build Tools/parcel/01_pre' }],
  },
]

module.exports = { '/_NOTES/Build Tools/': buildToolsSidebar }
