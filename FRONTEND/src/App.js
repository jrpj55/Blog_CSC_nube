import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdminRutas, WebRutas } from './rutas';
import { AuthProvider } from './contexts';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminRutas />

        <WebRutas />
      </BrowserRouter>
    </AuthProvider>
  );
}
