import * as Yup from 'yup';

export function initialValues(post) {
  return {
    titulo_blog: post?.titulo_blog || '',
    path_blog: post?.path_blog || '',
    contenido_blog: post?.contenido_blog || '',
    miniature_blog: post?.miniature_blog || '',
    file: null,
  };
}

export function validationSchema() {
  return Yup.object({
    titulo_blog: Yup.string().required(true),
    path_blog: Yup.string().required(true),
    contenido_blog: Yup.string().required(true),
    miniature_blog: Yup.string().required(true),
  });
}
