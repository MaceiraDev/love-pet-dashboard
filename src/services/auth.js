export default HTTPCLIENT => ({
   verificaToken: async (token) => {
      let headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/verifica-token', { headers });
      const errors = null;
      if (!response.data) {
         errors = {
            status: response.request.status,
            statusText: response.request.statusText
         }
      }
      return {
         response: response.data,
         errors
      }
   },
});
