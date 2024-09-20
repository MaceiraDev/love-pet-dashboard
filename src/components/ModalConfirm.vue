<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-lg w-full">
         <h2 class="text-xl font-semibold mb-4">{{ texto }}</h2>
         <div class="flex justify-end space-x-4">
            <button
               class="bg-vermelho hover:bg-vermelho2 transition duration-400 text-branco font-semibold py-2 px-4 rounded"
               title="Cancelar" type="button" @click="cancel">
               Cancelar
            </button>
            <button type="button" @click="confirmarDelete" class="bg-azul1 hover:bg-azul3 text-branco transition duration-400 font-semibold py-2 px-4 rounded" title="Sim">
               Sim <i class="bi bi-check-lg"></i>
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
const props = defineProps({
   visible: {
      type: Boolean,
      required: true
   },
   texto: {
      type: String,
      required: true,
   }
});

const emit = defineEmits(['update:visible', 'confirm']);

const cancel = () => {
   emit('update:visible', false);
};

const confirmarDelete = () => {
   emit('confirmar'); // Emite um evento personalizado para confirmar a exclusão
   emit('update:visible', false); // Fecha o modal
};
</script>
