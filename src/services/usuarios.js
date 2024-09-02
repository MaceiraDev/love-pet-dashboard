export default HTTPCLIENT => ({
   getAll: async ( token ) => {
      const headers = { "Authorization": "Bearer " + token };
      const response = await HTTPCLIENT.get('/users', { headers });
      return { response: response.data }
   },
   
   delete: async ({ id, token }) => {
      const headers = { "Authorization": "Bearer " + token }
      const response = await HTTPCLIENT.delete('/users/' + id, { headers })
      return { response: response }
   },
})
