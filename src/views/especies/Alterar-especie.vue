<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Editar Espécie</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="atualizarEspecie">
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
   <ModalNAutorizado :visible="state.modal_autorizacao" :texto="state.MensagemErro" :url="'/especies'"
      @update:visible="state.modal_autorizacao = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import services from '@/services';
import { useStorage } from 'vue3-storage';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import Loader from '@/components/Loader.vue';
import ModalErro from '@/components/ModalErro.vue';
import ModalNAutorizado from '@/components/ModalNAutorizado.vue';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const route = useRoute();
const router = useRouter();

const state = reactive({
   id: null,
   nome: '',
   loader: false,
   modal: false,
   modal_autorizacao: false,
   MensagemErro: '',
});

onMounted(() => {
   const especieId = route.params.id;
   if (especieId) {
      buscarEspecie(especieId);
   }
});

async function buscarEspecie(id) {
   state.loader = true;
   try {
      const { response } = await services.especies.getById(id, token);
      state.id = response.id;
      state.nome = response.nome;
   } catch (error) {
      const status_err = error.status;
      if (status_err == 401) {
         state.modal_autorizacao = true;
         state.MensagemErro = error.response.data.error;
      } else {
         console.error('Erro ao buscar espécie:', error);
         state.MensagemErro = 'Erro ao carregar os dados da espécie.';
         state.modal = true;
      }
   } finally {
      state.loader = false;
   }
}

async function atualizarEspecie() {
   state.loader = true;

   if (user_tipo >= 4) {
      state.MensagemErro = "Você não tem permissão para editar espécies.";
      state.modal = true;
      state.loader = false;
      return;
   }

   const dados = {
      id: state.id,
      nome: state.nome,
   };

   try {
      const response = await services.especies.update({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/especies');
      }
   } catch (error) {
      console.error('Erro ao atualizar espécie:', error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
      } else {
         state.MensagemErro = 'Erro ao salvar as informações. Tente novamente mais tarde.';
      }
      state.modal = true;
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped></style>
