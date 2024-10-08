<template>
   <RouterLink :to="link">
      <button class="bg-azul1 p-2 text-branco rounded transition duration-500 hover:bg-limao hover:text-preto">
         <i class="bi bi-plus-circle"></i> {{ titulo }}
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
button {}
</style>