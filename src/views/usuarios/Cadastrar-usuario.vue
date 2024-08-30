<template>
   <div class="bg-background border-solid border-2 border-preto2 rounded shadow-lg shadow-preto2-500/50 p-4">
      <h1 class=" text-2xl font-bold  text-preto2">Cadastrar Usuário</h1>
      <hr class="bg-azul2 h-0.5 mt-2 mb-4" />
      <div class="div_radios">
         <div class="radio-button-container">
            <div class="radio-button">
               <input type="radio" class="radio-button__input" id="radio1" name="radio-group">
               <label class="radio-button__label" for="radio1">
                  <span class="radio-button__custom"></span>
                  Veterinário
               </label>
            </div>
            <div class="radio-button">
               <input type="radio" class="radio-button__input" id="radio2" name="radio-group">
               <label class="radio-button__label" for="radio2">
                  <span class="radio-button__custom"></span>
                  Técnico Vet
               </label>
            </div>
            <div class="radio-button">
               <input type="radio" class="radio-button__input" id="radio3" name="radio-group">
               <label class="radio-button__label" for="radio3">
                  <span class="radio-button__custom"></span>
                  Recepcionista
               </label>
            </div>
            <div class="radio-button">
               <input type="radio" class="radio-button__input" id="radio4" name="radio-group">
               <label class="radio-button__label" for="radio4">
                  <span class="radio-button__custom"></span>
                  Visitante
               </label>
            </div>
         </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
         <div>
            <label>Nome</label>
            <input type="text" placeholder="Digite um nome:">
         </div>
         <div>
            <label>Sobrenome</label>
            <input type="text" placeholder="Digite um sobrenome:">
         </div>
         <div>
            <label>Data de Nascimento</label>
            <input type="text" placeholder="Digite uma data:" v-mask="'##/##/####'">
         </div>
         <div>
            <label>CPF</label>
            <input type="text" placeholder="Digite um CPF:" v-mask="'###.###.###-##'">
         </div>
         <div>
            <label>Sexo</label>
            <select>
               <option selected>Selecione</option>
               <option value="MASCULINO">Masculino</option>
               <option value="FEMININO">Feminino</option>
               <option value="OUTROS">Outros</option>
            </select>
         </div>
         <div>
            <label>Telefone</label>
            <input type="text" placeholder="Digite um telefone:" v-mask="['(##) ####-####', '(##) #####-####']">
         </div>
         <div>
            <label>WhatsApp</label>
            <input type="text" placeholder="Digite um número WhatsApp:" v-mask="['(##) ####-####', '(##) #####-####']">
         </div>
         <div>
            <label>Email</label>
            <input type="email" placeholder="Digite um email:">
         </div>
         <div>
            <label>Senha</label>
            <input type="password" placeholder="Digite uma senha:">
         </div>
         <div>
            <label>Status</label>
            <select>
               <option value="ATIVO">Ativo</option>
               <option value="INATIVO">Inativo</option>
            </select>
         </div>
         <div>
            <label>N° de pets sobre seus cuidados</label>
            <input type="text" disabled>
         </div>
      </div>
      <div>
         <label>Notas Adicionais</label>
         <textarea placeholder="Digite aqui informações adicionais, as informações deste campo serão mostradas na tela de perfil do usuário." rows="4"></textarea>
      </div>
   </div>
</template>
<script setup>
</script>
<style scoped>
.radio-button-container {
   display: flex;
   align-items: center;
   gap: 24px;
}

.radio-button {
   display: inline-block;
   position: relative;
   cursor: pointer;
}

.radio-button__input {
   position: absolute;
   opacity: 0;
   width: 0;
   height: 0;
}

.radio-button__label {
   display: inline-block;
   padding-left: 30px;
   margin-bottom: 10px;
   position: relative;
   font-size: 15px;
   color: #1a1b1c;
   font-weight: 600;
   cursor: pointer;
   text-transform: uppercase;
   transition: all 0.3s ease;
}

.radio-button__custom {
   position: absolute;
   top: 0;
   left: 0;
   width: 20px;
   height: 20px;
   border-radius: 50%;
   border: 2px solid #555;
   transition: all 0.3s ease;
}

.radio-button__input:checked+.radio-button__label .radio-button__custom {
   background-color: #066699;
   border-color: transparent;
   transform: scale(0.8);
   box-shadow: 0 0 20px #06669980;
}

.radio-button__input:checked+.radio-button__label {
   color: #066699;
}

.radio-button__label:hover .radio-button__custom {
   transform: scale(1.2);
   border-color: #066699;
   box-shadow: 0 0 20px #06669980;
}
</style>