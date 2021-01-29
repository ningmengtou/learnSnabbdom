import h from './mySnabbdom/h.js'
import patch from './mySnabbdom/patch.js'

let vnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'M' }, 'M'),
  h('li', { key: 'N' }, 'N'),
])





let vnode2 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C12121'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'M' }, 'M'),
  h('li', { key: 'N' }, 'N'),
])




const container = document.querySelector('#container')

const btn = document.querySelector('#btn')

patch(container, vnode1)

btn.onclick = function () {
  patch(vnode1, vnode2)
}