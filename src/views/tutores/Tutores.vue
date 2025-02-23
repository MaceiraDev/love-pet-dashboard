<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Tutores</h2>
   </div>
   <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-4">
      <div class="flex justify-between items-center">
         <input type="text" v-model="state.nome_tutor" class="border rounded p-2 w-full" placeholder="Buscar tutor:" />
      </div>
      <div class="flex justify-between items-center">
         <input type="text" v-model="state.sobrenome_tutor" class="border rounded p-2 w-full" placeholder="Buscar sobrenome:" />
      </div>
      <div class="flex justify-start items-center">
         <select required v-model="state.status" @change="buscarPetByRaca(state.raca_id)">
            <option selected disabled value="">Selecione um status</option>
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
         </select>
         <BotaoSearchFilter @click="filtrarTutores()" class=" sm:ml-1" />
         <BotaoCleanFilter @click="buscarTutores()" class=" sm:ml-1" />
      </div>
      <div class="flex justify-end items-center">
         <BotaoCreate :link="'/tutores/cadastrar-tutor'" :titulo="'Cadastrar Tutor'" v-if="user_tipo != 4" />
      </div>
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'tutores'" :param_url_2="'tutor'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarTutor" />
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
import BotaoCleanFilter from '@/components/BotaoCleanFilter.vue';
import BotaoSearchFilter from '@/components/BotaoSearchFilter.vue';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const loading = ref(false);

onMounted(() => {
   buscarTutores();
});

const state = reactive({
   tutores: [],
   visible: false,
   texto: '',
   status: '',
   nome_tutor: '',
   sobrenome_tutor: '',
   tutor_delete_id: null,
});

async function buscarTutores() {
   state.status = '';
   state.nome_tutor = '';
   state.sobrenome_tutor = '';
   const { response } = await services.tutores.getAll(token)
   state.tutores = response.data;
}

async function deletarTutor() {
   loading.value = true;
   try {
      if (state.tutor_delete_id) {
         await services.tutores.delete(state.tutor_delete_id, token);
         buscarTutores();
      } else {
         state.MensagemErro = "Erro ao deletar o tutor.";
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

function formatarWhatsApp(whatsapp) {
   if (whatsapp.length === 11) {
      return `(${whatsapp.slice(0, 2)}) ${whatsapp[2]} ${whatsapp.slice(3, 7)}-${whatsapp.slice(7)}`;
   } else {
      console.error('Número de WhatsApp inválido:', whatsapp);
      return whatsapp;
   }
}

function openConfirm(tutor) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar tutores.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja o tutor ' + tutor.nome + '?';
   state.tutor_delete_id = tutor.id;
}

async function filtrarTutores() {
   loading.value = true;
   try {
      // Construir os parâmetros dinamicamente com base nos valores selecionados
      const params = {};
      //verfica se o valor existe se sim add ele como param
      if (state.nome_tutor) params.nome = state.nome_tutor;
      if (state.sobrenome_tutor) params.sobrenome = state.sobrenome_tutor;
      if (state.status) params.status = state.status;
      // Chamar a função de busca passando os parâmetros
      const { response } = await services.tutores.getTutoresCustom(token, params);
      state.tutores = response.data;
   } catch (error) {
      console.log(error);
      loading.value = false;
   } finally {
      loading.value = false;
   }
}

const tableHeaders = ['nome', 'sobrenome', 'whatsapp', 'email', 'status'];
const tableBody = computed(() => {
   return state.tutores.map(tutor => {
      return {
         id: tutor.id,
         nome: tutor.nome,
         sobrenome: tutor.sobrenome,
         whatsapp: formatarWhatsApp(tutor.whatsapp),
         email: tutor.email,
         status: tutor.status,
      };
   });
});
</script>
