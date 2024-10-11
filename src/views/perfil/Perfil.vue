<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Perfil do Usuário</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />

      <div class="flex items-center mb-4">
         <img :src="state.imagem" alt="Imagem do Usuário" class="w-20 h-20 rounded-full object-cover mr-4" />
         <div>
            <h2 class="text-xl font-bold">{{ state.nome }}</h2>
            <p class="text-gray-600">{{ tipoUsuario }}</p>
            <p class="text-gray-600">{{ state.whatsapp }}</p>
            <p class="text-gray-600">{{ state.status }}</p>
         </div>
      </div>

      <div>
         <label for="notas_adicionais" class="block font-bold">Notas Adicionais</label>
         <p>{{ state.notas_adicionais }}</p>
      </div>
   </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useStorage } from 'vue3-storage';
import services from '@/services';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_id = storage.getStorageSync("user_id");
const user_tipo = storage.getStorageSync("tipo_usuario");

const state = reactive({
   whatsapp: '',
   status: '',
   notas_adicionais: '',
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
      const { response } = await services.usuarios.getById(id, token);
      state.nome = response.nome;
      state.whatsapp = formatarWhatsApp(response.whatsapp);
      state.status = response.status;
      state.imagem = response.imagem;
      state.notas_adicionais = response.notas_adicionais;
   } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do usuário.";
   } finally {
      state.loader = false;
   }
}

</script>

<style scoped>
textarea {
   border: 1px solid #1a1b1c;
   border-radius: 4px;
   resize: none;
}
</style>
