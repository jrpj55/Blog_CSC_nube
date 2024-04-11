const Menu = require('../modelos/Menu');

async function createMenu(req, res) {
  const menu = new Menu(req.body);

  menu.save((error, menuStored) => {
    if (error) {
      res.status(400).send({ msg: 'Error al crear el menu' });
    } else {
      res.status(200).send(menuStored);
    }
  });
}

async function obtenerMenus(req, res) {
  const { activo } = req.query;

  let response = null;
  if (activo === undefined) {
    response = await Menu.find().sort({ orden: 'asc' });
  } else {
    response = await Menu.find({ activo }).sort({ orden: 'asc' });
  }

  if (!response) {
    res.status(400).send({ msg: 'No se ha encontrado ningun menu' });
  } else {
    res.status(200).send(response);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params; // params se utiza cuando se solicita un parametro
  const menuData = req.body;
  //Buscar por id y actualizar
  Menu.findByIdAndUpdate({ _id: id }, menuData, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al actualizar el menu' });
    } else {
      res.status(200).send({ msg: 'Actualización correcta' });
    }
  });
}

async function eliminarMenu(req, res) {
  const { id } = req.params;
  //buscar por id y eliminar
  Menu.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al eliminar el menu' });
    } else {
      res.status(200).send({ msg: 'Menu eliminado' });
    }
  });
}
module.exports = {
  createMenu,
  obtenerMenus,
  updateMenu,
  eliminarMenu,
};
