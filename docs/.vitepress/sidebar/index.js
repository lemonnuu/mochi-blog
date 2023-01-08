const fs = require('fs/promises')
const path = require('path')

const baseUrl = './docs/.vitepress/sidebar'

const getSidebarConfig = async () => {
  const dirs = await fs.readdir(path.resolve(baseUrl))
  dirs.splice(
    dirs.findIndex((item) => item === 'index.js'),
    1
  )
  let sidebar = {}
  dirs.forEach((item) => {
    const sidebarItem = require(path.resolve(baseUrl, item))
    sidebar = { ...sidebar, ...sidebarItem }
  })
  return sidebar
}

module.exports = getSidebarConfig
