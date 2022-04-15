import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

function getComponent(path: string) {
  return () => import(`../views/${path}.vue`)
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: getComponent('home'),
  },
  {
    path: '/alpha',
    component: getComponent('alpha'),
  },
  {
    path: '/css',
    component: getComponent('css'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
