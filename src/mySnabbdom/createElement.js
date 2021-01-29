// createElement 是为了创建真实的dom
// 创建 vnode 真实dom 

export default function createElement(vnode) {
  // 创建 虚拟dom的标签
  let domNode = document.createElement(vnode.sel)
  // 查看是有子节点还是文本内容
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 只有文本内容就把文本添加到dom中
    domNode.innerText = vnode.text
    // 让创建出来的节点有 eml 属性 eml属性是元素所在的dom树

  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 如果虚拟dom 的 children 为数组则遍历
    for (let i = 0; i < vnode.children.length; i++) {
      // 递归调用 createElement 来拿到子级的真实dom 此时的dom就有elm属性值
      let chDom = createElement(vnode.children[i])
      // 再把所有子级一次添加到最开始标签中
      domNode.appendChild(chDom)
    }
  }
  // 设置标签为 虚拟dom的 elm 属性
  vnode.elm = domNode
  // 返回 vnode.elm elm是纯dom对象
  return vnode.elm
}