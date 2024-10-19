<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Raça</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="salvarRaca">
         <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" v-model="state.nome" required placeholder="Digite o nome da raça" />
            </div>
            <div>
               <label>Espécie</label>
               <select v-model="state.especie_id" required>
                  <option disabled value="">Selecione uma espécie</option>
                  <option v-for="especie in state.especies" :key="especie.id" :value="especie.id">
                     {{ especie.nome }}
                  </option>
               </select>
            </div>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/racas'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import { reactive, onMounted } from 'vue';
import services from '@/services';
import { useRouter } from 'vue-router';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const router = useRouter();

const state = reactive({
   nome: '',
   especie_id: '', 
   especies: [],
   loader: false,
   modal: false,
   MensagemErro: '',
});

onMounted(() => {
   buscarEspecies();
});

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token)
   state.especies = response.data;
}

async function salvarRaca() {
   state.loader = true;
   let dados = {
      nome: state.nome,
      especie_id: state.especie_id,
   };

   try {
      const response = await services.racas.save({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/racas');
      }
   } catch (error) {
      console.error("Erro no cadastro de raças:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 
            ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` 
            : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível concluir o cadastro. Tente novamente mais tarde.";
         state.modal = true;
      }
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped></style>
