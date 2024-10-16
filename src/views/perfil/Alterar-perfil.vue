<template>
   <form @submit.prevent="upUsuario"
      class="bg-background border-solid border-2 border-preto2 rounded-lg shadow-lg shadow-preto2-500/50 p-6 max-w-3xl w-full mx-auto h-auto">
      <h1 class="text-3xl font-bold text-preto2 mb-4 text-center">Editar Perfil do Usuário</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
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
         <button type="button" @click="removerImagem"
            class="bg-vermelho w-6 h-6 rounded-full text-branco hover:bg-vermelho2 duration-300" title="Remover Imagem">
            <i class="bi bi-x"></i>
         </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
         <div>
            <label class="block font-bold text-lg">Nome</label>
            <input type="text" v-model="state.nome" class="border rounded p-2 w-full" />
         </div>
         <div>
            <label class="block font-bold text-lg">Sobrenome</label>
            <input type="text" v-model="state.sobrenome" class="border rounded p-2 w-full" />
         </div>
         <div>
            <label class="block font-bold text-lg">Telefone</label>
            <input type="text" v-model="state.telefone" class="border rounded p-2 w-full" v-mask-phone.br />
         </div>
         <div>
            <label class="block font-bold text-lg">WhatsApp</label>
            <input type="text" v-model="state.whatsApp" class="border rounded p-2 w-full" v-mask-phone.br />
         </div>
         <div>
            <label class="block font-bold text-lg">E-mail</label>
            <input type="email" v-model="state.email" class="border rounded p-2 w-full" />
         </div>
         <div>
            <label class="block font-bold text-lg">CPF</label>
            <input type="text" placeholder="Digite um CPF:" v-mask-cpf required v-model="state.cpf"
               class="border rounded p-2 w-full" />
         </div>
         <div>
            <label class="block font-bold text-lg">Gênero</label>
            <select v-model="state.sexo" class="border rounded p-2 w-full">
               <option value="" disabled>Selecione</option>
               <option value="MASCULINO">Masculino</option>
               <option value="FEMININO">Feminino</option>
               <option value="OUTROS">Outros</option>
            </select>
         </div>
         <div>
            <label class="block font-bold text-lg">Data de Nascimento</label>
            <input type="text" v-model="state.data_nascimento" readonly class="border rounded p-2 w-full bg-gray-200" />
         </div>
         <div>
            <label class="block font-bold text-lg">Número de Pets</label>
            <input type="text" v-model="state.n_pets" readonly class="border rounded p-2 w-full" />
         </div>
         <div>
            <label class="block font-bold text-lg">Tipo de Usuário</label>
            <input type="text" v-model="tipoUsuarioString" readonly class="border rounded p-2 w-full bg-gray-200" />
         </div>
      </div>
      <div>
         <label class="block font-bold text-lg">Notas Adicionais</label>
         <textarea v-model="state.notas_adicionais" rows="4" class="border rounded p-2 w-full"></textarea>
      </div>
      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/perfil'" :titulo="'Cancelar'" />
         <BotaoSave type="submit" :titulo="'Salvar'" />
      </div>
   </form>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, computed } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import services from '@/services';
import Loader from '@/components/Loader.vue';
import ModalErro from '@/components/ModalErro.vue';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_id = storage.getStorageSync("user_id");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();
const route = useRoute();

const state = reactive({
   imagem: {},
   nome: '',
   sobrenome: '',
   data_nascimento: '',
   sexo: '',
   cpf: '',
   whatsApp: '',
   telefone: '',
   email: '',
   status: '',
   n_pets: '',
   notas_adicionais: '',
   loader: false,
   modal: false,
   MensagemErro: "",
});

onMounted(() => {
   if (user_id) {
      buscarUsuarioId(user_id);
   }
});

const tipoUsuarioString = computed(() => {
   switch (user_tipo) {
      case "0":
         return 'Administrador';
      case "1":
         return 'Veterinário';
      case "2":
         return 'Técnico Veterinário';
      case "3":
         return 'Recepcionista';
      case "4":
         return 'Visitante';
      default:
         return 'Tipo Desconhecido';
   }
});

async function buscarUsuarioId(id) {
   try {
      const { response } = await services.perfil.getPerfil(id, token);
      state.id = response.id;
      state.nome = response.nome;
      state.sobrenome = response.sobrenome;
      state.data_nascimento = response.data_nascimento;
      state.sexo = response.sexo;
      state.cpf = response.cpf;
      state.telefone = response.telefone;
      state.whatsApp = response.whatsapp;
      state.email = response.email;
      state.status = response.status;
      if (response.n_pets == null) {
         state.n_pets = '';
      } else {
         state.n_pets = response.n_pets;
      }
      state.notas_adicionais = response.notas_adicionais;
      if (response.imagem) {
         state.imagem.imagem = response.imagem;
      }
   } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do usuário.";
   } finally {
      state.loader = false;
   }
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

async function upUsuario() {
   state.loader = true;

   let telefoneFormatado = "";
   if (state.telefone) {
      telefoneFormatado = formatarTelefone(state.telefone);
   }
   let cpfFormatado = formatarCPF(state.cpf);
   let whatsappFormatado = formatarWhatsApp(state.whatsApp);

   let formData = new FormData();
   formData.append("tipo_usuario", user_tipo);
   formData.append("nome", state.nome);
   formData.append("sobrenome", state.sobrenome);
   formData.append("data_nascimento", state.data_nascimento);
   formData.append("sexo", state.sexo);
   formData.append("cpf", cpfFormatado);
   formData.append("telefone", telefoneFormatado);
   formData.append("whatsapp", whatsappFormatado);
   formData.append("email", state.email);
   formData.append("status", state.status);
   formData.append("n_pets", state.n_pets);
   formData.append("notas_adicionais", state.notas_adicionais);
   formData.append("_method", "PUT");

   if (state.imagem?.file) {
      formData.append("imagem", state.imagem.file);
   } else if (typeof state.imagem.imagem === "string") {
      formData.append("imagem", state.imagem.imagem);
   } else if (!state.imagem.imagem) {
      formData.append("imagem", null);
   }
   try {
      const response = await services.usuarios.update({ id: state.id, formData, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/perfil');
      }
   } catch (error) {
      console.error("Erro na alteração do usuário:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível editar o cadastro. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
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

.div_img {
   display: flex;
   justify-content: center;   
}
</style>
