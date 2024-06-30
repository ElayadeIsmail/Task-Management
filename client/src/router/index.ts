import { useAuthStore } from '@/stores/auth.store'
import { HomeView, LoginView, RegisterView, TasksView } from '@/views'
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
    component: LoginView,
    meta: { requiresAnonymous: true }
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterView,
    meta: { requiresAnonymous: true }
  },
  {
    name: 'tasks',
    path: '/tasks',
    component: TasksView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { user } = useAuthStore()
  if (to.meta.requiresAuth && !user) {
    next({ path: '/login' })
    return
  }
  if (to.meta.requiresAnonymous && user) {
    next({ path: '/' })
    return
  }

  next()
})

export default router
