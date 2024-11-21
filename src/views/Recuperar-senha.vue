<template>
   <div v-if="state.token" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
         <div class="flex justify-center items-center">
            <img src="../assets/imagens/logo_sistema.png" class="w-40 h-40 object-contain" alt="Logo do sistema">
         </div>
         <h2 class="text-xl font-semibold mb-4 text-center">Recuperação de Senha</h2>
         <form @submit.prevent="alterarSenha">
            <div class="mb-4">
               <label for="password" class="block text-gray-700 font-semibold mb-2">Nova Senha</label>
               <input v-model="state.password" id="password" type="password" required
                  placeholder="Digite a nova senha:" />
            </div>
            <div class="mb-4">
               <label for="password_confirmation" class="block text-gray-700 font-semibold mb-2">Confirmar Senha</label>
               <input v-model="state.passwordConfirmation" id="password_confirmation" type="password" required
                  placeholder="Confirme a senha:" />
            </div>
            <div class="flex justify-end space-x-4">
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
import { validPassword } from '@/utils/validarSenha';
import { useToast } from 'vue-toastification';


const router = useRouter();
const route = useRoute();
const toast = useToast();

const state = reactive({
   password: "",
   passwordConfirmation: "",
   token: "",
})

onMounted(() => {
   state.token = route.params.token;
});

async function alterarSenha() {
   const novaSenha = state.password;
   const confirmarSenha = state.passwordConfirmation;

   const senhaValida = validPassword(novaSenha, confirmarSenha);
   if (!senhaValida) { return; }

   let dados = {};

   dados.password = state.password;
   dados.password_confirmation = state.passwordConfirmation;
   dados.token = state.token;

   try {
      const data = await services.usuarios.redefinirSenha(dados);
      router.push("/login")
   } catch (error) {
      console.log(error.response.data.message)
      const message = error.response.data.message
      toast.error(message, { timeout: 3000 });

   }
}

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