const bcrypt = require('bcryptjs');
const User = require('../modelos/Usuario');

//función de los datos del usuario logueado
async function consigueme(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: 'No se ha encontrado usuario' });
  } else {
    res.status(200).send(response);
  }
}

async function ObtenerUsuarios(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function crearUsuario(req, res) {
  //console.log(req.body); //puebas antes de empezar a programar y guadar el registro de usuario
  //res.status(200).send({ msg: 'creación de usuario desde la administración' }); // instrucción para verificar el endpoint

  const { password } = req.body; //Mostramos la contraseñala contraseña llega sin encriptar y hay que encriptarla
  const creauser = new User({ ...req.body, active: false }); // nuevo usuario

  // encriptamos la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  creauser.password = hasPassword;

  creauser.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: 'Error al crear el usuario' });
    } else {
      res.status(201).send(userStored);
    }
  });
}

async function actualizar(req, res) {
  const { id } = req.params;
  const userData = req.body; // datos del usuario

  //password
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al actualizar el usuario' });
    } else {
      res.status(200).send({ msg: 'Actualizacion correcta' });
    }
  });
}

async function eliminar(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al eliminar el usuario' });
    } else {
      res.status(200).send({ msg: 'Usuario eliminado' });
    }
  });
}

module.exports = {
  consigueme,
  ObtenerUsuarios,
  crearUsuario,
  actualizar,
  eliminar,
};
