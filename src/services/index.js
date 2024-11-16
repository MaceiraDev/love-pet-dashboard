import axios from "axios";
import cepService from "./cep"
import loginService from "./login";
import authService from "./auth";
import usuariosService from "./usuarios";
import servicosService from "./servicos";
import tutoresService from "./tutores";
import situacao_petService from "./situacao_pet";
import perfilService from "./perfil";
import especiesService from "./especies"
import racasService from "./racas"
import petsService from "./pets";
import fichasService from "./fichas"
import banhoService from "./banho";
import infoService from "./info";

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
   servicos: servicosService(HTTPCLIENT),
   tutores: tutoresService(HTTPCLIENT),
   situacao_pet: situacao_petService(HTTPCLIENT),
   perfil: perfilService(HTTPCLIENT),
   especies: especiesService(HTTPCLIENT),
   racas: racasService(HTTPCLIENT),
   pets: petsService(HTTPCLIENT),
   fichas: fichasService(HTTPCLIENT),
   banhos: banhoService(HTTPCLIENT),
   info: infoService(HTTPCLIENT),
}