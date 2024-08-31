import axios from "axios";
import cepService from "./cep"
import loginService from "./login";
import usuariosService from "./usuarios";
import usuarios from "./usuarios";

const API_ENVS = {
   local: 'http://127.0.0.1:8000/api/',
   cep: 'https://viacep.com.br/ws/'
}

const HTTPCLIENT = axios.create({ baseURL: API_ENVS.local })
const HTTPCEP = axios.create({ baseURL: API_ENVS.cep })

export default {
   cep: cepService(HTTPCEP),
   login: loginService(HTTPCLIENT),
   usuarios: usuariosService(HTTPCLIENT),
}