import { h, render } from 'vue'
import MessageInfo from '../components/MessageInfo.vue'

/**
 *
 * @param {String} type 类型：success、warn、error
 * @param {String} content 描述文本
 * @param {Number} duration 展示时间(毫秒), 默认 3000
 */
export const message = (type, content, duration = 3000) => {
  // 动画结束时的回调
  const destory = () => {
    // 3. 删除 vnode
    render(null, document.body)
  }
  // 1. 拿到 vnode
  const vnode = h(MessageInfo, {
    type,
    content,
    duration,
    destory,
  })
  // 2. render vnode
  render(vnode, document.body)
}
