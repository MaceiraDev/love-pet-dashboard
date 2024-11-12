export default HTTPCLIENT => ({
   save: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.post('/tutores/cadastrar', dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },
   update: async ({ dados, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" };
      const response = await HTTPCLIENT.put('/tutores/' + dados.id, dados, { headers });
      return {
         data: response.data,
         status: response.status
      };
   },
   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/tutores', { headers });
      return { response: response.data }
   },
   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/tutores/' + id, { headers });
      return { response: response.data }
   },
   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/tutores/' + id, { headers })
      return { response: response }
   },
   getTutoresCustom: async (token, params = {}) => {
      const headers = { "Authorization": "Bearer " + token };
      // Construir a query string usando URLSearchParams
      const queryString = new URLSearchParams(params).toString();
      // Concatenar a query string na URL
      const url = `/tutores/filtrar${queryString ? `?${queryString}` : ''}`;
      // Realizar a requisição
      const response = await HTTPCLIENT.get(url, { headers });
      return { response: response.data };
   },
})
