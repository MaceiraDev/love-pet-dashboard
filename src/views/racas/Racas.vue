<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Raças</h2>
      <BotaoCreate :link="'/racas/cadastrar-raca'" :titulo="'Cadastrar Raça'" v-if="user_tipo != 4" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm" :param_url_1="'racas'"
      :param_url_2="'raca'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarRaca" />
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
   buscarRacas();
   buscarEspecies();
});

const state = reactive({
   racas: [],
   especies: [],
   visible: false,
   texto: '',
   raca_delete_id: null,
});

async function buscarRacas() {
   const { response } = await services.racas.getAll(token);
   state.racas = response.data;
}

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token);
   state.especies = response.data;
}

async function deletarRaca() {
   loading.value = true;
   try {
      if (state.raca_delete_id) {
         await services.racas.delete(state.raca_delete_id, token);
         buscarRacas();
      } else {
         state.MensagemErro = "Erro ao deletar a raça.";
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

function openConfirm(raca) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar raças.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja deletar a raça ' + raca.nome + '?';
   state.raca_delete_id = raca.id;
}

const tableHeaders = ['nome', 'espécie'];
const tableBody = computed(() => {
   return state.racas.map(raca => {
      const especie = state.especies.find(especie => especie.id === raca.especie_id);
      return {
         id: raca.id,
         nome: raca.nome,
         espécie: especie ? especie.nome : 'Desconhecida',
      };
   });
});
</script>
<style scoped></style>
