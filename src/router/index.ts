import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../routes/home/index.vue')
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;