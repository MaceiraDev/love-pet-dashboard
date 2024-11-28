<template>
   <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50 snap-x">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto max-h-screen md:max-h">
         <div class="overflow-x-auto">
            <h2 class="text-2xl text-preto font- mb-2">Minhas Fichas Pendentes<i
                  class="bi bi-clipboard2-pulse-fill text-azul3 ms-2"></i></h2>
            <table class="min-w-full table-auto bg-table2 shadow-lg overflow-hidden divide-y-4 divide-limao">
               <thead class="bg-azul2 text-branco">
                  <tr>
                     <th class="px-4 py-2 text-left">PET</th>
                     <th class="px-4 py-2 text-left">TUTOR</th>
                     <th class="px-4 py-2 text-left">SERVIÇO</th>
                     <th class="px-4 py-2 text-left">DATA</th>
                     <th class="px-4 py-2 text-left">HORA</th>
                     <th class="px-4 py-2 text-left">AÇÕES</th>
                  </tr>
               </thead>
               <tbody class="bg-table2 divide-y divide-preto">
                  <tr class="border-b hover:bg-limao2 transition-colors duration-200" v-for="ficha in fichas"
                     :key="ficha.id">
                     <td class="px-4 py-2">{{ ficha.pet_nome }}</td>
                     <td class="px-4 py-2">{{ ficha.tutor_nome }}</td>
                     <td class="px-4 py-2">{{ ficha.servico_nome }}</td>
                     <td class="px-4 py-2">{{ ficha.data }}</td>
                     <td class="px-4 py-2">{{ ficha.horario }}</td>
                     <td class="px-4 py-2">
                        <button @click="puxarFicha(ficha.id)"
                           class="bg-azul1 text-branco px-4 py-2 rounded-md transition duration-500 hover:bg-azul4 hover:text-preto">
                           Ir para a ficha
                           <i class="bi bi-person-walking"></i>
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="flex justify-end mt-2">
            <button
               class="bg-vermelho hover:bg-vermelho2 transition duration-400 text-branco font-semibold py-2 px-4 rounded"
               @click="cancel" title="Cancelar">
               Fechar
            </button>
         </div>
      </div>
   </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
   visible: {
      type: Boolean,
      required: true,
   },
   fichas: {
      type: Array,
      required: true,
      default: () => [],
   },
});
const emit = defineEmits(['update:visible', 'confirm']);

const cancel = () => {
   emit('update:visible', false);
};

function puxarFicha(id) {
   emit('update:visible', false); 
   router.push('/fichas/alterar-ficha/' + id); 
}

</script>