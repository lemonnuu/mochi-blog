const soulTortureSidebar = [
  {
    text: 'JavaScript',
    collapsible: true,
    items: [
      { text: 'basic knowledge', link: '/_NOTES/Soul Torture/JavaScript/001_basic' },
      { text: 'dom and bom', link: '/_NOTES/Soul Torture/JavaScript/002_DOM BOM' },
      { text: 'tear code', link: '/_NOTES/Soul Torture/JavaScript/003_tear-code' },
      { text: 'advanced practice', link: '/_NOTES/Soul Torture/JavaScript/004_advanced' },
    ],
  },
  {
    text: 'CSS',
    collapsible: true,
    collapsed: true,
    items: [{ text: 'basic knowledge', link: '/_NOTES/Soul Torture/CSS/001_basic' }],
  },
  {
    text: 'Vue',
    collapsed: true,
    collapsible: true,
    items: [
      { text: 'basic knowledge', link: '/_NOTES/Soul Torture/Vue/001_basic' },
      { text: 'temporary', link: '/_NOTES/Soul Torture/Vue/002_draft' },
    ],
  },
  {
    text: 'Node',
    collapsed: true,
    collapsible: true,
    items: [{ text: 'basic knowledge', link: '/_NOTES/Soul Torture/Node/001_basic' }],
  },
  {
    text: 'Sublimation',
    collapsible: true,
    collapsed: true,
    items: [{ text: 'comprehensive', link: '/_NOTES/Soul Torture/Sublimation/001_comprehensive' }],
  },
]

module.exports = { '/_NOTES/Soul Torture/': soulTortureSidebar }
