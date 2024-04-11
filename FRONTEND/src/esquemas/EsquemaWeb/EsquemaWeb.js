import React from 'react';
import { Container } from 'semantic-ui-react';
import { BarraSuperior, Footer } from '../../componentes/Web';
import './EsquemaWeb.scss';

export function EsquemaWeb(props) {
  const { children } = props;
  return (
    <div className="client-layout">
      <div className="client-layout__header">
        <BarraSuperior />
      </div>

      {children}

      <div className="client-layout__footer">
        <Container>
          <Footer.Informacion />
          <Footer.Comentario />
        </Container>
        <Container>
          <span>Derechos de Autor, Raychu</span>
          <span>Corporación Social de Cundinamarca - CSC</span>
        </Container>
      </div>
    </div>
  );
}
