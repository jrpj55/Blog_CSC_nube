/*
El contexto se utiliza para poder mover un estado a nivel global de nuestra aplicación.
Que cualquier componente hijo de este contexto sea capaz de acceder a esa información cuando quiera.
Y cómo? Y con el hook personalizado que vamos a crear.
De esa manera podemos guardar datos del usuario ahí dentro y cualquier componente que tenga que sea
hijo lo va a poder ver simplemente usando un hook.

*/

import { useState, useEffect, createContext } from 'react';
import { apiUsers, apiAutentica } from '../api';
import { hasExpiredToken } from '../utils';

const userController = new apiUsers();
const authController = new apiAutentica();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null); //si llega nulo no esta logueado
  const [token, setToken] = useState(null);
  const [laoding, setLaoding] = useState(true);

  useEffect(() => {
    //comprobar si el usuario esta logueano o no, cuando recargo la pagina es lo primero que se
    //ejecuta
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();
      if (!accessToken || !refreshToken) {
        logout();
        setLaoding(false);
        return;
      }
      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLaoding(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      );
      authController.setAccessToken(accessToken);
      await login(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.password;

      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };
  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (laoding) return null;
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
