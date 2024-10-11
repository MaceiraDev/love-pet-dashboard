<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Alterar Situação</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="upSit">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" placeholder="Digite o nome do serviço:" required v-model="state.nome" />
            </div>
         </div>
         <div>
            <label>Descrição</label>
            <textarea placeholder="Digite a descrição:" rows="4" required v-model="state.descricao"></textarea>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/situacoes-pet'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import Loader from '@/components/Loader.vue';
import ModalErro from '@/components/ModalErro.vue';
import { useStorage } from 'vue3-storage';
import { useRoute, useRouter } from 'vue-router';
import services from '@/services';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();
const route = useRoute();

const state = reactive({
   nome: '',
   descricao: '',
   loader: false,
   modal: false,
   MensagemErro: "",
});

onMounted(() => {
   const servicoId = route.params.id;
   if (servicoId) {
      buscarServico(servicoId);
   }
});

async function buscarServico(id) {
   try {
      const { response } = await services.servicos.getById(id, token);
      state.id = response.id;
      state.nome = response.nome;
      state.tipo_servico = response.tipo_servico;
      state.valor = response.valor;
      state.notas_adicionais = response.notas_adicionais;
   } catch (error) {
      console.error('Erro ao buscar serviço:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do serviço.";
   } finally {
      state.loader = false;
   }
}

async function upSit() {

   if (user_tipo != 0 && user_tipo != 1 && user_tipo != 2) {
      console.log(user_tipo)
      state.MensagemErro = "Você não tem permissão para editar esta situação.";
      state.loader = false;
      state.modal = true;
      return;
   }

   let dados = {
      id: state.id,
      nome: state.nome,
      descricao: state.descricao,
   }

   try {
      const response = await services.servicos.update({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/situacoes-pet');
      }
   } catch (error) {
      console.error("Erro ao atualizar situação:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível concluir. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped></style>
