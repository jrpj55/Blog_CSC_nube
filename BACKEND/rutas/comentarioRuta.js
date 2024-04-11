const express = require('express');
const comentaControler = require('../controlador/comentario');
const md_auth = require('../softwareIntermedio/autenticacion');

const api = express.Router();

api.post('/comentario', comentaControler.nuevoComentario);
api.get(
  '/comentarios',
  [md_auth.asegurarAutenticacion],
  comentaControler.obtenertodos
);
api.delete(
  '/comentarios/:id',
  [md_auth.asegurarAutenticacion],
  comentaControler.deleteComentario
);
module.exports = api;
