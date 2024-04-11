const express = require('express');
const bodyParser = require('body-parser');
const { API_VERSION } = require('./constantes');
const cors = require('cors');
const path = require('path');

const app = express();

// Import routings
const rutaAutentica = require('./rutas/autenRuta');
const rutaUsuario = require('./rutas/usuaRuta');
const rutaMenu = require('./rutas/menuRuta');
const rutaComentario = require('./rutas/comentarioRuta');
const rutaBlog = require('./rutas/blogRuta');

// Configure Body Parser //para mandar cobtenido json del body, es lo que nos llega del cliente al servidor
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder (cargaImagen), para poder ver las imagenes, en caso que se necesiten mas carpetass se adicionan
app.use(express.static('cargaImagen'));

//Configure Header HTTP - CORS, cuando hagamos peticiones http no las bloquee sino las deje pasar
app.use(cors());

//configurar para subir a heroku
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
);

// Configure rutas
app.use(`/api/${API_VERSION}`, rutaAutentica);
app.use(`/api/${API_VERSION}`, rutaUsuario);
app.use(`/api/${API_VERSION}`, rutaMenu);
app.use(`/api/${API_VERSION}`, rutaComentario);
app.use(`/api/${API_VERSION}`, rutaBlog);

module.exports = app;
