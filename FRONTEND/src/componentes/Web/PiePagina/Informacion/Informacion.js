import React from 'react';
import { Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { Icon } from '../../../../assets';
import { socialData } from '../../../../utils';
import './Informacion.scss';

export function Informacion() {
  return (
    <div className="footer-info">
      <Icon.LogoWhite className="logo" />
      <p>
        En este sitio web de la CSC. Se trata de un sitio Web, que se actualiza
        periódicamente y que recopila cronológicamente textos y artículos de
        interes para sus afiliados.!!
      </p>

      {map(socialData, (social) => (
        <Button
          key={social.type}
          as="a"
          target="_blank"
          href={social.link}
          color={social.type}
          icon={social.type}
        />
      ))}
    </div>
  );
}
