<template>
   <img :src="randomImage" alt="Imagem de perfil" />
</template>

<script setup>
import { ref } from 'vue';
import perfil_1 from "@/assets/imagens/perfis/perfil_1.webp";
import perfil_2 from "@/assets/imagens/perfis/perfil_2.webp";

const perfis = [perfil_1, perfil_2];

async function getRandomImage(){
   const randomIndex =  Math.floor(Math.random() * perfis.length);
   return perfis[randomIndex];
};
const randomImage = ref(getRandomImage());
</script>