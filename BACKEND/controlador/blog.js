const Blog = require('../modelos/Blog');
const images = require('../utilidades/image');

function crearBlog(req, res) {
  const creBlog = new Blog(req.body); // nuevo blog
  creBlog.created_at = new Date();

  const imagePath = images.getFilePath(req.files.miniature_blog);
  creBlog.miniature_blog = imagePath;

  creBlog.save((error, blogStored) => {
    if (error) {
      res.status(400).send({ msg: 'Error al crear el blog' });
    } else {
      res.status(201).send(blogStored);
    }
  });
}

function obtenerBlogs(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page), //pagina
    limit: parseInt(limit), //limite
    sort: { created_at: 'desc' }, //clasificar
  };

  Blog.paginate({}, options, (error, blogsStored) => {
    if (error) {
      res.status(400).send({ msg: 'Error al obtener los posts' });
    } else {
      res.status(200).send(blogsStored);
    }
  });
}

function actualizarBlog(req, res) {
  const { id } = req.params;
  const datosBlog = req.body;

  if (req.files.miniature_blog) {
    const imagePath = images.getFilePath(req.files.miniature_blog);
    datosBlog.miniature_blog = imagePath;
  }

  Blog.findByIdAndUpdate({ _id: id }, datosBlog, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al actualizar el post' });
    } else {
      res.status(200).send({ msg: 'Actualización correcta' });
    }
  });
}
function deleteBlog(req, res) {
  const { id } = req.params;

  Blog.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al eliminar el post' });
    } else {
      res.status(200).send({ msg: 'Post eliminado' });
    }
  });
}

function obtenerUnPost(req, res) {
  const { path_blog } = req.params;
  //findOne encuentra uno
  Blog.findOne({ path_blog }, (error, postStored) => {
    if (error) {
      res.status(500).send({ msg: 'Error del servidor' });
    } else if (!postStored) {
      res.status(400).send({ msg: 'No se ha encontrado ningun post' });
    } else {
      res.status(200).send(postStored);
    }
  });
}

module.exports = {
  crearBlog,
  obtenerBlogs,
  actualizarBlog,
  deleteBlog,
  obtenerUnPost,
};
