<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Pets</h2>
   </div>
   <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-4">
      <div class="flex justify-between items-center">
         <input type="text" v-model="state.nome_pet" class="border rounded p-2 w-full" placeholder="Buscar pet:" />
      </div>
      <div class="flex justify-start items-center">
         <select required v-model="state.especie_id" @change="buscarRacasByEspecie(state.especie_id)">
            <option selected disabled value="">Selecione uma epécie</option>
            <option v-for="especie in state.especies" :value="especie.id">{{ especie.nome }}</option>
         </select>
      </div>
      <div class="flex justify-start items-center">
         <select required v-model="state.raca_id">
            <option selected disabled value="">Selecione uma raça</option>
            <option v-for="raca in state.racas_filtro" :value="raca.id">{{ raca.nome }}</option>
         </select>
         <BotaoSearchFilter @click="filtrarPets()" class=" sm:ml-1" />
         <BotaoCleanFilter @click="buscarPets()" class=" sm:ml-1" />
      </div>
      <div class="flex justify-end items-center">
         <BotaoCreate :link="'/pets/cadastrar-pet'" :titulo="'Cadastrar Pet'" v-if="user_tipo != 4" />
      </div>
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm" :param_url_1="'pets'"
      :param_url_2="'pet'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarPet" />
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="loading" />
</template>
<script setup>
import BotaoCleanFilter from '@/components/BotaoCleanFilter.vue';
import BotaoSearchFilter from '@/components/BotaoSearchFilter.vue';
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
   buscarPets();
   buscarTutores();
   buscarRacas();
   buscarEspecies();
   buscarSituacao();
});

const state = reactive({
   especie_id: "",
   raca_id: "",
   nome_pet: "",
   tutores: [],
   especies: [],
   racas: [],
   racas_filtro: [],
   situacoes: [],
   pets: [],
   visible: false,
   texto: '',
   pet_delete_id: null,
});


//get geral
async function buscarSituacao() {
   const { response } = await services.situacao_pet.getAll(token)
   state.situacoes = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token)
   state.tutores = response.data;
}

async function buscarRacas() {
   const { response } = await services.racas.getAll(token);
   state.racas = response.data;
}

async function buscarPets() {
   loading.value = true;
   state.especie_id = "";
   state.raca_id = "";
   state.nome_pet = "";
   state.racas_filtro = [];
   try {
      const { response } = await services.pets.getAll(token);
      state.pets = response.data;
   } catch (error) {
      console.log(error);
   } finally {
      loading.value = false;
   }
}

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token);
   state.especies = response.data;
}

//filtros
async function buscarRacasByEspecie(especie_id) {
   state.racas_filtro = [];
   state.raca_id = "";
   const { response } = await services.racas.getByEspecie(especie_id, token);
   state.racas_filtro = response;
}

async function filtrarPets() {
   loading.value = true

   try {
      const params = {};

      if (state.nome_pet) params.nome = state.nome_pet;
      if (state.especie_id) params.especie_id = state.especie_id;
      if (state.raca_id) params.raca_id = state.raca_id;

      const { response } = await services.pets.getPetsCustom(params, token);
      state.pets = response.data;
   } catch (error) {
      console.log(error);
      loading.value = false;
   } finally {
      loading.value = false;
   }
}

async function deletarPet() {
   loading.value = true;
   try {
      if (state.pet_delete_id) {
         await services.pets.delete(state.pet_delete_id, token);
         buscarPets();
      } else {
         state.MensagemErro = "Erro ao deletar o pet.";
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

function openConfirm(pet) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para apagar pets.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja o pet ' + pet.nome + '? :(';
   state.pet_delete_id = pet.id;
}


const tableHeaders = ['nome', 'tutor', 'situação', 'cor', 'raça', 'espécie', 'data ultima consulta'];
const tableBody = computed(() => {
   return state.pets.map(pet => {
      const tutor = state.tutores.find(tutor => tutor.id === pet.tutor_id);
      const raca = state.racas.find(raca => raca.id === pet.raca_id);
      const especie = state.especies.find(especie => especie.id === pet.especie_id);
      const situacao = state.situacoes.find(situacao => situacao.id === pet.situacao_id);
      return {
         id: pet.id,
         nome: pet.nome,
         tutor: tutor ? tutor.nome : 'Tutor não encontrado',
         situação: situacao ? situacao.nome : 'Situação não encontrada',
         cor: pet.cor,
         raça: raca ? raca.nome : 'Raça não encontrada',
         espécie: especie ? especie.nome : 'Espécie não encontrada',
         'data ultima consulta': pet.data_ultima_consulta ? pet.data_ultima_consulta : 'Nenhum data',
      };
   });
});
</script>
