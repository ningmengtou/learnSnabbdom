import createElement from './createElement.js'
import updateChildren from './updateChildren'

// patchVnode 是为了对比新老节点
export default function patchVnode(oldVnode, newVnode) {
  // 判断老节点和新节点内存中是否一致
  if (oldVnode === newVnode) return;

  // 判断新节点中是否有文本
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // 文本不一致就把新节点的文本使用innerText替换掉老节点中的文本或者children

    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 判断老节点中是否有children
    if (oldVnode.children.length > 0 || oldVnode.children != undefined) {
      console.log(111);
      // 当老节点和新节点都有children时
      // 传入节点node 老节点children 新节点children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)

    } else {
      // 清空老节点中的text 并且把新节点中的children追加到老节点中
      oldVnode.elm.innerHTML = ''
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom)
      }

      // oldVnode.children = newVnode.children
    }
  }
}