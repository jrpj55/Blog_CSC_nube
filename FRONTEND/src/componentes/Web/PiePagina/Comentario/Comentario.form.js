import * as Yup from 'yup';

export function initialValues() {
  return {
    nombres: '',
    comentario: '',
    email: '',
  };
}

export function validationSchema() {
  return Yup.object({
    nombres: Yup.string().required(true),
    comentario: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
  });
}
