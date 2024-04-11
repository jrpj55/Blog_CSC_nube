const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
  titulo: String,
  camino: String,
  orden: Number,
  activo: Boolean,
});

module.exports = mongoose.model('Menu', MenuSchema);
