const express = require('express');
const AutenControler = require('../controlador/autenticacion');

//vamos a crear las rutas
const api = express.Router();

//Vamos a definir nuestra primera ruta
api.post('/autenticacion/registro', AutenControler.registro);
api.post('/autenticacion/login', AutenControler.login);
api.post(
  '/autenticacion/refresh_access_token',
  AutenControler.refreshAccessToken
);

// y lo exportamos
module.exports = api;
