<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-xl w-full">
         <h2 class="text-xl font-semibold mb-4 flex justify-center">Recuperar Senha</h2>
         <form @submit.prevent="handleSubmit">
            <div class="mb-4">
               <label for="email" class="block text-preto2 font-semibold mb-2">E-mail</label>
               <input v-model="email" id="email" type="email" required placeholder="Digite seu e-mail"
                  class="w-full p-2 border border-preto2 rounded text-preto2 focus:outline-none focus:border-limao focus:ring focus:ring-limao focus:ring-opacity-50">
            </div>
            <div class="flex justify-end space-x-4">
               <button type="button" @click="cancel"
                  class="bg-vermelho hover:bg-vermelho2 text-branco transition duration-400 font-semibold py-2 px-4 rounded">
                  Fechar
               </button>
               <button type="submit"
                  class="bg-limao hover:bg-limao2 text-preto font-semibold py-2 px-4 rounded transition duration-400">
                  Enviar
               </button>
            </div>
         </form>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
   visible: Boolean
});

const email = ref('');

const emit = defineEmits(['update:visible', 'send']);

function handleSubmit() {
   if (email.value) {
      emit('send', email.value);
   }
}

const cancel = () => {
   emit('update:visible', false);
};
</script>
