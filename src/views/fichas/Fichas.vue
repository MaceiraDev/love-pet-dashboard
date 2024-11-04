<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class=" text-2xl   font-bold  text-preto2">Fichas</h2>
      <BotaoCreate :link="'/fichas/cadastrar-ficha'" :titulo="'Cadastrar Ficha'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm" :param_url_1="'fichas'"
      :param_url_2="'ficha'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarFicha" />
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="loading" />
 </template>
 
 <script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import Loader from '@/components/Loader.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';
import ModalErro from '@/components/ModalErro.vue';
import DataTable from '@/components/TableDefault.vue';
import services from '@/services';
import { onMounted, reactive, computed, ref } from 'vue';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const loading = ref(false);

onMounted(() => {
   buscarFichas();
   buscarPets();
   buscarEspecies();
   buscarVeterinarios();
   buscarSituacoes();
});

const state = reactive({
   fichas: [],
   pets: [],
   especies: [],
   veterinarios: [],
   situacoes: [],
   visible: false,
   texto: '',
   ficha_id_delete: null,
});

async function buscarPets() {
   const { response } = await services.pets.getAll(token);
   state.pets = response.data;
}

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token);
   state.especies = response.data;
}

async function buscarVeterinarios() {
   const { response } = await services.usuarios.getAll(token);
   state.veterinarios = response.data; 
}

async function buscarSituacoes() {
   const { response } = await services.situacao_pet.getAll(token);
   state.situacoes = response.data;
}

async function buscarFichas() {
   loading.value = true;
   try {
      const { response } = await services.fichas.getAll(token);
      state.fichas = response.data;
   } catch (error) {
      console.log(error);
   } finally {
      loading.value = false;
   }
}

function openConfirm(ficha) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar fichas.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja excluir essa ficha?';
   state.ficha_id_delete = ficha.id;
}

async function deletarFicha() {
   loading.value = true;
   try {
      if (state.ficha_id_delete) {
         await services.fichas.delete(state.ficha_id_delete, token);
         buscarFichas();
      } else {
         state.MensagemErro = "Erro ao deletar a ficha.";
      }
   } catch (e) {
      loading.value = false;
      console.log(e);
   } finally {
      loading.value = false;
   }
}

const tableHeaders = ['pet', 'espécie', 'veterinário', 'data', 'situação'];
const tableBody = computed(() => {
   return state.fichas.map(ficha => {
      // Busca o pet pelo id
      const pet = state.pets.find(p => p.id === ficha.pet_id);
      const nomePet = pet ? pet.nome : 'Desconhecido';

      // Busca a espécie pelo id
      const especie = state.especies.find(e => e.id === pet?.especie_id);
      const nomeEspecie = especie ? especie.nome : 'Desconhecido';

      // Busca o veterinário pelo id
      const veterinario = state.veterinarios.find(v => v.id === ficha.veterinario_id);
      const nomeVeterinario = veterinario ? veterinario.nome : 'Desconhecido';

      // Busca a situação pelo id
      const situacao = state.situacoes.find(s => s.id === ficha.situacao_id);
      const nomeSituacao = situacao ? situacao.nome : 'Desconhecido';

      return {
         id: ficha.id,
         pet: nomePet,
         espécie: nomeEspecie,
         veterinário: nomeVeterinario,
         data: ficha.data,
         situação: nomeSituacao,
         status: ficha.status
      };
   });
});
 </script>
 