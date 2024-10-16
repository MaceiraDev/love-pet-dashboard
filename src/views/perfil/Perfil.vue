<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded-lg shadow-lg shadow-preto2-500/50 p-6 max-w-3xl w-full mx-auto h-auto">
      <h1 class="text-3xl font-bold text-preto2 mb-4 text-center">Perfil do Usuário</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <div class="flex flex-col items-center mb-6">
         <img :src="state.imagem" class="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover mb-4 border-2 border-azul4" v-if="state.imagem" />
         <NoPerfil class="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover mb-4 border-2 border-azul4" v-else />
         <div class="text-center">
            <h2 class="text-2xl font-bold text-preto2">{{ state.nome }} {{ state.sobrenome }}</h2>
            <p class="text-preto2">{{ tipoUsuario }}</p>
            <p class="text-preto2">{{ state.whatsapp }}</p>
            <p class="text-preto2">{{ state.status }}</p>
         </div>
      </div>
      <div>
         <label class="block font-bold text-lg">Notas Adicionais</label>
         <p class="text-preto2">{{ state.notas_adicionais }}</p>
      </div>
      <div class="flex justify-end mt-2">
         <RouterLink :to="{ name: 'alterar-perfil' }">
            <button class="bg-limao2 text-preto2 font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-azul4 transition-all duration-300 flex items-center">
               <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4l4 4-8 8H8v-4l8-8z"></path>
               </svg>
               Editar
            </button>
         </RouterLink>
      </div>
   </div>
</template>

<script setup>
import NoPerfil from '@/components/NoPerfil.vue';
import { onMounted, reactive, computed } from 'vue';
import { useStorage } from 'vue3-storage';
import services from '@/services';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_id = storage.getStorageSync("user_id");
const user_tipo = storage.getStorageSync("tipo_usuario");

const state = reactive({
   nome: '',
   sobrenome: '',
   whatsapp: '',
   status: '',
   notas_adicionais: '',
   imagem: '',
   MensagemErro: "",
});

onMounted(() => {
   if (user_id) {
      buscarUsuarioId(user_id);
   }
});

const tipoUsuario = computed(() => {
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

function formatarWhatsApp(whatsapp) {
   if (whatsapp.length === 11) {
      return `(${whatsapp.slice(0, 2)}) ${whatsapp[2]} ${whatsapp.slice(3, 7)}-${whatsapp.slice(7)}`;
   } else {
      console.error('Número de WhatsApp inválido:', whatsapp);
      return whatsapp;
   }
}

async function buscarUsuarioId(id) {
   try {
      const { response } = await services.perfil.getPerfil(id, token);
      state.nome = response.nome;
      state.sobrenome = response.sobrenome;
      state.whatsapp = formatarWhatsApp(response.whatsapp);
      state.status = response.status;
      state.imagem = response.imagem;
      state.notas_adicionais = response.notas_adicionais;
   } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do usuário.";
   }
}
</script>
