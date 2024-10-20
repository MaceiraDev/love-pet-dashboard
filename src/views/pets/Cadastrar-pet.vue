<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Pet</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div>
            <label>Tutor</label>
            <select required>
               <option selected>Selecione</option>
               <option v-for="tutor in state.tutores" :value="tutor.id">{{ tutor.nome }}</option>
            </select>
         </div>
         <div>
            <label>Nome</label>
            <input type="text" required placeholder="Digite um nome:">
         </div>
         <div>
            <label>Espécie</label>
            <select required>
               <option selected>Selecione</option>
               <option v-for="especie in state.especies" :value="especie.id">{{ especie.nome }}</option>
            </select>
         </div>
         <div>
            <label>Raça</label>
            <select required>
               <option selected>Selecione</option>
               <option value="MACHO">Macho</option>
               <option value="FEMEA">Fêmea</option>
            </select>
         </div>
         <div>
            <label>Sexo</label>
            <select required>
               <option selected>Selecione</option>
               <option value="MACHO">Macho</option>
               <option value="FEMEA">Fêmea</option>
            </select>
         </div>
         <div>
            <label>Data de Nascimento</label>
            <input type="text" placeholder="Digite uma data:" v-mask-date.br required>
         </div>
         <div>
            <label>Situação</label>
            <select required>
               <option selected>Selecione</option>
               <option v-for="situacao in state.situacoes" :value="situacao.id">{{ situacao.nome }}</option>
            </select>
         </div>
         <div>
            <label>Peso (kg)</label>
            <input type="text" placeholder="Digite o peso:">
         </div>
         <div>
            <label>Comprimento (cm)</label>
            <input type="text" placeholder="Digite o comprimento:">
         </div>
         <div>
            <label>Largura (cm)</label>
            <input type="text" placeholder="Digite a largura:">
         </div>
         <div>
            <label>Cor</label>
            <input required type="text" placeholder="Digite a cor:">
         </div>
         <div>
            <label>Temperamento</label>
            <input required type="text" placeholder="Descreva o temperamento do pet:">
         </div>
         <div>
            <label>Alimentação</label>
            <input type="text" placeholder="Digite o tipo de alimentação do pet:">
         </div>
         <div>
            <label>Deficiência</label>
            <select required>
               <option selected>Selecione</option>
               <option value="SIM">Sim</option>
               <option value="NÃO">Não</option>
            </select>
         </div>
         <div>
            <label>Microchip</label>
            <select required>
               <option selected>Selecione</option>
               <option value="SIM">Sim</option>
               <option value="NÃO">Não</option>
            </select>
         </div>
         <div>
            <label>Tratamento</label>
            <input type="text" placeholder="Digite o tratamento do pet:">
         </div>
         <div v-if="!state.imagem.imagem">
            <label class="form-label">Imagem de Perfil</label>
            <div class="flex items-center space-x-4">
               <label class="upload-button">
                  <i class="bi bi-camera upload-icon"></i>
                  <span>Selecionar Imagem</span>
                  <input type="file" @change="adicionarImagem" class="hidden">
               </label>
            </div>
         </div>
         <div v-if="state.imagem.imagem" class="div_img">
            <img :src="state.imagem.imagem" alt="Imagem do Usuário"
               class="w-28 h-28 object-cover border-2 border-azul4 rounded-full" />
            <button @click="removerImagem"
               class="bg-vermelho w-6 h-6 rounded-full text-branco hover:bg-vermelho2 duration-300"
               title="Remover Imagem">
               <i class="bi bi-x"></i>
            </button>
         </div>
      </div>
      <div>
         <label>Notas Adicionais</label>
         <textarea placeholder="Digite aqui informações adicionais sobre o pet" rows="4"></textarea>
      </div>
      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/pets'" :titulo="'Cancelar'" />
         <BotaoSave :link="'/pets/cadastrar-pet'" :titulo="'Salvar'" />
      </div>
   </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import services from '@/services';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");

const state = reactive({
   especies: [],
   situacoes: [],
   tutores: [],
   imagem: {},
});

onMounted(() => {
   buscarEspecies();
   buscarSituacao();
   buscarTutores();
});

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token)
   state.especies = response.data;
}
async function buscarSituacao() {
   const { response } = await services.situacao_pet.getAll(token)
   state.situacoes = response.data;
}
async function buscarTutores() {
   const { response } = await services.tutores.getAll(token)
   state.tutores = response.data;
}
async function adicionarImagem(event) {
   const img = event.target.files[0];
   const objImagem = {};
   objImagem.file = img;
   objImagem.imagem = URL.createObjectURL(img);
   state.imagem = objImagem;
}

async function removerImagem() {
   state.imagem = {};
   document.querySelector('input[type="file"]').value = null;
}
</script>

<style scoped>
.upload-button {
   display: flex;
   align-items: center;
   width: 100%;
   padding: 10px;
   background-color: #066699;
   color: white;
   border-radius: 6px;
   border: 1px solid #ccc;
   cursor: pointer;
   font-size: 14px;
   font-weight: 500;
   text-align: center;
   transition: 0.3s;
   margin-bottom: 10px;
}

.upload-button:hover {
   background-color: #055a85;
}

.upload-icon {
   margin-right: 8px;
}

.hidden {
   display: none;
}

.div_img {
   display: flex;
}
</style>
