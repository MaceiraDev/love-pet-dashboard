<template>
   <div class="dashboard-container flex flex-col space-y-6 items-center">
      <!-- Relatório de Totais -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
         <div class="flex flex-col items-center space-y-4">
            <h1 class="text-xl font-bold text-preto text-center">
               Relatório de Totais Clínico e Estético do Último Mês
            </h1>
            <div class="flex space-x-4 justify-center w-full">
               <div class="bg-azul2 rounded-lg shadow-lg p-6 flex flex-col items-center card">
                  <h2 class="text-lg font-semibold text-branco">Total Clínico</h2>
                  <p class="text-3xl font-bold text-limao">R${{ state.clinicoTotal }}</p>
               </div>
               <div class="bg-azul2 rounded-lg shadow-lg p-6 flex flex-col items-center card">
                  <h2 class="text-lg font-semibold text-branco">Total Estético</h2>
                  <p class="text-3xl font-bold text-limao">R${{ state.esteticoTotal }}</p>
               </div>
            </div>
         </div>
         <div class="flex flex-col items-center space-y-4">
            <div class="flex items-center w-full justify-between">
               <h1 class="text-xl font-bold text-preto text-center flex-grow">
                  Percentual comparado ao último Mês
               </h1>
               <div class="relative">
                  <button @click="toggleMenu" class="hamburger-icon ml-auto">
                     <span class="material-icons">menu</span>
                  </button>
                  <div v-if="state.menu_aberto"
                     class="absolute right-0 mt-2 w-48 bg-azul2 rounded-lg shadow-lg p-4 z-10 text-branco">
                     <div class="flex flex-col space-y-2 mb-2">
                        <p>Comparar</p>
                        <select v-model="state.mes_1" class="month-dropdown">
                           <option value="" selected disabled hidden>Selecione</option>
                           <option v-for="month in months" :key="month" :value="month"> {{ monthNames[month - 1] }}
                           </option>
                        </select>
                        <p>Em relação à</p>
                        <select v-model="state.mes_2" class="month-dropdown">
                           <option value="" selected disabled hidden>Selecione</option>
                           <option v-for="month in months" :key="month" :value="month"> {{ monthNames[month - 1] }}
                           </option>
                        </select>
                     </div>
                     <BotaoCleanFilter @click="fecharEBuscar()" class=" sm:ml-1" />
                     <BotaoSearchFilter @click="filtrarPorcentagem()" class=" sm:ml-1" />
                  </div>
               </div>
            </div>
            <div class="rounded-lg shadow-lg p-6 flex flex-col items-center card"
               :class="state.porcentual >= 0 ? 'bg-verde border-green-500' : 'bg-vermelho3 border-red-500'">
               <i class="material-icons" :class="state.porcentual >= 0 ? 'material-icons-up' : 'material-icons-down'">
                  {{ state.porcentual >= 0 ? 'trending_up' : 'trending_down' }}
               </i>
               <p class="text-3xl font-bold text-limao"> {{ state.porcentual }}%</p>
            </div>
         </div>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
         <div class="flex-1">
            <VueApexCharts type="bar" :options="chartOptionsReceitas" :series="seriesReceitas" width="100%" />
         </div>
         <div class="overflow-x-auto flex-1">
            <h3 class="text-lg text-preto font-medium mb-4">Clientes Frequentes (Último Mês)</h3>
            <table class="min-w-full table-auto bg-table2 shadow-lg overflow-hidden divide-y divide-limao">
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
import { reactive, onMounted, computed, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useStorage } from 'vue3-storage';
import BotaoCleanFilter from '@/components/BotaoCleanFilter.vue';
import BotaoSearchFilter from '@/components/BotaoSearchFilter.vue';

const storage = useStorage();
const token = storage.getStorageSync("token");

const state = reactive({
   clinicoTotal: '',
   esteticoTotal: '',
   porcentual: '',
   receitaMensal: {},
   clientes_frequentes: [],
   mes_1: '',
   mes_2: '',
   menu_aberto: false,
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
   state.porcentual = response.porcentual;
}

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
      state.receitaMensal["1"] || "0.00",
      state.receitaMensal["2"] || "0.00",
      state.receitaMensal["3"] || "0.00",
      state.receitaMensal["4"] || "0.00",
      state.receitaMensal["5"] || "0.00",
      state.receitaMensal["6"] || "0.00",
      state.receitaMensal["7"] || "0.00",
      state.receitaMensal["8"] || "0.00",
      state.receitaMensal["9"] || "0.00",
      state.receitaMensal["10"] || "0.00",
      state.receitaMensal["11"] || "0.00",
      state.receitaMensal["12"] || "0.00"
   ]
   return [
      {
         name: "Receita Mensal",
         data: receitaMensal
      }
   ];
});


const months = Array.from({ length: 12 }, (_, i) => i + 1);  // Array de meses (1 a 12)
const monthNames = [
   'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const toggleMenu = () => { state.menu_aberto = !state.menu_aberto; };

async function filtrarPorcentagem() {
   try {
      const params = {};

      params.mes1 = state.mes_1;
      params.mes2 = state.mes_2;

      const { response } = await services.info.filtrarPorcentagem(params, token);
      state.porcentual = response.porcentual;
      state.menu_aberto = false;
   } catch (error) {
      console.log(error);
   }
}

function fecharEBuscar() {
   getInfos();
   state.mes_1 = '';
   state.mes_2 = '';
   state.menu_aberto = false;
}
</script>

<style scoped>
.dashboard-container {
   padding: 20px;
   width: 100%;
}

.card {
   width: 100%;
   max-width: 300px;
   min-height: 120px;
}

.material-icons-up {
   color: rgb(0, 231, 0);
   font-size: 2rem;
}

.material-icons-down {
   color: red;
   font-size: 2rem;
}
</style>
