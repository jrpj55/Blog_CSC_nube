const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const comentarioSchema = mongoose.Schema({
  nombres: String,
  comentario: String,
  email: {
    type: String,
    unique: true,
  },
});

comentarioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comentario', comentarioSchema);
