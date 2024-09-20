<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class=" text-2xl   font-bold  text-preto2">Fichas</h2>
      <BotaoCreate :link="'/fichas/cadastrar-ficha'" :titulo="'Cadastrar Ficha'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableData"  :numAcoes="[1, 2]"/>
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
 