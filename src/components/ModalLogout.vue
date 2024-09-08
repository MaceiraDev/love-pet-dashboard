<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
         <h2 class="text-xl font-semibold mb-4">Você realmente deseja sair?</h2>
         <div class="flex justify-end space-x-4">
            <button class="bg-azul1 hover:bg-azul3 text-branco transition duration-400 font-semibold py-2 px-4 rounded"
               @click="cancel" title="Cancelar">
               Cancelar
            </button>
            <button
               class="bg-vermelho hover:bg-vermelho2 transition duration-400 text-branco font-semibold py-2 px-4 rounded"
               title="Sair" @click="confirmarLogout">
               Sair <i class="bi bi-door-open-fill"></i>
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
   }
});

const emit = defineEmits(['update:visible', 'confirm']);

const cancel = () => {
   emit('update:visible', false); // Fecha o modal
};

const confirmarLogout = () => {
   emit('confirmar'); // Emite um evento personalizado para confirmar o logout
   emit('update:visible', false); // Fecha o modal
};
</script>
