export default HTTPCEP => ({
   bucarCEP: async (cep) => {
      const response = await HTTPCEP.get('/' + cep + "/json") 
      return {
         response: response.data
      }
   }
})