//Conectando a la base de datos de mongoose
const mongoose = require('mongoose');
const app = require('./app');
const {
  USUARIO_BD,
  CONTRASENA_BD,
  IP_BD,
  API_VERSION,
  IP_SERVER,
} = require('./constantes');

const port = process.env.PORT || 4001;
mongoose.connect(
  `mongodb+srv://${USUARIO_BD}:${CONTRASENA_BD}@${IP_BD}/`,
  (error) => {
    if (error) throw error;
    app.listen(port, () => {
      console.log('######################');
      console.log('###### API REST - CONEXIÓN ARRIBA - RAYCHU  ######');
      console.log('######################');
      console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
    });
  }
);

{
  /*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

const port = process.env.PORT || 4000;
mongoose.connect('mongodb://localhost/blogcsc', (error) => {
  if (error) throw error;

  app.listen(port, () => {
    console.log('######################');
    console.log('###### API REST ######');
    console.log('######################');
    console.log(`http://localhost:${port}`);
    console.log('Conectado a la Base de datos local');
  });
});
*/
}
