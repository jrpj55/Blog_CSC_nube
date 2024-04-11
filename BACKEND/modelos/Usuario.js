const mongoose = require('mongoose');

const UsuarioEsquema = mongoose.Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String, //tipo string y unico no se repite el email
    unique: true,
  },
  password: String,
  rol: String,
  active: Boolean,
});

module.exports = mongoose.model('Usuario', UsuarioEsquema);
