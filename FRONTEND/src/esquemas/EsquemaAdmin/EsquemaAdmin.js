import React from 'react';
import { Icon } from '../../assets';
import {
  AdminMenu,
  Logout,
} from '../../componentes/Administrador/AdminEsquema';
import './EsquemaAdmin.scss';

export function EsquemaAdmin(props) {
  const { children } = props;
  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <Icon.LogoWhite className="logo" />
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <Logout />
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
