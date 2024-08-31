<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Pet</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
         <div>
            <label>Nome</label>
            <input type="text" placeholder="Digite o nome do pet">
         </div>
         <div>
            <label>Espécie</label>
            <input type="text" placeholder="Digite a espécie do pet">
         </div>
         <div>
            <label>Raça</label>
            <input type="text" placeholder="Digite a raça do pet">
         </div>
         <div>
            <label>Sexo</label>
            <select>
               <option selected>Selecione</option>
               <option value="MACHO">Macho</option>
               <option value="FÊMEA">Fêmea</option>
            </select>
         </div>
         <div>
            <label>Data de Nascimento</label>
            <input type="text" placeholder="Digite uma data:" v-mask="'##/##/####'">
         </div>
         <div>
            <label>Situação</label>
            <select>
               <option selected>Selecione</option>
               <option value="VIVO">Vivo</option>
               <option value="MORTO">Morto</option>
            </select>
         </div>
         <div>
            <label>Peso (kg)</label>
            <input type="text" placeholder="Digite o peso do pet">
         </div>
         <div>
            <label>Comprimento (cm)</label>
            <input type="text" placeholder="Digite o comprimento do pet">
         </div>
         <div>
            <label>Largura (cm)</label>
            <input type="text" placeholder="Digite a largura do pet">
         </div>
         <div>
            <label>Cor</label>
            <input type="text" placeholder="Digite a cor do pet">
         </div>
         <div>
            <label>Deficiência</label>
            <select>
               <option selected>Selecione</option>
               <option value="SIM">Sim</option>
               <option value="NÃO">Não</option>
            </select>
         </div>
         <div>
            <label>Microchip</label>
            <select>
               <option selected>Selecione</option>
               <option value="SIM">Sim</option>
               <option value="NÃO">Não</option>
            </select>
         </div>
         <div>
            <label>Temperamento</label>
            <input type="text" placeholder="Digite o temperamento do pet">
         </div>
         <div>
            <label>Alimentação</label>
            <input type="text" placeholder="Digite o tipo de alimentação do pet">
         </div>
         <div>
            <label>Tratamento</label>
            <input type="text" placeholder="Digite o tratamento do pet">
         </div>
         <div>
            <label>Tutor</label>
            <select>
               <option selected>Selecione</option>
               <option value="tutor1">tutor 1</option>
               <option value="tutor2">tutor 2</option>
            </select>
         </div>

         <div>
            <label class="form-label">Foto do Pet</label>
            <div class="flex items-center space-x-4">
               <label class="upload-button">
                  <i class="bi bi-camera upload-icon"></i>
                  <span>Selecionar Imagem</span>
                  <input type="file" @change="adicionarImagem" class="hidden">
               </label>
            </div>
         </div>

         <div v-if="state.imagem.imagem" class="relative">
            <img :src="state.imagem.imagem" alt="Imagem do Pet" class="w-20 h-20 object-cover border-2 border-azul2 rounded-md"/>
            <button @click="removerImagem" class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs transform translate-x-1 -translate-y-1 shadow-lg hover:bg-red-600">
               ✕
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
   import { reactive } from 'vue';
   import BotaoSave from '@/components/BotaoSave.vue';
   import BotaoCancel from '@/components/BotaoCancel.vue';

   const state = reactive({
   imagem: {},
   });

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
   transition: background-color 0.3s ease;
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

.upload-button {
   width: 100%;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 6px;
   font-size: 14px;
   transition: border-color 0.2s ease;
}

.input-text:focus, select:focus, .upload-button:focus {
   border-color: #066699;
   outline: none;
}

.form-label {
   display: block;
   margin-bottom: 8px;
   font-size: 15px;
   color: #1a1b1c;
}
</style>
