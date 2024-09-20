<template>
   <RouterLink :to="link">
      <button class="bg-azul3 p-3 text-branco rounded transition duration-500 hover:bg-vermelho hover:text-preto">
         {{ titulo }}
      </button>
   </RouterLink>
</template>
<script setup>

import { defineProps } from 'vue';
const props = defineProps({
   titulo: {
      type: String,
      required: true
   },
   link: {
      type: String,
      required: true
   }
});
</script>
<style scoped>
</style>