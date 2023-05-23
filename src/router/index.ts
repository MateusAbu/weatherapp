import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AddCity from '../views/AddCity.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity,
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
