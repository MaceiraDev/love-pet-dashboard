<template>
   <div class="flex justify-between items-center mb-2">
      <h2 class="text-2xl font-bold text-preto2">Serviços</h2>
      <BotaoCreate :link="'/servicos/cadastrar-servico'" :titulo="'Cadastrar Serviço'" />
   </div>
   <DataTable :headers="tableHeaders" :data="tableData" :numAcoes="[1, 2]"/>
</template>

<script setup>
import BotaoCreate from '@/components/BotaoCreate.vue';
import DataTable from '@/components/TableDefault.vue';

const tableHeaders = ['Serviço', 'Valor'];
const tableData = [
   { Servico: 'Banho', Valor: 'R$ 50,00' },
   { Servico: 'Tosa', Valor: 'R$ 70,00' },
   { Servico: 'Consulta', Valor: 'R$ 100,00' }
];
</script>
