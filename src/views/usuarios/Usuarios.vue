<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Usuários</h2>
      <BotaoCreate :link="'/usuarios/cadastrar-usuario'" :titulo="'Cadastrar Usuário'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableBody" :numero="2" />
</template>

<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import DataTable from '@/components/TableDefault.vue';
import services from '@/services';
import { onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();

onMounted(() => {
   
   if (user_tipo === 2 || user_tipo === 3 || user_tipo === 4) {
      router.push("/"); 
   } else {
      buscarUsuarios();
   }
});

const state = reactive({
   usuarios: [],
});



async function buscarUsuarios() {
   const { response } = await services.usuarios.getAll(token);
   state.usuarios = response.data;
}
const tableHeaders = ['Nome', 'whatsapp', 'Email', 'Status'];
const tableBody = computed(() => {
   return state.usuarios.map(user => {
      return {
         Nome: user.nome,
         whatsapp: user.whatsapp,
         Email: user.email,
         Status: user.status
      };
   });
});
</script>
