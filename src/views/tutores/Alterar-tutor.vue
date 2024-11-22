<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Editar Tutor</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="upTutor">
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
               <input type="text" v-model="state.data_nascimento" required placeholder="Digite uma data:" v-mask-date.br />
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
               <input type="text" v-model="state.cpf" required placeholder="Digite o CPF" v-mask-cpf />
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
            <div v-if="state.qtd_animais != null">
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
               <input type="text" required v-model="state.estado_uf" placeholder="Digite o estado (UF):" />
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
   <ModalNAutorizado :visible="state.modal" :texto="state.MensagemErro" :url="'/tutores'" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import Loader from '@/components/Loader.vue';
import ModalErro from '@/components/ModalErro.vue';
import ModalNAutorizado from '@/components/ModalNAutorizado.vue';
import { useStorage } from 'vue3-storage';
import { useRoute, useRouter } from 'vue-router';
import services from '@/services';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const router = useRouter();
const route = useRoute();

const state = reactive({
   nome: '',
   sobrenome: '',
   data_nascimento: '',
   sexo: '',
   cpf: '',
   telefone: '',
   whatsapp: '',
   email: '',
   status: 'ATIVO',
   profissao: '',
   qtd_animais: '',
   qtd_animais_casa: '',
   cep: '',
   logradouro: '',
   bairro: '',
   numero: '',
   cidade: '',
   estado_uf: '',
   notas_adicionais: '',
   loader: false,
   modal: false,
   MensagemErro: "",
});

onMounted(() => {
   const tutorId = route.params.id;
   if (tutorId) {
      buscarTutor(tutorId);
   }
});

async function buscarTutor(id) {
   try {
      const { response } = await services.tutores.getById(id, token);
      state.id = response.id;
      state.nome = response.nome;
      state.sobrenome = response.sobrenome;
      state.data_nascimento = response.data_nascimento;
      state.sexo = response.sexo;
      state.cpf = response.cpf;
      state.telefone = response.telefone;
      state.whatsapp = response.whatsapp;
      state.email = response.email;
      state.status = response.status;
      state.profissao = response.profissao;
      state.qtd_animais = response.qtd_animais;
      state.qtd_animais_casa = response.qtd_animais_casa;
      state.cep = response.cep;
      state.logradouro = response.logradouro;
      state.bairro = response.bairro;
      state.numero = response.numero;
      state.cidade = response.cidade;
      state.estado_uf = response.estado_uf;
      state.notas_adicionais = response.notas_adicionais;
   } catch (error) {
      console.error('Erro ao buscar tutor:', error);
      state.modal = true;
      state.MensagemErro = "Erro ao carregar os dados do tutor.";
   } finally {
      state.loader = false;
   }
}

async function upTutor() {
   if (user_tipo >= 4) {
      state.MensagemErro = "Você não tem permissão para editar tutores.";
      state.loader = false;
      state.modal = true;
      return;
   }

   let cpfFormatado = formatarCPF(state.cpf);
   let whatsappFormatado = formatarWhatsApp(state.whatsapp);
   let cepFormatado = formatarCep(state.cep);
   let telefoneFormatado = "";
   if (state.telefone) {
      telefoneFormatado = formatarTelefone(state.telefone);
   }

   let dados = {
      id: state.id,
      nome: state.nome,
      sobrenome: state.sobrenome,
      data_nascimento: state.data_nascimento,
      sexo: state.sexo,
      cpf: cpfFormatado,
      telefone: telefoneFormatado,
      whatsapp: whatsappFormatado,
      email: state.email,
      qtd_animais: state.qtd_animais,
      qtd_animais_casa: state.qtd_animais_casa,
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
      const response = await services.tutores.update({ dados, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/tutores');
      }
   } catch (error) {
      console.error("Erro ao atualizar tutor:", error);
      if (error.response && error.response.data && error.response.data.errors) {
         const errors = Object.values(error.response.data.errors).flat();
         state.MensagemErro = errors.length > 1 ? `Ocorreram os seguintes erros:\n${errors.join('\n')}` : `Erro: ${errors[0]}`;
         state.modal = true;
      } else {
         state.MensagemErro = "Erro ao salvar as informações.";
         state.modal = true;
      }
   }
}

function formatarCPF(cpf) {
   return cpf.replace(/[^\d]+/g, "");
}

function formatarTelefone(telefone) {
   return telefone.replace(/[^\d]+/g, "");
}

function formatarWhatsApp(whatsapp) {
   return whatsapp.replace(/[^\d]+/g, "");
}

function formatarCep(cep) {
   return cep.replace(/[^\d]+/g, "");
}

function buscaCEP(cep) {
   if (cep.length === 9) {
      services.buscaCEP(cep).then(response => {
         state.logradouro = response.data.logradouro;
         state.bairro = response.data.bairro;
         state.cidade = response.data.localidade;
         state.estado_uf = response.data.uf;
      }).catch(() => {
         state.MensagemErro = "CEP não encontrado.";
         state.modal = true;
      });
   }
}
</script>
