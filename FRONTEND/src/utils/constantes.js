const SERVER_IP = 'localhost:4001'; // la ip del servidor en el backend
//const SERVER_IP = 'webcsc-6376c19b896f.herokuapp.com';

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    REGISTER: 'autenticacion/registro',
    LOGIN: 'autenticacion/login',
    REFRESH_ACCESS_TOKEN: 'autenticacion/refresh_access_token',
    USER_ME: 'usuarios/me',
    USER: 'crearUsuario',
    USER_A_E: 'usuario',
    USERS: 'allusers',

    COMENTARIOS: 'comentarios',
    COMENTARIO_N: 'comentario',
    POST_OBT: 'obtener_blogs',
    POST: 'blog',
    POST_A_E: 'blogs',
  },
  JWT: {
    ACCESS: 'access',
    REFRESH: 'refresh',
  },
};
