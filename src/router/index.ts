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
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
