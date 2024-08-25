<template>
   <div class="min-h-screen flex">
      <aside class="w-64 text-white flex-shrink-0">
         <div class="profile">
            <img id="img" src="./../assets/imagens/dog_ia.jpg" alt="img profile">
            <div class="overlay">
               <div class="overlay-content">
                  <p>Vitor Inácio</p>
                  <button><i class="bi bi-power"></i></button>
               </div>
            </div>
         </div>
         <ul class="mt-4">
            <li>
               <router-link to="/" class="block py-2 px-4 rounded text-branco"
                  :class="{ 'bg-azul1 text-preto font-bold': $route.path === '/' }">
                  <i class="bi bi-globe-americas"></i> Dashboard
               </router-link>
            </li>
            <li>
               <router-link to="/fichas" class="block py-2 px-4 rounded text-branco"
                  :class="{ 'bg-azul1 text-preto font-bold': $route.path === '/fichas' }">
                  <i class="bi bi-clipboard2-fill"></i> Fichas
               </router-link>
            </li>
            <li>
               <router-link to="/pets" class="block py-2 px-4 rounded text-branco"
                  :class="{ 'bg-azul1 text-preto font-bold': $route.path === '/pets' }">
                  <i class="bi bi-gitlab"></i> Pets
               </router-link>
            </li>
         </ul>
      </aside>
      <div class="flex-1 flex flex-col">
         <header class="flex justify-between p-4">
            <h1>Meu Sistema</h1>
            <BotaoDropHeader />
         </header>
         <main class="flex-grow p-4">
            <router-view />
         </main>
      </div>
   </div>
</template>


<script setup>
import BotaoDropHeader from '@/components/BotaoDropHeader.vue';
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router';

defineComponent({
   name: 'Default'
})
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

.profile {
   position: relative;
   width: 100%;
   height: 250px;
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
   padding: 10px;
   color: white;
   display: flex;
   justify-content: space-between;
   font-weight: 700;
}

.overlay-content p {
   margin: 0;
   font-size: 18pt;
}
</style>