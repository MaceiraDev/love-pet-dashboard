<template>
   <div class="layout-default min-h-screen lg:flex">
      <aside :class="{ 'translate-x-0': state.asideVisible, '-translate-x-full': !state.asideVisible }"
         class="flex-col lg:flex transition-transform duration-300 transform fixed h-full">
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
                  <router-link to="/banhos" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
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
                  <router-link to="/especies" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
                     :class="{ 'bg-azul3 text-limao font-bold shadow-sm': $route.path === '/especies' }">
                     <i class="bi bi-1-circle"></i> Espécies
                  </router-link>
               </li>
               <li>
                  <router-link to="/racas" class="block py-2 px-4 rounded text-branco hover:text-limao duration-100"
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
      <div class="lg:flex-1 lg:flex lg:flex-col">
         <header class="flex justify-between items-center p-2">
            <router-link to="/perfil">
               <img :src="user_image" alt="Imagem Perfil"
                  class="w-12 h-12 rounded-full object-cover border-2 border-azul2 hover:border-limao transition-all duration-300"
                  v-if="user_image != ''">
               <NoPerfil
                  class="w-12 h-12 rounded-full object-cover border-2 border-azul2 hover:border-limao transition-all duration-300"
                  v-else />
            </router-link>
            <div class="flex items-center">
               <label class="burger" typeof="button" for="burger">
                  <button type="button" @click="toggleAside()">
                     <input type="checkbox" id="burger">
                     <span></span>
                     <span></span>
                     <span></span>
                  </button>
               </label>
               <BotaoDropHeader />
            </div>
         </header>
         <main class="flex-grow layout-main">
            <router-view class="layout-router-view" />
         </main>
      </div>
   </div>
   <ModalLogout :visible="state.modal" @update:visible="state.modal = $event" @confirmar="handleConfirmLogout" />
   <Loader :loading="loading" />
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
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
   asideVisible: false,
});
const loading = ref(false);

const checkScreenSize = () => {
   const isMobile = window.matchMedia("(max-width: 1023px)").matches;
   state.asideVisible = !isMobile;
};

function handleClickOutside(event) {
   const asideElement = document.querySelector('aside');
   const isMobile = window.innerWidth < 640;
   if (isMobile && state.asideVisible && asideElement && !asideElement.contains(event.target) && !event.target.closest('.burger')) {
      state.asideVisible = false;
   }
}


onMounted(() => {
   checkScreenSize();
   window.addEventListener('resize', checkScreenSize);
   document.addEventListener('click', handleClickOutside);
   state.asideVisible = window.innerWidth >= 640;
});

onBeforeMount(() => {
   window.removeEventListener('resize', checkScreenSize);
   document.removeEventListener('click', handleClickOutside);
});

function deslogar() {
   state.modal = true;
}

function toggleAside() {
   state.asideVisible = !state.asideVisible;
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
   overflow-y: auto;
}

.layout-main {
   padding-left: 17rem;
}

.layout-default {
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

.burger {
   position: relative;
   width: 30px;
   height: 20px;
   background: transparent;
   cursor: pointer;
   display: none;
}

.burger input {
   display: none;
}

.burger span {
   display: block;
   position: absolute;
   height: 4px;
   width: 100%;
   background-color: var(--color-limao);
   border-radius: 9px;
   opacity: 1;
   left: 0;
   transform: rotate(0deg);
   transition: .25s ease-in-out;
}

.burger span:nth-of-type(1) {
   top: 0px;
   transform-origin: left center;
}

.burger span:nth-of-type(2) {
   top: 50%;
   transform: translateY(-50%);
   transform-origin: left center;
}

.burger span:nth-of-type(3) {
   top: 100%;
   transform-origin: left center;
   transform: translateY(-100%);
}

.burger input:checked~span:nth-of-type(1) {
   transform: rotate(45deg);
   top: 0px;
   left: 5px;
}

.burger input:checked~span:nth-of-type(2) {
   width: 0%;
   opacity: 0;
}

.burger input:checked~span:nth-of-type(3) {
   transform: rotate(-45deg);
   top: 22px;
   left: 5px;
}

@media (max-width: 1023px) {
   .layout-main {
      padding-left: 0px;
   }

   main {
      padding-left: 0px;
      padding: 3rem !important;
   }

   header {
      width: 100%;
      left: 0;
   }

   .burger {
      display: block;
   }

   aside {
      z-index: 2000;
   }
}

@media (max-width: 500px) {
   aside {
      width: 14rem;
   }
}
</style>