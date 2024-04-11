const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const blogSchema = mongoose.Schema({
  titulo_blog: String,
  miniature_blog: String,
  contenido_blog: String,
  path_blog: {
    type: String,
    unique: true,
  },
  created_at: Date, //fecha de creción del blog
});

blogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Blog', blogSchema);
