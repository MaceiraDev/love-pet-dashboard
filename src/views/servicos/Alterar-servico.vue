<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Serviço</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="upServico">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" placeholder="Digite o nome do serviço" required v-model="state.nome" />
            </div>
            <div>
               <label>Tipo de Serviço</label>
               <select required v-model="state.tipo_servico">
                  <option value="CLINICO">Clínico</option>
                  <option value="ESTETICO">Estético</option>
               </select>
            </div>
            <div>
               <label>Valor</label>
               <input type="text" placeholder="Digite o valor" required v-model="state.valor" v-mask-decimal.br="2" />
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais" rows="4" v-model="state.notas_adicionais"></textarea>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/servicos'" :titulo="'Cancelar'" />
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
   tipo_servico: '',
   valor: '',
   notas_adicionais: '',
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

async function upServico() {

   if (user_tipo != 0 && user_tipo != 1) {
      console.log(user_tipo)
      state.MensagemErro = "Você não tem permissão para cadastrar novos serviços.";
      state.loader = false;
      state.modal = true;
      return;
   }

   const valorComPontosRemovidos = state.valor.replace(/\./g, '');
   const valorLimpo = parseFloat(valorComPontosRemovidos.replace(',', '.')) || 0;

   let dados = {
      id: state.id,
      nome: state.nome,
      tipo_servico: state.tipo_servico,
      valor: valorLimpo,
      notas_adicionais: state.notas_adicionais,
   }
   try {
      const response = await services.servicos.update({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/servicos');
      }
   } catch (error) {
      console.error("Erro ao atualizar de serviço:", error);
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
