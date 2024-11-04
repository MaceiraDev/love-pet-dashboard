<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class=" text-2xl font-bold  text-preto2">Cadastrar Ficha</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <Loader v-if="state.loader" />
      <ModalErro v-if="state.modal" :mensagem="state.MensagemErro" />
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
         <div>
            <label>Veterinário Responsável</label>
            <select v-model="state.veterinario_id">
               <option v-for="vet in state.veterinarios" :key="vet.id" :value="vet.id">{{ vet.nome }}</option>
            </select>
         </div>
         <div>
            <label>Animal</label>
            <select v-model="state.pet_id">
               <option v-for="pet in state.pets" :key="pet.id" :value="pet.id">{{ pet.nome }}</option>
            </select>
         </div>
         <div>
            <label>Tutor</label>
            <select v-model="state.tutor_id">
               <option v-for="tutor in state.tutores" :key="tutor.id" :value="tutor.id">{{ tutor.nome }}</option>
            </select>
         </div>
         <div>
            <label>Data</label>
            <input type="text" placeholder="Digite uma data:" v-model="state.data" v-mask-date.br required />
         </div>
         <div>
            <label>Horário</label>
            <input type="text" placeholder="Digite o horário:" v-model="state.horario" v-mask="'##:##'" maxlength="5"/> 
         </div>
         <div>
            <label>Status</label>
            <select v-model="state.status">
               <option value="PENDENTE">Pendente</option>
               <option value="ANDAMENTO">Em Andamento</option>
               <option value="CONCLUIDO">Concluído</option>
               <option value="CANCELADO">Cancelado</option>
            </select>
         </div>
         <div>
            <label>Serviço</label>
            <select v-model="state.servico_id">
               <option v-for="servico in state.servicos" :key="servico.id" :value="servico.id">{{ servico.nome }}</option>
            </select>
         </div>
         <div>
            <label>Situação do Animal</label>
            <select v-model="state.situacao_id">
               <option v-for="situacao in state.situacoes" :key="situacao.id" :value="situacao.id">{{ situacao.nome }}</option>
            </select>
         </div>
         <div>
            <label>Comportamento do Animal</label>
            <input type="text" placeholder="Descreva o comportamento:" v-model="state.comportamento_animal" />
         </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-4">
         <div>
            <label>Motivo da Consulta</label>
            <textarea placeholder="Digite o motivo da consulta" rows="4" v-model="state.motivo"></textarea>
         </div>
         <div>
            <label>Sintomas Apresentados</label>
            <textarea placeholder="Descreva os sintomas apresentados" rows="4" v-model="state.sintomas"></textarea>
         </div>
         <div>
            <label>Diagnóstico Preliminar</label>
            <textarea placeholder="Descreva o diagnóstico preliminar" rows="4" v-model="state.diagnostico_pre"></textarea>
         </div>
         <div>
            <label>Diagnóstico Final</label>
            <textarea placeholder="Descreva o diagnóstico final" rows="4" v-model="state.diagnostico_final"></textarea>
         </div>
         <div>
            <label>Exames Realizados</label>
            <textarea placeholder="Digite os exames realizados" rows="4" v-model="state.exames_realizados"></textarea>
         </div>
         <div>
            <label>Resultado dos Exames</label>
            <textarea placeholder="Descreva o resultado dos exames" rows="4" v-model="state.resultado_exames"></textarea>
         </div>
         <div>
            <label>Prescrição de Medicamentos</label>
            <textarea placeholder="Digite a prescrição de medicamentos" rows="4" v-model="state.prescricao"></textarea>
         </div>
         <div>
            <label>Próximos Passos</label>
            <textarea placeholder="Descreva os próximos passos" rows="4" v-model="state.proximos_passos"></textarea>
         </div>
         <div>
            <label>Instruções para o Tutor</label>
            <textarea placeholder="Digite as instruções para o tutor" rows="4" v-model="state.instrucoes"></textarea>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais" rows="4" v-model="state.notas_adicionais"></textarea>
         </div>
      </div>
      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/fichas'" :titulo="'Cancelar'" />
         <BotaoSave :titulo="'Salvar'" @click="salvarFicha" />
      </div>
   </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import services from '@/services';
import { useStorage } from 'vue3-storage';
import { useRouter } from 'vue-router';

const storage = useStorage();
const token = storage.getStorageSync("token");
const router = useRouter();
const state = reactive({
   veterinario_id: '',
   pet_id: '',
   tutor_id: '',
   data: '',
   horario: '',
   status: '',
   servico_id: '',
   situacao_id: '',
   comportamento_animal: '',
   motivo: '',
   sintomas: '',
   diagnostico_pre: '',
   diagnostico_final: '',
   exames_realizados: '',
   resultado_exames: '',
   prescricao: '',
   proximos_passos: '',
   instrucoes: '',
   notas_adicionais: '',
   veterinarios: [],
   pets: [],
   tutores: [],
   servicos: [],
   situacoes: [],
   loader: false,
   modal: false,
   MensagemErro: "",
});

onMounted(() => {
   buscarVeterinarios();
   buscarPets();
   buscarTutores();
   buscarServicos();
   buscarSituacoes();
});

async function buscarVeterinarios() {
   const { response } = await services.usuarios.getVeterinarios(token);
   state.veterinarios = response.data;
}

async function buscarPets() {
   const { response } = await services.pets.getAll(token);
   state.pets = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token);
   state.tutores = response.data;
}

async function buscarServicos() {
   const { response } = await services.servicos.getAll(token);
   state.servicos = response.data;
}

async function buscarSituacoes() {
   const { response } = await services.situacao_pet.getAll(token);
   state.situacoes = response.data;
}

async function salvarFicha() {
   state.loader = true;

   let formData = new FormData();
   formData.append("veterinario_id", state.veterinario_id);
   formData.append("pet_id", state.pet_id);
   formData.append("tutor_id", state.tutor_id);
   formData.append("data", state.data);
   formData.append("horario", state.horario);
   formData.append("status", state.status);
   formData.append("servico_id", state.servico_id);
   formData.append("situacao_id", state.situacao_id);
   formData.append("comportamento_animal", state.comportamento_animal);
   formData.append("motivo", state.motivo);
   formData.append("sintomas", state.sintomas);
   formData.append("diagnostico_pre", state.diagnostico_pre);
   formData.append("diagnostico_final", state.diagnostico_final);
   formData.append("exames_realizados", state.exames_realizados);
   formData.append("resultado_exames", state.resultado_exames);
   formData.append("prescricao", state.prescricao);
   formData.append("proximos_passos", state.proximos_passos);
   formData.append("instrucoes", state.instrucoes);
   formData.append("notas_adicionais", state.notas_adicionais);
   formData.append("_method", "POST");

   try {
      const response = await services.fichas.save({ formData, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/fichas');
      }
   } catch (error) {
      console.error("Erro no cadastro de ficha:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível concluir o cadastro. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped>
</style>
