<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Espécies</h2>
      <BotaoCreate :link="'/especies/cadastrar-especie'" :titulo="'Cadastrar Espécie'" v-if="user_tipo != 4" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'especies'" :param_url_2="'especie'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarEspecie" />
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
   buscarEspecies();
});

const state = reactive({
   especies: [],
   visible: false,
   texto: '',
   modal: false,
   especie_delete_id: null,
});

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token)
   state.especies = response.data;
}

async function deletarEspecie() {
   loading.value = true;
   try {
      if (state.especie_delete_id) {
         await services.especies.delete(state.especie_delete_id, token);
         buscarEspecies();
      } else {
         state.MensagemErro = "Erro ao deletar a espécie.";
         state.modal = true;
         return;
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

function openConfirm(especie) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar espécies.";
      loading.value = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja apagar a espécie "' + especie.nome + '" ?';
   state.especie_delete_id = especie.id;
}

const tableHeaders = ['nome'];
const tableBody = computed(() => {
   return state.especies.map(especie => {
      return {
         id: especie.id,
         nome: especie.nome,
      };
   });
});

</script>
