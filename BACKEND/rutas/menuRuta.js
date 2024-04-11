const express = require('express');
const MenuControler = require('../controlador/menu');
const md_auth = require('../softwareIntermedio/autenticacion');

const api = express.Router();

api.post('/menu', [md_auth.asegurarAutenticacion], MenuControler.createMenu);
api.get('/menu', MenuControler.obtenerMenus);
api.patch(
  '/menu/:id',
  [md_auth.asegurarAutenticacion],
  MenuControler.updateMenu
);
api.delete(
  '/menu/:id',
  [md_auth.asegurarAutenticacion],
  MenuControler.eliminarMenu
);

module.exports = api;
