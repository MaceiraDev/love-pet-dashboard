import axios from "axios";
import cepService from "./cep"
import loginService from "./login";
import usuariosService from "./usuarios";
import authService from "./auth";

const API_ENVS = {
   local: 'http://127.0.0.1:8000/api/',
   cep: 'https://viacep.com.br/ws/'
}

const HTTPCLIENT = axios.create({ baseURL: API_ENVS.local })
const HTTPCEP = axios.create({ baseURL: API_ENVS.cep })

export default {
   cep: cepService(HTTPCEP),
   login: loginService(HTTPCLIENT),
   auth: authService(HTTPCLIENT),
   usuarios: usuariosService(HTTPCLIENT),
}