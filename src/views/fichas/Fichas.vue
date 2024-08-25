<template>
   <div>
     <DataTable :headers="tableHeaders" :data="tableData" />
   </div>
 </template>
 
 <script setup>
 import DataTable from '@/components/TableDefault.vue';
 
 const tableHeaders = ['Nome', 'Idade', 'Cidade'];
 const tableData = [
   { Nome: 'João', Idade: 28, Cidade: 'São Paulo' },
   { Nome: 'Maria', Idade: 22, Cidade: 'Rio de Janeiro' },
   { Nome: 'Pedro', Idade: 35, Cidade: 'Belo Horizonte' }
 ];
 
 </script>
 