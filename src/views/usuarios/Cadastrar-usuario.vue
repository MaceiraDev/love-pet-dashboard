<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class=" text-2xl font-bold  text-preto2">Cadastrar Usuário</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="novoUsuario">
         <div class="div_radios">
            <div class="radio-button-container">
               <div class="radio-button">
                  <input type="radio" class="radio-button__input" id="radio1" name="radio-group" value="1"
                     v-model="state.tipo_usuario">
                  <label class="radio-button__label" for="radio1">
                     <span class="radio-button__custom"></span>
                     Veterinário
                  </label>
               </div>
               <div class="radio-button">
                  <input type="radio" class="radio-button__input" id="radio2" name="radio-group" value="2"
                     v-model="state.tipo_usuario">
                  <label class="radio-button__label" for="radio2">
                     <span class="radio-button__custom"></span>
                     Técnico Vet
                  </label>
               </div>
               <div class="radio-button">
                  <input type="radio" class="radio-button__input" id="radio3" name="radio-group" value="3"
                     v-model="state.tipo_usuario">
                  <label class="radio-button__label" for="radio3">
                     <span class="radio-button__custom"></span>
                     Recepcionista
                  </label>
               </div>
               <div class="radio-button">
                  <input type="radio" class="radio-button__input" id="radio4" name="radio-group" value="4"
                     v-model="state.tipo_usuario">
                  <label class="radio-button__label" for="radio4">
                     <span class="radio-button__custom"></span>
                     Visitante
                  </label>
               </div>
            </div>
         </div>
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" placeholder="Digite um nome:" required v-model="state.nome">
            </div>
            <div>
               <label>Sobrenome</label>
               <input type="text" placeholder="Digite um sobrenome:" required v-model="state.sobrenome">
            </div>
            <div>
               <label>Data de Nascimento</label>
               <input type="text" placeholder="Digite uma data:" v-mask="'##/##/####'" required>
            </div>
            <div>
               <label>CPF</label>
               <input type="text" placeholder="Digite um CPF:" v-mask="'###.###.###-##'" required v-model="state.cpf">
            </div>
            <div>
               <label>Gênero</label>
               <select v-model="state.sexo">
                  <option value="" selected>Selecione</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="OUTROS">Outros</option>
               </select>
            </div>
            <div>
               <label>Telefone</label>
               <input type="text" placeholder="Digite um telefone:" v-mask="['(##) ####-####', '(##) #####-####']"
                  v-model="state.telefone">
            </div>
            <div>
               <label>WhatsApp</label>
               <input type="text" placeholder="Digite um número WhatsApp:"
                  v-mask="['(##) ####-####', '(##) #####-####']" required v-model="state.whatsApp">
            </div>
            <div>
               <label>Email</label>
               <input type="email" placeholder="Digite um email:" required v-model="state.email">
            </div>
            <div>
               <label>Senha</label>
               <input type="password" placeholder="Digite uma senha:" required v-model="state.senha">
            </div>
            <div>
               <label>Status</label>
               <select v-model="state.status">
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
               </select>
            </div>
            <div>
               <label>N° de pets sobre seus cuidados</label>
               <input type="text" disabled v-model="state.n_pets" />
            </div>
            <div>
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
            <textarea
               placeholder="Digite aqui informações adicionais, as informações deste campo serão mostradas na tela de perfil do usuário."
               rows="4" v-model="state.notas_adicionais">
            </textarea>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/usuarios'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
</template>
<script setup>
import { reactive } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import services from '@/services';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");

const state = reactive({
   imagem: {},
   tipo_usuario: null,
   nome: '',
   sobrenome: '',
   data_nascimento: '',
   sexo: '',
   cpf: '',
   telefone: '',
   whatsApp: '',
   email: '',
   status: 'ATIVO',
   n_pets: '',
   senha: '',
   notas_adicionais: '',
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

function formatarCPF(cpf) {
   return cpf.replace(/[.\-()]/g, "");
}

function formatarTelefone(telefone) {
   return telefone.replace(/[.\-() ]/g, "");
}

function formatarWhatsApp(whatsapp) {
   return whatsapp.replace(/[.\-() ]/g, "");
}

async function novoUsuario() {
   try {

      let cpfFormatado = formatarCPF(state.cpf);
      let telefoneFormatado = formatarTelefone(state.telefone);
      let whatsappFormatado = formatarWhatsApp(state.whatsApp);

      let formData = new FormData();
      formData.append("tipo_usuario", state.tipo_usuario);
      formData.append("nome", state.nome);
      formData.append("sobrenome", state.sobrenome);
      formData.append("sexo", state.sexo);
      formData.append("cpf", cpfFormatado); // CPF formatado
      formData.append("telefone", telefoneFormatado); // Telefone formatado
      formData.append("whatsapp", whatsappFormatado); // WhatsApp formatado
      formData.append("email", state.email);
      formData.append("status", state.status);
      formData.append("n_pets", state.n_pets);
      formData.append("senha", state.senha);
      formData.append("notas_adicionais", state.notas_adicionais);
      formData.append("_method", "POST");
      if (state.imagem.file != null) {
         formData.append("imagem", state.imagem.file);
      }
      await services.usuarios.save({ formData, token });
   } catch (error) {
      console.log(error);
   }
}

</script>
<style scoped>
.radio-button-container {
   display: flex;
   align-items: center;
   gap: 24px;
}

.radio-button {
   display: inline-block;
   position: relative;
   cursor: pointer;
}

.radio-button__input {
   position: absolute;
   opacity: 0;
   width: 0;
   height: 0;
}

.radio-button__label {
   display: inline-block;
   padding-left: 30px;
   margin-bottom: 10px;
   position: relative;
   font-size: 15px;
   color: #1a1b1c;
   font-weight: 600;
   cursor: pointer;
   text-transform: uppercase;
   transition: all 0.3s ease;
}

.radio-button__custom {
   position: absolute;
   top: 0;
   left: 0;
   width: 20px;
   height: 20px;
   border-radius: 50%;
   border: 2px solid #555;
   transition: all 0.3s ease;
}

.radio-button__input:checked+.radio-button__label .radio-button__custom {
   background-color: #066699;
   border-color: transparent;
   transform: scale(0.8);
   box-shadow: 0 0 20px #06669980;
}

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

.input-text:focus,
select:focus,
.upload-button:focus {
   border-color: #066699;
   outline: none;
}

.form-label {
   display: block;
   margin-bottom: 8px;
   font-size: 15px;
   color: #1a1b1c;
}

.div_img {
   display: flex;
}
</style>