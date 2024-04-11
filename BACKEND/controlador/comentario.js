const Comenta = require('../modelos/Comentario');

function nuevoComentario(req, res) {
  const { email, nombres } = req.body;
  const comentar = new Comenta({ ...req.body, email: email.toLowerCase() });

  if (!email) res.status(400).send({ msg: 'Email obligatorio' });
  if (!nombres) res.status(400).send({ msg: 'Nombres obligatorios' });

  //const comentarios = new Comenta({

  //});

  comentar.save((error) => {
    if (error) {
      res.status(400).send({ msg: 'El Email ya esta registrado' });
    } else {
      res.status(200).send({ msg: 'Comentario registrado' });
    }
  });
}

function obtenertodos(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  Comenta.paginate({}, options, (error, comentarioStored) => {
    if (error) {
      res.status(400).send({ msg: 'Error al obtener los comentarios' });
    } else {
      res.status(200).send(comentarioStored);
    }
  });
}

function deleteComentario(req, res) {
  const { id } = req.params;

  Comenta.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al eliminar el registro' });
    } else {
      res.status(200).send({ msg: 'Eliminación correcta' });
    }
  });
}

module.exports = {
  nuevoComentario,
  obtenertodos,
  deleteComentario,
};
