<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Espécie</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="salvarEspecie">
         <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
               <label>Nome da Espécie</label>
               <input type="text" v-model="state.nome" required placeholder="Digite o nome da espécie:" />
            </div>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/especies'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import { reactive } from 'vue';
import services from '@/services';
import { useRouter } from 'vue-router';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();

const state = reactive({
   loader: false,
   modal: false,
   nome: '',
})

async function salvarEspecie() {
   state.loader = true;
   if (user_tipo >= 4) {
      state.MensagemErro = "Você não tem permissão para cadastrar espécies.";
      state.loader = false;
      state.modal = true;
      return;
   }

   let dados = {
      nome: state.nome,
   }

   try {
      const response = await services.especies.save({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/especies');
      }
   } catch (error) {
      console.error("Erro no cadastro de espécies:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível concluir o cadastro. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped></style>
