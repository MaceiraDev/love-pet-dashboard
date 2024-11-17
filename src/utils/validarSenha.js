import services from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

export async function validarSenha(email, novaSenha, senhaAntiga = null, confirmarSenha = null) {
   if (novaSenha.length < 6) {
      toast.error('A senha deve ter 6 ou mais caracteres!', { timeout: 3000 });
      return false;
   }

   if (!/[A-Z]/.test(novaSenha)) {
      toast.error('A senha deve conter pelo menos uma letra maiúscula!', { timeout: 3000 });
      return false;
   }

   if (!/[!@#$%^&*(),.?":{}|<>;]/.test(novaSenha)) {
      toast.error('A senha deve conter pelo menos um caractere especial!', { timeout: 3000 });
      return false;
   }

   if (senhaAntiga) {
      if (novaSenha === senhaAntiga) {
         toast.error('A nova senha não pode ser a mesma que a atual!', { timeout: 3000 });
         return false;
      }

      try {
         const response = await services.usuarios.verificaSenha(email, senhaAntiga);
         if (response.status !== 200) {
            toast.error('Senha antiga inválida!', { timeout: 3000 });
            return false;
         }
      } catch (error) {
         console.error("Erro ao verificar a senha antiga:", error);
         toast.error('Senha antiga inválida!', { timeout: 3000 });
         return false;
      }
   }

   if (confirmarSenha !== null && novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem!', { timeout: 3000 });
      return false;
   }

   return true;
}