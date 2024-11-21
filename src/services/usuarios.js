export default HTTPCLIENT => ({
   save: async ({ formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/users/cadastrar', formData, { headers });
      return { data: response.data, status: response.status };
   },
   update: async ({ id, formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/users/' + id, formData, { headers });
      return { data: response.data, status: response.status };
   },
   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/users', { headers });
      return { response: response.data }
   },
   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/users/' + id, { headers });
      return { response: response.data }
   },
   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/users/' + id, { headers })
      return { response: response }
   },
   upSenha: async (dados) => {
      const headers = { "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/atualizar-senha', dados, { headers });
      return { data: response.data, status: response.status };
   },
   verificaSenha: async (email, senhaAntiga) => {
      const headers = { "Accept": "application/json" };
      const data = { email, senha: senhaAntiga }; // Certifique-se que o objeto tem a mesma estrutura que o esperado no backend
      const response = await HTTPCLIENT.post('/verificar-senha', data, { headers });
      return { data: response.data, status: response.status };
   },
   getVeterinarios: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/users/tipo/vet', { headers });
      return { response: response.data }
   },
   sendEmail: async (dados) => {
      const headers = { "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/enviar-mail', { email: dados.email }, { headers });
      return { data: response.data, status: response.status };
   },
   redefinirSenha: async (dados) => {
      const headers = { "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/password/reset', dados, { headers });
      return { data: response.data, status: response.status };
   },
}) 
