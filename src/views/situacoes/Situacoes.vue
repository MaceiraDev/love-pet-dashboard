<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Situações Pet</h2>
      <BotaoCreate :link="'/situacoes-pet/cadastrar-situacao'" :titulo="'Cadastrar Situação'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'situacoes-pet'" :param_url_2="'situacao'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarSit" />
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="loading" />
</template>
<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import DataTable from '@/components/TableDefault.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import { onMounted, reactive, computed, ref } from 'vue';
import { useStorage } from 'vue3-storage';
import services from '@/services';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const loading = ref(false);

onMounted(() => {
   buscarSituacao();
});

const state = reactive({
   situacoes: [],
   visible: false,
   texto: '',
   sit_deletar_id: null,
});

async function buscarSituacao() {
   const { response } = await services.situacao_pet.getAll(token)
   state.situacoes = response.data;
}

async function deletarSit() {
   loading.value = true;
   try {
      if (state.sit_deletar_id) {
         await services.situacao_pet.delete(state.sit_deletar_id, token);
         buscarSituacao();
      } else {
         state.MensagemErro = "Erro ao deletar o situação.";
      }
   } catch (e) {
      loading.value = false;
      state.MensagemErro = e.response.data.error;
      state.modal = true;
      console.log(e.response.data.error);
      return;
   } finally {
      loading.value = false;
   }
}

function openConfirm(situacao) {
   if (user_tipo != 0 && user_tipo != 1 && user_tipo != 2) {
      state.MensagemErro = "Você não tem permissão para apagar situações.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja excluir a situação ' + situacao.situação + '?';
   state.sit_deletar_id = situacao.id;
}

const tableHeaders = ['situação'];
const tableBody = computed(() => {
   return state.situacoes.map(situacao => {
      return {
         id: situacao.id,
         situação: situacao.nome,
      };
   });
});
</script>
