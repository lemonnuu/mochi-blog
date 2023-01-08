const fs = require('fs/promises')
const fse = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')
const moment = require('moment')
const chalk = require('chalk')
const config = require('../config')

/**
 * 获取 docs 目录下面需要添入 pages 的文件夹, 目的是可以增加把控的精细度
 */
const getTargetDirs = async () => {
  const allDirs = await fs.readdir(config.articlePath)
  const dirsStatPromiseArr = []
  const dirsPathArr = []
  allDirs.forEach((dir) => {
    if (config.excludeDirs.includes(dir)) return
    const pathWay = path.resolve(config.articlePath, dir)
    dirsStatPromiseArr.push(fs.stat(pathWay))
    dirsPathArr.push(pathWay)
  })
  const dirsStat = await Promise.all(dirsStatPromiseArr)
  const targetDirs = []
  dirsStat.forEach((stat, index) => {
    if (stat.isDirectory()) {
      targetDirs.push(dirsPathArr[index])
    }
  })
  return targetDirs
}

/**
 * 获取所有 .md 文件
 */
const getAllMdFiles = async (pathWay) => {
  const mdFileArr = []
  const dirs = await fs.readdir(pathWay)
  const statPromiseArr = []
  const dirsPathArr = []
  dirs.forEach((dir) => {
    statPromiseArr.push(fs.stat(path.resolve(pathWay, dir)))
    dirsPathArr.push(path.resolve(pathWay, dir))
  })
  const statArr = await Promise.all(statPromiseArr)
  for (let i = 0; i < statArr.length; i++) {
    if (statArr[i].isDirectory()) {
      mdFileArr.push(...(await getAllMdFiles(dirsPathArr[i])))
    } else {
      dirs[i].endsWith('.md') && mdFileArr.push(dirsPathArr[i])
    }
  }
  return mdFileArr
}

const yamlRegExp = /---(.*?)---/s

/**
 * 获取文件内容, 并根据 frontmatter 数据判断需不需要添加至于 pages
 * 判断依据是有没有 date 选项
 * 需要添加返回包含信息的对象, 否则返回 false
 */
const getContent = async (pathWay) => {
  const content = await fs.readFile(pathWay, 'utf-8')
  const yamlArr = yamlRegExp.exec(content)
  if (!yamlArr || !yamlArr[1]) return false
  const yamlObj = yaml.load(yamlArr[1])
  if (!yamlObj.date && !yamlObj.categories && !yamlObj.tags) return false
  yamlObj.link = pathWay.replace(path.resolve(config.articlePath), '').replaceAll('\\', '/').replace('.md', '')
  if (yamlObj.date) yamlObj.timestamp = moment(yamlObj.date).valueOf()
  return yamlObj
}

const getPages = async () => {
  console.log(chalk.red('正在解析 pages...'))
  const targetDirs = await getTargetDirs()
  const mdFilePromiseArr = []
  targetDirs.forEach((pathWay) => {
    mdFilePromiseArr.push(getAllMdFiles(pathWay))
  })
  let mdFileArr = await Promise.all(mdFilePromiseArr)
  mdFileArr = mdFileArr.flat(Infinity)
  const infoPromiseArr = []
  mdFileArr.forEach((filePath) => {
    infoPromiseArr.push(getContent(filePath))
  })
  const infoArr = await Promise.all(infoPromiseArr)
  const pages = []
  infoArr.forEach((info) => {
    if (!info) return
    pages.push(info)
  })
  await fse.writeJSON(path.resolve(config.pagesPath, './pages.json'), pages)
  console.log(chalk.red('pages 解析完成, 开始构建'))
  return pages
}

module.exports = getPages
