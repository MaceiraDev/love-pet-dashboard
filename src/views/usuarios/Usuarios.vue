<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class=" text-2xl   font-bold  text-preto2">Usuários</h2>
      <BotaoCreate :link="'/usuarios/cadastrar-usuario'" :titulo="'Cadastrar Usuário'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableData"  :numero="3"/>
</template>
<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import DataTable from '@/components/TableDefault.vue';

const tableHeaders = ['Nome', 'Idade', 'Cidade'];
const tableData = [
   { Nome: 'João', Idade: 28, Cidade: 'São Paulo' },
   { Nome: 'Maria', Idade: 22, Cidade: 'Rio de Janeiro' },
   { Nome: 'Pedro', Idade: 35, Cidade: 'Belo Horizonte' }
];

</script>