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
   getByRaca: async (raca_id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/pets/por-raca/' + raca_id, { headers });
      return { response: response.data };
   },
   getByNome: async (nome, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/pets/por-nome/' + nome, { headers });
      return { response: response.data };
   },
   getByTutorId: async (tutor_id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/pets/por-tutor/' + tutor_id, { headers });
      return { response: response.data };
   },
})
