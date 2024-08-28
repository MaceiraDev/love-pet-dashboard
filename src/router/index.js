// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

const routes = [
   {
      path: "/login",
      name: 'login',
      component: () => import('../views/Login.vue')
   },
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
         },
         {
            path: 'usuarios',
            name: 'usuarios',
            component: () => import('../views/usuarios/Usuarios.vue')
         },
         {
            path: 'usuarios/cadastrar-usuario',
            name: 'cadastrar-usuario',
            component: () => import('../views/usuarios/Cadastrar-usuario.vue')
         }
      ]
   }
]
const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
})

export default router
