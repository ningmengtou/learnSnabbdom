import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h'; // helper function for creating vnodes

// 创建patch函数 作用：服务虚拟节点
const patch = init([classModule, propsModule, styleModule, eventListenersModule])


// 利用h函数创建虚拟节点
// 虚拟节点的属性定义： children(子节点) data(节点属性) elm(是否上树) key(唯一标识) sel(标签名) text(标签文本) 
let myVnode1 = h('a', { props: { href: 'https://www.baidu.com' } }, '百度')
// 虚拟节点没有属性 props 可以不写 
let myVnode2 = h('div', '我是一个盒子')
// h函数可以嵌套使用创建虚拟dom树 多个子元素需要使用数组形式 单个子元素可以省略 []
let myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', [
    h('div', '嘻嘻'),
    h('div', '哈哈'),
  ]),
  h('li', [h('span', '香蕉'), h('span', '牛奶')]),
])


// patch函数让虚拟节点上树
let container = document.querySelector('#container')
// 参数一是之前的节点 参数二是之后的节点 一个真实节点只能上树一个虚拟节点
// 如果参数一是真实节点 那就会被移除而不是把新的虚拟节点放在此节点中
patch(container, myVnode3)