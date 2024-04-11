import React from 'react';
import { Form } from 'semantic-ui-react';
import { apiUsers } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './FormularioUsers.form';
import { Icon } from '../../../../assets';

import './FormularioUsers.scss';

//este formulario es tanto para crear como para actualizar usuarios
//traemos unos props que se utilizaran, close para cerrar el formulario, OnReload para
//recargar el formulario automaticamente cuando se cree o actualice un usuario en los listados
//y el user son los datos que trae el usuario para la actualización

const userController = new apiUsers();

export function FormularioUsers(props) {
  const { close, onReload, user } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(user),
    validateOnChange: false,
    //formvalue son los datos del formulario
    onSubmit: async (formValue) => {
      try {
        if (!user) {
          await userController.createUser(accessToken, formValue);
        } else {
          await userController.updateUser(accessToken, user._id, formValue);
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    //onSubmit es el comando de enviar
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="user-form__avatar">
        <Icon.LogoWhite className="logo" />
      </div>
      {/*Dos filas por cada grupo */}
      <Form.Group widths="equal">
        <Form.Input
          name="nombre"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.nombre}
          error={formik.errors.nombre}
        />
        <Form.Input
          name="apellido"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          value={formik.values.apellido}
          error={formik.errors.apellido}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Dropdown
          placeholder="Seleccióna un rol"
          options={roleOptions}
          selection
          onChange={(_, data) => formik.setFieldValue('rol', data.value)}
          value={formik.values.rol}
          error={formik.errors.rol}
        />
      </Form.Group>

      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {user ? 'Actualizar usuario' : 'Crear usuario'}
      </Form.Button>
    </Form>
  );
}

const roleOptions = [
  {
    key: 'usuario',
    text: 'Usuario',
    value: 'usuario',
  },
  {
    key: 'admin',
    text: 'Administrador',
    value: 'admin',
  },
];
