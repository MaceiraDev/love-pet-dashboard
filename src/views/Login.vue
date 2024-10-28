<template>
   <main>
      <div class="conteudo">
         <div v-if="loading" class="flex justify-center align-middle">
            <Loader :loading="loading" />
         </div>
         <div class="flex justify-center align-middle">
            <div class="card">
               <div class="flex justify-center align-middle">
                  <img src="../assets/imagens/logo_sistema.png" alt="Logo do sistema">
               </div>
               <form form @submit.prevent="logarSistema">
                  <div class="wave-group">
                     <input v-model="state.email" required type="email" class="input">
                     <span class="bar"></span>
                     <label class="label">
                        <span class="label-char" style="--index: 0">E</span>
                        <span class="label-char" style="--index: 1">m</span>
                        <span class="label-char" style="--index: 2">a</span>
                        <span class="label-char" style="--index: 3">i</span>
                        <span class="label-char" style="--index: 4">l</span>
                     </label>
                  </div>
                  <div class="wave-group">
                     <input v-model="state.senha" required type="password" class="input">
                     <span class="bar"></span>
                     <label class="label">
                        <span class="label-char" style="--index: 0">S</span>
                        <span class="label-char" style="--index: 1">e</span>
                        <span class="label-char" style="--index: 2">n</span>
                        <span class="label-char" style="--index: 3">h</span>
                        <span class="label-char" style="--index: 4">a</span>
                     </label>
                  </div>
                  <button type="submit" :disabled="loading">Entrar</button>
               </form>
            </div>
         </div>
      </div>
      <ModalUpSenha 
         :visible="state.visible" 
         :email="state.email" 
         @update:visible="state.visible = $event" 
         @save="saveSenha" 
      />
   </main>
</template>
<script setup>
import services from '@/services';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from 'vue3-storage';
import Loader from '@/components/Loader.vue';
import { useToast } from 'vue-toastification';
import ModalUpSenha from '@/components/ModalUpSenha.vue';

const storage = useStorage();
const router = useRouter();
const toast = useToast();
const loading = ref(false);

const state = reactive({
   email: null,
   senha: null,
   visible: false,
});

async function logarSistema() {
   loading.value = true;
   try {
      const data = await services.login.login(state.email, state.senha);
      if (data) {
         storage.setStorageSync("token", data.response.token);
         router.push("/");
      }
   } catch (e) {
      let msg_erro = e.response.data.message;
      let data_senha = e.response.data.data_vencimento_senha;
      let status = e.status;
      toast.error(msg_erro, { timeout: 3000 });
      if (data_senha == null && status == 403) {
         state.visible = true;
      }
   } finally {
      loading.value = false;
   }
}

async function saveSenha({ email, senha }) {
   console.log("Email:", email, "Senha:", senha);
   if (senha.length < 6) {
      let msg_erro = 'A senha deve ter 6 ou mais caracteres!';
      toast.error(msg_erro, { timeout: 3000 });
      return;
   }
   let dados = {
      email,
      senha
   };
   console.log('Dados para atualização:', dados); // Log para verificar os dados enviados
   try {
      const response = await services.usuarios.upSenha(dados);
      if (response.status === 200 || response.status === 201) {
         state.visible = false;
      }
   } catch (e) {
      console.log('Erro:', e.response.data); // Log para verificar o erro retornado
      let msg_erro = e.response.data.error;
      toast.error(msg_erro, { timeout: 3000 });
   } finally {
      loading.value = false;
   }
}

</script>

<style scoped>
@import url("../assets/base.css");

.conteudo {
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
}

.wave-group {
   margin-bottom: 2rem;
   position: relative;
}

.wave-group .input {
   font-size: 16px;
   padding: 10px 10px 10px 5px;
   width: 100%;
   border: none;
   border-bottom: 1px solid #515151;
   background: transparent;
   color: #000;
}

.wave-group .input:focus {
   outline: none;
}

.wave-group .label {
   color: #999;
   font-size: 18px;
   font-weight: normal;
   position: absolute;
   pointer-events: none;
   left: 5px;
   top: 10px;
   display: flex;
}

.wave-group .label-char {
   transition: 0.2s ease all;
   transition-delay: calc(var(--index) * .05s);
}

.wave-group .input:focus~label .label-char,
.wave-group .input:valid~label .label-char {
   transform: translateY(-20px);
   font-size: 14px;
   color: var(--color-limao);
}

.wave-group .bar {
   position: relative;
   display: block;
   width: 100%;
}

.wave-group .bar:before,
.wave-group .bar:after {
   content: '';
   height: 2px;
   width: 0;
   bottom: 1px;
   position: absolute;
   background: var(--color-limao);
   transition: 0.2s ease all;
   -moz-transition: 0.2s ease all;
   -webkit-transition: 0.2s ease all;
}

.wave-group .bar:before {
   left: 50%;
}

.wave-group .bar:after {
   right: 50%;
}

.wave-group .input:focus~.bar:before,
.wave-group .input:focus~.bar:after {
   width: 50%;
}

/* From Uiverse.io by xueyuantan */
button {
   width: 100%;
   height: 3em;
   border-radius: 30em;
   font-size: 15px;
   font-family: inherit;
   border: none;
   position: relative;
   overflow: hidden;
   z-index: 1;
   box-shadow: 6px 6px 12px #c5c5c5;
   color: #000;
}

button::before {
   content: '';
   width: 0;
   height: 3em;
   border-radius: 30em;
   position: absolute;
   top: 0;
   left: 0;
   background: var(--color-limao);
   transition: .5s ease;
   display: block;
   z-index: -1;
}

button:hover::before {
   width: 100%;
}
</style>
