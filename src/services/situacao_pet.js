export default HTTPCLIENT => ({
   save: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/situacao/cadastrar', dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },
   update: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.put('/situacao/' + dados.id, dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },
   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/situacao', { headers });
      return { response: response.data }
   },
   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/situacao/' + id, { headers });
      return { response: response.data }
   },
   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/situacao/' + id, { headers })
      return { response: response }
   },
})
