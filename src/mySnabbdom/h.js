import vnode from './vnode.js';

// h 函数可以创建是虚拟dom树
// h 函数是低配版本的 只有三个属性值（缺一不可） c 是不确定性的属性
// 有三种参数形态
// h('div',{},'文字')
// h('div',{},[])
// h('div',{},h())
export default function h(sel, data, c) {
  // 检查参数个数是否为3
  if (arguments.length != 3)
    throw new Error('对不起，h函数必须传入三个参数')

  // 检查c是否是字符串或者数字
  if (typeof c == 'string' || typeof c == 'number') {
    return vnode(sel, data, undefined, c, undefined)
    // 检查c是否是数组
  } else if (Array.isArray(c)) {
    // 创建 children 来收集 c 的子元素
    let children = []
    // 如果是数组则遍历c 收集children
    for (let i = 0; i < c.length; i++) {
      // 再检查c中的子元素是否是对象
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))
        throw new Error('传入的数组参数中有项不是h函数')

      // 把遍历的c收集到children中
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
    // 检查c是否是对象，是对象 sel 属性有值
  } else if (typeof c == 'object' && c.sel != '') {
    // 如果是对象 children 为 对象
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传入的第三个类型不对')
  }
}