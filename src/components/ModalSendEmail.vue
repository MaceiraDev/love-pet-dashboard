<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-xl w-full">
         <h2 class="text-xl font-semibold mb-4 flex justify-center">Recuperar Senha</h2>
         <form @submit.prevent="handleSubmit">
            <div class="mb-4">
               <label for="email" class="block text-preto2 font-semibold mb-2">E-mail</label>
               <input v-model="email" id="email" type="email" required placeholder="Digite seu e-mail:" />
            </div>
            <div class="flex justify-end space-x-4">
               <button type="button" @click="cancel" class="bg-vermelho hover:bg-vermelho2 text-branco transition duration-400 font-semibold py-2 px-4 rounded">
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
<style scoped>
input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"] {
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
input[type="date"]:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

/* Placeholder estilizado */
input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="date"]::placeholder {
   color: #888;
   font-style: italic;
}

input:disabled {
   background-color: #f2f2f2;
   cursor: not-allowed;
}
</style>