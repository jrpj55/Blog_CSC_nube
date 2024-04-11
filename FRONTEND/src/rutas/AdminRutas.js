import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Autentica, Usuarios, Blog, Comentarios, Menu } from '../paginas/admin';
import { EsquemaAdmin } from '../esquemas/';
import { useAuth } from '../hooks';

export function AdminRutas() {
  const { user } = useAuth();

  const cargaEsquema = (Esquema, Pagina) => {
    return (
      <Esquema>
        <Pagina />
      </Esquema>
    );
  };

  return (
    <Routes>
      {/*Sí user es nulo osea no se ha logueado*/}

      {!user ? (
        <Route path="/admin/*" element={<Autentica />} />
      ) : (
        //{/*de lo contrario el usuario es logueado*/}
        <>
          {['/admin', '/admin/blog'].map((path) => (
            <Route
              key={path}
              path={path}
              element={cargaEsquema(EsquemaAdmin, Blog)}
            />
          ))}
          <Route
            path="/admin/usuarios"
            element={cargaEsquema(EsquemaAdmin, Usuarios)}
          />
          <Route
            path="/admin/comentarios"
            element={cargaEsquema(EsquemaAdmin, Comentarios)}
          />
          <Route
            path="/admin/menus"
            element={cargaEsquema(EsquemaAdmin, Menu)}
          />
        </>
      )}
    </Routes>
  );
}
