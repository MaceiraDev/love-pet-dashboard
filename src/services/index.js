import axios from "axios";
import cepService from "./cep"

const API_ENVS = {
   cep: 'https://viacep.com.br/ws/'
}

const HTTPCEP = axios.create({baseURL: API_ENVS.cep})

export default {cep: cepService(HTTPCEP)}