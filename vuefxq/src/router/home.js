/* 首页 */
import Layout from '@/components/Layout/index.vue'
const _import = require('./_import')

export default [
  {
    path: '/aa',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: _import('home/index'),
        meta: { title: '首页', icon: '', keepAlive: true, isBlack: false }
      }
    ]
  }
]
