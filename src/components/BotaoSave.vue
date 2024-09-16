<template>
   <button class="bg-limao p-3 text-preto rounded transition duration-500 hover:bg-limao2 hover:text-branco">
      {{ titulo }} <i class="bi bi-floppy"></i>
   </button>
</template>
<script setup>

import { defineProps } from 'vue';
const props = defineProps({
   titulo: {
      type: String,
      required: true
   },
});
</script>
<style scoped>
</style>