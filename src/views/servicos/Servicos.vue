<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Serviços</h2>
      <BotaoCreate :link="'/servicos/cadastrar-servico'" :titulo="'Cadastrar Serviço'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm" />
</template>

<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import DataTable from '@/components/TableDefault.vue';
import { onMounted, reactive, computed } from 'vue';
import { useStorage } from 'vue3-storage';
import services from '@/services';

const storage = useStorage();
const token = storage.getStorageSync("token");

onMounted(() => {
   buscarServicos();
});

const state = reactive({
   servicos: [],
   visible: false,
   texto: '',
   user_id_delete: null,
});

async function buscarServicos() {
   const { response } = await services.servicos.getAll(token)
   state.servicos = response.data;
}

const tableHeaders = ['serviço', 'valor'];
const tableBody = computed(() => {
   return state.servicos.map(servico => {
      return {
         id: servico.id,
         serviço: servico.nome,
         valor: servico.valor,
      };
   });
});
</script>
