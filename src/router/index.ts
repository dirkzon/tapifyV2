import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Callback from '../views/Callback.vue'
import HomeView from '../views/HomeView.vue'
import CassetteView from '../views/CassetteView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  {
    path: "/callback",
    name: "Callback",
    component: Callback
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cassette/:id',
    name: 'cassette',
    component: CassetteView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
