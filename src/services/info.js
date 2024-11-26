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
   filtrarPorcentagem: async (params, token = {}) => {
      const headers = { "Authorization": "Bearer " + token };
      const queryString = new URLSearchParams(params).toString();
      const url = `/financeiro/filtrar${queryString ? `?${queryString}` : ''}`;
      const response = await HTTPCLIENT.get(url, { headers });
      return { response: response.data };
   }
});
