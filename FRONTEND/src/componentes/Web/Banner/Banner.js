import React from 'react';
import { Container } from 'semantic-ui-react';
import './Banner.scss';

export function Banner() {
  return (
    <div className="banner">
      <Container>
        <h1>
          {/*Aprende nuevas y el br saldo de linea y continua la frase tecnologías web..*/}
          Blog Informativo <br /> Corporación Social de Cundinamarca
        </h1>
        <h2>
          La Entidad dará a conocer a través de blog Informativo las
          <br />
          últimas novedades.
        </h2>
      </Container>

      <div className="banner__dark" />
    </div>
  );
}
