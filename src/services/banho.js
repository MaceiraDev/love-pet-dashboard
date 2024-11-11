export default HTTPCLIENT => ({
   save: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/banho/cadastrar', dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },

   update: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.put('/banho/' + dados.id, dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },

   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/banho', { headers });
      return { response: response.data };
   },

   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/banho/' + id, { headers });
      return { response: response.data };
   },

   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.delete('/banho/' + id, { headers });
      return { response: response };
   },
});
