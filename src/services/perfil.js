export default HTTPCLIENT => ({
   update: async ({ id, formData, token }) => {
      const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" };
      const response = await HTTPCLIENT.post('/perfil/' + id, formData, { headers });
      return { data: response.data, status: response.status };
   },
   getPerfil: async (id, token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/perfil/' + id, { headers });
      return { response: response.data }
   },

})
