<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-xl w-full">
         <h2 class="text-xl font-semibold mb-4 flex justify-center">Atualizar Senha para o Primeiro Acesso</h2>
         <form @submit.prevent="saveSenha">
            <div>
               <div>
                  <label>Email</label>
                  <input type="email" placeholder="Digite seu email:" required v-model="state.email" readonly>
               </div>
               <div>
                  <label>Antiga senha</label>
                  <input type="password" placeholder="Digite sua atual senha:" required v-model="state.senhaAntiga">
               </div>
               <div>
                  <label>Nova senha</label>
                  <input type="password" placeholder="Digite sua nova senha:" required v-model="state.senha">
                  <span class="text-vermelho2 text-xs">(É necessário pelo menos uma letra maiúscula e um caractere especial)</span>
               </div>
            </div>
            <div class="flex justify-end space-x-4 mt-4">
               <button
                  class="bg-vermelho hover:bg-vermelho2 text-branco transition duration-400 font-semibold py-2 px-4 rounded"
                  @click="cancel" title="Cancelar">
                  Cancelar
               </button>
               <button type="submit"
                  class="bg-limao hover:bg-limao2 transition duration-400 text-preto font-semibold py-2 px-4 rounded"
                  title="Salvar">
                  Salvar <i class="bi bi-floppy"></i>
               </button>
            </div>
         </form>
      </div>
   </div>
</template>

<script setup>
import { defineProps, reactive, watch } from 'vue';
import services from '@/services'; 
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const state = reactive({
  email: '', 
  senhaAntiga: '',
  senha: ''
});

watch(() => props.email, (newEmail) => {
   state.email = newEmail;
});

const emit = defineEmits(['update:visible', 'save']);

const cancel = () => {
   emit('update:visible', false);
};

const saveSenha = async () => {
   try {
      if (!state.email || !state.senha || !state.senhaAntiga) {
         throw new Error('Todos os campos são obrigatórios.');
      }

      const senhaCorreta = await services.usuarios.verificaSenha(state.email, state.senhaAntiga);

      if (senhaCorreta) {
         emit('save', { email: state.email, senha: state.senha });
      } 

   } catch (error) {
      if (error.response && error.response.status === 401) {
         let msg_erro = 'Credenciais inválidas.';
         toast.error(msg_erro, { timeout: 3000 });
      } 
      else if (error.response && error.response.status === 422) {
         let msg_erro = 'A senha deve ter no mínimo 6 caracteres.';
         toast.error(msg_erro, { timeout: 3000 });
      } 
      else {
         let msg_erro = error.message || 'Ocorreu um erro ao tentar atualizar a senha.';
         toast.error(msg_erro, { timeout: 3000 });
   }
}
};
</script>

<style scoped>
input[type="text"],
input[type="email"],
input[type="password"] {
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

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
   border-color: #4A90E2;
   box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
   outline: none;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder {
   color: #888;
   font-style: italic;
}
</style>