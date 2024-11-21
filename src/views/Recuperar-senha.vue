<template>
   <div v-if="token" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
         <h2 class="text-2xl font-semibold mb-4 text-center">Recuperação de Senha</h2>

         <form @submit.prevent="alterarSenha">
            <div class="mb-4">
               <label for="password" class="block text-gray-700 font-semibold mb-2">Nova Senha</label>
               <input v-model="state.password" id="password" type="password" required placeholder="Digite a nova senha"
                  class="w-full p-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50" />
            </div>

            <div class="mb-4">
               <label for="password_confirmation" class="block text-gray-700 font-semibold mb-2">Confirmar Senha</label>
               <input v-model="state.passwordConfirmation" id="password_confirmation" type="password" required
                  placeholder="Confirme a senha"
                  class="w-full p-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50" />
            </div>

            <div class="flex justify-end space-x-4">
               <button type="button" @click="cancel"
                  class="bg-vermelho hover:bg-vermelho2 text-branco transition duration-400 font-semibold py-2 px-4 rounded">
                  Voltar
               </button>
               <button type="submit"
                  class="bg-limao hover:bg-limao2 text-preto font-semibold py-2 px-4 rounded transition duration-400">
                  Alterar Senha
               </button>
            </div>
         </form>
      </div>
   </div>

   <div v-else class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
         <p class="text-center text-gray-700">Link de redefinição de senha inválido ou expirado.</p>
      </div>
   </div>
</template>
<script setup>
import services from '@/services';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validarSenha } from '@/utils/validarSenha';


const router = useRouter();
const route = useRoute();

const state = reactive({
   password: "",
   passwordConfirmation: "",

})

onMounted(() => {
   const token = route.params.token;
});

async function alterarSenha() {
   const novaSenha = state.password;
   const confirmarSenha = state.passwordConfirmation;

   const senhaValida = await validarSenha(novaSenha, confirmarSenha);
   if (!senhaValida) { return; }

   // let dados = {};

   

   // const data = await services.usuarios.redefinirSenha();
}

</script>