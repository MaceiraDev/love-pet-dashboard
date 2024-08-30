<template>
   <div class="card">
      <div class="overflow-x-auto">
         <table class="min-w-full divide-y-4 divide-limao">
            <thead class="bg-azul3">
               <tr>
                  <th v-for="header in headers" :key="header"
                     class="px-6 py-3 text-left text-xs font-medium text-branco uppercase tracking-wider">
                     {{ header }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-branco uppercase tracking-wider">Ações</th>
               </tr>
            </thead>
            <tbody class="bg-table2 divide-y divide-preto">
               <tr v-for="(row, index) in data" :key="index" class="hover:bg-limao2 transition-colors duration-200">
                  <td v-for="(item, key) in row" :key="key" class="px-6 py-4 whitespace-nowrap text-md text-preto2">
                     {{ item }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-branco">
                     <button
                        class="bg-azul1 text-branco px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Ação
                     </button>
                     <button
                        class="bg-azul1 text-branco px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Ação
                     </button>
                     <button
                        class="bg-azul1 text-branco px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Ação
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   headers: {
      type: Array,
      required: true
   },
   data: {
      type: Array,
      required: true
   }
});
</script>

<style scoped>
.card{
   background-color:transparent;
}
</style>