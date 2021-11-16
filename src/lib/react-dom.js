import {Component} from "./react.js"


// 把 DOM 结构放入页面
function renderVdom(vdom, container) {
  let node = createDomFromVdom(vdom)
  container.appendChild(node)
}
// 创建真是的 DOM
function createDomFromVdom(vdom) {
  let node
  if (typeof vdom === 'string') {
    node = document.createTextNode(vdom)
  }
  if (typeof vdom === 'object') {
    if (typeof vdom.tag === 'function') {
      let component = getComponent(vdom.tag, vdom.attrs)
      let vnode = component.render()
      node = createDomFromVdom(vnode)
      component.$root = node
    } else {
      node = document.createElement(vdom.tag)
      setAttributes(node, vdom.attrs)
      vdom.children.forEach(childVdom => renderVdom(childVdom, node))
    }
  }
  return node
}
// 把虚拟节点的属性放进节点
function setAttributes(node, attrs) {
  for (let key in attrs) {
    if (key.startsWith('on')) {
      node[(key.toLowerCase())] = attrs[key]
    } else if (key === 'style') {
      Object.assign(node.style, attrs[key])
    } else {
      node[key] = attrs[key]
    }
  }
}
// 对 class 和 function 做差异化处理
function getComponent(constructor, attrs) {
  if (constructor.prototype instanceof Component) {
    return new constructor(attrs)
  } else {
    let App = class extends Component { }
    App.prototype.render = function () {
      return constructor(attrs)
    }
    return new App(attrs)
  }
}


// 重新渲染组件，当组件状态改变时调用
function renderComponent(component) {
  let vdom = component.render()
  let node = createDomFromVdom(vdom)
  if (component.$root) {
    component.$root.parentNode.replaceChild(node, component.$root)
  }
}

function render (vdom, container){
    container.innerHTML = ''
    renderVdom(vdom, container)
}

export{
  render,
  renderComponent
}

export default {
  render,
  renderComponent
}