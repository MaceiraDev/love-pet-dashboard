<template>
   <section id="dashboard" class="p-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
         <div class="bg-azul2 rounded-lg p-4 flex flex-col items-center card">
            <h2 class="text-lg font-semibold text-branco">Fichas Pendentes</h2>
            <p class="text-3xl font-bold text-limao">{{ state.data_card.fichas_pendentes }}</p>
         </div>
         <div class="bg-azul2 rounded-lg p-4 flex flex-col items-center card">
            <h2 class="text-lg font-semibold text-branco">Banhos Pendentes</h2>
            <p class="text-3xl font-bold text-limao">{{ state.data_card.banhos_pendentes }}</p>
         </div>
         <div class="bg-azul2 rounded-lg p-4 flex flex-col items-center card">
            <h2 class="text-lg font-semibold text-branco">Tutores Ativos</h2>
            <p class="text-3xl font-bold text-limao">{{ state.data_card.tutores_ativos }}</p>
         </div>
         <div class="bg-azul2 rounded-lg p-4 flex flex-col items-center card">
            <h2 class="text-lg font-semibold text-branco">Total de Pets</h2>
            <p class="text-3xl font-bold text-limao">{{ state.data_card.pets_totais }}</p>
         </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 gap-4 mt-12">
         <div class="overflow-x-auto">
            <h3 class="text-lg text-preto font-medium">Fichas Pendentes/Recentes</h3>
            <table class="min-w-full table-auto bg-table2 shadow-lg overflow-hidden divide-y-4 divide-limao">
               <thead class="bg-azul2 text-branco">
                  <tr>
                     <th class="px-4 py-2 text-left">VET</th>
                     <th class="px-4 py-2 text-left">PET</th>
                     <th class="px-4 py-2 text-left">SERVIÇO</th>
                     <th class="px-4 py-2 text-left">TUTOR</th>
                     <th class="px-4 py-2 text-left">DATA</th>
                     <th class="px-4 py-2 text-left">HORA</th>
                     <th class="px-4 py-2 text-left">AÇÕES</th>
                  </tr>
               </thead>
               <tbody class="bg-table2 divide-y divide-preto">
                  <tr class="border-b hover:bg-limao2 transition-colors duration-200"
                     v-for="ficha in state.data_tabelas.fichas" :key="ficha.id">
                     <td class="px-4 py-2">{{ ficha.veterinario }}</td>
                     <td class="px-4 py-2">{{ ficha.pet }}</td>
                     <td class="px-4 py-2">{{ ficha.servico }}</td>
                     <td class="px-4 py-2">{{ ficha.tutor }}</td>
                     <td class="px-4 py-2">{{ ficha.data }}</td>
                     <td class="px-4 py-2">{{ ficha.hora }}</td>
                     <td class="px-4 py-2">
                        <router-link :to="'/fichas/alterar-ficha/' + ficha.id">
                           <button
                              title="Ir para a ficha"
                              class="bg-azul1 text-branco px-4 py-2 rounded-md transition duration-500 hover:bg-azul4 hover:text-preto">
                              <i class="bi bi-person-walking"></i>
                           </button>
                        </router-link>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="overflow-x-auto">
            <h3 class="text-lg text-preto font-medium">Banhos e Tosas Agendados</h3>
            <table class="min-w-full table-auto bg-table2 shadow-lg overflow-hidden divide-y-4 divide-limao">
               <thead class="bg-azul2 text-branco">
                  <tr>
                     <th class="px-4 py-2 text-left">PET</th>
                     <th class="px-4 py-2 text-left">SERVIÇO</th>
                     <th class="px-4 py-2 text-left">DATA</th>
                     <th class="px-4 py-2 text-left">HORA</th>
                     <th class="px-4 py-2 text-left">AÇÕES</th>
                  </tr>
               </thead>
               <tbody class="bg-table2 divide-y divide-preto">
                  <tr class="border-b hover:bg-limao2 transition-colors duration-200"
                     v-for="banho in state.data_tabelas.banhos" :key="banho.id">
                     <td class="px-4 py-2">{{ banho.pet }}</td>
                     <td class="px-4 py-2">{{ banho.servico }}</td>
                     <td class="px-4 py-2">{{ banho.data }}</td>
                     <td class="px-4 py-2">{{ banho.hora }}</td>
                     <td class="px-4 py-2">
                        <router-link :to="'/banhos/alterar-banho/' + banho.id">
                           <button
                              title="Visualizar Banho"
                              class="bg-azul1 text-branco px-4 py-2 rounded-md transition duration-500 hover:bg-azul4 hover:text-preto ">
                              <i class="bi bi-droplet"></i>
                           </button>
                        </router-link>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 mt-12">
         <div class="text-center">
            <h3 class="text-lg text-preto font-medium">Serviços por Mês</h3>
            <VueApexCharts type="area" :options="chartOptionsServices" :series="seriesServices" width="100%" />
         </div>
         <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
            <div class="text-center">
               <h3 class="text-lg text-preto font-medium">Status Fichas</h3>
               <VueApexCharts type="pie" width="380" :options="chartOptions" :series="series" />
            </div>
            <div class="chart-wrapper text-center">
               <h3 class="text-lg text-preto font-medium">Pets por Espécies</h3>
               <VueApexCharts type="pie" :options="chartOptionsTwo" :series="seriesTwo" />
            </div>
         </div>

      </div>
   </section>
