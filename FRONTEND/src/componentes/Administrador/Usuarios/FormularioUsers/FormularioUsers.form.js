import * as Yup from 'yup';

export function initialValues(user) {
  return {
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    rol: user?.rol || '',
    password: '',
  };
}

export function validationSchema(user) {
  return Yup.object({
    nombre: Yup.string().required(true),
    apellido: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    rol: Yup.string().required(true),
    password: user ? Yup.string() : Yup.string().required(true),
  });
}
