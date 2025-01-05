import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../routes/home/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../routes/register/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../routes/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLoggedIn ? next() : next('/login')
  }
})

export default router