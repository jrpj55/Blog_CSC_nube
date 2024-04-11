import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import { apiComentarios } from '../../../../api';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './Comentario.form';
import './Comentario.scss';

const ComentarioController = new apiComentarios();

export function Comentario() {
  const [successs, setSuccesss] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setSuccesss(false);

      try {
        await ComentarioController.registerComentario(formValue);
        formik.resetForm();
        setSuccesss(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="footer-comentario">
      <h4>¡Su opinion es importante para nosotros!</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="nombres"
          placeholder="Nombres Completos"
          onChange={formik.handleChange}
          value={formik.values.nombres}
          error={formik.errors.nombres}
        />
        <Form.Input
          name="comentario"
          placeholder="Comentarios"
          onChange={formik.handleChange}
          value={formik.values.comentario}
          error={formik.errors.comentario}
        />
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          ¡Registrar el Comentario!
        </Form.Button>

        {/*Si es verdadero aparece el email registrado*/}
        {successs && (
          <p className="success">¡Comentario registrado correctamente!</p>
        )}
      </Form>
    </div>
  );
}
