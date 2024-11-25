import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/',
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
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router