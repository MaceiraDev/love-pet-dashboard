<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Usuários</h2>
      <BotaoCreate :link="'/usuarios/cadastrar-usuario'" :titulo="'Cadastrar Usuário'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numAcoes="[1, 2]" @deletar="openConfirm"
      :param_url_1="'usuarios'" :param_url_2="'usuario'" />
   <ModalConfirm :visible="state.visible" :texto="state.texto" @update:visible="state.visible = $event"
      @confirmar="deleteUser" />
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="loading" />
</template>

<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import Loader from '@/components/Loader.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';
import ModalErro from '@/components/ModalErro.vue';
import DataTable from '@/components/TableDefault.vue';
import services from '@/services';
import { onMounted, reactive, computed, ref } from 'vue';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const user_id = storage.getStorageSync("user_id")
const loading = ref(false);

onMounted(() => {
   buscarUsuarios();
});

const state = reactive({
   usuarios: [],
   visible: false,
   texto: '',
   user_id_delete: null,
});

const tiposUsuarios = {
   "0": 'Administrador',
   "1": 'Veterinário',
   "2": 'Técnico Veterinário',
   "3": 'Recepcionista',
   "4": 'Visitante',
};

async function buscarUsuarios() {
   const { response } = await services.usuarios.getAll(token);
   state.usuarios = response.data;
}

function openConfirm(user) {
   if (user_tipo != 0 && user_tipo != 1) {
      state.MensagemErro = "Você não tem permissão para cadastrar usuários.";
      state.loader = false;
      state.modal = true;
      return;
   }
   state.visible = true;
   state.texto = 'Você realmente deseja excluir o usuário ' + user.Nome + '?';
   state.user_id_delete = user.id;
}

async function deleteUser() {
   loading.value = true;
   try {
      if (user_id == state.user_id_delete) {
         state.MensagemErro = "Você não pode se deletar"
         loading.value = false;
         state.modal = true;
         return;
      }

      if (state.user_id_delete) {
         await services.usuarios.delete(state.user_id_delete, token);
         buscarUsuarios();
      } else {
         state.MensagemErro = "Erro ao deletar o usuário.";
      }
   } catch (e) {
      loading.value = false;
      state.MensagemErro = e.response.data.error;
      state.modal = true;
      console.log(e.response.data.error);
      return;
   } finally {
      loading.value = false;
   }
}

function formatarWhatsApp(whatsapp) {
   if (whatsapp.length === 11) {
      return `(${whatsapp.slice(0, 2)}) ${whatsapp[2]} ${whatsapp.slice(3, 7)}-${whatsapp.slice(7)}`;
   } else {
      console.error('Número de WhatsApp inválido:', whatsapp);
      return whatsapp;
   }
}

const tableHeaders = ['Nome', 'whatsapp', 'Email', 'tipo', 'Status'];
const tableBody = computed(() => {
   return state.usuarios.map(user => {
      return {
         id: user.id,
         Nome: user.nome,
         whatsapp: formatarWhatsApp(user.whatsapp),
         Email: user.email,
         tipo: tiposUsuarios[user.tipo_usuario] || 'Tipo Desconhecido',
         Status: user.status
      };
   });
});
</script>
