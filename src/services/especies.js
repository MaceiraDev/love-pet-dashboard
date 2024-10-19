export default HTTPCLIENT => ({
   save: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/especies/cadastrar', dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },

   update: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.put('/especies/' + dados.id, dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },

   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/especies', { headers });
      return { response: response.data };
   },

   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/especies/' + id, { headers });
      return { response: response.data };
   },

   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.delete('/especies/' + id, { headers });
      return { response: response };
   },
});
