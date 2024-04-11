import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { Icon } from '../../../assets';
import {
  FormRegistro,
  FormLogin,
} from '../../../componentes/Administrador/Autentica';

import './Autentica.scss';

export function Autentica() {
  const [activeIndex, setActiveIndex] = useState(0);

  // debe estar en cero para que enrtre siempre a loguearse, si es 1 entra a nuevo usuario
  const openLogin = () => setActiveIndex(0);

  const panes = [
    {
      menuItem: 'Inicio de Sesión',
      render: () => (
        <Tab.Pane>
          <FormLogin />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Registrarse',
      render: () => (
        <Tab.Pane>
          <FormRegistro openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        /*Cuando cambia el TAB el onTabChange*/
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  );
}
