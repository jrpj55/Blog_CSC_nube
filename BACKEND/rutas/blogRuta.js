const express = require('express');
const blogControler = require('../controlador/blog');
const md_auth = require('../softwareIntermedio/autenticacion');
const multiparty = require('connect-multiparty');

const md_upload = multiparty({ uploadDir: './cargaImagen/blog' }); //permite subir imagenes de los Blog

const api = express.Router();

api.post(
  '/blog',
  [md_auth.asegurarAutenticacion, md_upload],
  blogControler.crearBlog
);
api.get('/obtener_blogs', blogControler.obtenerBlogs);
api.patch(
  '/blogs/:id',
  [md_auth.asegurarAutenticacion, md_upload],
  blogControler.actualizarBlog
);
api.delete(
  '/blogs/:id',
  [md_auth.asegurarAutenticacion],
  blogControler.deleteBlog
);
api.get('/blog/:path_blog', blogControler.obtenerUnPost);

module.exports = api;
