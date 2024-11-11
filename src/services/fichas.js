export default HTTPCLIENT => ({
   save: async ({ formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/fichas/cadastrar', formData, { headers });
      return { data: response.data, status: response.status };
   },
   update: async ({ id, formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/fichas/' + id, formData, { headers });
      return { data: response.data, status: response.status };
   },
   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/fichas', { headers });
      return { response: response.data }
   },
   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/fichas/' + id, { headers });
      return { response: response.data }
   },
   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/fichas/' + id, { headers })
      return { response: response }
   },
   getFichasCustom: async (token, params = {}) => {
      const headers = { "Authorization": "Bearer " + token };

      // Construir a query string usando URLSearchParams
      const queryString = new URLSearchParams(params).toString();

      // Concatenar a query string na URL
      const url = `/fichas/filtrar${queryString ? `?${queryString}` : ''}`;

      // Realizar a requisição
      const response = await HTTPCLIENT.get(url, { headers });
      return { response: response.data };
   },

})