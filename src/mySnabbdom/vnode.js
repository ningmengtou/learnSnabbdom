// vnode 作用:把五个属性和值拼接成对象返回
export default function vnode(sel, data, children, text, elm) {
  const key = data.key
  return {
    sel, data, children, text, elm ,key
  }
}