<template>
   <div class="dashboard-container flex flex-col items-center space-y-8">
      <!-- Cards para Total Clínico e Estético -->
      <div class="flex flex-col items-center space-y-4 w-full">
         <h1 class="text-xl font-bold text-preto">Relatório de Totais Clínico e Estético do Último Mês</h1>
         <div class="flex space-x-4 justify-center w-full">
            <div class="bg-azul2 rounded-lg p-4 flex flex-col items-center card w-1/3">
               <h2 class="text-lg font-semibold text-branco">Total Clínico</h2>
               <p class="text-3xl font-bold text-limao">R${{ state.clinicoTotal }}</p>
            </div>
            <div class="bg-azul2 rounded-lg p-4 flex flex-col items-center card w-1/3">
               <h2 class="text-lg font-semibold text-branco">Total Estético</h2>
               <p class="text-3xl font-bold text-limao">R${{ state.esteticoTotal }}</p>
            </div>
         </div>
      </div>

      <!-- Layout Flex para Gráfico e Tabela -->
      <div class="flex space-x-4 w-full">
         <!-- Gráfico de Receita Mensal -->
         <div class="flex-1">
            <VueApexCharts type="bar" :options="chartOptionsReceitas" :series="seriesReceitas" width="100%" />
         </div>
         <!-- Tabela de Clientes Frequentes -->
         <div class="overflow-x-auto flex-1">
            <h3 class="text-lg text-preto font-medium">Clientes Frequentes</h3>
            <table class="min-w-full table-auto bg-table2 shadow-lg overflow-hidden divide-y-4 divide-limao">
               <thead class="bg-azul2 text-branco">
                  <tr>
                     <th class="px-4 py-2 text-left">NOME</th>
                     <th class="px-4 py-2 text-left">TOTAL SERVIÇOS</th>
                     <th class="px-4 py-2 text-left">TOTAL GERADO</th>
                  </tr>
               </thead>
               <tbody class="bg-table2 divide-y divide-preto">
                  <tr class="border-b hover:bg-limao2 transition-colors duration-200"
                     v-for="ficha in state.clientes_frequentes" :key="ficha.id">
                     <td class="px-4 py-2">{{ ficha.nome }} {{ ficha.sobrenome }}</td>
                     <td class="px-4 py-2">{{ ficha.quantidade_servicos }}</td>
                     <td class="px-4 py-2">R${{ ficha.valor_total }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>
<script setup>
import services from "@/services";
import { reactive, onMounted, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");

const state = reactive({
   clinicoTotal: '',
   esteticoTotal: '',
   receitaMensal: {},
   clientes_frequentes: []
});

onMounted(() => {
   getInfos();
});

async function getInfos() {
   const { response } = await services.info.getInfosFinanceiro(token);
   state.clinicoTotal = response.total_valor_clinico_mes;
   state.esteticoTotal = response.total_valor_estetico_mes;
   state.receitaMensal = response.receitaMensal;
   state.clientes_frequentes = response.clientes_frequentes;
}

// Configuração do gráfico de receita mensal (bar chart)
const chartOptionsReceitas = reactive({
   chart: {
      type: "bar",
      height: 350,
   },
   colors: ['#8acd1b'],
   xaxis: {
      categories: [
         "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
      ],
      title: {
         text: "Meses"
      }
   },
   yaxis: {
      title: {
         text: "Valor"
      }
   },
   title: {
      text: "Receita Mensal",
      align: 'center',
      style: {
         fontSize: '16px',
         fontWeight: 'bold',
      }
   }
});

const seriesReceitas = computed(() => {
   const receitaMensal = [
      state.receitaMensal["1"] || 0,
      state.receitaMensal["2"] || 0,
      state.receitaMensal["3"] || 0,
      state.receitaMensal["4"] || 0,
      state.receitaMensal["5"] || 0,
      state.receitaMensal["6"] || 0,
      state.receitaMensal["7"] || 0,
      state.receitaMensal["8"] || 0,
      state.receitaMensal["9"] || 0,
      state.receitaMensal["10"] || 0,
      state.receitaMensal["11"] || 0,
      state.receitaMensal["12"] || 0
   ];

   return [
      {
         name: "Receita Mensal",
         data: receitaMensal
      }
   ];
});

const clientesFrequentes = computed(() => {
   return state.clientesFrequentes.map(ficha => ficha[Object.keys(ficha)[0]]);

});
</script>

<style scoped>
.dashboard-container {
   padding: 20px;
   width: 100%;
}

.card {
   max-width: 300px;
   flex: 1;
   min-width: 250px;
}

.table-auto {
   width: 100%;
}
</style>
