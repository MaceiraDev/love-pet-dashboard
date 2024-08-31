<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class=" text-2xl font-bold  text-preto2">Cadastrar Ficha</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
         <div>
            <label>Veterinário Responsável</label>
            <select>
               <option value="vet1">Veterinário 1</option>
               <option value="vet2">Veterinário 2</option>
            </select>
         </div>
         <div>
            <label>Animal</label>
            <select>
               <option value="animal1">Animal 1</option>
               <option value="animal2">Animal 2</option>
            </select>
         </div>
         <div>
            <label>Tutor</label>
            <select>
               <option value="tutor1">Tutor 1</option>
               <option value="tutor2">Tutor 2</option>
            </select>
         </div>
         <div>
            <label>Data</label>
            <input type="text" placeholder="Digite uma data:" v-mask="'##/##/####'">
         </div>
         <div>
            <label>Horário</label>
            <input type="text" placeholder="Digite o horário:" />
         </div>
         <div>
            <label>Status</label>
            <select>
               <option value="status1">Status 1</option>
               <option value="status2">Status 2</option>
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
            <label>Situação do Animal</label>
            <select>
               <option value="situacao1">Situação 1</option>
               <option value="situacao2">Situação 2</option>
            </select>
         </div>
         <div>
            <label>Comportamento do Animal</label>
            <input type="text" placeholder="Descreva o comportamento:" />
         </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-4">
         <div>
            <label>Motivo da Consulta</label>
            <textarea placeholder="Digite o motivo da consulta" rows="4"></textarea>
         </div>
         <div>
            <label>Sintomas Apresentados</label>
            <textarea placeholder="Descreva os sintomas apresentados" rows="4"></textarea>
         </div>
         <div>
            <label>Diagnóstico Preliminar</label>
            <textarea placeholder="Descreva o diagnóstico preliminar" rows="4"></textarea>
         </div>
         <div>
            <label>Diagnóstico Final</label>
            <textarea placeholder="Descreva o diagnóstico final" rows="4"></textarea>
         </div>
         <div>
            <label>Exames Realizados</label>
            <textarea placeholder="Digite os exames realizados" rows="4"></textarea>
         </div>
         <div>
            <label>Resultado dos Exames</label>
            <textarea placeholder="Descreva o resultado dos exames" rows="4"></textarea>
         </div>
         <div>
            <label>Prescrição de Medicamentos</label>
            <textarea placeholder="Digite a prescrição de medicamentos" rows="4"></textarea>
         </div>
         <div>
            <label>Próximos Passos</label>
            <textarea placeholder="Descreva os próximos passos" rows="4"></textarea>
         </div>
         <div>
            <label>Instruções para o Tutor</label>
            <textarea placeholder="Digite as instruções para o tutor" rows="4"></textarea>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais" rows="4"></textarea>
         </div>
      </div>
      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/fichas'" :titulo="'Cancelar'" />
         <BotaoSave :link="'/fichas/cadastrar-ficha'" :titulo="'Salvar'" />
      </div>
   </div>
</template>

<script setup>
   import BotaoSave from '@/components/BotaoSave.vue';
   import BotaoCancel from '@/components/BotaoCancel.vue';
</script>

<style scoped>
</style>
