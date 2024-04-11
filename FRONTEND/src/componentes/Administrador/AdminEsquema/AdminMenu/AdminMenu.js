//se programa el menu del administrador
import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../hooks';
import './AdminMenu.scss';

export function AdminMenu() {
  //el useLoocation permite seleccionar o guardar el path del menu
  const { pathname } = useLocation();
  const {
    user: { rol },
  } = useAuth();
  const isAdmin = rol === 'admin';

  //es la ruta actual
  const esRutaActual = (path) => {
    if (path === pathname) return true;
    return false;
  };

  return (
    //menu vertical va a tener iconos y texto luid vertical icon text
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/usuarios"
            //cuando recargue la página siga en esa rutA Y no se salga
            active={esRutaActual('/admin/usuarios')}
          >
            <Icon name="user outline" />
            Usuarios
          </Menu.Item>

          {/*<Menu.Item
            as={Link}
            to="/admin/menus"
            active={esRutaActual('/admin/menus')}
          >
            <Icon name="bars" />
            Menu
      </Menu.Item>*/}

          <Menu.Item
            as={Link}
            to="/admin/comentarios"
            active={esRutaActual('/admin/comentarios')}
          >
            <Icon name="mail" />
            Comentarios
          </Menu.Item>
        </>
      )}

      <Menu.Item
        as={Link}
        to="/admin/blog"
        active={esRutaActual('/admin/blog')}
      >
        <Icon name="comment alternate outline" />
        Blog
      </Menu.Item>
    </Menu>
  );
}
