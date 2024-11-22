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
               <tr v-for="(row, index) in paginatedData" :key="index" class="hover:bg-limao2 transition-colors duration-200">
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
         <!-- Pagination -->
         <nav class="mt-4" aria-label="Page navigation">
            <ul class="flex justify-center space-x-1">
              <!-- Botão "Previous" -->
              <li>
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 1" 
                  :class="['px-4 py-2 border rounded', currentPage === 1 ? 'cursor-not-allowed bg-azul3 text-branco' : 'bg-azul1 text-branco hover:bg-azul4 transition duration-300']">
                  <i class="bi bi-chevron-left"></i>
                </button>
              </li>
          
              <!-- Páginas -->
              <li v-for="page in totalPages" :key="page">
                <button 
                  @click="goToPage(page)" 
                  :class="['px-4 py-2 border rounded', currentPage === page ? 'bg-limao text-preto hover:bg-limao2 transition duration-300'  : 'bg-azul1 text-branco' ]">
                  {{ page }}
                </button>
              </li>
          
              <!-- Botão "Next" -->
              <li>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages" 
                  :class="['px-4 py-2 border rounded', currentPage === totalPages ? 'cursor-not-allowed bg-azul3 text-branco' : 'bg-azul1 text-branco hover:bg-azul4 transition duration-300']">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>          
      </div>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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

const itemsPerPage = 30; // Limite de itens por página
const currentPage = ref(1); // Página atual

// Cálculo do total de páginas
const totalPages = computed(() => {
   return Math.ceil(props.data.length / itemsPerPage);
});

// Dados paginados com base na página atual
const paginatedData = computed(() => {
   const start = (currentPage.value - 1) * itemsPerPage;
   const end = start + itemsPerPage;
   return props.data.slice(start, end);
});

// Funções para navegação entre páginas
const nextPage = () => {
   if (currentPage.value < totalPages.value) {
      currentPage.value++;
   }
};

const previousPage = () => {
   if (currentPage.value > 1) {
      currentPage.value--;
   }
};

// Função para ir a uma página específica
const goToPage = (page) => {
   if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
   }
};
</script>

<style scoped>
.card {
   background-color: transparent;
}
</style>
