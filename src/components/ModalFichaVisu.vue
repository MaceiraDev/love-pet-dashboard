<template>
    <div v-if="visible" class="fixed inset-0 bg-preto bg-opacity-50 flex justify-center items-center z-50 snap-x">
      <div class="bg-background p-6 rounded-lg shadow-lg max-w-7xl w-full overflow-y-auto max-h-screen md:max-h">
         <div class="border-b-2 border-b-azul3 flex justify-between items-center">
            <h2 class="text-2xl font-bold mb-4 text-azul3">Detalhes da Ficha</h2> 
           <button @click="gerarPDF(data.id)" class="bg-azul1 text-branco py-2 px-4 rounded hover:bg-azul3 transition duration-300"> Gerar PDF <i class="bi bi-file-earmark-pdf"></i></button>
         </div>
         <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <h3 class="text-azul1 font-semibold text-lg mb-2">Informações Gerais</h3>
               <p><span class="font-semibold text-lg">Ficha ID:</span> {{ data.id }}</p>
               <p><span class="font-semibold text-lg">Veterinário:</span> {{ veterinario.nome || 'Carregando...' }}</p>
               <p><span class="font-semibold text-lg">Data:</span> {{ data.data }}</p>
               <p><span class="font-semibold text-lg">Horário:</span> {{ data.horario }}</p>
               <p><span class="font-semibold text-lg">Status da Ficha:</span> {{ data.status }}</p>
            </div>
            <div>
               <h3 class="text-azul1 font-semibold text-lg mb-2">Informações do Pet</h3>
               <p><span class="font-semibold text-lg">Pet:</span> {{ pet.nome || 'Carregando...' }}</p>
               <p><span class="font-semibold text-lg">Tutor:</span> {{ tutor.nome || 'Carregando...' }}</p>
               <p><span class="font-semibold text-lg">Situação do Pet:</span> {{ situacao.nome || 'Carregando...' }}</p>
               <p><span class="font-semibold text-lg">Comportamento:</span> {{ data.comportamento_animal }}</p>
            </div>
         </div>
         <div class="mt-4">
            <h3 class="text-azul1 font-semibold text-lg mb-2">Detalhes do Atendimento</h3>
            <p><span class="font-semibold text-lg">Serviço:</span> {{ servico.nome || 'Carregando...' }}</p>
            <p><span class="font-semibold text-lg">Motivo da Consulta:</span> {{ data.motivo }}</p>
            <p><span class="font-semibold text-lg">Sintomas:</span> {{ data.sintomas }}</p>
            <p><span class="font-semibold text-lg">Diagnóstico Preliminar:</span> {{ data.diagnostico_pre }}</p>
            <p><span class="font-semibold text-lg">Diagnóstico Final:</span> {{ data.diagnostico_final || "Não informado" }}</p>
         </div>
         <div class="mt-4">
            <h3 class="text-azul1 font-semibold text-lg mb-2">Informações Complementares</h3>
            <p><span class="font-semibold text-lg">Exames Realizados:</span> {{ data.exames_realizados || "Não informado" }}</p>
            <p><span class="font-semibold text-lg">Resultado dos Exames:</span> {{ data.resultado_exames || "Não informado" }}</p>
            <p><span class="font-semibold text-lg">Prescrição:</span> {{ data.prescricao || "Não informado" }}</p>
            <p><span class="font-semibold text-lg">Próximos Passos:</span> {{ data.proximos_passos || "Não informado" }}</p>
            <p><span class="font-semibold text-lg">Instruções:</span> {{ data.instrucoes || "Não informado" }}</p>
            <p><span class="font-semibold text-lg">Notas Adicionais:</span> {{ data.notas_adicionais || "Não informado" }}</p>
         </div>
         <div class="flex justify-end mt-6">
            <button
               class="bg-vermelho hover:bg-vermelho2 transition duration-400 text-branco font-semibold py-2 px-4 rounded"
               @click="close">
               Fechar
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch, nextTick } from 'vue';
import services from '@/services';


const props = defineProps({
   visible: {
      type: Boolean,
      required: true,
   },
   token: {
      type: String,
      required: true,
   },
   data: {
      type: Object,
      required: false,
      default: () => ({
         id: null,
         veterinario_id: null,
         pet_id: null,
         tutor_id: null,
         data: "",
         horario: "",
         status: "",
         servico_id: null,
         situacao_id: null,
         comportamento_animal: "",
         motivo: "",
         sintomas: "",
         diagnostico_pre: "",
         diagnostico_final: null,
         exames_realizados: null,
         resultado_exames: null,
         prescricao: null,
         proximos_passos: null,
         instrucoes: null,
         notas_adicionais: null,
      }),
   },
});

const emit = defineEmits(['update:visible']);
const veterinarios = ref([]);
const veterinario = ref({});
const pet = ref({});
const tutor = ref({});
const situacao = ref({});
const servico = ref({});

const close = () => {
   emit('update:visible', false);
};

watch(() => props.data, async (newData) => {
   if (newData.veterinario_id) await buscarVeterinario(newData.veterinario_id);
   if (newData.pet_id) await buscarPet(newData.pet_id);
   if (newData.tutor_id) await buscarTutor(newData.tutor_id);
   if (newData.situacao_id) await buscarSituacao(newData.situacao_id);
   if (newData.servico_id) await buscarServico(newData.servico_id);
}, { immediate: true });

async function buscarVeterinario(id) {
   try {
      const { response } = await services.usuarios.getVeterinarios(props.token);
      veterinarios.value = response.data;
      veterinario.value = veterinarios.value.find(vet => vet.id === id) || {};
   } catch (error) {
      console.error('Erro ao buscar veterinário:', error);
   }
}

async function buscarPet(id) {
   try {
      const { response } = await services.pets.getById(id, props.token);
      pet.value = response;
   } catch (error) {
      console.error('Erro ao buscar pet:', error);
   }
}

async function buscarTutor(id) {
   try {
      const { response } = await services.tutores.getById(id, props.token);
      tutor.value = response;
   } catch (error) {
      console.error('Erro ao buscar tutor:', error);
   }
}

async function buscarSituacao(id) {
   try {
      const { response } = await services.situacao_pet.getById(id, props.token);
      situacao.value = response;
   } catch (error) {
      console.error('Erro ao buscar situação do pet:', error);
   }
}

async function buscarServico(id) {
   try {
      const { response } = await services.servicos.getById(id, props.token);
      servico.value = response;
   } catch (error) {
      console.error('Erro ao buscar serviço:', error);
   }
}

async function gerarPDF(id) {
   try {
      const response = await services.fichas.generatePdf(id, props.token);
      const sanitizedNomePet = pet.value.nome.replace(/[^a-zA-Z0-9_-]/g, '_');
      const nomeArquivo = `ficha_pet_${sanitizedNomePet}.pdf`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      link.download = nomeArquivo;
      link.click();
      URL.revokeObjectURL(link.href);
   } catch (error) {
      console.error('Erro ao gerar PDF:', error);
   }
}


</script>