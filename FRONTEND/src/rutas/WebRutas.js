import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Inicio, Blog, Post } from '../paginas/web';
import { EsquemaWeb } from '../esquemas';

export function WebRutas() {
  const cargaEsquema = (Esquema, Pagina) => {
    return (
      <Esquema>
        <Pagina />
      </Esquema>
    );
  };

  return (
    <Routes>
      <Route path="/" element={cargaEsquema(EsquemaWeb, Inicio)} />
      <Route path="/blog" element={cargaEsquema(EsquemaWeb, Blog)} />
      <Route path="/blog/:path" element={cargaEsquema(EsquemaWeb, Post)} />
    </Routes>
  );
}
