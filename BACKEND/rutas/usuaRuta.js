const express = require('express');
const UserControler = require('../controlador/usuario');
const md_auth = require('../softwareIntermedio/autenticacion');

const api = express.Router();

api.get(
  '/usuarios/me',
  [md_auth.asegurarAutenticacion],
  UserControler.consigueme
);
api.get(
  '/allusers',
  [md_auth.asegurarAutenticacion],
  UserControler.ObtenerUsuarios
);
api.post(
  '/crearUsuario',
  [md_auth.asegurarAutenticacion],
  UserControler.crearUsuario
);
api.patch(
  '/usuario/:id',
  [md_auth.asegurarAutenticacion],
  UserControler.actualizar
);
api.delete(
  '/usuario/:id',
  [md_auth.asegurarAutenticacion],
  UserControler.eliminar
);
module.exports = api;
