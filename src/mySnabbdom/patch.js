import vnode from './vnode.js';
import createElement from './createElement.js';
import patchVnode from './patchVnode'

// patch 是为了让虚拟dom上树
export default function patch(oldVnode, newVnode) {

  // 先判断oldVnode是真实节点还是虚拟节点
  if (oldVnode.sel = '' || oldVnode.sel == undefined) {
    // 是真实dom 就调用 vnode 方法包装成 虚拟dom
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断老节点和新节点的 key 和 sel 是否一致
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    patchVnode(oldVnode, newVnode)

  } else {
    // 不是的话就暴利拆除旧的，插入新的
    // 调用 createElement 参数是新节点 
    let newVnodeElm = createElement(newVnode);
    // 把创建好的真实节点插入到老节点之前 oldVnode.elm就是老节点的纯dom元素
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }

}