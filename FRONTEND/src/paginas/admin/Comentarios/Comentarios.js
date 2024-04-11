import React from 'react';
import { Tab } from 'semantic-ui-react';
import { ListadoComentario } from '../../../componentes/Administrador/Comentarios';

export function Comentarios() {
  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListadoComentario />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className="newsletter-page">
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  );
}
