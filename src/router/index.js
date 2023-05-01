import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TabelSatu from '../views/TabelView.vue'
import TabelDua from '../views/TabelKeduaView.vue'
import TabelTiga from '../views/TabelTigaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tabel-satu',
      name: 'tabel-satu',
      component: TabelSatu
    },
    {
      path: '/tabel-dua',
      name: 'tabel-dua',
      component: TabelDua
    },
    {
      path: '/tabel-tiga',
      name: 'tabel-tiga',
      component: TabelTiga
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
