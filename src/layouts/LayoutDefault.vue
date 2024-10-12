<template>
   <div class="layout-default min-h-screen flex">
      <aside class="w-64 text-white flex flex-col">
         <div class="profile">
            <img id="img" src="./../assets/imagens/dog_ia.jpg" alt="img profile">
            <div class="overlay">
               <div class="overlay-content">
                  <p>{{ user_nome }}</p>
                  <button @click="deslogar">
                     <i class="bi bi-power"></i>
                  </button>
               </div>
            </div>
         </div>
         <div class="flex-grow">
            <ul class="mt-4">
               <li>
                  <router-link to="/" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/' }">
                     <i class="bi bi-globe-americas"></i> Dashboard
                  </router-link>
               </li>
               <li>
                  <router-link to="/fichas" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/fichas' }">
                     <i class="bi bi-clipboard2-fill"></i> Fichas
                  </router-link>
               </li>
               <li>
                  <router-link to="/pets" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/pets' }">
                     <i class="material-icons">pets</i> Pets
                  </router-link>
               </li>
               <li>
                  <router-link to="/tutores" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/tutores' }">
                     <i class="bi bi-person-raised-hand"></i> Tutores
                  </router-link>
               </li>
               <li>
                  <router-link to="/banho" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/banho' }">
                     <i class="bi bi-scissors"></i> Banho e tosa
                  </router-link>
               </li>
               <li v-if="user_tipo != 4">
                  <router-link to="/servicos" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/servicos' }">
                     <i class="bi bi-easel-fill"></i> Serviços
                  </router-link>
               </li>
               <li>
                  <router-link to="/situacoes-pet" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/situacoes-pet' }">
                     <i class="bi bi-thermometer-low"></i> Situações Pet
                  </router-link>
               </li>
               <li v-if="user_tipo == 0 || user_tipo == 1">
                  <router-link to="/usuarios" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/usuarios' }">
                     <i class="bi bi-people-fill"></i> Usuários
                  </router-link>
               </li>
            </ul>
         </div>
      </aside>
      <div class="flex-1 flex flex-col">
         <header class="flex justify-between items-center p-2 bg-gray-100">
            <router-link to="/perfil">
               <img :src="user_image" alt="Imagem Perfil" class="w-12 h-12 rounded-full object-cover border-2 border-azul2 hover:border-limao transition-all duration-300" v-if="user_image != ''">
               <NoPerfil class="w-12 h-12 rounded-full object-cover border-2 border-azul2 hover:border-limao transition-all duration-300" v-else />
            </router-link>
            <div class="flex items-center">
               <BotaoDropHeader />
            </div>
         </header>
         <main class="flex-grow p-4 layout-main">
            <router-view class="layout-router-view" />
         </main>
      </div>
   </div>
   <ModalLogout :visible="state.modal" @update:visible="state.modal = $event" @confirmar="handleConfirmLogout" />
   <Loader :loading="loading" />
</template>
<script setup>
import { ref, reactive } from 'vue';
import ModalLogout from '@/components/ModalLogout.vue';
import Loader from '@/components/Loader.vue';
import { useRouter } from 'vue-router';
import { useStorage } from 'vue3-storage';
import BotaoDropHeader from '@/components/BotaoDropHeader.vue';
import NoPerfil from '@/components/NoPerfil.vue';

const storage = useStorage();
const user_nome = storage.getStorageSync("nome");
const user_tipo = storage.getStorageSync("tipo_usuario");
const user_image = storage.getStorageSync("imagem");
const router = useRouter();
const state = reactive({
   modal: false,
});
const loading = ref(false);
function deslogar() {
   state.modal = true;
}
function handleConfirmLogout() {
   loading.value = true;
   setTimeout(() => {
      storage.removeStorageSync("token");
      router.push("/login");
      loading.value = false;
   }, 1000);
}
</script>

<style scoped>
@import url('./../assets/base.css');

header {
   background-color: var(--color-default);
}

aside {
   background-color: var(--color-default);
}

a {
   font-size: 14pt;
}

.material-icons {
   font-size: 20px;
   line-height: 1;
   vertical-align: middle;
   margin-right: 0;
}

.profile {
   position: relative;
   width: 100%;
   height: 200px;
}

.profile img {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.overlay {
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   height: auto;
   background-color: rgba(0, 0, 0, 0.61);
}

.overlay-content {
   padding: 5px;
   display: flex;
   justify-content: space-between;
}

.overlay-content p {
   margin: 0;
   font-size: 18pt;
   font-weight: 600;
   color: white;
}

.overlay-content button {
   border-radius: 8px;
   background-color: transparent;
   padding: 0px 10px;
   transition: 0.2s;
   color: white;
   font-size: 15pt;
}

.overlay-content button:hover {
   background-color: rgba(128, 128, 128, 0.5);
}
</style>
<style>
.layout-default input[type="text"],
.layout-default input[type="email"],
.layout-default input[type="password"] {
   width: 100%;
   padding: 10px 15px;
   margin: 8px 0;
   border: 1px solid #1a1b1c;
   border-radius: 4px;
   font-size: 16px;
   box-sizing: border-box;
   transition: border-color 0.3s ease, box-shadow 0.3s ease;
   color: #1a1b1c;
}

/* Cor de fundo do input */
.layout-default input[type="text"]:focus,
.layout-default input[type="email"]:focus,
.layout-default input[type="password"]:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

/* Placeholder estilizado */
.layout-default input[type="text"]::placeholder,
.layout-default input[type="email"]::placeholder,
.layout-default input[type="password"]::placeholder {
   color: #888;
   font-style: italic;
}

.layout-default input:disabled {
   background-color: #f2f2f2;
   cursor: not-allowed;
}

.layout-default select {
   width: 100%;
   padding: 10px 15px !important;
   margin: 8px 0 !important;
   border: 1px solid #1a1b1c;
   border-radius: 4px;
   background-color: #fff;
   font-size: 16px;
   color: #1a1b1c !important;
   appearance: none;
   -webkit-appearance: none;
   -moz-appearance: none;
   background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23333" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>');
   background-repeat: no-repeat;
   background-position: right 10px center;
   background-size: 10px;
   transition: border-color 0.3s ease, box-shadow 0.3s ease;
   cursor: pointer;
}

.layout-default select:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

/* Select desabilitado */
.layout-default select:disabled {
   background-color: #f2f2f2;
   cursor: not-allowed;
}

/* Select com erro */
.layout-default select.error {
   border-color: #e74c3c;
   box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
}

.layout-default textarea {
   width: 100%;
   padding: 10px 15px !important;
   margin: 8px 0;
   border: 1px solid #1a1b1c;
   border-radius: 4px;
   font-size: 16px;
   box-sizing: border-box;
   transition: border-color 0.3s ease, box-shadow 0.3s ease;
   color: #1a1b1c;
}

/* Cor de fundo do textarea */
.layout-default textarea:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

.layout-default textarea::placeholder {
   color: #888;
   font-style: italic;
}

.layout-default textarea:disabled {
   background-color: #f2f2f2;
   cursor: not-allowed;
}

.layout-default label {
   color: #1a1b1c;
   margin-bottom: 0;
}
</style>
