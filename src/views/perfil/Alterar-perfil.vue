<template>
   <form @submit.prevent="upUsuario" class="bg-background border-solid border-2 border-preto2 rounded-lg shadow-lg shadow-preto2-500/50 p-6 max-w-3xl w-full mx-auto h-auto">
      <h1 class="text-3xl font-bold text-preto2 mb-4 text-center">Editar Perfil do Usuário</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <div class="flex flex-col items-center mb-6">
         <!-- Resolver isso da imagem -->
         <img :src="state.imagem.imagem" @click="adicionarImagem" class="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover mb-4 border-2 border-azul4 cursor-pointer" v-if="state.imagem.imagem" />
         
         <NoPerfil class="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover mb-4 border-2 border-azul4 cursor-pointer" v-else @click="editarImagem"/>
         
         <input type="file" @change="adicionarImagem" ref="fileInput" class="hidden">
         <!-- Resolver isso da imagem -->
         <div class="text-center">
             <h2 class="text-2xl font-bold text-preto2">{{ state.nome }} {{ state.sobrenome }}</h2>
             <p class="text-preto2">{{ tipoUsuarioString }}</p>
             <p class="text-preto2">{{ state.whatsApp }}</p>
             <p class="text-preto2">{{ state.status }}</p>
         </div>
     </div>

      <!-- Grid para organizar os campos 2 por 2 -->
      <div class="grid grid-cols-2 gap-4 mb-4">
         <div>
            <label class="block font-bold text-lg">Nome</label>
            <input type="text" v-model="state.nome" class="border rounded p-2 w-full"/>
         </div>
         <div>
            <label class="block font-bold text-lg">Sobrenome</label>
            <input type="text" v-model="state.sobrenome" class="border rounded p-2 w-full"/>
         </div>
         <div>
            <label class="block font-bold text-lg">Telefone</label>
            <input type="text" v-model="state.telefone" class="border rounded p-2 w-full" v-mask-phone.br/>
         </div>
         <div>
            <label class="block font-bold text-lg">WhatsApp</label>
            <input type="text" v-model="state.whatsApp" class="border rounded p-2 w-full" v-mask-phone.br/>
         </div>
         <div>
            <label class="block font-bold text-lg">E-mail</label>
            <input type="email" v-model="state.email" class="border rounded p-2 w-full"/>
         </div>
         <div>
            <label class="block font-bold text-lg">CPF</label>
            <input type="text" placeholder="Digite um CPF:" v-mask-cpf required v-model="state.cpf" class="border rounded p-2 w-full"/>
         </div>
         <div>
            <label class="block font-bold text-lg">Gênero</label>
            <select v-model="state.sexo" class="border rounded p-2 w-full">
               <option value="" selected>Selecione</option>
               <option value="MASCULINO">Masculino</option>
               <option value="FEMININO">Feminino</option>
               <option value="OUTROS">Outros</option>
            </select>
         </div>
         <div>
            <label class="block font-bold text-lg">Data de Nascimento</label>
            <input type="text" v-model="state.data_nascimento" readonly class="border rounded p-2 w-full bg-gray-200"/>
         </div>
         <div>
            <label class="block font-bold text-lg">Número de Pets</label>
            <input type="text" v-model="state.n_pets" readonly class="border rounded p-2 w-full"/>
         </div>
         <div>
            <label class="block font-bold text-lg">Status</label>
            <input type="text" v-model="state.status" readonly class="border rounded p-2 w-full bg-gray-200"/>
         </div>
         <div>
            <label class="block font-bold text-lg">Tipo de Usuário</label>
            <input type="text" v-model="tipoUsuarioString" readonly class="border rounded p-2 w-full bg-gray-200"/>
         </div>
      </div>
      <div>
         <label class="block font-bold text-lg">Notas Adicionais</label>
         <textarea v-model="state.notas_adicionais" class="border rounded p-2 w-full"></textarea>
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
import NoPerfil from '@/components/NoPerfil.vue';
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
      const { response } = await services.usuarios.getById(id, token);
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
    if (img) {
        const objImagem = {
            file: img,
            imagem: URL.createObjectURL(img), // Gerar a URL para exibir a imagem
        };
        state.imagem = objImagem;
    }
}

function editarImagem() {
    // Disparar o clique no campo de upload de arquivo
    const inputFile = this.$refs.fileInput;
    inputFile.click();
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
