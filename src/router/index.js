import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import services from '@/services';
import { useStorage } from 'vue3-storage';

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
            component: () => import('../views/fichas/Fichas.vue'),
         },
         {
            path: 'fichas/cadastrar-ficha',
            name: 'cadastrar-ficha',
            component: () => import('../views/fichas/Cadastrar-ficha.vue')
         },
         {
            path: 'pets',
            name: 'pets',
            component: () => import('../views/pets/Pets.vue')
         },
         {
            path: 'pets/cadastrar-pet',
            name: 'cadastrar-pet',
            component: () => import('../views/pets/Cadastrar-pet.vue')
         },
         {
            path: 'tutores',
            name: 'tutores',
            component: () => import('../views/tutores/Tutores.vue')
         },
         {
            path: 'tutores/cadastrar-tutor',
            name: 'cadastrar-tutor',
            component: () => import('../views/tutores/Cadastrar-tutor.vue')
         },
         {
            path: 'banho',
            name: 'banho',
            component: () => import('../views/banho/Banho.vue')
         },
         {
            path: 'banho/cadastrar-banho',
            name: 'cadastrar-banho',
            component: () => import('../views/banho/Cadastrar-banho.vue')
         },
         {
            path: 'servicos',
            name: 'servicos',
            component: () => import('../views/servicos/Servicos.vue')
         },
         {
            path: 'servicos/cadastrar-servico',
            name: 'cadastrar-servico',
            component: () => import('../views/servicos/Cadastrar-servico.vue')
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

// Proteção de navegação global
router.beforeEach(async (to, from, next) => {

   const storage = useStorage();
   const token = storage.getStorageSync("token");

   //Pagina login n é protegida
   if (to.path === '/login') {
      next();
      return;
   }
   try {
      const result = await services.auth.verificaToken(token);
      //varifica se existe o token e seta os campos no storage
      if (result.response.token) {
         storage.setStorageSync("user_id", result.response.user_id);
         storage.setStorageSync("nome", result.response.nome);
         storage.setStorageSync("tipo_usuario", result.response.tipo_usuario);
         next();
      } else {
         next('/login');
      }
   } catch (error) {
      next('/login');
   }
});

export default router
