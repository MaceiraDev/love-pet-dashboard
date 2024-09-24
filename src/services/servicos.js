export default HTTPCLIENT => ({
   save: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json"};
      const response = await HTTPCLIENT.post('/servicos/cadastrar', dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },
   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/servicos', { headers });
      return { response: response.data }
   },

   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/servicos/' + id, { headers })
      return { response: response }
   },
})
