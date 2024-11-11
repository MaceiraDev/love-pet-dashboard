<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Banho e Tosa</h2>
      <BotaoCreate :link="'/banhos/cadastrar-banho'" :titulo="'Cadastrar Banho e Tosa'" v-if="user_tipo != 4" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'banhos'" :param_url_2="'banho'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarBanho" />
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
   buscarBanhos();
   buscarPets();
   buscarTutores();
});

const state = reactive({
   banhos: [],
   pets: [],
   tutores: [],
   visible: false,
   texto: '',
   banho_delete_id: null,
});

async function buscarBanhos() {
   const { response } = await services.banhos.getAll(token)
   state.banhos = response.data;
}

async function deletarBanho() {
   loading.value = true;
   try {
      if (state.banho_delete_id) {
         await services.banhos.delete(state.banho_delete_id, token);
         buscarBanhos();
      } else {
         state.MensagemErro = "Erro ao deletar a banho.";
      }
   } catch (e) {
      loading.value = false;
      console.log(e);
   } finally {
      loading.value = false;
   }
}

async function buscarPets() {
   const { response } = await services.pets.getAll(token);
   state.pets = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token)
   state.tutores = response.data;
}

function openConfirm(banho) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar banhos.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja apagar este banho?"';
   state.banho_delete_id = banho.id;
}

const tableHeaders = ['pet', 'tutor', 'data', 'horario', 'status'];
const tableBody = computed(() => {
   return state.banhos.map(banho => {
      const pet = state.pets.find(p => p.id === banho.pet_id);
      const nomePet = pet ? pet.nome : 'Desconhecido';

      const tuto = state.tutores.find(t => t.id === banho.tutor_id);
      const tutorNome = tuto ? tuto.nome : 'Desconhecido';

      return {
         id: banho.id,
         pet: nomePet,
         tutor: tutorNome,
         data: banho.data,
         horario: banho.horario,
         status: banho.status,
      };
   });
});
</script>
