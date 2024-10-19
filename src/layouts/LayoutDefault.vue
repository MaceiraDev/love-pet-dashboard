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
                  <router-link to="/situacoes-pet"
                     class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/situacoes-pet' }">
                     <i class="bi bi-thermometer-low"></i> Situações Pet
                  </router-link>
               </li>
               <li>
                  <router-link to="/especies"
                     class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/especies' }">
                     <i class="bi bi-1-circle"></i> Espécies
                  </router-link>
               </li>
               <li>
                  <router-link to="/racas"
                     class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/racas' }">
                     <i class="bi bi-2-circle"></i> Raças
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
               <img :src="user_image" alt="Imagem Perfil"
                  class="w-12 h-12 rounded-full object-cover border-2 border-azul2 hover:border-limao transition-all duration-300"
                  v-if="user_image != ''">
               <NoPerfil
                  class="w-12 h-12 rounded-full object-cover border-2 border-azul2 hover:border-limao transition-all duration-300"
                  v-else />
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

main {
   margin-top: 60px;
   padding-left: 17rem;
   padding: 1rem;
   flex-grow: 1;
   /* height: calc(100vh - 60px); */
   overflow-y: auto;
}

header {
   position: fixed;
   top: 0;
   left: 16rem;
   right: 0;
   height: 60px;
   background-color: var(--color-default);
   z-index: 1000;
   display: flex;
   align-items: center;
   padding-left: 1rem;
   padding-right: 1rem;
   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

aside {
   background-color: var(--color-default);
   position: fixed;
   top: 0;
   left: 0;
   width: 16rem;
   height: 100vh;
}

.layout-main {
   padding-left: 17rem;
}

.layout-default {
   display: flex;
   min-height: 100vh;
}

.layout-router-view {
   flex-grow: 1;
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