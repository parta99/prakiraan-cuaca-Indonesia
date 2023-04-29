import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tabel1',
      name: 'tabel1',
      component: () => import('../views/TabelView.vue')
    },
    {
      path: '/tabel2',
      name: 'tabel2',
      component: () => import('../views/TabelViewDua.vue')
    },
    {
      path: '/tabel3',
      name: 'tabel3',
      component: () => import('../views/TabelViewTiga.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
