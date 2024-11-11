<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class=" text-2xl   font-bold  text-preto2">Fichas</h2>
      <BotaoCreate :link="'/fichas/cadastrar-ficha'" :titulo="'Cadastrar Ficha'" />
   </div>
   <div class="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-2">
      <div class="flex justify-start items-center">
         <select v-model="state.veterinario_id">
            <option selected disabled value="">Selecione um veterinário</option>
            <option v-for="vet in state.veterinarios" :value="vet.id">{{ vet.nome }}</option>
         </select>
      </div>
      <div class="flex justify-start items-center">
         <select v-model="state.tutor_id" @change="buscarPetsTutor(state.tutor_id)">
            <option selected disabled value="">Selecione um Tutor</option>
            <option v-for="tutor in state.tutores" :key="tutor.id" :value="tutor.id">{{ tutor.nome }}
               {{ tutor.sobrenome }}</option>
         </select>
      </div>
      <div class="flex justify-start items-center">
         <select v-model="state.pet_id">
            <option selected disabled value="">Selecione um pet</option>
            <option v-for="pet in state.pets_tutor" :value="pet.id">{{ pet.nome }}</option>
         </select>
      </div>
      <div class="flex justify-start items-center">
         <select v-model="state.status">
            <option selected disabled value="">Selecione um status</option>
            <option value="PENDENTE">Pendente</option>
            <option value="ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="CANCELADO">Cancelado</option>
         </select>
      </div>
      <div class="flex justify-start items-center">
         <input type="date" placeholder="Digite uma data:" v-model="state.date" />
         <BotaoSearchFilter @click="filtrarFichas" class="sm:ml-1" />
         <BotaoCleanFilter @click="buscarFichas()" class=" sm:ml-1" />
      </div>
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'fichas'" :param_url_2="'ficha'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deletarFicha" />
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="loading" />
</template>

<script setup>
import BotaoCleanFilter from '@/components/BotaoCleanFilter.vue';
import BotaoCreate from '@/components/BotaoCreate.vue';
import BotaoSearchFilter from '@/components/BotaoSearchFilter.vue';
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
   buscarTutores();
   buscarEspecies();
   buscarVeterinarios();
   buscarSituacoes();
});

const state = reactive({
   fichas: [],
   pets: [],
   pets_tutor: [],
   especies: [],
   veterinarios: [],
   situacoes: [],
   visible: false,
   texto: '',
   ficha_id_delete: null,
   veterinario_id: '',
   pet_id: '',
   tutor_id: '',
   status: '',
   date: '',
});

async function buscarFichas() {
   state.tutor_id = '',
      state.pet_id = '',
      state.veterinario_id = '',
      state.date = '',
      state.status = '',
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

async function buscarPets() {
   const { response } = await services.pets.getAll(token);
   state.pets = response.data;
}

async function buscarPetsTutor(tutor_id) {
   const { response } = await services.pets.getByTutorId(tutor_id, token);
   state.pets_tutor = response.data;
}

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token);
   state.especies = response.data;
}

async function buscarVeterinarios() {
   const { response } = await services.usuarios.getVeterinarios(token);
   state.veterinarios = response.data;
}

async function buscarSituacoes() {
   const { response } = await services.situacao_pet.getAll(token);
   state.situacoes = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token);
   state.tutores = response.data;
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

async function filtrarFichas() {
   loading.value = true;
   try {

      // Construir os parâmetros dinamicamente com base nos valores selecionados
      const params = {};

      //verfica se o valor existe se sim add ele como param
      if (state.pet_id) params.pet_id = state.pet_id;
      if (state.veterinario_id) params.veterinario_id = state.veterinario_id;
      if (state.status) params.status = state.status;
      if (state.tutor_id) params.tutor_id = state.tutor_id;
      if (state.date) params.data = state.date;

      // Chamar a função de busca passando os parâmetros
      const { response } = await services.fichas.getFichasCustom(token, params);
      state.fichas = response.data;
   } catch (error) {
      console.log(error);
      loading.value = false;
   } finally {
      loading.value = false;
   }
}

const tableHeaders = ['veterinário', 'pet', 'espécie', 'data', 'situação (consulta)', 'status'];
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
         veterinário: nomeVeterinario,
         pet: nomePet,
         espécie: nomeEspecie,
         data: ficha.data,
         'situação (consulta)': nomeSituacao,
         status: ficha.status
      };
   });
});
</script>