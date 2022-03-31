import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

function getComponent(path : string){
  // return ()=>import("@/")
}


const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   // component :
  // },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
