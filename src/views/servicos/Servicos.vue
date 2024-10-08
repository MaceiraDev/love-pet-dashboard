<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Serviços</h2>
      <BotaoCreate :link="'/servicos/cadastrar-servico'" :titulo="'Cadastrar Serviço'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'servicos'" :param_url_2="'servico'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event" @confirmar="deleteServico" />
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
   buscarServicos();
});

const state = reactive({
   servicos: [],
   visible: false,
   texto: '',
   servico_id_delete: null,
});

async function buscarServicos() {
   const { response } = await services.servicos.getAll(token)
   state.servicos = response.data;
}

async function deleteServico() {
   loading.value = true;
   try {
      if (state.servico_id_delete) {
         await services.servicos.delete(state.servico_id_delete, token);
         buscarServicos();
      } else {
         state.MensagemErro = "Erro ao deletar o serviço.";
      }
   } catch (e) {
      loading.value = false;
      console.log(e);
   } finally {
      loading.value = false;
   }
}

function openConfirm(servico) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar serviços.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja excluir o serviço ' + servico.serviço + '?';
   state.servico_id_delete = servico.id;
}

const tableHeaders = ['serviço', 'valor'];
const tableBody = computed(() => {
   return state.servicos.map(servico => {
      return {
         id: servico.id,
         serviço: servico.nome,
         valor: 'R$ ' + servico.valor,
      };
   });
});
</script>
