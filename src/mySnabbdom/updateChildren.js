import patch from './patch.js';
import patchVnode from './patchVnode.js'
import createELement from './createElement.js'

// 判断两个节点的 sel 和 key 是否一致
function checkSameVnode(a, b) {
  return (a.sel == b.sel && a.key == b.key)
}


// 使用diff算法更新老节点中的children
export default function updateChidren(parentElm, oldCh, newCh) {
  console.log(parentElm, oldCh, newCh);
  // 书写变量
  // 旧前
  let oldStartInx = 0

  // 新前
  let newStartInx = 0

  // 旧后
  let oldEndInx = oldCh.length - 1

  // 新后
  let newEndInx = newCh.length - 1

  // 旧前节点
  let oldStartVnode = oldCh[0]

  // 新前节点
  let newStartVnode = newCh[0]

  // 旧后节点
  let oldEndVnode = oldCh[oldEndInx]

  // 新后节点
  let newEndVnode = newCh[newEndInx]

  // 保存key 的 map 
  let keyMap = null

  // 当旧前小于等于旧后 新前小于等于新后
  while (oldStartInx <= oldEndInx && newStartInx <= newEndInx) {
    // 首先要略过被标记了undefined的节点再查看是否被命中
    if (oldStartVnode == null || oldCh[oldStartInx] == undefined) {
      oldStartVnode = oldch[++oldStartInx]
    } else if (oldEndVnode == null || oldCh[oldEndInx] == undefined) {
      oldEndVnode = oldch[--oldEndInx]
    } else if (newStartVnode == null || newCh[newStartInx] == undefined) {
      newStartVnode = newCh[++newStartInx]
    } else if (newEndVnode == null || newCh[newEndInx] == undefined) {
      newEndVnode = newCh[--newEndInx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 命中 新前和旧前
      // 一致就调用 patchVnode 来对比新老节点
      patchVnode(oldStartVnode, newStartVnode)
      // 新前和旧前节点都开始后移
      oldStartVnode = oldCh[++oldStartInx]
      newStartVnode = newCh[++newStartInx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 命中新后和旧后
      patchVnode(oldEndVnode, newEndVnode)
      // 新后和旧后开始前移
      oldEndVnode = oldCh[--oldEndInx]
      newEndVnode = newCh[--newEndInx]
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 命中新后和旧前
      patchVnode(oldStartVnode, newEndVnode)
      // 把新后指向的节点插入到旧节点的最后
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)

      oldStartVnode = oldCh[++oldStartInx]
      newEndVnode = newCh[--newEndInx]
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 命中新前和旧后
      patchVnode(oldEndVnode, newStartVnode)
      // 把旧后节点移动到旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndInx]
      newStartVnode = newCh[++newStartInx]
    } else {
      // 四种情况都没有命中
      // 制作一个keyMap的映射对象，这样就不用遍历老对象了
      if (!keyMap) {
        keyMap = {}
        // 从oldStartInx到oldEndInx开始循环
        for (let i = oldStartInx; i <= oldEndInx; i++) {
          const key = oldch[i].key
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      // oldIndex 为当前项的老节点序号
      const oldIndex = keyMap[newStartVnode.key]
      if (oldIndex == undefined) {
        // 判断，如果idxInOld是undefined表示它是全新的项
        // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是undefined 就需要把这项移动
        const elmToMove = oldCh[oldIndex]
        patchVnode(elmToMove, newStartVnode)
        // 把当前项设置为undefined 表示已经处理过了
        oldCh[oldIndex] = undefined
        // 移动elmToMove
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      // 让指针往下移动 找到新的新节点项
      newStartVnode = newCh[++newStartInx]
    }
  }


  // 当循环接受查看是否有剩余的节点
  if (newStartInx <= newEndInx) {

    // 遍历剩余的节点并且创建节点再插入节点
    for (let i = newStartInx; i <= newEndInx; i++) {
      // insertBefore 方法 如果插入的元素为null 则是默认是插入最后一个
      parentElm.insertBefore(createELement(newCh[i]), oldCh[oldStartInx].elm)
    }
  } else if (oldStartInx <= oldEndInx) {
    // 循环遍历多余的老节点并且删除
    for (let i = oldStartInx; i <= oldEndInx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}
