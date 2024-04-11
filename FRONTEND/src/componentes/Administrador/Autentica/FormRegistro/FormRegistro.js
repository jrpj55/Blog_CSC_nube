import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';
import { initialValues, validationSchema } from './FormRegistro.form';
import './FormRegistro.scss';
import { apiAutentica } from '../../../../api';

const AutenticaControlador = new apiAutentica();

export function FormRegistro(props) {
  const { openLogin } = props; // el openLogin es para apenas se registra lo pasa al login
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false, // nos valide solo cuando enviamos el formulario
    onSubmit: async (formValue) => {
      try {
        setError('');
        await AutenticaControlador.registro_usuario(formValue);
        openLogin();
      } catch (error) {
        setError('Error en el servidor');
      }
    },
  });

  return (
    <Form className="registro-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email} // me valida el error en form_registro.form.js en validationShema
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        name="repeatPassword"
        type="password"
        placeholder="Repetir Contraseña"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Form.Checkbox
        name="conditionsAccepted"
        label="He leído y acepto las poíticas de privacidad"
        onChange={(_, data) =>
          formik.setFieldValue('conditionsAccepted', data.checked)
        }
        checked={formik.values.conditionsAccepted}
        error={formik.errors.conditionsAccepted}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear cuenta
      </Form.Button>

      <p className="registro-form__error">{error}</p>
    </Form>
  );
}
