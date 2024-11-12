<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Banho e Tosa</h2>
   </div>
   <div class="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-2">
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
         <BotaoCleanFilter @click="buscarBanhos()" class=" sm:ml-1" />
      </div>
      <div class="flex justify-end items-center">
         <BotaoCreate :link="'/banhos/cadastrar-banho'" :titulo="'Cadastrar Banho e Tosa'" v-if="user_tipo != 4" />
      </div>
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
import BotaoCleanFilter from '@/components/BotaoCleanFilter.vue';
import BotaoSearchFilter from '@/components/BotaoSearchFilter.vue';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const loading = ref(false);

onMounted(() => {
   buscarBanhos();
   buscarPets();
   buscarTutores();
   buscarServicos();
});

const state = reactive({
   banhos: [],
   pets_tutor: [],
   pets: [],
   servicos: [],
   tutores: [],
   visible: false,
   texto: '',
   banho_delete_id: null,
   pet_id: '',
   tutor_id: '',
   status: '',
   date: '',
});

async function buscarBanhos() {
   try {
         state.tutor_id = '',
         state.pet_id = '',
         state.date = '',
         state.status = '',
         state.pets_tutor = [],
         loading.value = true;
      const { response } = await services.banhos.getAll(token)
      state.banhos = response.data;
   } catch (error) {
      console.log(error)
   } finally {
      loading.value = false;
   }

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

async function buscarPetsTutor(tutor_id) {
   const params = {};
   params.tutor_id = tutor_id;

   const { response } = await services.pets.getPetsCustom(params, token);
   state.pets_tutor = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token)
   state.tutores = response.data;
}

async function buscarServicos() {
   const { response } = await services.servicos.getServicoByTipo('ESTETICO', token);
   state.servicos = response.data;
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

async function filtrarFichas() {
   loading.value = true;
   try {
      // Construir os parâmetros dinamicamente com base nos valores selecionados
      const params = {};
      //verfica se o valor existe se sim add ele como param
      if (state.pet_id) params.pet_id = state.pet_id;
      if (state.status) params.status = state.status;
      if (state.tutor_id) params.tutor_id = state.tutor_id;
      if (state.date) params.data = state.date;
      // Chamar a função de busca passando os parâmetros
      const { response } = await services.banhos.getBanhosCustom(token, params);
      state.banhos = response.data;
   } catch (error) {
      console.log(error);
      loading.value = false;
   } finally {
      loading.value = false;
   }
}

const tableHeaders = ['pet', 'tutor', 'serviço', 'data', 'horario', 'status'];
const tableBody = computed(() => {
   return state.banhos.map(banho => {
      const pet = state.pets.find(p => p.id === banho.pet_id);
      const nomePet = pet ? pet.nome : 'Desconhecido';

      const tuto = state.tutores.find(t => t.id === banho.tutor_id);
      const tutorNome = tuto ? tuto.nome : 'Desconhecido';

      const servico = state.servicos.find(s => s.id === banho.servico_id);
      const servicoNome = servico ? servico.nome : 'Desconhecido';

      return {
         id: banho.id,
         pet: nomePet,
         tutor: tutorNome,
         serviço: servicoNome,
         data: banho.data,
         horario: banho.horario,
         status: banho.status,
      };
   });
});
</script>
