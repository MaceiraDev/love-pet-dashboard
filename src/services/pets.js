export default HTTPCLIENT => ({
   save: async ({ formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/pets/cadastrar', formData, { headers });
      return { data: response.data, status: response.status };
   },
   update: async ({ id, formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/pets/' + id, formData, { headers });
      return { data: response.data, status: response.status };
   },
   getAll: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/pets', { headers });
      return { response: response.data }
   },
   getById: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/pets/' + id, { headers });
      return { response: response.data }
   },
   delete: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/pets/' + id, { headers })
      return { response: response }
   },
   getByEspecie: async (especie_id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/pets/por-especie/' + especie_id, { headers });
      return { response: response.data };
   },
   getPetsCustom: async (params, token = {}) => {
      const headers = { "Authorization": "Bearer " + token };

      // Construir a query string usando URLSearchParams
      const queryString = new URLSearchParams(params).toString();

      // Concatenar a query string na URL
      const url = `/pets/filtrar${queryString ? `?${queryString}` : ''}`;

      // Realizar a requisição
      const response = await HTTPCLIENT.get(url, { headers });
      return { response: response.data };
   },
})
