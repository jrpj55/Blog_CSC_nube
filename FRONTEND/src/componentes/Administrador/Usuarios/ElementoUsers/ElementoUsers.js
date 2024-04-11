import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { BasicModal } from '../../../ComponenteCompartido';
import './ElementoUsers.scss';
import { FormularioUsers } from '../FormularioUsers';
import { useAuth } from '../../../../hooks';
import { apiUsers } from '../../../../api';

const userController = new apiUsers();

export function ElementoUsers(props) {
  const { user, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  //definimos los siguientes estados mostrarConfirmar, confirmar mensaje y es eliminar
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  //función de abrir o cerrar el modal o fi¿ormulario
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //función de abrir o cerrar la confirmación el prevState(estado anterior)
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateUser = () => {
    //establecer tituto del modal o ventana
    setTitleModal(`Actualizar el siguiente usuario ${user.email}`);
    onOpenCloseModal();
  };

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar el siguiente usuario ${user.email}`
        : `Activar el siguiente usuario ${user.email}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar el siguiente usuario ${user.email}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <div>
            <p>
              {user.nombre} {user.apellido}
            </p>
            <p>{user.email}</p>
          </div>
        </div>

        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? 'orange' : 'teal'}
            onClick={openDesactivateActivateConfirm}
          >
            <Icon name={user.active ? 'ban' : 'check'} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <FormularioUsers
          close={onOpenCloseModal}
          onReload={onReload}
          user={user}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
