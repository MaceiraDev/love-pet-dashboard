<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
         <p class="text-xl font-semibold mb-4">{{ texto }}</p>
         <div class="flex justify-end">
            <button
               class="bg-vermelho hover:bg-vermelho2 transition duration-400 text-branco font-semibold py-2 px-4 rounded"
               @click="close">
               Ok
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
   visible: {
      type: Boolean,
      required: true
   },
   texto: {
      type: String,
      required: true
   }
});

const emit = defineEmits(['update:visible']);

const close = () => {
   emit('update:visible', false); // Fecha o modal
};
</script>