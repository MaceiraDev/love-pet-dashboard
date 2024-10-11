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
            path: 'tutores/alterar-tutor/:id',
            name: 'alterar-tutor',
            component: () => import('../views/tutores/Alterar-tutor.vue')
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
            path: 'servicos/alterar-servico/:id',
            name: 'alterar-servico',
            component: () => import('../views/servicos/Alterar-servico.vue')
         },
         {
            path: 'situacoes-pet',
            name: 'situacoes',
            component: () => import('../views/situacoes/Situacoes.vue')
         },
         {
            path: 'situacoes-pet/cadastrar-situacao',
            name: 'cadastrar-situacao',
            component: () => import('../views/situacoes/Cadastrar-situacao.vue')
         },
         {
            path: 'situacoes-pet/alterar-situacao/:id',
            name: 'alterar-situacao',
            component: () => import('../views/situacoes/Alterar-situacao.vue')
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
         },
         {
            path: 'usuarios/alterar-usuario/:id',
            name: 'alterar-usuario',
            component: () => import('../views/usuarios/Alterar-usuario.vue')
         },
         {
            path: 'perfil',
            name: 'perfil',
            component: () => import('../views/perfil/Perfil.vue')
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

   // Página de login não é protegida
   if (to.path === '/login') {
      next();
      return;
   }

   try {
      const result = await services.auth.verificaToken(token);
      const tipo_usuario = result.response.tipo_usuario;

      // Verifica se existe o token e seta os campos no storage
      if (result.response.token) {
         storage.setStorageSync("user_id", result.response.user_id);
         storage.setStorageSync("nome", result.response.nome);
         storage.setStorageSync("imagem", result.response.imagem);
         storage.setStorageSync("tipo_usuario", tipo_usuario);

         // Verifica se a rota é /usuarios ou /financeiro e bloqueia para usuários diferentes de 0 e 1
         if ((to.path.startsWith('/usuarios') || to.path.startsWith('/financeiro')) && (tipo_usuario != 0 && tipo_usuario != 1)) {
            next('/');
         }
         // Verifica se a rota é /servicos e bloqueia para usuários diferentes de 0, 1, 2, 3
         else if (to.path.startsWith('/servicos') && (tipo_usuario != 0 && tipo_usuario != 1 && tipo_usuario != 2 && tipo_usuario != 3)) {
            next('/');
         }
         else {
            next();
         }
      } else {
         next('/login');
      }
   } catch (error) {
      next('/login');
   }
});



export default router
