<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class="text-2xl font-bold text-preto2">Editar Pet</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <form @submit.prevent="atualizarPet">
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
               <label>Tutor</label>
               <select required v-model="state.tutor_id">
                  <option selected disabled value="">Selecione</option>
                  <option v-for="tutor in state.tutores" :value="tutor.id">{{ tutor.nome }}</option>
               </select>
            </div>
            <div>
               <label>Nome</label>
               <input type="text" required placeholder="Digite um nome:" v-model="state.nome">
            </div>
            <div>
               <label>Espécie</label>
               <select required v-model="state.especie_id" @change="buscarRacasByEspecie(state.especie_id)">
                  <option selected disabled value="">Selecione</option>
                  <option v-for="especie in state.especies" :value="especie.id">{{ especie.nome }}</option>
               </select>
            </div>
            <div>
               <label>Raça</label>
               <select required v-model="state.raca_id">
                  <option selected disabled value="">Selecione</option>
                  <option v-for="raca in state.racas" :value="raca.id">{{ raca.nome }}</option>
               </select>
            </div>
            <div>
               <label>Sexo</label>
               <select required v-model="state.sexo">
                  <option selected disabled value="">Selecione</option>
                  <option value="MACHO">Macho</option>
                  <option value="FEMEA">Fêmea</option>
               </select>
            </div>
            <div>
               <label>Data de Nascimento</label>
               <input type="text" placeholder="Digite uma data:" v-mask-date.br required
                  v-model="state.data_nascimento">
            </div>
            <div>
               <label>Situação</label>
               <select required v-model="state.situacao_id">
                  <option selected disabled value="">Selecione</option>
                  <option v-for="situacao in state.situacoes" :value="situacao.id">{{ situacao.nome }}</option>
               </select>
            </div>
            <div>
               <label>Peso (kg)</label>
               <input type="text" placeholder="Digite o peso:" v-model="state.peso" v-mask-decimal.br="2">
            </div>
            <div>
               <label>Comprimento (cm)</label>
               <input type="text" placeholder="Digite o comprimento:" v-model="state.comprimento" v-mask-decimal.br="2">
            </div>
            <div>
               <label>Largura (cm)</label>
               <input type="text" placeholder="Digite a largura:" v-model="state.largura" v-mask-decimal.br="2">
            </div>
            <div>
               <label>Cor</label>
               <input required type="text" placeholder="Digite a cor:" v-model="state.cor">
            </div>
            <div>
               <label>Temperamento</label>
               <input required type="text" placeholder="Descreva o temperamento do pet:" v-model="state.temperamento">
            </div>
            <div>
               <label>Alimentação</label>
               <input type="text" placeholder="Digite o tipo de alimentação do pet:" v-model="state.alimentacao">
            </div>
            <div>
               <label>Deficiência</label>
               <select required v-model="state.deficiencia">
                  <option selected disabled value="">Selecione</option>
                  <option value="SIM">Sim</option>
                  <option value="NAO">Não</option>
               </select>
            </div>
            <div v-if="state.deficiencia == 'SIM'">
               <label>Qual Deficiência</label>
               <input type="text" placeholder="Digite qual ou quais:" v-model="state.qual_deficiencia">
            </div>
            <div>
               <label>Microchip</label>
               <select required v-model="state.microchip">
                  <option selected disabled value="">Selecione</option>
                  <option value="SIM">Sim</option>
                  <option value="NAO">Não</option>
               </select>
            </div>
            <div v-if="state.data_ultima_consulta != null">
               <label>Data Última Consulta</label>
               <router-link :to="'/fichas/alterar-ficha/' + state.id_ultima_ficha">
                  <input type="text" class="cursor-pointer" v-mask-date.br v-model="state.data_ultima_consulta" readonly />
               </router-link>

            </div>

            <div v-if="!state.imagem.imagem">
               <label class="form-label">Imagem de Perfil</label>
               <div class="flex items-center space-x-4">
                  <label class="upload-button">
                     <i class="bi bi-camera upload-icon"></i>
                     <span>Selecionar Imagem</span>
                     <input type="file" @change="adicionarImagem" class="hidden">
                  </label>
               </div>
            </div>
            <div v-if="state.imagem.imagem" class="div_img">
               <img :src="state.imagem.imagem" alt="Imagem do Usuário"
                  class="w-28 h-28 object-cover border-2 border-azul4 rounded-full" />
               <button @click="removerImagem"
                  class="bg-vermelho w-6 h-6 rounded-full text-branco hover:bg-vermelho2 duration-300"
                  title="Remover Imagem">
                  <i class="bi bi-x"></i>
               </button>
            </div>
         </div>
         <div>
            <label>Notas Adicionais</label>
            <textarea placeholder="Digite aqui informações adicionais e detalhes sobre o pet:" rows="4"
               v-model="state.notas_adicionais"></textarea>
         </div>
         <div class="flex justify-end gap-4 mt-4">
            <BotaoCancel :link="'/pets'" :titulo="'Cancelar'" />
            <BotaoSave type="submit" :titulo="'Salvar'" />
         </div>
      </form>
   </div>
   <ModalErro :visible="state.modal" :texto="state.MensagemErro" @update:visible="state.modal = $event" />
   <Loader :loading="state.loader" />
   <ModalNAutorizado :visible="state.modal_autorizacao" :texto="state.MensagemErro" :url="'/pets'" @update:visible="state.modal_autorizacao = $event" />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import services from '@/services';
