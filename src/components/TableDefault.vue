<template>
   <div class="card">
      <div class="overflow-x-auto">
         <table class="min-w-full max-w-full divide-y-4 divide-limao">
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
                  <td v-for="header in headers" :key="header" class="px-6 py-4 whitespace-nowrap text-md text-preto2">
                     <div class="break-words">{{ row[header] }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-branco flex space-x-2">
                     <button type="button" title="Visualizar" v-if="numAcoes.includes(3)"
                        @click="$emit('visualizar_ficha', row)"
                        class="bg-azul1 text-branco px-4 py-2 rounded-md transition duration-500 hover:bg-cinza hover:text-preto">
                        <i class="bi bi-eye"></i>
                     </button>
                     <router-link :to="param_url_1 + '/alterar-' + param_url_2 + '/' + row.id">
                        <button type="button" title="Alterar" v-if="numAcoes.includes(1)"
                           class="bg-azul1 text-branco px-4 py-2 rounded-md transition duration-500 hover:bg-azul4 hover:text-preto">
                           <i class="bi bi-pencil"></i>
                        </button>
                     </router-link>
                     <button v-if="numAcoes.includes(2)" @click="$emit('deletar', row)"
                        class="bg-azul1 text-branco px-4 py-2 rounded hover:bg-red-600 transition duration-500 hover:bg-vermelho hover:text-preto">
                        <i class="bi bi-trash"></i>
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
   },
   numAcoes: {
      type: Array,
      default: () => []
   },
   param_url_1: {
      type: String,
      required: true
   },
   param_url_2: {
      type: String,
      required: true
   }
});
</script>

<style scoped>
.card {
   background-color: transparent;
}
</style>
