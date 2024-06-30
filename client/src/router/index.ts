import { HomeView, LoginView, RegisterView } from '@/views'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    name: 'login',
    path: '/login',
    component: LoginView
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
