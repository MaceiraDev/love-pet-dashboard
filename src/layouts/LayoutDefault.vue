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
                  :class="{ 'bg-azul1 text-preto font-bold shadow-md': $route.path === '/' }">
                  <i class="bi bi-globe-americas"></i> Dashboard
               </router-link>
            </li>
            <li>
               <router-link to="/fichas" class="block py-2 px-4 rounded text-branco"
                  :class="{ 'bg-azul1 text-preto font-bold shadow-md': $route.path === '/fichas' }">
                  <i class="bi bi-clipboard2-fill"></i> Fichas
               </router-link>
            </li>
            <li>
               <router-link to="/pets" class="block py-2 px-4 rounded text-branco"
                  :class="{ 'bg-azul1 text-preto font-bold shadow-md': $route.path === '/pets' }">
                  <i class="bi bi-gitlab"></i> Pets
               </router-link>
            </li>
            <li>
               <router-link to="/usuarios" class="block py-2 px-4 rounded text-branco"
                  :class="{ 'bg-azul1 text-preto font-bold shadow-md': $route.path === '/usuarios' }">
                  <i class="bi bi-people-fill"></i> Usuários
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

<style>
input[type="text"],
input[type="email"],
input[type="password"],
textarea {
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
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

/* Placeholder estilizado */
input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
textarea::placeholder {
   color: #888;
   font-style: italic;
}
input:disabled {
   background-color: #f2f2f2;
   cursor: not-allowed;
}
select {
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

select:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

/* Select desabilitado */
select:disabled {
   background-color: #f2f2f2;
   cursor: not-allowed;
}

/* Select com erro */
select.error {
   border-color: #e74c3c;
   box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
}

label {
   color: #1a1b1c;
   margin-bottom: 0;
}
</style>