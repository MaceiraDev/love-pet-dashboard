<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class=" text-2xl   font-bold  text-preto2">Pets</h2>
      <BotaoCreate :link="'/pets/cadastrar-pet'" :titulo="'Cadastrar Pet'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableData" :numAcoes="[1, 2]"/>
</template>
<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import DataTable from '@/components/TableDefault.vue';

const tableHeaders = ['Nome', 'Espécie', 'Sexo', 'Idade', 'Status'];
const tableData = [
   { Nome: 'Batman', Especie: 'Gato', Sexo: 'Macho', Idade: 6, Status: 'São Paulo' },
   { Nome: 'Mel', Especie: 'Cachorro', Sexo: 'Fêmea',Idade: 2, Status: 'Rio de Janeiro' },
   { Nome: 'Simba', Especie: 'Gato', Sexo: 'Macho', Idade: 1, Status: 'Belo Horizonte' }
];

</script>