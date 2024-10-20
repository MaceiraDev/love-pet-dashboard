export default HTTPCLIENT => ({
   save: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/racas/cadastrar', dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },

   update: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.put('/racas/' + dados.id, dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },

   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/racas', { headers });
      return { response: response.data };
   },

   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/racas/' + id, { headers });
      return { response: response.data };
   },

   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.delete('/racas/' + id, { headers });
      return { response: response };
   },

   getByEspecie: async (especie_id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/racas/por-especie/' + especie_id, { headers });
      return { response: response.data };
   },
});
