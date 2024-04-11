import React, { useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
//para traer la imagen nos traemos el usedropzone
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { useAuth } from '../../../../hooks';
import { apiBlog } from '../../../../api';
import { ENV } from '../../../../utils';
import { initialValues, validationSchema } from './FormularioPost.form';
import { Editor } from '@tinymce/tinymce-react';
import './FormularioPost.scss';

const blogController = new apiBlog();

export function FormularioPost(props) {
  const { post, onClose, onReload } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(post),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (post) {
          await blogController.updatePost(accessToken, post._id, formValue);
        } else {
          await blogController.createPost(accessToken, formValue);
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  //funciones para el cargue de la imagen

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue('miniature_blog', URL.createObjectURL(file));
    formik.setFieldValue('file', file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop,
  });

  //Realizamos la función para el cuadro de la imagen
  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.miniature_blog;
    } else if (formik.values.miniature_blog) {
      return `${ENV.BASE_PATH}/${formik.values.miniature_blog}`;
    }
    return null;
  };

  return (
    <Form className="post-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="titulo_blog"
          placeholder="Titulo del post"
          onChange={formik.handleChange}
          value={formik.values.titulo_blog}
          error={formik.errors.titulo_blog}
        />
        <Form.Input
          name="path_blog"
          placeholder="Path del post"
          onChange={formik.handleChange}
          value={formik.values.path_blog}
          error={formik.errors.path_blog}
        />
      </Form.Group>
      {/*Configuración inicial del Editor para el Contenido del Blog con tinymce inicio de sesión con keytechjp para la clave del api nuevo para el 2024*/}
      <Editor
        apiKey="o7zl869vu25enaomhpcwra58eel93bt2i5p0w2u2al2k5zh1"
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        initialValue={formik.values.contenido_blog}
        onBlur={(e) =>
          formik.setFieldValue('contenido_blog', e.target.getContent())
        }
      />
      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {post ? 'Actualizar Blog' : 'Crear Blog'}
      </Form.Button>
    </Form>
  );
}
