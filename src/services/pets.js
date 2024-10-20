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
})
