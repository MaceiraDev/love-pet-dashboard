export default HTTPCLIENT => ({
   login: async ( email, senha ) => {
      const response = await HTTPCLIENT.post('/login', {
         email,
         senha
      })
      let errors = null
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
})