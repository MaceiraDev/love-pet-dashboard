<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Agendar Banho e Tosa</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="upBanho">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            <div>
               <label>Tutor</label>
               <select v-model="state.tutor_id" required @change="buscarPets(state.tutor_id)">
                  <option selected disabled value="">Selecione</option>
                  <option v-for="tutor in state.tutores" :key="tutor.id" :value="tutor.id">{{ tutor.nome }}
                     {{ tutor.sobrenome }}</option>
               </select>
            </div>
            <div>
               <label>Animal</label>
               <select v-model="state.pet_id" required>
                  <option selected disabled value="">Selecione</option>
                  <option v-for="pet in state.pets" :key="pet.id" :value="pet.id">{{ pet.nome }}</option>
               </select>
            </div>
            <div>
               <label>Data</label>
               <input type="text" placeholder="Digite uma data:" v-model="state.data" v-mask-date.br required />
            </div>
            <div>
               <label>Horário</label>
               <input type="text" placeholder="Digite o horário:" v-model="state.horario" v-mask="'##:##'" maxlength="5"
                  required />
            </div>
            <div>
               <label>Status</label>
               <select v-model="state.status" required>
                  <option selected disabled value="">Selecione</option>
                  <option value="PENDENTE">Pendente</option>
                  <option value="ANDAMENTO">Em Andamento</option>
                  <option value="CONCLUIDO">Concluído</option>
                  <option value="CANCELADO">Cancelado</option>
               </select>
            </div>
            <div>
               <label>Serviço</label>
               <select v-model="state.servico_id" required>
                  <option selected disabled value="">Selecione</option>
                  <option v-for="servico in state.servicos" :key="servico.id" :value="servico.id">{{ servico.nome }}
                  </option>
               </select>
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais:" rows="4" v-model="state.notas_adicionais"></textarea>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/banhos'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
   <Loader v-if="state.loader" />
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event"/>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import services from '@/services';
import { useStorage } from 'vue3-storage';
import { useRouter, useRoute } from 'vue-router';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();
const route = useRoute();

const state = reactive({
   id: '',
   pet_id: '',
   tutor_id: '',
   data: '',
   horario: '',
   status: 'PENDENTE',
   servico_id: '',
   notas_adicionais: '',
   servicos: [],
   loader: false,
   modal: false,
});
onMounted(() => {
   buscarTutores();
   buscarServicos();
   buscarBanho();
});

async function buscarBanho() {
   const id = route.params.id;
   state.loader = true;
   try {
      const { response } = await services.banhos.getById(id, token);
      if (response.horario) {
         state.horario = response.horario.slice(0, 5);
      }
      state.id = response.id;
      state.pet_id = response.pet_id;
      state.tutor_id = response.tutor_id;
      state.data = response.data;
      state.status = response.status;
      state.servico_id = response.servico_id;
      state.notas_adicionais = response.notas_adicionais;
      await buscarPets();
   } catch (error) {
      console.error('Erro ao buscar banho:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do banho"
   } finally {
      state.loader = false;
   }

}

async function buscarPets() {
   const params = {};
   params.tutor_id = state.tutor_id;

   const { response } = await services.pets.getPetsCustom(params, token);
   state.pets = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token);
   state.tutores = response.data;
}

async function buscarServicos() {
   const { response } = await services.servicos.getServicoByTipo('ESTETICO', token);
   state.servicos = response.data;
}

async function upBanho() {
   state.loader = true;
   if (user_tipo >= 4) {
      state.MensagemErro = "Você não tem permissão para cadastrar banhos.";
      state.loader = false;
      state.modal = true;
      return;
   }

   let dados = {
      id: state.id,
      pet_id: state.pet_id,
      tutor_id: state.tutor_id,
      data: state.data,
      horario: state.horario,
      status: state.status,
      servico_id: state.servico_id,
      notas_adicionais: state.notas_adicionais,
   }

   try {
      const response = await services.banhos.update({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/banhos');
      }
   } catch (error) {
      console.error("Erro ao alterar banho ou tosa:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível concluir a edição. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped></style>