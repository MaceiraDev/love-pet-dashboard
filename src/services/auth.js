export default HTTPCLIENT => ({
   verificaToken: async (token) => {
      let headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/verifica-token', { headers });
      return {
         response: response.data,
      }
   },
});
