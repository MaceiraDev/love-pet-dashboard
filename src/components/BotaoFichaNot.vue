<template>
   <div class="relative">
      <button
         class="w-12 h-12 rounded-full border-2 bg-azul3 border-azul3 hover:border-limao text-limao transition-all duration-300 relative">
         <i class="material-icons">notifications</i>
      </button>
      <span v-if="fichas.length >= 0"
         class="absolute top-0 right-0 -mt-1 -mr-1 bg-limao text-azul3 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
         {{ fichas.length }}
      </span>

   </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   fichas: {
      type: Array,
      required: true,
      default: () => [],
   },
});

</script>
<style scoped>
.relative {
   position: relative;
}
</style>
