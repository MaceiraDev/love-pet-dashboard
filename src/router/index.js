// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

const routes = [
   {
      path: '/',
      component: LayoutDefault,
      children: [
         {
            path: '',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue')
         },
         {
            path: 'fichas',
            name: 'fichas',
            component: () => import('../views/fichas/Fichas.vue')
         },
         {
            path: 'pets',
            name: 'pets',
            component: () => import('../views/pets/Pets.vue')
         }
      ]
   }
]
const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
})

export default router
