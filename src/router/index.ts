import { createRouter, createWebHistory  } from 'vue-router'

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
    name:'login',
    component: () => import('../routes/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router