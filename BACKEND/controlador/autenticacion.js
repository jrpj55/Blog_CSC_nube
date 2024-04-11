const User = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('../utilidades/jwt');

function registro(req, res) {
  const { nombre, apellido, email, password } = req.body;

  if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
  if (!password) res.status(400).send({ msg: 'La contraseña es obligatoria' });

  const usua = new User({
    nombre,
    apellido,
    email: email.toLowerCase(), // tolower siempre se registra en miniscula
    rol: 'Usuario',
    active: false,
  });
  // Encriptación de Contraseña
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  usua.password = hashPassword;

  //Guardar el usuario en la base de datos
  usua.save((error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: 'Error al crear el usuario' });
    } else {
      res.status(200).send(userStorage);
    }
  });
}
function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
  if (!password) res.status(400).send({ msg: 'La contraseña es obligatoria' });

  const emailLowerCase = email.toLowerCase();
  // buscar solo un usuario
  User.findOne({ email: emailLowerCase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: 'Error del servidor' });
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: 'Error del servidor' });
        } else if (!check) {
          res.status(400).send({ msg: 'Contraseña incorrecta' });
        } else if (!userStore.active) {
          res.status(401).send({ msg: 'Usuario no autorizado o no activo' });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    }
  });
}
function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: 'Token requerido' });

  const { user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: 'Error del servidor' });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage),
      });
    }
  });
}

module.exports = {
  registro,
  login,
  refreshAccessToken,
};
