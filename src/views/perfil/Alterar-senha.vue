<template>
   <form @submit.prevent="atualizarSenha"
      class="bg-background border-solid border-2 border-preto2 rounded-lg shadow-lg shadow-preto2-500/50 p-6 max-w-3xl w-full mx-auto h-auto">
      <h1 class="text-3xl font-bold text-preto2 mb-4 text-center">Alterar senha</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />

      <div class="mb-4">
         <label class="block font-bold mb-2">Senha Antiga</label>
         <input type="password" v-model="state.senhaAntiga" class="border rounded p-2 w-full" required />
      </div>

      <div class="mb-4">
         <label class="block font-bold mb-2">Nova Senha</label>
         <input type="password" v-model="state.novaSenha" class="border rounded p-2 w-full" required />
      </div>

      <div class="mb-4">
         <label class="block font-bold mb-2">Confirmar Nova Senha</label>
         <input type="password" v-model="state.confirmarNovaSenha" class="border rounded p-2 w-full" required />
      </div>

      <div class="flex gap-4">
         <BotaoCancel :link="'/perfil/alterar-perfil'" :titulo="'Cancelar'" />
         <BotaoSave titulo="Salvar" />
      </div>
   </form>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import services from '@/services';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import Loader from '@/components/Loader.vue';
import ModalErro from '@/components/ModalErro.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const toast = useToast();
const router = useRouter();
const token = storage.getStorageSync("token");
const user_id = storage.getStorageSync("user_id");

const state = reactive({
   email: '',
   senhaAntiga: '',
   novaSenha: '',
   confirmarNovaSenha: '',
   loader: false,
   modal: false,
   MensagemErro: "",
});

onMounted(() => {
   if (user_id) {
      buscarUsuarioId(user_id);
   }
});

async function buscarUsuarioId(id) {
   try {
      const { response } = await services.perfil.getPerfil(id, token);
      state.email = response.email;
   } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do usuário.";
   } finally {
      state.loader = false;
   }
}

async function atualizarSenha() {
   const senhaValida = await validarSenha(state.email, state.senhaAntiga, state.novaSenha, state.confirmarNovaSenha);

   if (!senhaValida) { return; }

   let dados = {
      email: state.email,
      senha: state.novaSenha
   }

   try {
      const response = await services.usuarios.upSenha(dados);
      if (response.status === 200 || response.status === 201) {
         toast.success('Senha alterada com sucesso!');
         router.push('alterar-perfil')
      }
   } catch (error) {
      console.error("Erro na alteração do usuário:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível editar o cadastro. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
}

async function validarSenha(email, senhaAntiga, novaSenha, confirmarSenha) {
   if (novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem!', { timeout: 3000 });
      return false;
   }

   if (novaSenha == senhaAntiga) {
      toast.error('A nova senha não pode ser a mesma que a atual!', { timeout: 3000 });
      return false;
   }

   if (novaSenha.length < 6) {
      toast.error('A senha deve ter 6 ou mais caracteres!', { timeout: 3000 });
      return false;
   }

   if (!/[A-Z]/.test(novaSenha)) {
      toast.error('A senha deve conter pelo menos uma letra maiúscula!', { timeout: 3000 });
      return false;
   }

   if (!/[!@#$%^&*(),.?":{}|<>;]/.test(novaSenha)) {
      toast.error('A senha deve conter pelo menos um caractere especial!', { timeout: 3000 });
      return false;
   }

   try {
      const response = await services.usuarios.verificaSenha(email, senhaAntiga);
      if (response.status !== 200) {
         toast.error('Senha antiga inválida!', { timeout: 3000 });
         return false;
      }
   } catch (error) {
      console.error("Erro ao verificar a senha antiga:", error);
      toast.error('Senha antiga inválida!', { timeout: 3000 });
      return false;
   }

   return true;
}

</script>
