/* 首页 */
import Layout from '@/components/Layout/index.vue'
const _import = require('./_import')

export default [
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'user-manage',
        name: 'userManage',
        component: _import('system/UserManage'),
        meta: { title: '用户管理', icon: '', keepAlive: true, isBlack: false }
      }
    ]
  }
]
