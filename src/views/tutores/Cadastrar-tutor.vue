<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Tutor</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form action="">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" placeholder="Digite o nome" />
            </div>
            <div>
               <label>Sobrenome</label>
               <input type="text" placeholder="Digite o sobrenome" />
            </div>
            <div>
               <label>Data de Nascimento</label>
               <input type="text" placeholder="Digite uma data:" v-mask="'##/##/####'">
            </div>
            <div>
               <label>Sexo</label>
               <select>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outros">Outros</option>
               </select>
            </div>
            <div>
               <label>CPF</label>
               <input type="text" placeholder="Digite o CPF" />
            </div>
            <div>
               <label>Telefone</label>
               <input type="text" placeholder="Digite o telefone" v-mask="['(##) ####-####', '(##) #####-####']" />
            </div>
            <div>
               <label>WhatsApp</label>
               <input type="text" placeholder="Digite o WhatsApp" v-mask="['(##) ####-####', '(##) #####-####']" />
            </div>
            <div>
               <label>Email</label>
               <input type="email" placeholder="Digite o email" />
            </div>
            <div>
               <label>Status</label>
               <select>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
               </select>
            </div>
            <div>
               <label>Profissão</label>
               <input type="text" placeholder="Digite a profissão" />
            </div>
            <div>
               <label>Quantidade de Animais</label>
               <input type="text" placeholder="Digite a quantidade de animais" />
            </div>
            <div>
               <label>CEP</label>
               <input type="text" v-model="state.cep" placeholder="Digite o CEP"
                  @blur="buscaCEP(state.cep)" />
            </div>
            <div>
               <label>Logradouro</label>
               <input type="text" v-model="logradouro" placeholder="Digite o logradouro" />
            </div>
            <div>
               <label>Número</label>
               <input type="text" v-model="numero" placeholder="Digite o número" />
            </div>
            <div>
               <label>Bairro</label>
               <input type="text" v-model="bairro" placeholder="Digite o bairro" />
            </div>
            <div>
               <label>Cidade</label>
               <input type="text" v-model="cidade" placeholder="Digite a cidade" />
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite notas adicionais" rows="4"></textarea>
         </div>
      </form>


      <div class="flex justify-end gap-4 mt-4">
         <BotaoCancel :link="'/tutores'" :titulo="'Cancelar'" />
         <BotaoSave :link="'/tutores/cadastrar-tutor'" :titulo="'Salvar'" />
      </div>
   </div>
</template>

<script setup>
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import { reactive } from 'vue';
import services from '@/services';

const state = reactive({
   cep: '',
   logradouro: '',
   bairro: '',
   cidade: '',
   numero: '',
})


async function buscaCEP(cep) {
   try{
      const {response} = await services.cep.bucarCEP(cep)
      alert(response.response)
   }  
   catch(e){
      console.log(e)
   }  
}


</script>
<style scoped></style>