import { useStorage } from 'vue3-storage';
import BotaoSave from '@/components/BotaoSave.vue';
import BotaoCancel from '@/components/BotaoCancel.vue';
import ModalErro from '@/components/ModalErro.vue';
import Loader from '@/components/Loader.vue';
import ModalNAutorizado from '@/components/ModalNAutorizado.vue';

const storage = useStorage();
const token = storage.getStorageSync("token");
const user_tipo = storage.getStorageSync("tipo_usuario");
const route = useRoute();
const router = useRouter();

onMounted(() => {
   buscarEspecies();
   buscarSituacao();
   buscarTutores();
   const petId = route.params.id;
   if (petId) {
      buscarPet(petId);
   }
});

const state = reactive({
   id: null,
   nome: '',
   especie_id: '',
   raca_id: '',
   tutor_id: '',
   sexo: '',
   data_nascimento: '',
   situacao_id: '',
   peso: '',
   largura: '',
   comprimento: '',
   cor: '',
   deficiencia: '',
   qual_deficiencia: '',
   microchip: '',
   temperamento: '',
   alimentacao: '',
   notas_adicionais: '',
   especies: [],
   racas: [],
   situacoes: [],
   tutores: [],
   imagem: {},
   loader: false,
   modal: false,
   modal_autorizacao: false,
   MensagemErro: '',
   data_ultima_consulta: '',
   id_ultima_ficha: '',
});

async function buscarPet(id) {
   state.loader = true;
   try {
      const { response } = await services.pets.getById(id, token);
      Object.assign(state, response);
      if (response.imagem) {
         state.imagem = { imagem: response.imagem };
      }
      buscarRacasByEspecie(state.especie_id)
   } catch (error) {
      const status_err = error.status;
      if (status_err == 401) {
         state.modal_autorizacao = true;
         state.MensagemErro = error.response.data.error;
      } else {
         console.error('Erro ao buscar tutor:', error);
         state.modal = true;
         state.MensagemErro = "Erro ao carregar os dados do tutor.";
      }
   } finally {
      state.loader = false;
   }
}

async function buscarRacasByEspecie(especie_id) {
   const { response } = await services.racas.getByEspecie(especie_id, token);
   state.racas = response;
}

async function buscarEspecies() {
   const { response } = await services.especies.getAll(token);
   state.especies = response.data;
}

async function buscarSituacao() {
   const { response } = await services.situacao_pet.getAll(token);
   state.situacoes = response.data;
}

async function buscarTutores() {
   const { response } = await services.tutores.getAll(token);
   state.tutores = response.data;
}

async function adicionarImagem(event) {
   const img = event.target.files[0];
   const objImagem = {};
   objImagem.file = img;
   objImagem.imagem = URL.createObjectURL(img);
   state.imagem = objImagem;
}

function removerImagem() {
   state.imagem = {};
}

async function atualizarPet() {
   state.loader = true;

   if (user_tipo == 4) {
      state.MensagemErro = "Você não tem permissão para atualizar pets.";
      state.loader = false;
      state.modal = true;
      return;
   }

   const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

   if (!dataRegex.test(state.data_nascimento)) {
      state.MensagemErro = "Data inválida. Use o formato DD/MM/AAAA.";
      state.modal = true;
      state.loader = false;
      return;
   }

   state.peso = formatarNumero(state.peso);
   state.comprimento = formatarNumero(state.comprimento);
   state.largura = formatarNumero(state.largura);

   let formData = new FormData();
   formData.append("id", state.id);
   formData.append("nome", state.nome);
   formData.append("tutor_id", state.tutor_id);
   formData.append("especie_id", state.especie_id);
   formData.append("raca_id", state.raca_id);
   formData.append("sexo", state.sexo);
   formData.append("data_nascimento", state.data_nascimento);
   formData.append("situacao_pet_id", state.situacao_id);
   formData.append("peso", state.peso);
   formData.append("comprimento", state.comprimento);
   formData.append("largura", state.largura);
   formData.append("cor", state.cor);
   formData.append("temperamento", state.temperamento);
   formData.append("alimentacao", state.alimentacao);
   formData.append("deficiencia", state.deficiencia);
   formData.append("qual_deficiencia", state.qual_deficiencia);
   formData.append("microchip", state.microchip);
   formData.append("notas_adicionais", state.notas_adicionais);
   formData.append("_method", "PUT");

   if (state.imagem?.file) {
      formData.append("imagem", state.imagem.file);
   } else if (typeof state.imagem.imagem === "string") {
      formData.append("imagem", state.imagem.imagem);
   } else if (!state.imagem.imagem) {
      formData.append("imagem", null);
   }

   try {
      const response = await services.pets.update({ id: state.id, formData, token });
      if (response.status === 200 || response.status === 201) {
         router.push('/pets');
      }
   } catch (error) {
      console.error("Erro no cadastro de pets:", error);
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

function formatarNumero(numero) {
   const valorComPontosRemovidos = numero.replace(/\./g, '');
   const valorFormatado = parseFloat(valorComPontosRemovidos.replace(',', '.')) || 0;

   return valorFormatado;
}
</script>


<style scoped>
.upload-button {
   display: flex;
   align-items: center;
   width: 100%;
   padding: 10px;
   background-color: #066699;
   color: white;
   border-radius: 6px;
   border: 1px solid #ccc;
   cursor: pointer;
   font-size: 14px;
   font-weight: 500;
   text-align: center;
   transition: 0.3s;
   margin-bottom: 10px;
}

.upload-button:hover {
   background-color: #055a85;
}

.upload-icon {
   margin-right: 8px;
}

.hidden {
   display: none;
}

.div_img {
   display: flex;
}
</style>