</template>

<script setup>
import services from "@/services";
import { reactive, onMounted, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");

const state = reactive({
   data_status: {},
   data_card: {},
   pets_por_especie: [],
   data_tabelas: {
      fichas: [],
      banhos: [],
   },
   data_servicos: {
      clinico: {},
      estetico: {},
   }
});

onMounted(() => {
   getInfos();
});

async function getInfos() {
   const { response } = await services.info.getInfos(token);
   state.data_status = response.graficos.total_status_fichas;
   state.data_card = response.cards;
   state.data_tabelas = response.tabelas;
   state.pets_por_especie = response.graficos.pets_por_especie;
   state.data_servicos = response.graficos.totais_servicos;
}

const chartOptions = reactive({
   chart: {
      type: "pie",
   },
   labels: ['Fichas pendentes', 'Fichas em andamento', 'Fichas concluídas', 'Fichas canceladas'],
   responsive: [
      {
         breakpoint: 400,
         options: {
            chart: {
               width: 200, // Reduz o tamanho do gráfico para telas menores
            },
            legend: {
               position: "bottom",
            },
         },
      },
   ],
});

const series = computed(() => {
   return [
      state.data_status.fichas_pendentes || 0,
      state.data_status.fichas_andamento || 0,
      state.data_status.fichas_concluidas || 0,
      state.data_status.fichas_canceladas || 0
   ];
});

const chartOptionsTwo = computed(() => ({
   chart: {
      type: "pie",
   },
   labels: state.pets_por_especie.map(item => item.especie),
   responsive: [
      {
         breakpoint: 400,
         options: {
            chart: {
               width: 200, // Reduz o tamanho do gráfico para telas menores
            },
            legend: {
               position: "bottom", // Move a legenda para baixo
            },
         },
      },
   ],
}));

const seriesTwo = computed(() => state.pets_por_especie.map(item => item.total));

const chartOptionsServices = reactive({
   chart: {
      type: "area",
      height: 350,
   },
   dataLabels: {
      enabled: false,
   },
   stroke: {
      curve: "smooth",
   },
   colors: ['#02416d', '#8acd1b'],
   xaxis: {
      categories: [], // Meses serão populados dinamicamente
      title: {
         text: "Mês"
      }
   },
   yaxis: {
      title: {
         text: "Total de Serviços"
      }
   },
   legend: {
      position: "top",
      horizontalAlign: "center"
   }
});

// Computed para configurar os dados dos serviços
const seriesServices = computed(() => {
   const clinico = state.data_servicos.clinico || {};  // Ajustado para clinico diretamente
   const estetico = state.data_servicos.estetico || {}; // Ajustado para estetico diretamente

   // Converte os objetos em arrays para acessar mês e total
   const clinicoData = Object.values(clinico).map(item => ({
      x: item.mes,
      y: item.total
   }));

   const esteticoData = Object.values(estetico).map(item => ({
      x: item.mes,
      y: item.total
   }));

   // Popula as categorias no eixo X com os meses
   const allMonths = [
      ...new Set([
         ...clinicoData.map(item => item.x),
         ...esteticoData.map(item => item.x)
      ])
   ];

   chartOptionsServices.xaxis.categories = allMonths;

   return [
      { name: 'Clínico', data: clinicoData },
      { name: 'Estético', data: esteticoData }
   ];
});
</script>

<style scoped>
.card {
   box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.chart-wrapper {
   width: 300px;
   max-width: 100%;
}
</style>