import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../componentes/ComponenteCompartido';
import {
  FormularioUsers,
  ListadoUsers,
} from '../../../componentes/Administrador/Usuarios';
import './Usuarios.scss';

export function Usuarios() {
  //inicializamos el estado para cerrar o abril el modal
  //El modal es la ventana emergente o formulario que aparece cuando pincho nuevo usuario
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  //Definimos la función onOpenCloseModal si esta abierto lo cierra y viseversa
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //la función para reacargar el formulario
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: 'Usuarios activos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListadoUsers
            usersActive={true}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Usuarios inactivos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListadoUsers
            usersActive={false}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="users-page">
        <Button className="users-page__add" primary onClick={onOpenCloseModal}>
          Nuevo usuario
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo usuario"
      >
        <FormularioUsers close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
