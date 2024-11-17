export default HTTPCLIENT => ({
   getInfos: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/dashboard/info', { headers });
      return { response: response.data };
   },
   getInfosFinanceiro: async (token) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/financeiro', { headers });
      return { response: response.data };
   },

});
