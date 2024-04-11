import { ENV } from '../utils';

export class apiComentarios {
  baseApi = ENV.BASE_API;

  async getComentarios(accessToken, page = 1, limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMENTARIOS}?${pageFilter}&${limitFilter}`;

      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteComentarios(accessToken, idEmail) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMENTARIOS}/${idEmail}`;
      const params = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async registerComentario(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COMENTARIO_N}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
