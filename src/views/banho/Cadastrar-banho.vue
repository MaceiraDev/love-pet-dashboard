<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Agendar Banho e Tosa</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form action="">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            <div>
               <label>Tutor</label>
               <select>
                  <option value="tutor1">Tutor 1</option>
                  <option value="tutor2">Tutor 2</option>
               </select>
            </div>
            <div>
               <label>Pet</label>
               <select>
                  <option value="pet1">Pet 1</option>
                  <option value="pet2">Pet 2</option>
               </select>
            </div>
            <div>
               <label>Serviço</label>
               <select>
                  <option value="servico1">Serviço 1</option>
                  <option value="servico2">Serviço 2</option>
               </select>
            </div>
            <div>
               <label>Status</label>
               <select>
                  <option value="status1">Status 1</option>
                  <option value="status2">Status 2</option>
               </select>
            </div>
            <div>
               <label>Data</label>
               <input type="text" placeholder="Digite a data" v-mask="'##/##/####'" />
            </div>
            <div>
               <label>Horário</label>
               <input type="text" placeholder="Digite o horário" v-mask="'##:##'" />
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais" rows="4"></textarea>
         </div>
      </form>
      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/banho'" :titulo="'Cancelar'" />
         <BotaoSave :link="'/banhos/cadastrar-banho'" :titulo="'Salvar'" />
      </div>
   </div>
</template>

<script setup>
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
</script>

<style scoped>
</style>