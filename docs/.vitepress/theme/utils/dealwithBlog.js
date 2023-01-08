import pages from '../../../../helper/pages.json'

// 主页展示的博客文章列表, 要求必须含有 timestamp 属性, 也就是说显示的文章需要含有 date frontmatter
export const blogList = pages.filter((item) => item.timestamp).sort((a, b) => b.timestamp - a.timestamp)

// categories 列表
const categoriesList = pages.filter((item) => item.categories)
export const categoriesMap = {}
categoriesList.forEach((item) => {
  item.categories.forEach((category) => {
    categoriesMap[category] ? categoriesMap[category].push(item) : (categoriesMap[category] = [item])
  })
})

// tags 列表
const tagsList = pages.filter((item) => item.tags)
export const tagsMap = {}
tagsList.length && (tagsMap.All = tagsList)
tagsList.forEach((item) => {
  item.tags.forEach((tag) => {
    tagsMap[tag] ? tagsMap[tag].push(item) : (tagsMap[tag] = [item])
  })
})

export default pages
