<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Serviço</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form action="">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" placeholder="Digite o nome do serviço" />
            </div>
            <div>
               <label>Tipo de Serviço</label>
               <select>
                  <option value="clinico">Clínico</option>
                  <option value="estetico">Estético</option>
               </select>
            </div>
            <div>
               <label>Valor</label>
               <input type="text" placeholder="Digite o valor" />
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais" rows="4"></textarea>
         </div>
      </form>
      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/servicos'" :titulo="'Cancelar'" />
         <BotaoSave :link="'/servicos/cadastrar-servico'" :titulo="'Salvar'" />
      </div>
   </div>
</template>

<script setup>
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
</script>

<style scoped></style>
