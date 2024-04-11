import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../componentes/ComponenteCompartido';

import './Blog.scss';
import {
  FormularioPost,
  ListadoPost,
} from '../../../componentes/Administrador/Post';

export function Blog() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListadoPost reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="blog-page">
        <div className="blog-page__add">
          <Button primary onClick={onOpenCloseModal}>
            Nuevo post
          </Button>
        </div>

        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo Blog"
        size="large"
      >
        <FormularioPost onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
