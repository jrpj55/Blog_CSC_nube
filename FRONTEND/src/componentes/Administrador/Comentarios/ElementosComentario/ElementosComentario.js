import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { apiComentarios } from '../../../../api';
import { useAuth } from '../../../../hooks';
import './ElementosComentario.scss';

const ComentaController = new apiComentarios();

export function ElementosComentario(props) {
  const { TablaComentarios, onReload } = props;
  const [showConfirm, setShowConfirm] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await ComentaController.deleteComentarios(
        accessToken,
        TablaComentarios._id
      );
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="comentario-item">
        <div className="">
          <p>{TablaComentarios.nombres} </p>
          <p>{TablaComentarios.comentario}</p>
          <p>{TablaComentarios.email}</p>
        </div>

        <div>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Eliminar ${TablaComentarios.email}`}
        size="mini"
      />
    </>
  );
}
