import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/modules/Login/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login,
    },
    // {
    //   path: '/about',
    //   component: () => import('@/views/About.vue'),
    // },
    // {
    //   path: '/contact',
    //   component: () => import('@/views/Contact.vue'),
    // },
  ],
})
