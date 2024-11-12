<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Cadastrar Tutor</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="salvarTutor">
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div>
               <label>Nome</label>
               <input type="text" v-model="state.nome" required placeholder="Digite o nome:" />
            </div>
            <div>
               <label>Sobrenome</label>
               <input type="text" v-model="state.sobrenome" required placeholder="Digite o sobrenome:" />
            </div>
            <div>
               <label>Data de Nascimento</label>
               <input type="text" v-model="state.data_nascimento" required placeholder="Digite uma data:" v-mask-date.br>
            </div>
            <div>
               <label>Gênero</label>
               <select required v-model="state.sexo">
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="OUTROS">Outros</option>
               </select>
            </div>
            <div>
               <label>CPF</label>
               <input type="text" v-model="state.cpf" required placeholder="Digite o CPF:" v-mask-cpf />
            </div>
            <div>
               <label>Telefone</label>
               <input type="text" v-model="state.telefone" placeholder="Digite o telefone:" v-mask-phone.br />
            </div>
            <div>
               <label>WhatsApp</label>
               <input type="text" v-model="state.whatsapp" required placeholder="Digite o WhatsApp:" v-mask-phone.br />
            </div>
            <div>
               <label>Email</label>
               <input type="email" v-model="state.email" required placeholder="Digite o email:" />
            </div>
            <div>
               <label>Status</label>
               <select required v-model="state.status">
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
               </select>
            </div>
            <div>
               <label>Profissão</label>
               <input type="text" v-model="state.profissao" placeholder="Digite a profissão:" />
            </div>
            <div>
               <label>Quantidade de Animais</label>
               <input type="text" readonly v-model="state.qtd_animais" />
            </div>
            <div>
               <label>Quantidade de Animais (Casa)</label>
               <input type="text" required v-model="state.qtd_animais_casa" />
            </div>
            <div>
               <label>CEP</label>
               <input type="text" required v-model="state.cep" placeholder="Digite o CEP:" @blur="buscaCEP(state.cep)"
                  v-mask="'00000-000'" />
            </div>
            <div>
               <label>Logradouro</label>
               <input type="text" required v-model="state.logradouro" placeholder="Digite o logradouro:" />
            </div>
            <div>
               <label>Número</label>
               <input type="text" required v-model="state.numero" placeholder="Digite o número:" />
            </div>
            <div>
               <label>Bairro</label>
               <input type="text" required v-model="state.bairro" placeholder="Digite o bairro:" />
            </div>
            <div>
               <label>Cidade</label>
               <input type="text" required v-model="state.cidade" placeholder="Digite a cidade:" />
            </div>
            <div>
               <label>Estado (UF)</label>
               <input type="text" required v-model="state.estado_uf" placeholder="Digite a cidade:" />
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea v-model="state.notas_adicionais" placeholder="Digite notas adicionais:" rows="4"></textarea>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/tutores'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import { reactive } from 'vue';
import services from '@/services';
import { useRouter } from 'vue-router';
import { useStorage } from 'vue3-storage';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();

const state = reactive({
   loader: false,
   modal: false,
   nome: '',
   sobrenome: '',
   data_nascimento: '',
   sexo: '',
   cpf: '',
   telefone: '',
   whatsapp: '',
   email: '',
   status: 'ATIVO',
   qtd_animais: '',
   qtd_animais_casa: '',
   profissao: '',
   cep: '',
   logradouro: '',
   bairro: '',
   numero: '',
   cidade: '',
   estado_uf: '',
   notas_adicionais: '',
})

async function buscaCEP(cep) {
   try {
      const data = await services.cep.bucarCEP(cep);
      state.logradouro = data.response.logradouro;
      state.bairro = data.response.bairro;
      state.cidade = data.response.localidade;
      state.estado_uf = data.response.uf;
   }
   catch (e) {
      console.log(e);
   }
}

function formatarCPF(cpf) {
   return cpf.replace(/[.\-()]/g, "");
}

function formatarTelefone(telefone) {
   return telefone.replace(/[.\-() ]/g, "");
}

function formatarWhatsApp(whatsapp) {
   return whatsapp.replace(/[.\-() ]/g, "");
}

function formatarCep(cep) {
   return cep.replace(/[.\-() ]/g, "");
}

async function salvarTutor() {
   state.loader = true;

   if (user_tipo >= 4) {
      state.MensagemErro = "Você não tem permissão para cadastrar tutores.";
      state.loader = false;
      state.modal = true;
      return;
   }

   let cpfFormatado = formatarCPF(state.cpf);
   let telefoneFormatado = formatarTelefone(state.telefone);
   let whatsappFormatado = formatarWhatsApp(state.whatsapp);
   let cepFormatado = formatarCep(state.cep);

   let dados = {
      nome: state.nome,
      sobrenome: state.sobrenome,
      data_nascimento: state.data_nascimento,
      sexo: state.sexo,
      cpf: cpfFormatado,
      telefone: telefoneFormatado,
      whatsapp: whatsappFormatado,
      email: state.email,
      qtd_animais_casa: state.qtd_animais_casa,
      qtd_animais: state.qtd_animais,
      status: state.status,
      profissao: state.profissao,
      cep: cepFormatado,
      logradouro: state.logradouro,
      bairro: state.bairro,
      numero: state.numero,
      cidade: state.cidade,
      estado_uf: state.estado_uf,
      notas_adicionais: state.notas_adicionais,
   }

   try {
      const response = await services.tutores.save({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/tutores');
      }
   } catch (error) {
      console.error("Erro no cadastro de tutores:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Não foi possível concluir o cadastro. Tente novamente mais tarde.";
      }
   } finally {
      state.loader = false;
   }
}
</script>

<style scoped></style>