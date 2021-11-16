import { renderComponent } from './react-dom.js'
// 虚拟dom节点创建，得到 tag， attrs， children 的对象
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}
// demo component
class Component {
  constructor(props) {
    this.props = props
    this.states = {}
  }
  setStates(newStates) {
    Object.assign(this.states, newStates)
    console.log('state设置成功')
    renderComponent(this)
  }

}
export {
  createElement,
  Component
}
export default {
  createElement,
  Component
}